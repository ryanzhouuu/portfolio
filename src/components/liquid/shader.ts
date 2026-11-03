export const MAX_SPHERES = 16;
export const MAX_CAPSULES = 24;
export const MAX_RIPPLES = 3;

export const vertexSource = /* glsl */ `#version 300 es
void main() {
  // One triangle that covers the screen.
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}
`;

/**
 * Liquid metal as a smooth union of spheres and tapered capsules, all centred
 * on z = 0 and viewed orthographically in CSS pixels. Because every shape is
 * symmetric about z = 0, the field along a ray is smallest at z = 0: one
 * sample there decides hit or miss, and bisection finds the surface depth.
 */
export const fragmentSource = /* glsl */ `#version 300 es
precision highp float;

#define MAX_S ${MAX_SPHERES}
#define MAX_C ${MAX_CAPSULES}
#define MAX_R ${MAX_RIPPLES}

uniform vec2 uRes;          // canvas px
uniform float uScale;       // canvas px per CSS px
uniform vec4 uS[MAX_S];     // x, y, r, k
uniform int uNS;
uniform vec4 uCA[MAX_C];    // ax, ay, ra, k
uniform vec4 uCB[MAX_C];    // bx, by, rb, -
uniform int uNC;
uniform vec4 uRip[MAX_R];   // x, y, age (s), amplitude (px)
uniform int uNR;
uniform float uRipLen;      // ripple falloff (px)
uniform float uRipScale;    // camera zoom, so waves keep their world size
uniform vec2 uLight;        // key light offset, -1..1, y up
uniform float uFlash;
uniform float uExposure;   // 0 = black, 1 = fully lit (the intro fades up)
uniform float uZMax;
uniform int uIters;
uniform vec2 uFade;         // fade out between these y (px) when y > x

out vec4 outColor;

float smin(float a, float b, float k) {
  if (k <= 0.0) return min(a, b);
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * 0.25;
}

float map(vec3 p) {
  float d = 1e5;
  for (int i = 0; i < MAX_S; i++) {
    if (i >= uNS) break;
    vec4 s = uS[i];
    d = smin(d, length(p - vec3(s.xy, 0.0)) - s.z, s.w);
  }
  for (int i = 0; i < MAX_C; i++) {
    if (i >= uNC) break;
    vec4 a = uCA[i];
    vec4 b = uCB[i];
    vec3 pa = p - vec3(a.xy, 0.0);
    vec3 ba = vec3(b.xy - a.xy, 0.0);
    float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-4), 0.0, 1.0);
    d = smin(d, length(pa - ba * h) - mix(a.z, b.z, h), a.w);
  }
  for (int i = 0; i < MAX_R; i++) {
    if (i >= uNR) break;
    vec4 r = uRip[i];
    float dist = length(p.xy - r.xy);
    float wd = dist / uRipScale;
    float front = smoothstep(-60.0, 0.0, r.z * 520.0 - wd);
    float env = exp(-r.z * 2.4) * exp(-dist / uRipLen) * front;
    d += r.w * env * sin(wd * 0.085 - r.z * 13.0);
  }
  return d;
}

vec3 normalAt(vec3 p, float e) {
  const vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * map(p + k.xyy * e) +
    k.yyx * map(p + k.yyx * e) +
    k.yxy * map(p + k.yxy * e) +
    k.xxx * map(p + k.xxx * e)
  );
}

// Soft-edged rectangle in direction space.
float box(vec2 v, vec2 c, vec2 h, float soft) {
  vec2 q = abs(v - c) - h;
  return 1.0 - smoothstep(0.0, soft, max(q.x, q.y));
}

// A grey studio lit by a few softboxes. y is up, z faces the viewer.
float studio(vec3 r) {
  r.xy += uLight * vec2(0.22, 0.16);
  r = normalize(r);
  float up = r.y;
  float c = mix(0.16, 0.4, smoothstep(-0.4, 1.0, up));
  // Lit backdrop behind the liquid: catches along every silhouette.
  c += (1.0 - smoothstep(-0.97, -0.5, r.z)) * (0.28 + 0.6 * smoothstep(-0.3, 0.9, up));
  // Big overhead softbox with a darker mullion through it.
  float top = box(r.xz, vec2(-0.12, -0.05), vec2(0.46, 0.38), 0.08) * smoothstep(0.3, 0.6, up);
  top *= 1.0 - 0.6 * box(r.xz, vec2(0.02, -0.05), vec2(0.016, 0.45), 0.02);
  c += top * 3.6;
  // Tall strip on the left, thinner one on the right for a rim.
  c += box(r.yz, vec2(0.08, -0.1), vec2(0.55, 0.22), 0.06) * (1.0 - smoothstep(-0.8, -0.5, r.x)) * 2.0;
  c += box(r.yz, vec2(0.18, -0.05), vec2(0.45, 0.09), 0.05) * smoothstep(0.58, 0.84, r.x) * 1.0;
  // Soft fill behind the camera so faces toward us carry a gradient.
  c += box(r.xy, vec2(0.3, 0.34), vec2(0.3, 0.2), 0.22) * step(0.0, r.z) * 1.1;
  c += smoothstep(0.1, 1.0, r.z) * mix(0.12, 0.4, smoothstep(-0.3, 0.8, up));
  // Bounce card on the floor so the underside catches light.
  c += box(r.xz, vec2(0.1, 0.05), vec2(0.5, 0.35), 0.2) * (1.0 - smoothstep(-0.7, -0.35, up)) * 0.9;
  // Horizon line, and a floor a little darker than the walls.
  c += exp(-pow((up + 0.06) / 0.025, 2.0)) * 0.6;
  c *= mix(0.72, 1.0, smoothstep(-0.4, -0.05, up));
  // Dark band just under the horizon: the contrast that makes chrome read.
  c *= 1.0 - 0.75 * exp(-pow((up + 0.2) / 0.11, 2.0));
  return c;
}

void main() {
  vec2 xy = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uScale;
  float px = 1.0 / uScale;

  float d0 = map(vec3(xy, 0.0));
  float aa = 1.4 * px;
  if (d0 > aa) {
    outColor = vec4(0.0);
    return;
  }
  float alpha = clamp(0.5 - d0 / aa, 0.0, 1.0);
  if (uFade.y > uFade.x) alpha *= 1.0 - smoothstep(uFade.x, uFade.y, xy.y);

  // Surface depth: inside at z = 0, outside at uZMax.
  float z = 0.0;
  if (d0 < 0.0) {
    float lo = 0.0;
    float hi = uZMax;
    for (int i = 0; i < 16; i++) {
      if (i >= uIters) break;
      float mid = 0.5 * (lo + hi);
      if (map(vec3(xy, mid)) < 0.0) lo = mid; else hi = mid;
    }
    z = 0.5 * (lo + hi);
  }

  // Sample the normal slightly inside the silhouette so thin threads don't
  // shimmer along their rims.
  vec3 n = normalAt(vec3(xy, z), max(px, 0.6));
  n = normalize(mix(n, vec3(n.xy * 0.82, n.z), smoothstep(-2.0 * px, 0.0, d0)));
  n.y = -n.y; // to y-up
  vec3 r = reflect(vec3(0.0, 0.0, -1.0), n);

  float fres = 0.8 + 0.2 * pow(1.0 - max(n.z, 0.0), 4.0);
  float c = studio(r) * fres;
  c *= 1.0 + uFlash * 1.6 * pow(max(n.z, 0.0), 3.0);
  c = 1.0 - exp(-c * 1.75 * uExposure);
  c = pow(c, 1.2);

  vec3 col = c * vec3(0.95, 0.975, 1.0);
  outColor = vec4(col * alpha, alpha);
}
`;
