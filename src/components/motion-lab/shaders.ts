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

  void main() {
    vec3 n = normalize(position);
    float blob = noise(n * 1.7 + vec3(0.0, uTime * 0.11, uTime * 0.07));
    float r = uRadius * (0.88 + 0.22 * blob) * (1.0 + (aRand.x - 0.5) * 0.04);
    r *= 1.0 + 0.035 * sin(uTime * 0.55 + n.y * 5.0);
    vec3 p = n * r;
    p += n * uSpread * (0.35 + aRand.y * 1.7);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float d = -mv.z;
    gl_Position = projectionMatrix * mv;
    gl_PointSize = clamp((1.0 + aRand.z * 1.9) * uPixel * (uSizeScale / max(d, 0.35)), 1.0, 8.0 * uPixel);

    // Silhouette rim (white) vs core (violet), plus a soft upper-left key light.
    vec3 vn = normalize(mat3(modelViewMatrix) * n);
    float rim = pow(clamp(1.0 - abs(vn.z), 0.0, 1.0), 2.0);
    float key = clamp(dot(vn, normalize(vec3(-0.45, 0.7, 0.55))) * 0.5 + 0.5, 0.0, 1.0);
    vec3 violet = mix(vec3(0.40, 0.10, 0.78), vec3(0.86, 0.36, 0.96), aRand.x);
    vColor = mix(violet, vec3(1.0), clamp(rim * 0.9 + key * 0.18 * aRand.y, 0.0, 1.0));

    vAlpha = uOpacity * smoothstep(0.25, 1.5, d) * (0.8 + 0.2 * aRand.y);
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
