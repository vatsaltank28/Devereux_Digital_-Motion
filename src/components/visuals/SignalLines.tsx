/**
 * Decorative vector motif for the closing CTA: concentric broken arcs and tick marks, drawn as the
 * section scrolls into view. Pure CSS (`pathLength=1` + scroll-driven `animation-timeline: view()`,
 * see `.signal-draw` in features.css); unsupported browsers and reduced motion show it complete.
 * Server component: no JavaScript is shipped for it.
 */
export function SignalLines({ className }: { className?: string }) {
  const arcs = [120, 190, 260, 330];

  return (
    <svg viewBox="0 0 700 700" fill="none" aria-hidden="true" focusable="false" className={className ? `signal-draw ${className}` : "signal-draw"}>
      <g className="signal-arcs" stroke="#398bff" strokeLinecap="round">
        {arcs.map((r, i) => (
          <path
            key={r}
            pathLength={1}
            style={{ "--i": i } as React.CSSProperties}
            d={`M ${350 - r} 350 A ${r} ${r} 0 1 1 ${350 + r * Math.cos(Math.PI * (0.2 + i * 0.07))} ${350 + r * Math.sin(Math.PI * (0.2 + i * 0.07))}`}
            strokeOpacity={0.9 - i * 0.18}
            strokeWidth={i === 0 ? 2 : 1.25}
          />
        ))}
      </g>
      <g className="signal-ticks" stroke="rgba(255,255,255,0.35)">
        <path pathLength={1} style={{ "--i": 4 } as React.CSSProperties} d="M350 20V120M350 580V680M20 350H120M580 350H680" strokeLinecap="round" />
      </g>
      <circle className="signal-dot" cx="350" cy="350" r="5" fill="#63a5ff" />
    </svg>
  );
}
