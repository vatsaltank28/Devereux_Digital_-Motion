/**
 * Single source of truth for the scroll sequence. Progress `p` runs 0 → 1 across the pinned stage.
 * The DOM master timeline (ScrollStage) and the WebGL scene (StageScene) both read these ranges,
 * so what you see and what the camera does can never drift apart — and because everything is a pure
 * function of `p`, scrolling backwards replays the sequence in reverse exactly.
 *
 * Ranges are [start, end]. Derived from the benchmark recording (12.6 s, assuming linear scroll→time):
 *   0.00 hero card swings away · 0.10 side cards converge · 0.20 ✦ hole opens · 0.27 hole grows to fill the screen
 *   0.31 camera flies through the particle sphere · 0.44 gallery pans · 0.54 panels scatter in depth
 *   0.70 panels converge, violet card expands, chrome star enters · 0.95 hold
 */
export type Range = readonly [number, number];

/**
 * New Era blend: after the star opens onto the particle sphere, the swarm morphs ring -> helix -> horizon -> tunnel
 * (raw units inside [MORPH_AT, MORPH_AT + MORPH_LEN]); the camera then flies down the tunnel into the gallery.
 * Everything after MORPH_AT is pushed back by MORPH_LEN and the whole sequence is re-normalised to 0 -> 1.
 */
const MORPH_AT = 0.345;
const MORPH_LEN = 0.34;
const TOTAL = 1 + MORPH_LEN;
const n = (v: number) => (v > MORPH_AT ? v + MORPH_LEN : v) / TOTAL;
const m = (a: number, b: number) => [(MORPH_AT + a) / TOTAL, (MORPH_AT + b) / TOTAL] as const;

const RAW = {
  heroExit: [0.0, 0.1],
  sideIn: [0.05, 0.2],
  cardFocus: [0.18, 0.255],
  holeOpen: [0.18, 0.25],
  holeGrow: [0.262, 0.3],
  whiteOut: 0.305,
  lightEnd: 0.3,

  dustIn: [0.272, 0.3],
  fly: [0.285, 0.345],
  starOut: [0.33, 0.345],

  galleryIn: [0.37, 0.46],
  scatter: [0.52, 0.68],
  drift: [0.46, 0.85],
  panelsOut: [0.72, 0.84],
  /** The violet card is one of the floating panels (bottom-right) that grows to fill the screen. */
  cardPeek: 0.575,
  cardGrow1: [0.58, 0.79],
  cardGrow2: [0.8, 0.95],
  frame: [0.92, 0.97],
  ctaCopy: [0.88, 0.98],
  chromeIn: [0.57, 0.8],
  camBack: [0.4, 0.56],
} as const;

type Norm<V> = { -readonly [K in keyof V]: V[K] extends readonly [number, number] ? Range : number };
const norm = <V extends Record<string, number | readonly [number, number]>>(o: V) =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]) => [k, typeof v === "number" ? n(v) : ([n(v[0]), n(v[1])] as const)]),
  ) as Norm<V>;

export const T = {
  ...norm(RAW),
  // New Era morph window
  toRing: m(0.0, 0.045),
  ringCopy: [m(0.02, 0.05)[0], m(0.07, 0.09)[1]] as Range,
  toHelix: m(0.085, 0.135),
  helixCopy: [m(0.11, 0.13)[0], m(0.165, 0.185)[1]] as Range,
  toHorizon: m(0.18, 0.225),
  copyIn: m(0.205, 0.235),
  copyOut: m(0.255, 0.275),
  toTunnel: m(0.265, 0.3),
  tunnelFly: m(0.285, 0.345),
  dustOut: m(0.315, 0.345),
  warm: m(0.0, 0.05),
} as const;

/**
 * The violet card's window as insets (fractions of the viewport). The DOM clip-path (ScrollStage) and the chrome
 * star's placement (StageScene) both derive from these, so the star is always composed for the window it lives in.
 */
export const CARD = {
  peek: { l: 0.62, t: 0.6, r: 0, b: 0 },
  largeDesktop: { l: 0.2, t: 0.2, r: 0.04, b: 0.2 },
  largeMobile: { l: 0.04, t: 0.3, r: 0.04, b: 0.12 },
  full: { l: 0.014, t: 0.022, r: 0.014, b: 0.022 },
} as const;
type Inset = { l: number; t: number; r: number; b: number };
const mix = (a: Inset, b: Inset, k: number): Inset => ({
  l: a.l + (b.l - a.l) * k,
  t: a.t + (b.t - a.t) * k,
  r: a.r + (b.r - a.r) * k,
  b: a.b + (b.b - a.b) * k,
});
/** power2.inOut, matching the GSAP ease used for the first growth. */
export const easeInOut2 = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export function cardState(p: number, mobile: boolean) {
  const a = easeInOut2(clamp01((p - T.cardGrow1[0]) / (T.cardGrow1[1] - T.cardGrow1[0])));
  const b = easeInOutCubic(clamp01((p - T.cardGrow2[0]) / (T.cardGrow2[1] - T.cardGrow2[0])));
  const large = mobile ? CARD.largeMobile : CARD.largeDesktop;
  const box = mix(mix(CARD.peek, large, a), CARD.full, b);
  return { box, a, b };
}
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const sm = (r: Range, x: number) => clamp01((x - r[0]) / (r[1] - r[0]));
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
export const easeOut = (t: number) => 1 - (1 - t) ** 3;

/** Human-readable phase for the debug HUD. */
export function phaseName(p: number): string {
  if (p < T.heroExit[1]) return "A · hero card swings away";
  if (p < T.cardFocus[1]) return "B · side cards converge on ✦ card";
  if (p < T.holeGrow[1]) return "C · ✦ scales to fill the screen";
  if (p < T.fly[1]) return "D · camera approaches the particle sphere";
  if (p < T.toHelix[0]) return "N1 · swarm becomes a ring";
  if (p < T.toHorizon[0]) return "N2 · helix + stats";
  if (p < T.toTunnel[0]) return "N3 · horizon";
  if (p < T.tunnelFly[1]) return "N4 · tunnel fly-through";
  if (p < T.galleryIn[1]) return "E1 · gallery pans";
  if (p < T.scatter[1]) return "E2 · panels scatter in depth";
  if (p < T.cardGrow1[1]) return "F1 · violet card grows, chrome star enters";
  return "F2 · card fills the frame + closing copy";
}
