"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { track } from "@/lib/analytics";

export interface ExplorerService {
  slug: string;
  title: string;
  description: string;
  bestFor?: string;
  deliverables: string[];
  examples: { slug: string; title: string }[];
}

/** Accessible tabs that work by touch, mouse and keyboard. Every panel stays in the HTML for search engines. */
export function ServiceExplorer({ services }: { services: ExplorerService[] }) {
  const base = useId();
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number, focus = false) => {
    setActive(i);
    track("service_card_click", { service: services[i]!.slug, source: "home-explorer" });
    if (focus) tabs.current[i]?.focus();
  };

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = services.length - 1;
    const keys: Record<string, number> = { ArrowDown: i === last ? 0 : i + 1, ArrowRight: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, ArrowLeft: i === 0 ? last : i - 1, Home: 0, End: last };
    const next = keys[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next, true);
  };

  return (
    <div className="sx">
      <div role="tablist" aria-label="Our services" className="sx-tabs">
        {services.map((s, i) => (
          <button
            key={s.slug}
            ref={(el) => { tabs.current[i] = el; }}
            id={`${base}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-controls={`${base}-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => select(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="sx-tab"
          >
            <span aria-hidden="true" className="sx-num">{String(i + 1).padStart(2, "0")}</span>
            {s.title}
          </button>
        ))}
      </div>
      {services.map((s, i) => (
        <div key={s.slug} id={`${base}-panel-${i}`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} hidden={active !== i} tabIndex={0} className="sx-panel">
          <h3 className="t-h3">{s.title}</h3>
          <p className="t-body mt-3 max-w-[58ch]">{s.description}</p>
          <div className="sx-cols">
            <div>
              <h4 className="sx-k">Key deliverables</h4>
              <ul className="mt-3 space-y-2">
                {s.deliverables.map((d) => <li key={d} className="cs-ring-item">{d}</li>)}
              </ul>
            </div>
            <div className="space-y-5">
              {s.bestFor && (
                <div>
                  <h4 className="sx-k">Who it’s for</h4>
                  <p className="mt-2 text-[0.95rem] leading-relaxed">{s.bestFor}</p>
                </div>
              )}
              {s.examples.length > 0 && (
                <div>
                  <h4 className="sx-k">Relevant work</h4>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {s.examples.map((x) => <li key={x.slug}><Link href={`/work/${x.slug}`} className="home-chip">{x.title}</Link></li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={`/contact?service=${s.slug}`} className="btn btn-primary">Start this project</Link>
            <Link href={`/services/${s.slug}`} className="link-arrow inline-flex min-h-11 items-center">Explore {s.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
}
