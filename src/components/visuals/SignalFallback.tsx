"use client";

import { useEffect, useRef } from "react";
import { createTimeline, svg, stagger } from "animejs";

/** Trefoil curve (x = sin t + 2 sin 2t, y = cos t − 2 cos 2t) centred in a 600-unit box. */
const TREFOIL = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 200; i++) {
    const t = (i / 200) * Math.PI * 2;
    const x = Math.sin(t) + 2 * Math.sin(2 * t);
    const y = Math.cos(t) - 2 * Math.cos(2 * t);
    pts.push(`${i ? "L" : "M"}${(300 + x * 58).toFixed(1)} ${(300 + y * 58 + 14).toFixed(1)}`);
  }
  return `${pts.join(" ")}Z`;
})();

interface SignalFallbackProps {
  className?: string;
}

/**
 * Static / low-power version of the Signal Core (DESIGN.md §6.8 fallback).
 * Shown when WebGL is unavailable, on weak devices, with data-saver, or under prefers-reduced-motion,
 * and as the poster layer while the 3D scene loads.
 *
 * It is the same concept as the 3D scene — a central knot, three orbits and eight service nodes.
 * Anime.js owns the one-time stroke draw (skipped for reduced motion, where it simply renders complete).
 */
export function SignalFallback({ className }: SignalFallbackProps) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rings = svg.createDrawable(root.querySelectorAll<SVGGeometryElement>("[data-ring]"));
    const knot = svg.createDrawable(root.querySelectorAll<SVGGeometryElement>("[data-knot]"));
    const nodes = root.querySelectorAll<SVGCircleElement>("[data-node]");

    const tl = createTimeline({ defaults: { ease: "inOutQuad" } });
    tl.add(rings, { draw: ["0 0", "0 1"], duration: 1400, delay: stagger(160) }, 0)
      .add(knot, { draw: ["0 0", "0 1"], duration: 1500, delay: stagger(120) }, 200)
      .add(nodes, { opacity: [0, 1], scale: [0.3, 1], duration: 500, delay: stagger(70), ease: "outQuad" }, 900);

    return () => {
      tl.revert();
    };
  }, []);

  // Eight service nodes on three orbits (3 + 3 + 2) — one per service card.
  const nodes: Array<[number, number, boolean?]> = [
    [300, 98, true],
    [514, 360],
    [106, 392],
    [468, 118],
    [130, 232],
    [444, 484],
    [586, 276],
    [208, 506],
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 600"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <defs>
        <radialGradient id="sf-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#398bff" stopOpacity="0.36" />
          <stop offset="0.45" stopColor="#398bff" stopOpacity="0.09" />
          <stop offset="1" stopColor="#398bff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sf-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f7f8fa" stopOpacity="0.9" />
          <stop offset="1" stopColor="#398bff" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      <circle cx="300" cy="300" r="290" fill="url(#sf-glow)" />

      <g stroke="#63a5ff" strokeOpacity="0.55">
        <ellipse data-ring cx="300" cy="300" rx="222" ry="92" transform="rotate(-24 300 300)" />
        <ellipse data-ring cx="300" cy="300" rx="262" ry="132" transform="rotate(38 300 300)" strokeOpacity="0.4" />
        <ellipse data-ring cx="300" cy="300" rx="286" ry="176" transform="rotate(100 300 300)" strokeOpacity="0.25" stroke="#f7f8fa" />
      </g>

      {/* Knot: a (2,3) torus-knot silhouette — the same form as the 3D sculpture — as a layered tube */}
      <g strokeLinejoin="round" strokeLinecap="round">
        <path data-knot d={TREFOIL} stroke="#398bff" strokeOpacity="0.55" strokeWidth="38" />
        <path d={TREFOIL} stroke="#0a0b0f" strokeWidth="32" />
        <path data-knot d={TREFOIL} stroke="url(#sf-stroke)" strokeWidth="2.5" transform="translate(-6 -6)" />
      </g>

      <circle cx="300" cy="300" r="18" fill="#63a5ff" />
      <circle cx="300" cy="300" r="34" stroke="#63a5ff" strokeOpacity="0.35" />

      {nodes.map(([x, y, hot], i) => (
        <circle
          key={i}
          data-node
          cx={x}
          cy={y}
          r={hot ? 9 : 6}
          fill={hot ? "#63a5ff" : "#0b0c0f"}
          stroke={hot ? "#63a5ff" : "rgba(255,255,255,0.75)"}
          strokeWidth="1.5"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
