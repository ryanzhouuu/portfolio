'use client';

import { useMemo, type CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Fine dust drifting up through the studio light — the quiet, alive detail.
 * Sparse and low-opacity by design; it should register as depth, not weather.
 */

// Deterministic PRNG (mulberry32) so the server and client render the exact
// same motes — random positions would otherwise trip a hydration mismatch.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const COUNT = 26;

export default function DustMotes() {
  const reduce = useReducedMotion();

  const motes = useMemo(() => {
    const rand = mulberry32(20260626);
    return Array.from({ length: COUNT }, () => ({
      left: rand() * 100, // vw %
      top: rand() * 100, // vh %
      size: 2 + rand() * 3.5, // 2–5.5px
      opacity: 0.3 + rand() * 0.5, // 0.30–0.80
      duration: 14 + rand() * 16, // 14–30s
      delay: -rand() * 30, // negative → already mid-drift on load
      sway: (rand() - 0.5) * 80, // ±40px lateral drift
    }));
  }, []);

  if (reduce) return null;

  // Floats in front of the scene, blended so it glows over the dark negative
  // space and all but disappears over bright chrome. Below the nav (z-50).
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 overflow-hidden mix-blend-screen"
    >
      {motes.map((m, i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: `${m.size}px`,
              height: `${m.size}px`,
              animationDuration: `${m.duration}s`,
              animationDelay: `${m.delay}s`,
              '--mote-o': m.opacity,
              '--mote-x': `${m.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
