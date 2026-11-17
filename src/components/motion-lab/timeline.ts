/**
 * Single source of truth for the hero scroll sequence. Progress `p` runs 0 → 1 across the sticky stage.
 * The DOM timeline (ScrollStage) and the WebGL scene (StageScene) both read these ranges, and every state is a
 * pure function of `p`, so scrolling back up replays the sequence in reverse.
 *
 * One particle swarm, four beats:
 *   ring (hero headline inside it) → helix (the seven services around it) → horizon (who we are) → tunnel
 *   (the camera dives through, handing over to the services section below).
 */
export type Range = readonly [number, number];

export const T = {
  // Shape morphs: ring → helix → horizon → tunnel
  toHelix: [0.18, 0.3],
  toHorizon: [0.5, 0.6],
  toTunnel: [0.76, 0.84],
  // Camera dive + fade at the end
  tunnelFly: [0.8, 1.0],
  dustOut: [0.9, 1.0],
  // Copy beats
  heroOut: [0.08, 0.16],
  servicesIn: [0.28, 0.34],
  servicesOut: [0.44, 0.5],
  aboutIn: [0.6, 0.66],
  aboutOut: [0.72, 0.78],
  cueOut: [0.02, 0.06],
} as const;

export const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
export const sm = (r: Range, x: number) => clamp01((x - r[0]) / (r[1] - r[0]));
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Human-readable phase for the debug HUD. */
export function phaseName(p: number): string {
  if (p < T.toHelix[0]) return "1 · ring + hero";
  if (p < T.toHorizon[0]) return "2 · helix + services";
  if (p < T.toTunnel[0]) return "3 · horizon + about";
  return "4 · tunnel into the page";
}
