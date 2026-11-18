/**
 * Device capability detection for the 3D hero (DESIGN.md §6.8, PRD §14).
 *
 *  off  → render the static SVG/CSS composition (no WebGL, reduced motion, data-saver, very weak device)
 *  low  → simplified scene: 1× DPR, lower geometry density, no pointer parallax (phones/tablets)
 *  high → full scene (fine-pointer desktops/laptops)
 */
export type QualityTier = "off" | "low" | "high";

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
}

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return false;
    // Release the probe context immediately so it does not count against the browser's limit.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

let cachedTier: QualityTier | null = null;

/** Probe once per page load, creating a throwaway WebGL context is not free. */
export function getQualityTierCached(): QualityTier {
  if (typeof window === "undefined") return "off";
  cachedTier ??= getQualityTier();
  return cachedTier;
}

export function getQualityTier(): QualityTier {
  if (typeof window === "undefined") return "off";
  const nav = navigator as NavigatorWithHints;

  if (prefersReducedMotion()) return "off";
  if (nav.connection?.saveData) return "off";
  if (!hasWebGL()) return "off";

  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (cores <= 2 || memory <= 2) return "off";

  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const narrow = window.matchMedia("(max-width: 1023px)").matches;
  if (coarse || narrow || cores <= 4 || memory <= 4) return "low";

  return "high";
}
