"use client";

import { useEffect, useRef } from "react";
import { createTimeline, svg, stagger } from "animejs";

/**
 * Decorative vector motif for the closing CTA: concentric broken arcs and tick marks, drawn once as the
 * section enters the viewport. Anime.js owns the stroke draw on these nodes only (no scroll engine, no loop).
 * Reduced motion → rendered complete, no animation.
 */
export function SignalLines({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const arcs = svg.createDrawable(root.querySelectorAll<SVGGeometryElement>("[data-arc]"));
    // Start undrawn, then play once visible.
    const tl = createTimeline({ autoplay: false, defaults: { ease: "inOutCubic" } });
    tl.add(arcs, { draw: ["0 0", "0 1"], duration: 1800, delay: stagger(150) }, 0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          tl.play();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(root);

    return () => {
      io.disconnect();
      tl.revert();
    };
  }, []);

  const arcs = [
    { r: 120, d: "0 0 1" },
    { r: 190, d: "0 0 1" },
    { r: 260, d: "0 0 1" },
    { r: 330, d: "0 0 1" },
  ];

  return (
    <svg ref={ref} viewBox="0 0 700 700" fill="none" aria-hidden="true" focusable="false" className={className}>
      <g stroke="#398bff" strokeLinecap="round">
        {arcs.map(({ r }, i) => (
          <path
            key={r}
            data-arc
            d={`M ${350 - r} 350 A ${r} ${r} 0 1 1 ${350 + r * Math.cos(Math.PI * (0.2 + i * 0.07))} ${350 + r * Math.sin(Math.PI * (0.2 + i * 0.07))}`}
            strokeOpacity={0.9 - i * 0.18}
            strokeWidth={i === 0 ? 2 : 1.25}
          />
        ))}
      </g>
      <g stroke="rgba(255,255,255,0.35)">
        <path data-arc d="M350 20V120M350 580V680M20 350H120M580 350H680" strokeLinecap="round" />
      </g>
      <circle cx="350" cy="350" r="5" fill="#63a5ff" />
    </svg>
  );
}
