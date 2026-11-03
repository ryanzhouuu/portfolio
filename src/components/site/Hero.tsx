'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope, createTimeline, onScroll, splitText, stagger } from 'animejs';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import { heroImage, personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';
import {
  fallback as liquidFallback,
  letterDom,
  liquidPinned,
  playIntro,
  POUR,
  pourProgress,
  setLetters,
  skipIntro,
  smoothstep,
  whenReady,
  type Letter,
} from '@/components/liquid/bus';

const links = [
  { label: 'GitHub', href: personalInfo.github, Icon: Github, external: true },
  { label: 'LinkedIn', href: personalInfo.linkedin, Icon: Linkedin, external: true },
  // The address itself, kept in its own case rather than mono caps.
  { label: personalInfo.email, href: `mailto:${personalInfo.email}`, Icon: Mail, external: false },
];

const SKIP_EVENTS = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const;

/** One pass of light across the name: moves the band painted into each glyph. */
const SWEEP = { '--sweep-x': ['-3.5em', '7em'], duration: 1600, ease: 'inOut(2)' };

/** How long the intro waits for the liquid engine before using the photo. */
const LIQUID_READY_MS = 600;
/** When the liquid intro's camera pull-back lands; the name rises from here. */
const LIQUID_LAND_MS = 1450;

/** Resolves once the image is decoded, or false if it misses the deadline. */
function decodeWithin(img: HTMLImageElement | null, ms: number): Promise<boolean> {
  if (!img) return Promise.resolve(false);
  const decoded = img.complete && img.naturalWidth > 0
    ? Promise.resolve(true)
    : img.decode().then(() => true, () => false);
  return Promise.race([decoded, new Promise<boolean>((r) => setTimeout(() => r(false), ms))]);
}

/**
 * Letters of the name fall and fade as the hero pours, while the liquid engine
 * picks each one up as a droplet. Copy and shades fade with the same scroll
 * progress. Returns a teardown.
 */
function scrubPour(pin: HTMLElement, root: HTMLElement, name: HTMLElement, chars: HTMLElement[]) {
  // Each glyph sits in a clipping wrapper; move the wrapper so it can fall.
  const letters = chars.filter((c) => c.textContent?.trim()).map((c) => c.parentElement ?? c);
  const offsets = letters.map(() => 0);
  const orders = letters.map((_, i) => i);
  const reveal = root.querySelectorAll<HTMLElement>('[data-hero-reveal]');
  const shades = root.querySelectorAll<HTMLElement>('[data-hero-shade]');
  const chrome = root.querySelector<HTMLElement>('[data-hero-chrome]');
  let lastP = -1;
  let raf = 0;

  const measure = () => {
    const hr = root.getBoundingClientRect();
    const size = parseFloat(getComputedStyle(name).fontSize);
    const items: Letter[] = letters.map((el, i) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - hr.left, y: r.top + r.height / 2 - hr.top - offsets[i], size, order: 0 };
    });
    // Drain right to left: the letter nearest the liquid goes first.
    items
      .map((_, i) => i)
      .sort((a, b) => items[b].x - items[a].x)
      .forEach((idx, order) => {
        orders[idx] = order;
        items[idx].order = order;
      });
    setLetters(items);
  };

  const apply = () => {
    raf = 0;
    const vh = window.innerHeight;
    const pinTop = pin.getBoundingClientRect().top + window.scrollY;
    const p = pourProgress(window.scrollY, pinTop, pin.offsetHeight, vh);
    // Leave the intro's inline styles alone until the viewer actually scrolls.
    if (p === lastP || (lastP < 0 && p === 0)) return;
    lastP = p;

    const fall = POUR.fallDist(vh);
    letters.forEach((el, i) => {
      const d = letterDom(p, orders[i]);
      offsets[i] = d.fall * fall;
      el.style.transform = offsets[i] ? `translateY(${offsets[i]}px)` : '';
      el.style.opacity = d.opacity < 1 ? String(d.opacity) : '';
    });
    const copy = 1 - smoothstep(0, 0.3, p);
    reveal.forEach((el) => {
      el.style.opacity = String(copy);
      el.style.transform = `translateY(${-16 * (1 - copy)}px)`;
    });
    const shade = String(1 - smoothstep(0.3, 0.7, p));
    shades.forEach((el) => (el.style.opacity = shade));
    // Only visible after a fallback: the photo fades instead of pouring.
    if (chrome) chrome.style.opacity = String(1 - smoothstep(0.1, 0.9, p));
  };

  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(apply);
  };
  const onResize = () => {
    measure();
    lastP = -2;
    schedule();
  };

  measure();
  document.fonts?.ready.then(measure);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize);
  schedule();

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', onResize);
  };
}

