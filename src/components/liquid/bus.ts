/**
 * The small, always-loaded seam between the DOM (Hero) and the liquid engine.
 * Hero drives the intro and owns the name; the engine owns everything drawn in
 * the canvas. Pour timing lives here so both sides scrub from the same math.
 */

export type IntroState = 'pending' | 'play' | 'rest';

/** A name letter in hero-local CSS px, measured with no pour offset applied. */
export type Letter = { x: number; y: number; size: number; order: number };

export const liquidState = {
  intro: 'pending' as IntroState,
  introStart: 0,
  letters: [] as Letter[],
};

const listeners = new Set<() => void>();
let ready = false;
let waiting: ((ok: boolean) => void)[] = [];

function notify() {
  listeners.forEach((fn) => fn());
}

/** Whether the liquid is running, as reflected on <html>. */
export function liquidLive(): boolean {
  return typeof document !== 'undefined' && Boolean(document.documentElement.dataset.liquidLive);
}

/** Whether the pinned hero layout is in effect (decided before first paint). */
export function liquidPinned(): boolean {
  return typeof document !== 'undefined' && Boolean(document.documentElement.dataset.liquid);
}

export function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Engine: the program is compiled and a first frame is on screen. */
export function markReady() {
  ready = true;
  waiting.forEach((r) => r(true));
  waiting = [];
}

/** Hero: resolves true once the engine is ready, false if it misses `ms`. */
export function whenReady(ms: number): Promise<boolean> {
  if (!liquidLive()) return Promise.resolve(false);
  if (ready) return Promise.resolve(true);
  return new Promise((resolve) => {
    const timer = window.setTimeout(() => {
      waiting = waiting.filter((r) => r !== settle);
      resolve(false);
    }, ms);
    const settle = (ok: boolean) => {
      window.clearTimeout(timer);
      resolve(ok);
    };
    waiting.push(settle);
  });
}

export function playIntro() {
  liquidState.intro = 'play';
  liquidState.introStart = performance.now();
  notify();
}

export function skipIntro() {
  liquidState.intro = 'rest';
  notify();
}

export function setLetters(letters: Letter[]) {
  liquidState.letters = letters;
  notify();
}

/**
 * Turn the liquid off for the rest of the session: the image hero comes back.
 * Safe to call more than once.
 */
export function fallback() {
  const doc = document.documentElement;
  if (!doc.dataset.liquidLive) return;
  delete doc.dataset.liquidLive;
  waiting.forEach((r) => r(false));
  waiting = [];
  const bloom = document.querySelector<HTMLElement>('[data-hero-bloom]');
  bloom?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: 'ease-out' });
  notify();
}

// ------------------------------------------------------------------ pour math

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp01((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

export const POUR = {
  /** Letters drain right to left; `order` 0 is the rightmost letter. */
  letterStart: (order: number) => 0.15 + 0.03 * order,
  fall: 0.16,
  handoff: 0.12,
  fade: 0.04,
  flight: 0.18,
  fallDist: (vh: number) => 0.22 * vh,
};

/** Scroll progress through the hero pin, 0 → 1. */
export function pourProgress(scrollY: number, pinTop: number, pinH: number, vh: number) {
  return clamp01((scrollY - pinTop) / Math.max(1, pinH - vh));
}

/** DOM side of a letter at progress p: fall (0..1 of fallDist) and opacity. */
export function letterDom(p: number, order: number) {
  const p0 = POUR.letterStart(order);
  const u = clamp01((p - p0) / POUR.fall);
  return { fall: u * u, opacity: 1 - clamp01((p - p0 - POUR.handoff) / POUR.fade) };
}
