'use client';

import { useEffect, useRef } from 'react';
import { liquidLive } from './bus';
import { startEngine } from './engine';

/**
 * The liquid chrome layer: one fixed canvas between the studio atmosphere and
 * the page. It only starts when the pre-paint gate turned the liquid on;
 * otherwise it stays an empty, invisible element.
 */
export default function LiquidStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !liquidLive()) return;
    return startEngine(canvas);
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="liquid-canvas" />;
}
