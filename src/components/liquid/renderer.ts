import { fragmentSource, MAX_CAPSULES, MAX_RIPPLES, MAX_SPHERES, vertexSource } from './shader';

/** Screen-space box in CSS px. */
export type Box = { x0: number; y0: number; x1: number; y1: number };

/** Everything the shader needs for one frame, in CSS px. */
export type Frame = {
  spheres: Float32Array; // MAX_SPHERES * 4
  ns: number;
  capA: Float32Array; // MAX_CAPSULES * 4
  capB: Float32Array;
  nc: number;
  ripples: Float32Array; // MAX_RIPPLES * 4
  nr: number;
  rippleLen: number;
  rippleScale: number;
  light: [number, number];
  flash: number;
  exposure: number;
  zMax: number;
  fade: [number, number];
  boxes: Box[];
};

export function createFrame(): Frame {
  return {
    spheres: new Float32Array(MAX_SPHERES * 4),
    ns: 0,
    capA: new Float32Array(MAX_CAPSULES * 4),
    capB: new Float32Array(MAX_CAPSULES * 4),
    nc: 0,
    ripples: new Float32Array(MAX_RIPPLES * 4),
    nr: 0,
    rippleLen: 120,
    rippleScale: 1,
    light: [0, 0],
    flash: 0,
    exposure: 1,
    zMax: 1,
    fade: [0, 0],
    boxes: [],
  };
}

export type Renderer = {
  resize(cssW: number, cssH: number, scale: number): void;
  render(frame: Frame, iters: number): void;
  /** Draws a single throwaway pixel so the driver finishes compiling now. */
  warm(): void;
  dispose(): void;
};

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('[liquid] shader compile failed', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function createRenderer(canvas: HTMLCanvasElement): Renderer | null {
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[liquid] program link failed', gl.getProgramInfoLog(program));
    return null;
  }

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  gl.useProgram(program);
  gl.disable(gl.BLEND);
  gl.disable(gl.DEPTH_TEST);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const loc = {
    res: u('uRes'),
    scale: u('uScale'),
    s: u('uS'),
    ns: u('uNS'),
    ca: u('uCA'),
    cb: u('uCB'),
    nc: u('uNC'),
    rip: u('uRip'),
    nr: u('uNR'),
    ripLen: u('uRipLen'),
    ripScale: u('uRipScale'),
    light: u('uLight'),
    flash: u('uFlash'),
    exposure: u('uExposure'),
    zMax: u('uZMax'),
    iters: u('uIters'),
    fade: u('uFade'),
  };

  let scale = 1;

  const clear = () => {
    gl.disable(gl.SCISSOR_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  };

  const uploadAndDraw = (frame: Frame, iters: number) => {
    gl.uniform2f(loc.res, canvas.width, canvas.height);
    gl.uniform1f(loc.scale, scale);
    gl.uniform4fv(loc.s, frame.spheres);
    gl.uniform1i(loc.ns, frame.ns);
    gl.uniform4fv(loc.ca, frame.capA);
    gl.uniform4fv(loc.cb, frame.capB);
    gl.uniform1i(loc.nc, frame.nc);
    gl.uniform4fv(loc.rip, frame.ripples);
    gl.uniform1i(loc.nr, frame.nr);
    gl.uniform1f(loc.ripLen, frame.rippleLen);
    gl.uniform1f(loc.ripScale, frame.rippleScale);
    gl.uniform2f(loc.light, frame.light[0], frame.light[1]);
    gl.uniform1f(loc.flash, frame.flash);
    gl.uniform1f(loc.exposure, frame.exposure);
    gl.uniform1f(loc.zMax, frame.zMax);
    gl.uniform1i(loc.iters, iters);
    gl.uniform2f(loc.fade, frame.fade[0], frame.fade[1]);

    gl.enable(gl.SCISSOR_TEST);
    for (const b of frame.boxes) {
      const x = Math.floor(b.x0 * scale);
      const w = Math.ceil(b.x1 * scale) - x;
      const yTop = Math.floor(b.y0 * scale);
      const h = Math.ceil(b.y1 * scale) - yTop;
      if (w <= 0 || h <= 0) continue;
      gl.scissor(x, canvas.height - yTop - h, w, h);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
  };

  return {
    resize(cssW, cssH, s) {
      scale = s;
      const w = Math.max(1, Math.round(cssW * s));
      const h = Math.max(1, Math.round(cssH * s));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    },
    render(frame, iters) {
      clear();
      if (frame.boxes.length) uploadAndDraw(frame, iters);
    },
    warm() {
      const f = createFrame();
      f.spheres.set([0.5, 0.5, 4, 0]);
      f.ns = 1;
      f.zMax = 6;
      f.boxes = [{ x0: 0, y0: 0, x1: 1 / scale, y1: 1 / scale }];
      clear();
      uploadAndDraw(f, 4);
      gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
      clear();
    },
    dispose() {
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteVertexArray(vao);
    },
  };
}

export { MAX_CAPSULES, MAX_RIPPLES, MAX_SPHERES };
