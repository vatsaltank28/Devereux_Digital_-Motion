import Link from "next/link";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * The landing beat right after the hero tunnel: the camera "comes out" into this section.
 * One idea, shown not told — the business at the centre, three orbits around it (Design · Build · Grow),
 * each carrying the services that belong to it. Colours continue the particle swarm (blue → violet → orange).
 */
const PILLARS = [
  {
    name: "Design",
    color: "#4f8dff",
    line: "How you look and feel.",
    services: [
      { title: "Branding & Creative Design", href: "/services/branding-creative-design" },
      { title: "Web Design", href: "/services/web-design-development" },
    ],
  },
  {
    name: "Build",
    color: "#a07bff",
    line: "What your customers use.",
    services: [
      { title: "Websites & Development", href: "/services/web-design-development" },
      { title: "E-commerce Solutions", href: "/services/ecommerce-solutions" },
      { title: "AI & Business Solutions", href: "/services/ai-business-solutions" },
    ],
  },
  {
    name: "Grow",
    color: "#ff8a4c",
    line: "How people find you.",
    services: [
      { title: "Digital Marketing", href: "/services/digital-marketing" },
      { title: "Paid Advertising", href: "/services/paid-advertising" },
      { title: "Video & Content", href: "/services/video-content" },
    ],
  },
] as const;

/** Deterministic particle dust (same blue → orange drift as the hero swarm). */
const DUST = Array.from({ length: 90 }, (_, i) => {
  const a = i * 2.39996;
  const rad = 60 + ((i * 37) % 220);
  const x = Math.cos(a) * rad;
  const y = Math.sin(a) * rad * 0.45;
  const t = (x + 280) / 560;
  const c = t < 0.45 ? "#4f8dff" : t < 0.6 ? "#a07bff" : "#ff8a4c";
  return { x: +x.toFixed(1), y: +y.toFixed(1), r: 0.8 + ((i * 7) % 10) / 6, c, o: 0.25 + ((i * 13) % 10) / 20 };
});

function Orbit() {
  // Three tilted orbits around a centre node; each planet turns slowly (CSS), off for reduced motion.
  const rings = [
    { rx: 150, ry: 58, rot: -18, dur: "38s" },
    { rx: 205, ry: 82, rot: 14, dur: "52s" },
    { rx: 255, ry: 104, rot: -6, dur: "66s" },
  ];
  return (
    <svg viewBox="-280 -150 560 300" className="h-auto w-full max-w-[680px] overflow-visible" role="img" aria-label="Design, Build and Grow orbiting your business">
      <defs>
        <radialGradient id="orbit-core">
          <stop offset="0" stopColor="#6f9dff" stopOpacity="0.38" />
          <stop offset="0.5" stopColor="#8f7bff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#4f8dff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {DUST.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.c} fillOpacity={d.o} />
      ))}
      <circle r="88" fill="url(#orbit-core)" />
      {rings.map((r, i) => {
        const p = PILLARS[i]!;
        return (
          <g key={p.name} transform={`rotate(${r.rot})`}>
            <ellipse rx={r.rx} ry={r.ry} fill="none" stroke="currentColor" strokeOpacity="0.18" />
            <g transform={`scale(1 ${r.ry / r.rx})`}>
              <g className="orbit-spin" style={{ animationDuration: r.dur }}>
                <circle cx={r.rx} cy="0" r="22" fill={p.color} fillOpacity="0.18" />
                <circle cx={r.rx} cy="0" r="9" fill={p.color} />
              </g>
            </g>
          </g>
        );
      })}
      <text y="-3" textAnchor="middle" className="font-display text-[14px] font-semibold" style={{ fill: "var(--color-text)" }}>
        Your
      </text>
      <text y="15" textAnchor="middle" className="font-display text-[14px] font-semibold" style={{ fill: "var(--color-text)" }}>
        business
      </text>
    </svg>
  );
}

export function OrbitIntro() {
  return (
    <section aria-labelledby="intro-title" className="orbit-intro relative overflow-hidden">
      <div className="wrap-wide grid items-center gap-14 py-[clamp(5rem,3rem+8vw,10rem)] lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <h2 id="intro-title" className="font-display text-[clamp(2.2rem,1.4rem+3.2vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            One team for everything your business does online.
          </h2>
          <p className="t-lead mt-6 max-w-[34rem]">
            We plan, design, build and grow — so your brand, your website and your marketing finally pull in the same
            direction.
          </p>

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {PILLARS.map((p) => (
              <li key={p.name} className="grid gap-3 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <div>
                  <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                    <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: p.color }} />
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{p.line}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {p.services.map((s) => (
                    <li key={s.title}>
                      <Link
                        href={s.href}
                        className="inline-flex items-center rounded-full border border-line px-3.5 py-1.5 text-sm transition-colors hover:border-line-strong hover:bg-[var(--color-hover)]"
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <Link href="/contact" className="btn btn-primary mt-10">
            <span>Start a Project</span>
            <ArrowRight />
          </Link>
        </div>

        <div className="flex justify-center text-ink lg:col-span-6">
          <Orbit />
        </div>
      </div>
    </section>
  );
}