/**
 * Full-height opening. On every load the camera starts close on a dark,
 * churning chrome surface and whips back as the lights come up to reveal the
 * breathing mass (or, without the liquid engine, the photo blooms out of a
 * single glint), then the name etches in. The pre-paint gate
 * in the root layout sets `data-intro`; this effect plays it and clears it.
 * With the liquid on, the hero is pinned for one screen and pours away.
 */
export default function Hero() {
  const pinRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current || !pinRef.current) return;
    const root = rootRef.current;
    const pin = pinRef.current;
    const doc = document.documentElement;
    const mode = doc.dataset.intro as 'play' | 'fade' | undefined;
    const pinned = liquidPinned();
    const cleanups: (() => void)[] = [];

    const finishIntro = () => {
      delete doc.dataset.intro;
      delete doc.dataset.introLive;
    };

    // The intro always opens at the top of the page.
    if (mode) window.scrollTo(0, 0);

    const scope = createScope({
      root: rootRef,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      const nav = document.querySelectorAll<HTMLElement>('[data-intro-nav]');
      const reveal = root.querySelectorAll<HTMLElement>('[data-hero-reveal]');

      if (mode === 'fade') {
        skipIntro();
        doc.dataset.introLive = '1';
        const held = root.querySelectorAll<HTMLElement>('[data-hero-bloom], [data-hero-name]');
        animate([...nav, ...reveal, ...held], {
          opacity: [0, 1],
          duration: 400,
          ease: 'linear',
          onComplete: finishIntro,
        });
        return;
      }

      if (self?.matches.reduceMotion) {
        skipIntro();
        return;
      }

      const name = root.querySelector<HTMLElement>('[data-hero-name]');
      if (!name) return;

      const split = splitText(name, {
        chars: { wrap: 'clip', class: 'cinematic-char' },
        includeSpaces: true,
        accessible: true,
      });

      // Each glyph offsets the sweep band by its own position, so the band
      // crosses the name as one piece. In em, so it survives font resizing.
      const nameLeft = name.getBoundingClientRect().left;
      const em = parseFloat(getComputedStyle(name).fontSize) || 1;
      split.chars.forEach((c) => {
        c.style.setProperty('--cx', `${(c.getBoundingClientRect().left - nameLeft) / em}em`);
      });

      if (mode === 'play') {
        doc.dataset.introLive = '1';
        const img = root.querySelector<HTMLImageElement>('[data-hero-img]');
        let tl: ReturnType<typeof createTimeline> | null = null;
        let skipped = false;

        const skip = () => {
          skipped = true;
          skipIntro();
          tl?.complete();
        };
        SKIP_EVENTS.forEach((e) => window.addEventListener(e, skip, { passive: true, once: true }));
        const removeSkip = () => SKIP_EVENTS.forEach((e) => window.removeEventListener(e, skip));
        cleanups.push(removeSkip);

        // Hard ceiling in case anything below stalls.
        const ceiling = window.setTimeout(() => {
          tl?.complete();
          finishIntro();
        }, 4800);
        cleanups.push(() => window.clearTimeout(ceiling));

        const run = (liquid: boolean, ready: boolean) => {
          const done = () => {
            removeSkip();
            window.clearTimeout(ceiling);
            finishIntro();
          };

          tl = createTimeline({ defaults: { ease: 'out(4)' }, onComplete: done });

          if (liquid) {
            // The engine plays the macro pull-back; the name waits for it to land.
            if (skipped) skipIntro();
            else playIntro();
          } else if (ready) {
            tl.set('[data-hero-bloom]', { opacity: 1, '--bloom-r': '0vmax' }, 0)
              .add('[data-hero-glint]', {
                opacity: [0, 1, 0],
                scale: [0.2, 1, 2.4],
                duration: 1100,
                ease: 'out(3)',
              }, 0)
              .add('[data-hero-bloom]', {
                '--bloom-r': ['0vmax', '150vmax'],
                duration: 1300,
                ease: 'inOut(3)',
              }, 150)
              .add('[data-hero-img]', {
                filter: ['blur(24px) brightness(1.8)', 'blur(0px) brightness(1)'],
                scale: [1.12, 1],
                duration: 1450,
                ease: 'out(3)',
              }, 150);
          } else {
            // Image is late: open the mask and drop the blur, then just fade.
            tl.set('[data-hero-bloom]', { '--bloom-r': '150vmax' }, 0)
              .set('[data-hero-img]', { filter: 'blur(0px) brightness(1)', scale: 1 }, 0)
              .add('[data-hero-bloom]', { opacity: [0, 1], duration: 500, ease: 'linear' }, 0);
          }

          const base = liquid ? LIQUID_LAND_MS : ready ? 900 : 200;
          tl.set(name, { opacity: 1 }, base)
            .add(split.chars, {
              opacity: [0, 1],
              y: ['100%', '0%'],
              filter: ['blur(10px)', 'blur(0px)'],
              duration: 900,
              delay: stagger(40),
            }, base)
            .add(name, SWEEP, base + 250)
            .add(reveal, { opacity: [0, 1], y: [16, 0], duration: 800, delay: stagger(90) }, base + 500)
            .add(nav, { opacity: [0, 1], y: [-8, 0], duration: 800 }, base + 650);

          if (skipped) tl.complete();
        };

        whenReady(LIQUID_READY_MS).then((liquid) => {
          if (liquid) {
            run(true, true);
            return;
          }
          liquidFallback();
          decodeWithin(img, 600).then((ready) => run(false, ready));
        });
      } else {
        // The gate's failsafe already revealed the hero: a quick etch, no bloom.
        skipIntro();
        createTimeline({ defaults: { ease: 'out(4)' } })
          .add(split.chars, {
            opacity: [0, 1],
            y: ['88%', '0%'],
            filter: ['blur(10px)', 'blur(0px)'],
            duration: 820,
            delay: stagger(32),
          }, 120)
          .add(name, SWEEP, 380);
      }

      const scrollSync = (sync: number) => onScroll({ target: root, enter: 'top top', leave: 'bottom top', sync });

      animate('[data-hero-chrome]', { y: [0, 90], scale: [1, 1.04], ease: 'linear', autoplay: scrollSync(0.15) });
      animate('[data-hero-cone]', { y: [0, 120], x: [0, 36], opacity: [0.7, 0.18], ease: 'linear', autoplay: scrollSync(0.18) });

      if (pinned) cleanups.push(scrubPour(pin, root, name, split.chars as HTMLElement[]));

      return () => split.revert();
    });

    return () => {
      cleanups.forEach((fn) => fn());
      scope.revert();
    };
  }, []);

  return (
    <div ref={pinRef} data-liquid-anchor="hero-pin" className="hero-pin">
    <section ref={rootRef} id="top" data-liquid-anchor="hero" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <div data-hero-chrome aria-hidden className="hero-stage pointer-events-none absolute inset-0">
        <div data-hero-bloom className="hero-bloom absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- decoded and masked by the intro */}
          <img
            data-hero-img
            src={withBasePath(heroImage)}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[88%_center] sm:object-right"
          />
        </div>
        <div className="hero-glint-anchor absolute h-40 w-40 -translate-x-1/2 -translate-y-1/2">
          <div data-hero-glint className="hero-glint h-full w-full opacity-0" />
        </div>
      </div>
      {/* Where the liquid mass sits, outside the parallax so it never drifts. */}
      <div aria-hidden className="hero-stage pointer-events-none absolute inset-0">
        <div data-liquid-anchor="hero-focal" className="hero-glint-anchor absolute h-px w-px" />
      </div>

      <div data-hero-shade aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/40 sm:bg-gradient-to-r sm:from-void sm:via-void/80 sm:to-transparent lg:via-void/55" />
      <div data-hero-shade aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void to-transparent" />
      {/* Keeps the nav legible where it crosses the bright chrome. */}
      <div data-hero-shade aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void/85 to-transparent" />
      <div data-hero-cone aria-hidden className="light-cone absolute left-[18%] top-0 h-[64vh] w-[34rem] -translate-x-1/2 opacity-70" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-28 pt-28 sm:justify-center sm:px-8 sm:pb-24 lg:px-12">
        <div className="relative inline-block self-start pb-2 pr-2">
          <h1
            data-hero-name
            className="hero-name font-display whitespace-nowrap text-chrome-shine text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.95] tracking-[-0.045em]"
          >
            {personalInfo.name}
          </h1>
        </div>

        <p data-hero-reveal className="label-mono mt-6 text-silver">
          {personalInfo.role} — {personalInfo.title}
        </p>
        <p data-hero-reveal className="mt-4 max-w-md text-base leading-relaxed text-steel sm:text-lg">
          {personalInfo.positioning}
        </p>

        <ul data-hero-reveal className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
          {links.map(({ label, href, Icon, external }) => (
            <li key={label}>
              <a
                href={href}
                {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
                className="group inline-flex items-center gap-2 text-steel transition-colors duration-300 hover:text-chrome"
              >
                <Icon aria-hidden size={16} strokeWidth={1.5} />
                <span className={`label-mono text-inherit ${external ? '' : 'normal-case tracking-[0.04em]'}`}>{label}</span>
                {external && (
                  <ArrowUpRight
                    aria-hidden
                    size={13}
                    strokeWidth={1.5}
                    className="-ml-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-8 left-5 sm:left-8 lg:left-12">
          <a
            href="#experience"
            data-hero-reveal
            className="label-mono flex items-center gap-2 text-steel transition-colors duration-300 hover:text-chrome"
          >
            Scroll
            <ArrowDown aria-hidden size={13} strokeWidth={1.5} className="scroll-cue-arrow" />
          </a>
        </div>
      </div>
    </section>
    </div>
  );
}
