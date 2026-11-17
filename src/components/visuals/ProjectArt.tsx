import { useId } from "react";
import type { ArtVariant } from "@/data/types";

/**
 * Generated artwork for services and concept projects.
 * One shared grammar — hairline white linework, a single blue signal, black ground — so all
 * seven pieces read as one family (DESIGN.md §3.3). Replace with real project imagery via `heroImage`.
 * Purely decorative: aria-hidden; the card/page that uses it carries the accessible name.
 */
const W = "var(--art-ink)";
const WF = "var(--art-faint)";
const WM = "var(--art-mid)";
const B = "var(--color-accent)";
const BB = "var(--color-accent-bright)";
const BD = "var(--color-accent-deep)";

function Web() {
  return (
    <g>
      <rect x="110" y="92" width="580" height="416" rx="18" fill="var(--art-panel)" stroke={WM} />
      <path d="M110 140H690" stroke={WF} />
      <circle cx="140" cy="116" r="5" fill={WF} />
      <circle cx="160" cy="116" r="5" fill={WF} />
      <circle cx="180" cy="116" r="5" fill={WF} />
      <rect x="232" y="106" width="260" height="20" rx="10" fill="none" stroke={WF} />
      <rect x="146" y="176" width="270" height="20" rx="4" fill={W} />
      <rect x="146" y="206" width="200" height="20" rx="4" fill={W} />
      <rect x="146" y="248" width="250" height="8" rx="4" fill={WM} />
      <rect x="146" y="266" width="210" height="8" rx="4" fill={WM} />
      <rect x="146" y="296" width="132" height="38" rx="19" fill={B} />
      <rect x="456" y="168" width="200" height="176" rx="12" fill={BD} stroke={B} strokeOpacity="0.6" />
      <path d="M456 344 556 236l60 70 40-46" stroke={BB} strokeWidth="1.5" fill="none" />
      <circle cx="610" cy="206" r="14" fill="none" stroke={BB} />
      {[146, 292, 438].map((x) => (
        <g key={x}>
          <rect x={x} y="380" width="124" height="96" rx="10" fill="none" stroke={WF} />
          <rect x={x + 14} y="396" width="52" height="8" rx="4" fill={WM} />
          <rect x={x + 14} y="414" width="92" height="6" rx="3" fill={WF} />
        </g>
      ))}
      <rect x="584" y="380" width="72" height="96" rx="10" fill="none" stroke={B} strokeOpacity="0.6" />
      <path d="m604 330 10 36 8-12 14 6z" fill={W} transform="translate(60 -14)" />
    </g>
  );
}

function Ecommerce() {
  const cards = [
    { x: 126, y: 150 },
    { x: 308, y: 150 },
    { x: 126, y: 330 },
    { x: 308, y: 330 },
  ];
  return (
    <g>
      <rect x="110" y="92" width="580" height="46" rx="23" fill="var(--art-panel)" stroke={WF} />
      <rect x="136" y="110" width="120" height="10" rx="5" fill={WM} />
      <rect x="590" y="100" width="88" height="30" rx="15" fill={B} />
      <path d="M626 109h16l-2 12h-12z" stroke="var(--art-ground)" strokeWidth="1.5" fill="none" />
      {cards.map((c, i) => (
        <g key={i}>
          <rect x={c.x} y={c.y} width="160" height="160" rx="14" fill="var(--art-panel)" stroke={i === 1 ? B : WF} strokeOpacity={i === 1 ? 0.8 : 1} />
          {i === 0 && <circle cx={c.x + 80} cy={c.y + 70} r="38" fill="none" stroke={W} />}
          {i === 1 && <rect x={c.x + 46} y={c.y + 30} width="68" height="84" rx="14" fill={BD} stroke={BB} />}
          {i === 2 && <path d={`M${c.x + 50} ${c.y + 108}V${c.y + 50}c0-14 60-14 60 0v58z`} fill="none" stroke={W} />}
          {i === 3 && <ellipse cx={c.x + 80} cy={c.y + 72} rx="42" ry="30" fill="none" stroke={W} />}
          <rect x={c.x + 14} y={c.y + 130} width="68" height="7" rx="3.5" fill={WM} />
          <rect x={c.x + 14} y={c.y + 144} width="38" height="6" rx="3" fill={WF} />
        </g>
      ))}
      <rect x="500" y="150" width="190" height="340" rx="14" fill="var(--art-panel)" stroke={WF} />
      <rect x="520" y="176" width="90" height="10" rx="5" fill={WM} />
      {[210, 252, 294].map((y) => (
        <g key={y}>
          <rect x="520" y={y} width="44" height="30" rx="6" fill="none" stroke={WF} />
          <rect x="576" y={y + 6} width="70" height="6" rx="3" fill={WM} />
          <rect x="576" y={y + 18} width="40" height="5" rx="2.5" fill={WF} />
        </g>
      ))}
      <rect x="520" y="420" width="150" height="40" rx="20" fill={B} />
    </g>
  );
}

