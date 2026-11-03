/**
 * DOM positions the liquid attaches to, cached in document space so frames
 * only subtract scrollY. The hero is sticky while pinned, so its inner points
 * are stored relative to the hero section instead.
 */

export type Line = { x: number; top: number; bottom: number };

export type Anchors = {
  pinTop: number;
  pinH: number;
  heroH: number;
  /** Hero focal point relative to the hero section. */
  focal: { x: number; y: number };
  /** The Experience rim line the stream hands off to (document space). */
  rim: Line | null;
};

const q = (name: string) => document.querySelector<HTMLElement>(`[data-liquid-anchor="${name}"]`);

export function measureAnchors(): Anchors | null {
  const pin = q('hero-pin');
  const hero = q('hero');
  const focal = q('hero-focal');
  if (!pin || !hero || !focal) return null;

  const sy = window.scrollY;
  const pinRect = pin.getBoundingClientRect();
  const heroRect = hero.getBoundingClientRect();
  const focalRect = focal.getBoundingClientRect();

  const rr = q('experience-rim')?.getBoundingClientRect();

  return {
    pinTop: pinRect.top + sy,
    pinH: pinRect.height,
    heroH: heroRect.height,
    focal: {
      x: focalRect.left + focalRect.width / 2 - heroRect.left,
      y: focalRect.top + focalRect.height / 2 - heroRect.top,
    },
    rim: rr ? { x: rr.left + rr.width / 2, top: rr.top + sy, bottom: rr.bottom + sy } : null,
  };
}

/** Viewport y of the hero section's top, following the sticky pin. */
export function heroTop(a: Anchors, scrollY: number) {
  const travel = Math.max(0, a.pinH - a.heroH);
  return a.pinTop + Math.min(Math.max(scrollY - a.pinTop, 0), travel) - scrollY;
}
