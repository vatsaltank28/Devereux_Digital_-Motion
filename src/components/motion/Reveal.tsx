import type { CSSProperties, ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds. Use small values (index * 0.06) for short stagger groups only. */
  delay?: number;
  /** Travel distance in px (DESIGN.md: 8 to 16 px for body copy). */
  y?: number;
}

/**
 * Restrained in-view reveal: opacity + small y translate as the block scrolls in.
 * Pure CSS scroll-driven animation (`animation-timeline: view()`): no animation library, no JavaScript,
 * no hydration cost, and nothing for React to mismatch. Browsers without support, and reduced motion,
 * simply show the content (see `[data-reveal]` in globals.css). Works in server components.
 */
export function Reveal({ children, className, delay = 0, y = 14 }: RevealProps) {
  const style = { "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px` } as CSSProperties;
  return (
    <div data-reveal className={className} style={style}>
      {children}
    </div>
  );
}
