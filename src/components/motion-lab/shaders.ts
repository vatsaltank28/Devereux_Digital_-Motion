/**
 * Custom shaders for the particle sphere (original implementation).
 *
 * The sphere is a Fibonacci lattice of points displaced by smooth 3-D value noise so it breathes like a
 * soft, blobby shell. Points are lit white on the silhouette (view-space rim) and violet toward the core.
 * `uSpread` blows the shell outward as the camera passes through it; points that reach the camera fade.
 */
export const particleVertex = /* glsl */ `
  uniform float uTime;
  uniform float uRadius;
  uniform float uSpread;
  uniform float uOpacity;
  uniform float uPixel;
  uniform float uSizeScale;
  uniform float uShape;   // 0 sphere, 1 ring, 2 helix, 3 horizon, 4 tunnel
  uniform float uWarm;    // 0 violet (AI Studio) -> 1 blue/orange (New Era)
  attribute vec3 aRand;
  varying vec3 vColor;
  varying float vAlpha;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + 0.1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i + vec3(0, 0, 0)), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z);
  }

  const float TAU = 6.2831853;

  vec3 ringShape(float s, vec3 r) {
    float a = s * TAU;
    float R = 2.35 + 0.1 * sin(a * 3.0 + uTime * 0.6) + (r.y - 0.5) * 0.32;
    float tw = r.z * TAU;
    float tube = 0.2 * (0.4 + r.x);
    return vec3(cos(a) * (R + tube * cos(tw)), sin(a) * (R + tube * cos(tw)), tube * sin(tw) * 1.6);
  }
  vec3 helixShape(float s, vec3 r) {
    float y = (s - 0.5) * 3.7;
    float a = y * 1.7 + uTime * 0.35;
    float rad = 0.72;
    vec3 a0 = vec3(cos(a) * rad, y, sin(a) * rad);
    vec3 a1 = vec3(cos(a + 3.14159) * rad, y, sin(a + 3.14159) * rad);
    vec3 p = mix(a0, a1, step(0.5, r.x));
    if (r.z < 0.18) p = mix(a0, a1, r.y); // rungs between the strands
    return p + (r - 0.5) * 0.26;
  }
  vec3 horizonShape(vec3 r) {
    float x = (r.x - 0.5) * 18.0;
    float z = 1.2 - r.y * 11.0;
    float y = -0.75 + 0.2 * sin(x * 0.65 + uTime * 0.5) + 0.12 * sin(z * 1.2 - uTime * 0.4) - 0.005 * x * x;
    return vec3(x, y + (r.z - 0.5) * 0.05, z);
  }
  vec3 tunnelShape(float s, vec3 r, float ang) {
    float z = 6.0 - s * 26.0;
    float rad = 1.35 + 0.22 * sin(z * 0.55 + uTime * 0.8) + (r.y - 0.5) * 0.35;
    return vec3(cos(ang) * rad, sin(ang) * rad, z);
  }
  vec3 shapeAt(float i, vec3 sphere, float s, vec3 r, float ang) {
    if (i < 0.5) return sphere;
    if (i < 1.5) return ringShape(s, r);
    if (i < 2.5) return helixShape(s, r);
    if (i < 3.5) return horizonShape(r);
    return tunnelShape(s, r, ang);
  }

  void main() {
    vec3 n = normalize(position);
    float blob = noise(n * 1.7 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float r = uRadius * (0.88 + 0.22 * blob) * (1.0 + (aRand.x - 0.5) * 0.04);
    r *= 1.0 + 0.035 * sin(uTime * 0.55 + n.y * 5.0);
    vec3 p = n * r;
    p += n * uSpread * (0.35 + aRand.y * 1.7);

    // Morph between neighbouring shapes; each point leaves on its own slight delay so the swarm flows.
    if (uShape > 0.0005) {
      float s = position.y * 0.5 + 0.5;
      float ang = atan(position.z, position.x);
      float i0 = floor(uShape);
      float k = clamp((uShape - i0) * 1.5 - aRand.z * 0.5, 0.0, 1.0);
      k = k * k * (3.0 - 2.0 * k);
      vec3 from = shapeAt(i0, p, s, aRand, ang);
      vec3 to = shapeAt(min(i0 + 1.0, 4.0), p, s, aRand, ang);
      p = mix(from, to, k);
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float d = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp((1.0 + aRand.z * 1.9) * uPixel * (uSizeScale / max(d, 0.35)), 1.0, 8.0 * uPixel);

    // Silhouette rim (white) vs core (violet), plus a soft upper-left key light.
    vec3 vn = normalize(mat3(modelViewMatrix) * n);
    float rim = pow(clamp(1.0 - abs(vn.z), 0.0, 1.0), 2.0);
    float key = clamp(dot(vn, normalize(vec3(-0.45, 0.7, 0.55))) * 0.5 + 0.5, 0.0, 1.0);
    vec3 violet = mix(vec3(0.40, 0.10, 0.78), vec3(0.86, 0.36, 0.96), aRand.x);
    vec3 world = (modelMatrix * vec4(p, 1.0)).xyz;
    vec3 era = mix(vec3(0.22, 0.45, 1.0), vec3(1.0, 0.42, 0.18), smoothstep(-1.8, 1.8, world.x + 0.6 * sin(world.y * 0.8)));
    vec3 base = mix(violet, era, uWarm);
    float glow = mix(rim * 0.9 + key * 0.18 * aRand.y, 0.12 + 0.35 * aRand.y * aRand.y, uWarm);
    vColor = mix(base, vec3(1.0), clamp(glow, 0.0, 1.0));

    // Dense formed shapes (helix strands) would saturate to white under additive blending: thin them out.
    float dense = 1.0 - 0.55 * clamp(1.0 - abs(uShape - 2.0), 0.0, 1.0);
    vAlpha = uOpacity * smoothstep(0.25, 1.5, d) * (0.8 + 0.2 * aRand.y) * dense;
  }
`;

export const particleFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.12, d);
    gl_FragColor = vec4(vColor, vAlpha * a);
  }
`;
