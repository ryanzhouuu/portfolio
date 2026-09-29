'use client';

import { useEffect, useRef } from 'react';
import { animate, createScope, onScroll } from 'animejs';

/**
 * One hairline down the left edge of its (relative) parent. A bright segment
 * travels along it as the parent scrolls through the middle of the viewport.
 * Reduced motion leaves the hairline evenly lit with no travelling segment.
 */
export default function RimLight() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const parent = track?.parentElement;
    if (!track || !parent) return;

    const scope = createScope({
      root: trackRef,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      if (self?.matches.reduceMotion) return;
      animate(track, {
        '--rim-p': [0, 1],
        ease: 'linear',
        autoplay: onScroll({
          target: parent,
          enter: { target: 'top', container: 'center' },
          leave: { target: 'bottom', container: 'center' },
          sync: 0.25,
        }),
      });
    });

    return () => scope.revert();
  }, []);

  return (
    <div ref={trackRef} aria-hidden className="rim-track">
      <div className="rim-glow motion-reduce:hidden" style={{ top: 'calc(var(--rim-p, 0) * (100% - 140px))' }} />
    </div>
  );
}