function Branding() {
  return (
    <g>
      <circle cx="400" cy="270" r="150" fill="none" stroke={WM} />
      <circle cx="476" cy="270" r="150" fill="none" stroke={WF} />
      <circle cx="400" cy="270" r="84" fill="none" stroke={B} strokeWidth="1.5" />
      <circle cx="400" cy="270" r="4" fill={BB} />
      <path d="M170 270H630M400 70V470" stroke={WF} />
      <path d="M400 186a84 84 0 0 1 0 168a84 84 0 0 1-84-84" stroke={W} strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="484" cy="270" r="10" fill={B} />
      <g transform="translate(140 430)">
        {["var(--art-hi)", B, BD, "var(--art-panel-2)"].map((c, i) => (
          <rect key={c} x={i * 66} y="0" width="54" height="54" rx="12" fill={c} stroke={WF} />
        ))}
      </g>
      <text x="470" y="478" fill={W} fontFamily="var(--font-display), sans-serif" fontSize="56" fontWeight="600" letterSpacing="-2">
        Aa
      </text>
      <rect x="560" y="458" width="100" height="6" rx="3" fill={WM} />
      <rect x="560" y="474" width="64" height="6" rx="3" fill={WF} />
    </g>
  );
}

function Video() {
  return (
    <g>
      <rect x="110" y="96" width="470" height="264" rx="14" fill="var(--art-panel)" stroke={WM} />
      <circle cx="345" cy="228" r="44" fill={BD} stroke={BB} />
      <path d="M334 206 366 228 334 250z" fill={BB} />
      <path d="M110 330H580" stroke={WF} />
      <rect x="130" y="338" width="140" height="6" rx="3" fill={B} />
      <rect x="610" y="96" width="132" height="264" rx="14" fill="var(--art-panel)" stroke={WM} />
      <rect x="628" y="116" width="96" height="140" rx="8" fill="none" stroke={WF} />
      <path d="M648 170l28-18v36z" fill={WM} />
      <rect x="628" y="274" width="70" height="8" rx="4" fill={WM} />
      <rect x="628" y="292" width="46" height="6" rx="3" fill={WF} />
      {[
        [110, 396, 190, 22, 1],
        [310, 396, 120, 22, 0],
        [440, 396, 140, 22, 0],
        [110, 428, 90, 22, 0],
        [210, 428, 210, 22, 1],
        [430, 428, 110, 22, 0],
        [110, 460, 260, 22, 0],
        [380, 460, 150, 22, 1],
      ].map(([x, y, w, h, hot], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="5" fill={hot ? BD : "none"} stroke={hot ? B : WF} />
      ))}
      <path d="M300 380V490" stroke={BB} strokeWidth="1.5" />
      <path d="M292 376h16l-8 12z" fill={BB} />
    </g>
  );
}

function Ads() {
  return (
    <g>
      {[0, 1, 2, 3].map((i) => {
        const inset = i * 44;
        const y = 120 + i * 82;
        return (
          <path
            key={i}
            d={`M${130 + inset} ${y}H${530 - inset}l-26 66H${156 + inset}z`}
            fill={i === 2 ? BD : "var(--art-panel)"}
            stroke={i === 2 ? B : WM}
          />
        );
      })}
      <g stroke={WF}>
        <path d="M570 120H690M570 202H690M570 284H690M570 366H690" />
      </g>
      <rect x="570" y="132" width="110" height="10" rx="5" fill={WM} />
      <rect x="570" y="214" width="82" height="10" rx="5" fill={WM} />
      <rect x="570" y="296" width="56" height="10" rx="5" fill={B} />
      <rect x="570" y="378" width="34" height="10" rx="5" fill={WM} />
      <circle cx="630" cy="460" r="46" fill="none" stroke={WF} />
      <circle cx="630" cy="460" r="28" fill="none" stroke={WM} />
      <circle cx="630" cy="460" r="8" fill={B} />
      <path d="M130 470h330" stroke={WF} />
      <path d="M130 470c60-10 90-60 150-52s90-20 180-54" stroke={BB} strokeWidth="1.8" fill="none" />
    </g>
  );
}

