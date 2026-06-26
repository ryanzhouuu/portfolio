'use client';

/**
 * The studio. A fixed, text-safe base layer: pitch-black ground, one soft
 * directional glow drifting slowly overhead, and a faint film grain so the
 * darkness reads as a lit room rather than a flat #000 fill. Chrome imagery
 * lives per-section, not here, so body copy is never set over bright metal.
 * Dust lives in its own front overlay (DustMotes) so it isn't buried behind
 * the per-section gradients.
 */
export default function Atmosphere() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-void">
      {/* One controlled directional light, drifting */}
      <div className="absolute -top-[20%] left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 animate-drift rounded-[50%] bg-[radial-gradient(closest-side,rgba(234,242,255,0.10),rgba(234,242,255,0.03)_45%,transparent_75%)] blur-2xl" />

      {/* Floor reflection — a cooler counter-light low and to the right */}
      <div className="absolute bottom-[-10%] right-[-10%] h-[55vh] w-[60vw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(116,125,140,0.10),transparent_70%)] blur-3xl" />

      {/* Projector curtains crossing the whole room */}
      <div className="projection-streak absolute left-[-18vw] top-[8vh] h-[32vh] w-[150vw] -rotate-6 opacity-70" />
      <div className="projection-streak absolute bottom-[12vh] right-[-30vw] h-[24vh] w-[130vw] rotate-6 opacity-40" />

      {/* Barely visible optical scan texture, like light caught in haze */}
      <div className="atmospheric-scanlines absolute inset-0 opacity-[0.06] mix-blend-screen" />

      {/* Vignette to seat everything in shadow */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_55%,rgba(3,3,3,0.85)_100%)]" />

      {/* Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '160px 160px',
        }}
      />
    </div>
  );
}
