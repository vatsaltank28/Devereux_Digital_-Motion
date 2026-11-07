"use client";

import { useEffect, useRef } from "react";
import { createTimeline, stagger, svg } from "animejs";

interface LogoMarkProps {
  size?: number;
  /** Draw the mark on mount. Skipped automatically for reduced motion. */
  animateOnMount?: boolean;
  className?: string;
}

/**
 * Devereux Digitals mark — a "D" form with a single signal node.
 * PLACEHOLDER until the client supplies the final logo (PRD §18); keep the API when swapping the SVG.
 *
 * Anime.js owns the SVG stroke draw on these <path>/<circle> nodes only; no other library touches them.
 */
export function LogoMark({ size = 30, animateOnMount = true, className }: LogoMarkProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !animateOnMount) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const strokes = svg.createDrawable(root.querySelectorAll<SVGGeometryElement>("[data-draw]"));
    const node = root.querySelector<SVGCircleElement>("[data-node]");

    const tl = createTimeline({ defaults: { ease: "inOutQuad" } });
    tl.add(strokes, { draw: ["0 0", "0 1"], duration: 900, delay: stagger(140) }, 100);
    if (node) tl.add(node, { opacity: [0, 1], scale: [0.2, 1], duration: 450, ease: "outBack" }, 800);

    return () => {
      tl.revert();
    };
  }, [animateOnMount]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path
        data-draw
        d="M8 6.5V25.5H15C20.5 25.5 24 21.6 24 16C24 10.4 20.5 6.5 15 6.5H8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path data-draw d="M13.5 12.5V19.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <circle
        data-node
        cx="27.5"
        cy="16"
        r="2.25"
        fill="var(--color-accent)"
        style={{ transformOrigin: "27.5px 16px", transformBox: "fill-box" }}
      />
    </svg>
  );
}