function Ai() {
  const nodes = [
    { x: 160, y: 190, r: 22 },
    { x: 160, y: 380, r: 22 },
    { x: 380, y: 285, r: 40, hot: true },
    { x: 590, y: 190, r: 22 },
    { x: 590, y: 380, r: 22 },
  ];
  return (
    <g>
      {[
        [0, 2],
        [1, 2],
        [2, 3],
        [2, 4],
      ].map(([a, b], i) => {
        const A = nodes[a!]!;
        const Bn = nodes[b!]!;
        return (
          <path
            key={i}
            d={`M${A.x} ${A.y}C${(A.x + Bn.x) / 2} ${A.y} ${(A.x + Bn.x) / 2} ${Bn.y} ${Bn.x} ${Bn.y}`}
            stroke={i > 1 ? B : WM}
            strokeWidth="1.5"
            fill="none"
          />
        );
      })}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.hot ? BD : "var(--art-panel)"} stroke={n.hot ? BB : WM} strokeWidth={n.hot ? 2 : 1} />
          {n.hot && <circle cx={n.x} cy={n.y} r={n.r + 22} fill="none" stroke={B} strokeOpacity="0.35" strokeDasharray="3 6" />}
          <circle cx={n.x} cy={n.y} r={n.hot ? 8 : 4} fill={n.hot ? BB : W} />
        </g>
      ))}
      {/* human-review gate */}
      <rect x="476" y="262" width="30" height="30" rx="4" transform="rotate(45 491 277)" fill="var(--art-ground)" stroke={W} />
      <path d="M483 278l6 6 11-12" stroke={BB} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="130" y="470" width="540" height="40" rx="20" fill="none" stroke={WF} />
      <rect x="150" y="485" width="150" height="10" rx="5" fill={WM} />
    </g>
  );
}

function Marketing() {
  const cells = Array.from({ length: 20 }, (_, i) => ({ c: i % 5, r: Math.floor(i / 5) }));
  const hot = new Set([1, 4, 7, 10, 13, 17]);
  return (
    <g>
      {cells.map(({ c, r }, i) => (
        <rect
          key={i}
          x={120 + c * 112}
          y={120 + r * 78}
          width="100"
          height="66"
          rx="10"
          fill={hot.has(i) ? BD : "none"}
          stroke={hot.has(i) ? B : WF}
        />
      ))}
      {cells
        .filter((_, i) => hot.has(i))
        .map(({ c, r }, i) => (
          <rect key={i} x={132 + c * 112} y={134 + r * 78} width="46" height="7" rx="3.5" fill={BB} />
        ))}
      <path d="M96 470c80-4 120-64 210-70s120 40 220-26 120-96 190-134" stroke={W} strokeWidth="2" fill="none" />
      <path d="M96 470c80-4 120-64 210-70s120 40 220-26 120-96 190-134V500H96z" fill={B} fillOpacity="0.1" />
      <circle cx="716" cy="240" r="7" fill={B} />
      <circle cx="716" cy="240" r="16" fill="none" stroke={B} strokeOpacity="0.4" />
    </g>
  );
}

const ART: Record<ArtVariant, () => React.JSX.Element> = {
  web: Web,
  ecommerce: Ecommerce,
  branding: Branding,
  video: Video,
  ads: Ads,
  ai: Ai,
  marketing: Marketing,
};

interface ProjectArtProps {
  variant: ArtVariant;
  className?: string;
}

export function ProjectArt({ variant, className }: ProjectArtProps) {
  const uid = useId().replace(/:/g, "");
  const Art = ART[variant];
  return (
    <svg
      viewBox="0 0 800 600"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`g-${uid}`} cx="78%" cy="18%" r="70%">
          <stop offset="0" stopColor={B} stopOpacity="0.32" />
          <stop offset="0.55" stopColor={B} stopOpacity="0.06" />
          <stop offset="1" stopColor={B} stopOpacity="0" />
        </radialGradient>
        <pattern id={`p-${uid}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.045)" />
        </pattern>
      </defs>
      <rect width="800" height="600" fill="var(--art-ground-2)" />
      <rect width="800" height="600" fill={`url(#p-${uid})`} />
      <rect width="800" height="600" fill={`url(#g-${uid})`} />
      <Art />
    </svg>
  );
}
