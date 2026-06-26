'use client';

import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useReducedMotion } from 'framer-motion';

export default function CursorLight() {
  const reduce = useReducedMotion();
  const beamRef = useRef<HTMLDivElement>(null);
  const glintRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );

  useEffect(() => {
    if (reduce) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const onMediaChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    finePointer.addEventListener('change', onMediaChange);

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return;

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }

      frameRef.current = requestAnimationFrame(() => {
        const x = `${event.clientX}px`;
        const y = `${event.clientY}px`;

        if (beamRef.current) {
          beamRef.current.style.setProperty('--cursor-x', x);
          beamRef.current.style.setProperty('--cursor-y', y);
        }

        if (glintRef.current) {
          glintRef.current.style.transform = `translate3d(${event.clientX - 80}px, ${event.clientY - 80}px, 0)`;
        }
      });
    };

    const onPointerLeave = () => {
      beamRef.current?.style.setProperty('--cursor-alpha', '0');
      glintRef.current?.style.setProperty('opacity', '0');
    };

    const onPointerEnter = () => {
      beamRef.current?.style.setProperty('--cursor-alpha', '1');
      glintRef.current?.style.setProperty('opacity', '1');
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', onPointerLeave);
    window.addEventListener('pointerenter', onPointerEnter);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      finePointer.removeEventListener('change', onMediaChange);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      window.removeEventListener('pointerenter', onPointerEnter);
    };
  }, [reduce]);

  if (reduce || !enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <div
        ref={beamRef}
        className="cursor-searchlight absolute inset-0"
        style={{ '--cursor-x': '50vw', '--cursor-y': '45vh', '--cursor-alpha': '1' } as CSSProperties}
      />
      <div ref={glintRef} className="cursor-glint absolute left-0 top-0 h-40 w-40 opacity-0" />
    </div>
  );
}
