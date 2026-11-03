import { fallback, liquidLive, markReady, subscribe } from './bus';
import { measureAnchors, type Anchors } from './anchors';
import { createRenderer } from './renderer';
import { createSim } from './sim';
import { createProbe, LIQUID_CONFIG, liquidForced } from './tier';

/**
 * Runs the liquid on one canvas: measures anchors, steps the sim, draws, and
 * sleeps when nothing is on screen. Returns a teardown.
 */
export function startEngine(canvas: HTMLCanvasElement): () => void {
  const renderer = createRenderer(canvas);
  if (!renderer) {
    fallback();
    return () => {};
  }

  const sim = createSim();
  const fine = window.matchMedia('(pointer: fine)');
  const pointer = { x: -1e4, y: -1e4, inside: false, fine: fine.matches };
  let anchors: Anchors | null = measureAnchors();
  let probeScale = 1;
  let raf = 0;
  let last = 0;
  let stopped = false;

  const resize = () => {
    if (!liquidLive()) return;
    const cfg = LIQUID_CONFIG;
    const scale = Math.min(window.devicePixelRatio || 1, cfg.dprCap) * cfg.renderScale * probeScale;
    renderer.resize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight, scale);
  };

  const shutdown = () => {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    fallback();
    // Let the canvas fade out before freeing it.
    window.setTimeout(() => renderer.dispose(), 600);
  };

  const probe = liquidForced()
    ? null
    : createProbe((step) => {
        if (step === 'scale') {
          probeScale = 0.75;
          resize();
        } else shutdown();
      });

  const frame = (now: number) => {
    raf = 0;
    if (stopped) return;
    if (!liquidLive()) {
      shutdown();
      return;
    }
    if (!anchors) anchors = measureAnchors();
    if (!anchors) return;

    const dtMs = last ? now - last : 16;
    last = now;
    const moving = sim.step({
      now,
      dt: Math.min(dtMs, 50) / 1000,
      vw: window.innerWidth,
      vh: window.innerHeight,
      scrollY: window.scrollY,
      anchors,
      pointer,
    });
    renderer.render(sim.frame, LIQUID_CONFIG.iters);
    if (sim.frame.boxes.length) probe?.sample(dtMs);

    if (moving) schedule();
    else last = 0;
  };

  const schedule = () => {
    if (!raf && !stopped) raf = requestAnimationFrame(frame);
  };

  const remeasure = () => {
    anchors = measureAnchors();
    schedule();
  };

  const onResize = () => {
    resize();
    remeasure();
  };
  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.inside = true;
    pointer.fine = e.pointerType === 'mouse' && fine.matches;
    schedule();
  };
  const onOut = (e: PointerEvent) => {
    if (!e.relatedTarget) {
      pointer.inside = false;
      schedule();
    }
  };
  const onDown = (e: PointerEvent) => {
    if (anchors) sim.ripple(e.clientX, e.clientY, anchors, window.scrollY, window.innerWidth, window.innerHeight);
    schedule();
  };

  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  document.addEventListener('pointerout', onOut);
  document.addEventListener('visibilitychange', schedule);
  const ro = new ResizeObserver(remeasure);
  ro.observe(document.body);
  document.fonts?.ready.then(remeasure);
  canvas.addEventListener('webglcontextlost', shutdown);
  const unsubscribe = subscribe(() => {
    // Intro changes wake the loop.
    schedule();
  });

  resize();
  renderer.warm();
  renderer.render(sim.frame, 1);
  markReady();
  schedule();

  return () => {
    stopped = true;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onDown);
    document.removeEventListener('pointerout', onOut);
    document.removeEventListener('visibilitychange', schedule);
    ro.disconnect();
    canvas.removeEventListener('webglcontextlost', shutdown);
    unsubscribe();
    renderer.dispose();
  };
}
