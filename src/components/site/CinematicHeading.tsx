'use client';

import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { animate, createScope, splitText, stagger } from 'animejs';
import { useInView } from 'framer-motion';

type CinematicHeadingProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Accessible, one-shot heading choreography. The unsplit heading remains the
 * server-rendered fallback and reduced-motion presentation.
 */
export default function CinematicHeading({ children, className }: CinematicHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);
  const inView = useInView(headingRef, { once: true, margin: '0px 0px -12% 0px', amount: 0.15 });

  useEffect(() => {
    if (!headingRef.current) return;

    scopeRef.current = createScope({
      root: headingRef,
      mediaQueries: { reduceMotion: '(prefers-reduced-motion: reduce)' },
    }).add((self) => {
      if (!self || self.matches.reduceMotion || !headingRef.current) return;

      const split = splitText(headingRef.current, {
        words: { wrap: 'clip' },
        chars: { class: 'cinematic-char' },
        accessible: true,
      });

      const reveal = animate(split.chars, {
        opacity: [0, 1],
        y: ['78%', '0%'],
        filter: ['blur(7px)', 'blur(0px)'],
        duration: 780,
        delay: stagger(24),
        ease: 'out(4)',
        autoplay: false,
      });

      self.add('revealHeading', () => reveal.play());

      return () => {
        split.revert();
      };
    });

    return () => {
      scopeRef.current?.revert();
      scopeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!inView) return;
    scopeRef.current?.methods.revealHeading?.();
  }, [inView]);

  return (
    <h2 ref={headingRef} className={className}>
      {children}
    </h2>
  );
}
