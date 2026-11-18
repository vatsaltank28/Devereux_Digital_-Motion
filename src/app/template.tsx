"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

/**
 * Route transition (DESIGN.md §6.3): a short opacity fade-in on every navigation.
 * Opacity only, no transform, so sticky/fixed descendants and ScrollTrigger measurements are unaffected,
 * and there is no exit animation, so navigation is never blocked.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.38, ease: "easeOut" }}>
      {children}
    </m.div>
  );
}
