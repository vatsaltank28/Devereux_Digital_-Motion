"use client";

import type { ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * Motion-for-React owns: menu, accordions, hover/press feedback, layout, simple in-view reveals, page fade.
 * `reducedMotion="user"` makes every Motion transform animation respect the OS setting automatically.
 * Features load async so the animation engine stays out of the critical bundle.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
