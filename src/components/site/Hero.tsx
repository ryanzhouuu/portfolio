'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope, createTimeline, onScroll, splitText, stagger } from 'animejs';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import { withBasePath } from '@/lib/basePath';

/**
 * Short opening under the nav. The chrome name and the chrome form stay;
 * the block is content-height rather than a full-screen stage.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const scope = createScope({
      root: rootRef,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      if (self?.matches.reduceMotion || !rootRef.current) return;

      const name = rootRef.current.querySelector<HTMLElement>('[data-hero-name]');
      if (!name) return;

      const split = splitText(name, {
        chars: { wrap: 'clip', class: 'cinematic-char' },
        includeSpaces: true,
        accessible: true,
      });

      createTimeline({ defaults: { ease: 'out(4)' } })
        .add(split.chars, {
          opacity: [0, 1],
          y: ['88%', '0%'],
          filter: ['blur(10px)', 'blur(0px)'],
          duration: 920,
          delay: stagger(38),
        }, 180)
        .add('[data-hero-sweep]', {
          opacity: [0, 1, 0],
          x: ['-160%', '340%'],
          duration: 1500,
          ease: 'inOut(3)',
        }, 520)
        .add('[data-hero-copy]', { opacity: [0, 1], y: [18, 0], duration: 820 }, 760)
        .add('[data-hero-actions]', { opacity: [0, 1], y: [16, 0], duration: 820 }, 900);

      animate('[data-hero-chrome]', {
        y: [0, 72],
        scale: [1, 1.035],
        ease: 'linear',
        autoplay: onScroll({
          target: rootRef.current,
          enter: 'top top',
          leave: 'bottom top',
          sync: 0.15,
        }),
      });

      animate('[data-hero-cone]', {
        y: [0, 120],
        x: [0, 36],
        opacity: [0.7, 0.18],
        ease: 'linear',
        autoplay: onScroll({
          target: rootRef.current,
          enter: 'top top',
          leave: 'bottom top',
          sync: 0.18,
        }),
      });

      animate('[data-hero-streak]', {
        x: [0, 110],
        opacity: [0.45, 0.08],
        ease: 'linear',
        autoplay: onScroll({
          target: rootRef.current,
          enter: 'top top',
          leave: 'bottom top',
          sync: 0.12,
        }),
      });

      return () => split.revert();
    });

    return () => scope.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative overflow-hidden pb-16 pt-24"
    >
      <div
        data-hero-chrome
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full bg-cover bg-right bg-no-repeat opacity-90 lg:w-[68%]"
        style={{ backgroundImage: `url(${withBasePath('/images/backgrounds/chrome-negative-left.png')})` }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-void via-void/95 to-transparent lg:via-void/70"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-void/40" />
      <div data-hero-cone aria-hidden className="light-cone absolute left-[18%] top-0 h-[64vh] w-[34rem] -translate-x-1/2 opacity-70" />
      <div data-hero-streak aria-hidden className="projection-streak absolute left-[-20%] top-[22%] h-40 w-[115%] -rotate-6 opacity-45" />

      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="max-w-xl">
          <div className="relative inline-block pb-1 pr-1">
            <h1
              data-hero-name
              className="font-display whitespace-nowrap text-chrome-shine text-[clamp(2.5rem,5.5vw,4rem)]"
            >
              {personalInfo.name}
            </h1>
            <span
              data-hero-sweep
              aria-hidden
              className="absolute inset-y-0 left-0 w-1/3 skew-x-[-12deg] bg-gradient-to-r from-transparent via-spotlight/70 to-transparent opacity-0 mix-blend-screen blur-md motion-reduce:hidden"
            />
          </div>

          <div data-hero-copy className="mt-4 max-w-xl">
            <p className="text-lg text-silver sm:text-xl">{personalInfo.title}</p>
            <p className="mt-3 text-base leading-relaxed text-steel">
              {personalInfo.positioning}
            </p>
          </div>

          <div data-hero-actions className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a href="#work" className="soft-pill px-5 py-2.5 text-sm text-chrome">
              Selected work
            </a>
            <div className="flex items-center gap-5">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Github size={18} strokeWidth={1.5} />
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Linkedin size={18} strokeWidth={1.5} />
              </a>
              <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="text-steel transition-colors duration-300 hover:text-chrome">
                <Mail size={18} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
