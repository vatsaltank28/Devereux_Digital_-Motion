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

export const T = {
  heroExit: [0.0, 0.1],
  sideIn: [0.05, 0.2],
  cardFocus: [0.18, 0.255],
  holeOpen: [0.18, 0.25],
  holeGrow: [0.262, 0.3],
  whiteOut: 0.305,
  lightEnd: 0.3,

  dustIn: [0.272, 0.3],
  fly: [0.285, 0.345],
  spread: [0.3, 0.36],
  dustOut: [0.34, 0.385],
  starOut: [0.38, 0.42],
  copyIn: [0.33, 0.37],
  copyOut: [0.4, 0.44],

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
  if (p < T.fly[1]) return "D · camera flies through particle sphere";
  if (p < T.galleryIn[1]) return "E1 · gallery pans";
  if (p < T.scatter[1]) return "E2 · panels scatter in depth";
  if (p < T.cardGrow1[1]) return "F1 · violet card grows, chrome star enters";
  return "F2 · card fills the frame + closing copy";
}
