import { clamp01, liquidState, POUR, pourProgress, smoothstep } from './bus';
import { heroTop, type Anchors } from './anchors';
import { createFrame, MAX_CAPSULES, MAX_RIPPLES, MAX_SPHERES, type Box } from './renderer';

export type Inputs = {
  now: number; // ms
  dt: number; // s
  vw: number;
  vh: number;
  scrollY: number;
  anchors: Anchors;
  pointer: { x: number; y: number; inside: boolean; fine: boolean };
};

type Spring = { x: number; v: number };
const spring = (x = 0): Spring => ({ x, v: 0 });
function stepSpring(s: Spring, target: number, k: number, c: number, dt: number) {
  s.v += (k * (target - s.x) - c * s.v) * dt;
  s.x += s.v * dt;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const hash = (i: number) => {
  const s = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

// Rest shape, in units of the mass scale S: x, y, radius.
const LOBES = [
  [0, 0, 0.5],
  [0.6, -0.3, 0.34],
  [-0.55, 0.26, 0.33],
  [0.24, 0.6, 0.29],
  [-0.28, -0.52, 0.27],
  [0.78, 0.34, 0.2],
] as const;

// Macro pull-back intro, in ms from its start.
const T_LIGHT = 150; // black until here
const T_WHIP = 750; // hold ends, pull-back starts
const T_LAND = 1450; // pull-back lands (with a slight overshoot)
const T_REST = 1950; // camera and churn fully settled
const ZOOM_NEAR = 7.5;
const ZOOM_HOLD = 6.6;
const ZOOM_OVER = 0.94;

type Lobe = { x: Spring; y: Spring; r: Spring };
type DropletState = 'idle' | 'stretch' | 'snap' | 'follow' | 'return';

// Shape groups, each drawn inside its own scissor box.
const G_HERO = 0;
const G_STREAM = 1;

export function createSim() {
  const frame = createFrame();
  const lobes: Lobe[] = LOBES.map(() => ({ x: spring(), y: spring(), r: spring() }));
  let phase: 'pending' | 'macro' | 'rest' = 'pending';
  let flash = 0;
  let nextChurnRipple = 0;

  // Intro camera: scales the scene by `zoom` about `look` (viewport px) and
  // places that point at `screen`. Identity at rest.
  const cam = { zoom: 1, lookX: 0, lookY: 0, screenX: 0, screenY: 0 };
  const cx = (x: number) => cam.screenX + (x - cam.lookX) * cam.zoom;
  const cy = (y: number) => cam.screenY + (y - cam.lookY) * cam.zoom;
  const ripples: { x: number; y: number; age: number }[] = []; // hero-local

  // Cursor droplet, hero-local.
  let dState: DropletState = 'idle';
  const dx = spring();
  const dy = spring();
  let snapT = 0;
  let sat: { x: number; y: number; t: number } | null = null;
  let anchorDir = { x: -1, y: 0 };

  const light = { x: 0, y: 0 };

  // Per-frame builders.
  const groupBox: (Box | null)[] = [null, null];
  let zMax = 1;

  function grow(g: number, x0: number, y0: number, x1: number, y1: number) {
    const b = groupBox[g];
    if (!b) groupBox[g] = { x0, y0, x1, y1 };
    else {
      b.x0 = Math.min(b.x0, x0);
      b.y0 = Math.min(b.y0, y0);
      b.x1 = Math.max(b.x1, x1);
      b.y1 = Math.max(b.y1, y1);
    }
  }

  function sphere(x: number, y: number, r: number, k: number, g: number) {
    x = cx(x);
    y = cy(y);
    r *= cam.zoom;
    k *= cam.zoom;
    if (r < 0.4 || frame.ns >= MAX_SPHERES) return;
    frame.spheres.set([x, y, r, k], frame.ns * 4);
    frame.ns++;
    const m = r + k * 0.25 + 3;
    grow(g, x - m, y - m, x + m, y + m);
    zMax = Math.max(zMax, r + k * 0.25 + 2);
  }

  function capsule(ax: number, ay: number, ra: number, bx: number, by: number, rb: number, k: number, g: number) {
    ax = cx(ax);
    ay = cy(ay);
    bx = cx(bx);
    by = cy(by);
    ra *= cam.zoom;
    rb *= cam.zoom;
    k *= cam.zoom;
    if ((ra < 0.3 && rb < 0.3) || frame.nc >= MAX_CAPSULES) return;
    frame.capA.set([ax, ay, ra, k], frame.nc * 4);
    frame.capB.set([bx, by, rb, 0], frame.nc * 4);
    frame.nc++;
    const m = Math.max(ra, rb) + k * 0.25 + 3;
    grow(g, Math.min(ax, bx) - m, Math.min(ay, by) - m, Math.max(ax, bx) + m, Math.max(ay, by) + m);
    zMax = Math.max(zMax, Math.max(ra, rb) + k * 0.25 + 2);
  }

  function restLobes() {
    for (const l of lobes) {
      l.x.v = l.y.v = l.r.v = 0;
    }
  }

  function massScale(vw: number, vh: number) {
    return vw < 640 ? 0.27 * vw : 0.23 * Math.min(vw, vh);
  }

  /** Cubic from the mass down to the rim anchor, in viewport px. */
  function streamCurve(x0: number, y0: number, x3: number, y3: number) {
    const dy = y3 - y0;
    const x1 = x0;
    const y1 = y0 + 0.5 * dy;
    const x2 = x3;
    const y2 = y3 - 0.45 * dy;
    return (s: number) => {
      const t = 1 - s;
      return {
        x: t * t * t * x0 + 3 * t * t * s * x1 + 3 * t * s * s * x2 + s * s * s * x3,
        y: t * t * t * y0 + 3 * t * t * s * y1 + 3 * t * s * s * y2 + s * s * s * y3,
      };
    };
  }

  return {
    frame,

    /** Click / tap: ripple from the nearest point on the mass. */
    ripple(vx: number, vy: number, a: Anchors, scrollY: number, vw: number, vh: number) {
      if (phase !== 'rest') return;
      const top = heroTop(a, scrollY);
      const ly = vy - top;
      if (ly < 0 || ly > a.heroH) return;
      if (pourProgress(scrollY, a.pinTop, a.pinH, vh) > 0.3) return;
      const S = massScale(vw, vh);
      const ddx = vx - a.focal.x;
      const ddy = ly - a.focal.y;
      const len = Math.hypot(ddx, ddy) || 1;
      const reach = Math.min(len, S * 0.8);
      ripples.push({ x: a.focal.x + (ddx / len) * reach, y: a.focal.y + (ddy / len) * reach, age: 0 });
      if (ripples.length > MAX_RIPPLES) ripples.shift();
    },

    /** Builds this frame. Returns whether anything is still moving. */
    step(inp: Inputs): boolean {
      const { dt, vw, vh, scrollY, anchors: a, pointer } = inp;
      frame.ns = frame.nc = frame.nr = 0;
      groupBox[0] = groupBox[1] = null;
      zMax = 1;

      const S = massScale(vw, vh);
      const t = inp.now / 1000;
      const top = heroTop(a, scrollY);
      const p = pourProgress(scrollY, a.pinTop, a.pinH, vh);
      const fx = a.focal.x;
      const fy = a.focal.y;
      let moving = false;

      // ---------------------------------------------------------- intro
      const want = liquidState.intro;
      const te = inp.now - liquidState.introStart;
      const placeAtRest = () => {
        LOBES.forEach(([ox, oy, r], i) => {
          lobes[i].x.x = fx + ox * S;
          lobes[i].y.x = fy + oy * S;
          lobes[i].r.x = r * S;
        });
        restLobes();
      };
      if (want === 'rest' && phase !== 'rest') {
        phase = 'rest';
        flash = 0;
        placeAtRest();
      } else if (want === 'play' && phase === 'pending') {
        phase = 'macro';
        nextChurnRipple = T_LIGHT;
        placeAtRest();
      }
      if (phase === 'macro' && te > T_REST) phase = 'rest';
      if (phase !== 'rest') moving = true;

      // Camera, exposure, and churn for the macro pull-back.
      const fv = fy + top; // focal point in viewport px
      let churn = 0;
      cam.zoom = 1;
      cam.lookX = cam.screenX = fx;
      cam.lookY = cam.screenY = fv;
      frame.exposure = 1;
      if (phase === 'pending') {
        frame.exposure = 0;
      } else if (phase === 'macro') {
        // Close on the main lobe, centred on screen, so the surface fills it.
        const nearX = fx - 0.06 * S;
        const nearY = fv - 0.08 * S;
        if (te < T_WHIP) {
          const h = clamp01(te / T_WHIP);
          cam.zoom = lerp(ZOOM_HOLD, ZOOM_NEAR, h);
          cam.lookX = nearX;
          cam.lookY = nearY;
          cam.screenX = vw / 2;
          cam.screenY = vh / 2;
          const lit = clamp01((te - T_LIGHT) / (T_WHIP - T_LIGHT));
          frame.exposure = 0.04 + 0.3 * lit * lit;
          churn = 1;
        } else {
          const u = clamp01((te - T_WHIP) / (T_LAND - T_WHIP));
          const e = 1 - Math.pow(1 - u, 4);
          if (te < T_LAND) {
            cam.zoom = Math.exp(lerp(Math.log(ZOOM_NEAR), Math.log(ZOOM_OVER), e));
          } else {
            const sl = (te - T_LAND) / 1000;
            cam.zoom = 1 - (1 - ZOOM_OVER) * Math.exp(-sl * 9) * Math.cos(sl * 14);
          }
          cam.lookX = lerp(nearX, fx, e);
          cam.lookY = lerp(nearY, fv, e);
          cam.screenX = lerp(vw / 2, fx, e);
          cam.screenY = lerp(vh / 2, fv, e);
          frame.exposure = lerp(0.34, 1, smoothstep(0, 0.9, u));
          churn = 1 - smoothstep(0.1, 1, u);
          if (te >= T_LAND && flash === 0 && te < T_LAND + 100) flash = 1;
        }
        // A ripple rolls through the churning surface every so often.
        if (churn > 0.3 && te >= nextChurnRipple) {
          nextChurnRipple = te + 200 + 120 * hash(te);
          const ang = hash(te * 1.3) * Math.PI * 2;
          const rad = S * (0.15 + 0.35 * hash(te * 0.7));
          ripples.push({ x: fx - 0.06 * S + Math.cos(ang) * rad, y: fy - 0.08 * S + Math.sin(ang) * rad, age: 0 });
          if (ripples.length > MAX_RIPPLES) ripples.shift();
        }
      }

      flash = Math.max(0, flash - dt * 2.6);

      // ---------------------------------------------------------- lobes
      const drain = smoothstep(0.05, 0.85, p);
      const drainY = S * 0.9 * drain;
      if (phase !== 'pending') {
        LOBES.forEach(([ox, oy, r], i) => {
          const l = lobes[i];
          const w = 0.7 + 0.13 * i;
          // Churn: big, fast, overlapping swells that fade as the camera lands.
          const cw = 3.1 + 0.7 * i;
          const jx = churn * 0.15 * (Math.sin(t * cw + i * 2.1) + 0.6 * Math.sin(t * cw * 1.7 + i));
          const jy = churn * 0.15 * (Math.cos(t * cw * 0.9 + i * 1.3) + 0.6 * Math.cos(t * cw * 1.9 + i * 0.4));
          const jr = churn * 0.14 * Math.sin(t * cw * 1.3 + i * 0.9);
          const tx = fx + S * (ox + jx + 0.09 * Math.sin(t * w + i * 1.7) + 0.04 * Math.sin(t * w * 2.3 + i));
          const ty = fy + S * (oy + jy + 0.09 * Math.cos(t * (w * 0.83) + i * 2.3) + 0.04 * Math.cos(t * w * 1.9 + i * 0.7));
          const tr = S * r * (1 + jr + 0.07 * Math.sin(t * (w * 1.21) + i));
          const k = churn > 0 ? 140 : 90;
          stepSpring(l.x, tx, k, 9, dt);
          stepSpring(l.y, ty, k, 9, dt);
          stepSpring(l.r, tr, k, 9, dt);
          sphere(l.x.x, l.y.x + top + drainY, l.r.x * (1 - drain), 0.3 * S, G_HERO);
        });
      }

      // ---------------------------------------------------------- droplet
      const introDone = phase === 'rest' || (phase === 'macro' && te > T_LAND + 250);
      const px = pointer.x;
      const py = pointer.y - top;
      const R = S * 0.9;
      const toP = Math.hypot(px - fx, py - fy);
      const gap = toP - R;
      const inHero = pointer.inside && py >= 0 && py <= a.heroH;
      const enabled = pointer.fine && introDone && p < 0.15 && inHero;

      if (dState === 'idle' && enabled && gap < 0.7 * R) {
        dState = 'stretch';
        anchorDir = { x: (px - fx) / (toP || 1), y: (py - fy) / (toP || 1) };
        dx.x = fx + anchorDir.x * R * 0.75;
        dy.x = fy + anchorDir.y * R * 0.75;
        dx.v = dy.v = 0;
      }
      if (dState !== 'idle') {
        moving = true;
        if (!enabled && dState !== 'return') dState = 'return';
        if (dState === 'follow' && gap > 2.6 * R) dState = 'return';

        if (toP > 1) {
          const nx = (px - fx) / toP;
          const ny = (py - fy) / toP;
          anchorDir.x = lerp(anchorDir.x, nx, Math.min(1, dt * 8));
          anchorDir.y = lerp(anchorDir.y, ny, Math.min(1, dt * 8));
        }
        const al = Math.hypot(anchorDir.x, anchorDir.y) || 1;
        const ax = fx + (anchorDir.x / al) * R * 0.75;
        const ay = fy + (anchorDir.y / al) * R * 0.75;

        if (dState === 'return') {
          stepSpring(dx, fx, 30, 8, dt);
          stepSpring(dy, fy, 30, 8, dt);
        } else if (dState === 'stretch') {
          stepSpring(dx, px, 60, 12, dt);
          stepSpring(dy, py, 60, 12, dt);
        } else {
          stepSpring(dx, px, 40, 9, dt);
          stepSpring(dy, py, 40, 9, dt);
        }

        const dr = 0.15 * S;
        const len = Math.hypot(dx.x - ax, dy.x - ay);
        const snapLen = R * 1.0;

        if (dState === 'stretch' && len > snapLen) {
          dState = 'snap';
          snapT = 0;
          sat = { x: (ax + dx.x) / 2, y: (ay + dy.x) / 2, t: 0 };
        }
        if (dState === 'snap') {
          snapT += dt / 0.12;
          if (snapT >= 1) dState = 'follow';
        }

        if (dState === 'stretch' || dState === 'snap') {
          const pinch = dState === 'snap' ? 1 - clamp01(snapT) : 1;
          const mx = (ax + dx.x) / 2;
          const my = (ay + dy.x) / 2;
          const thin = Math.max(2.2, 0.1 * S * (1 - (len / snapLen) * 0.85));
          capsule(ax, ay + top, 0.16 * S * pinch, mx, my + top, thin * pinch, 0.2 * S, G_HERO);
          capsule(mx, my + top, thin * pinch, dx.x, dy.x + top, dr * 0.6 * pinch, 2, G_HERO);
        }
        sphere(dx.x, dy.x + top, dr, 0.12 * S, G_HERO);

        if ((dState === 'return' || dState === 'follow') && Math.hypot(dx.x - fx, dy.x - fy) < R * 0.55) {
          dState = 'idle';
        }
      }
      if (sat) {
        sat.t += dt / 0.4;
        const u = clamp01(sat.t);
        sphere(lerp(sat.x, fx, u * u), lerp(sat.y, fy, u * u) + top, 0.045 * S * (1 - u), 0.05 * S, G_HERO);
        if (u >= 1) sat = null;
        moving = true;
      }

      // ---------------------------------------------------------- ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].age += dt;
        if (ripples[i].age > 2.6) ripples.splice(i, 1);
      }
      ripples.forEach((r, i) => {
        frame.ripples.set([cx(r.x), cy(r.y + top), r.age, 0.035 * S * cam.zoom * (1 - drain)], i * 4);
      });
      frame.nr = ripples.length;
      frame.rippleLen = 1.1 * S * cam.zoom;
      frame.rippleScale = cam.zoom;
      if (ripples.length) moving = true;

      // ---------------------------------------------------------- pour
      const rim = a.rim;
      const g = smoothstep(0.08, 1, p);
      let curve: ReturnType<typeof streamCurve> | null = null;
      if (rim && p > 0.08) {
        const sx = fx;
        const sy = fy + S * (0.5 + 0.55 * drain) + top;
        const tx = rim.x;
        const ty = rim.top - scrollY;
        curve = streamCurve(sx, sy, tx, ty);
        const rs = lerp(0.075 * S, 5, drain);
        const rt = 3;
        // Once the mass has drained, the tail keeps flowing down the curve
        // into the rim line over the next half screen of scrolling.
        const over = (scrollY - a.pinTop) / Math.max(1, a.pinH - vh);
        const tail = smoothstep(0.85, 1.6, over);
        const N = 10;
        if (tail < 0.999) {
          let prev = curve(tail);
          for (let j = 1; j <= N; j++) {
            const s0 = lerp(tail, g, (j - 1) / N);
            const s1 = lerp(tail, g, j / N);
            const pt = curve(s1);
            const attached = j === 1 && tail === 0;
            capsule(prev.x, prev.y, lerp(rs, rt, s0), pt.x, pt.y, lerp(rs, rt, s1), attached ? 0.3 * S : 0, attached ? G_HERO : G_STREAM);
            prev = pt;
          }
          // Overlaps the DOM rim line, fading out across the join.
          if (g >= 1) capsule(tx, ty, rt, tx, ty + 40, rt, 0, G_STREAM);
        }
      }
      frame.fade = rim ? [rim.top - scrollY, rim.top - scrollY + 40] : [0, 0];

      // Letters: each hands off from the DOM and swoops into the stream.
      if (curve && p < 0.75) {
        const fall = POUR.fallDist(vh);
        for (const L of liquidState.letters) {
          const p0 = POUR.letterStart(L.order) + POUR.handoff;
          const v = (p - p0) / POUR.flight;
          if (v < 0 || v > 1) continue;
          const sx = L.x;
          const sy = L.y + fall * 0.75 * 0.75 + top;
          const cap = 0.9 * smoothstep(0.08, 1, p0 + POUR.flight);
          let best = 0;
          let bestD = Infinity;
          for (let j = 0; j <= 24; j++) {
            const s = (cap * j) / 24;
            const c = curve(s);
            const d = Math.hypot(c.x - sx, c.y - sy);
            if (d < bestD) {
              bestD = d;
              best = s;
            }
          }
          const tg = curve(best);
          const ctrlX = lerp(sx, tg.x, 0.25);
          const ctrlY = Math.max(sy, tg.y) + 40;
          const e = v * v;
          const it = 1 - e;
          const x = it * it * sx + 2 * it * e * ctrlX + e * e * tg.x;
          const y = it * it * sy + 2 * it * e * ctrlY + e * e * tg.y;
          const r = 0.13 * L.size * smoothstep(0, 0.22, v) * lerp(1, 0.55, smoothstep(0.7, 1, v));
          sphere(x, y, r, 0.1 * S, G_STREAM);
        }
      }

      // ---------------------------------------------------------- light
      const lx = pointer.fine && pointer.inside ? (pointer.x / vw) * 2 - 1 : 0.35 * Math.sin(t * 0.21);
      const ly = pointer.fine && pointer.inside ? -((pointer.y / vh) * 2 - 1) : 0.25 * Math.cos(t * 0.17);
      if (phase === 'macro' && te < T_LAND) {
        // The key light sweeps across the close-up so highlights slide over it.
        const sweep = clamp01(te / T_LAND);
        light.x = lerp(-0.9, 0.35, sweep);
        light.y = lerp(0.35, 0.1, sweep);
      } else {
        light.x = lerp(light.x, lx, Math.min(1, dt * 3));
        light.y = lerp(light.y, ly, Math.min(1, dt * 3));
      }
      frame.light = [light.x, light.y];
      frame.flash = flash;

      // ---------------------------------------------------------- boxes
      frame.zMax = zMax;
      const boxes: Box[] = [];
      const ripMargin = frame.nr ? 0.035 * S * cam.zoom + 4 : 0;
      groupBox.forEach((b, i) => {
        if (!b) return;
        const m = i === G_HERO ? ripMargin : 0;
        const c = { x0: Math.max(0, b.x0 - m), y0: Math.max(0, b.y0 - m), x1: Math.min(vw, b.x1 + m), y1: Math.min(vh, b.y1 + m) };
        if (c.x1 <= c.x0 || c.y1 <= c.y0) return;
        const hit = boxes.find((o) => !(c.x1 < o.x0 || c.x0 > o.x1 || c.y1 < o.y0 || c.y0 > o.y1));
        if (hit) {
          hit.x0 = Math.min(hit.x0, c.x0);
          hit.y0 = Math.min(hit.y0, c.y0);
          hit.x1 = Math.max(hit.x1, c.x1);
          hit.y1 = Math.max(hit.y1, c.y1);
        } else boxes.push(c);
      });
      frame.boxes = boxes;

      return moving || boxes.length > 0;
    },
  };
}
