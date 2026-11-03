export const LIQUID_CONFIG = { renderScale: 0.75, dprCap: 1.5, iters: 13 };

/** A `?liquid=on|off` override, so the probe never turns the liquid off. */
export function liquidForced(): boolean {
  return /[?&]liquid=(on|off)\b/.test(window.location.search);
}

export type ProbeStep = 'scale' | 'off';

/**
 * Watches frame times while the canvas is drawing and asks for one step down
 * at a time: lower render scale, then off.
 */
export function createProbe(onStep: (step: ProbeStep) => void) {
  const WINDOW = 45;
  let samples: number[] = [];
  let skipped = 0;
  let scaled = false;

  return {
    sample(dtMs: number) {
      if (skipped < 20) {
        skipped++;
        return;
      }
      if (dtMs <= 0 || dtMs > 200) return;
      samples.push(dtMs);
      if (samples.length < WINDOW) return;
      const sorted = samples.slice().sort((a, b) => a - b);
      const median = sorted[WINDOW >> 1];
      samples = [];
      if (median > 22 && !scaled) {
        scaled = true;
        onStep('scale');
      } else if (median > 33 && scaled) {
        onStep('off');
      }
    },
  };
}
