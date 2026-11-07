"use client";

import type { ReactNode } from "react";
import { m } from "motion/react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small values (index * 0.06) for short stagger groups only. */
  delay?: number;
  /** Travel distance in px (DESIGN.md: 8–16 px for body copy). */
  y?: number;
}

/**
 * Restrained in-view reveal: opacity + small y translate, once. (Motion owns these properties on this node.)
 * Content is visible with JavaScript disabled — see `html:not(.js) [data-reveal]` in globals.css.
 */
export function Reveal({ children, className, delay = 0, y = 14 }: RevealProps) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
