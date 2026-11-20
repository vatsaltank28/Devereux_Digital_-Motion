"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { ServicePricing as Pricing } from "@/data/pricing";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/Icons";

type Tab = "starting" | "monthly" | "custom";

const TABS: { id: Tab; label: string; tone: string; icon: React.ReactNode }[] = [
  {
    id: "starting",
    label: "Starting",
    tone: "blue",
    icon: (
      <>
        <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  {
    id: "monthly",
    label: "Monthly",
    tone: "green",
    icon: (
      <>
        <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
        <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
        <path d="M7.5 13.5h.01M12 13.5h.01M16.5 13.5h.01M7.5 17h.01M12 17h.01" strokeWidth="2.4" />
      </>
    ),
  },
  {
    id: "custom",
    label: "Custom",
    tone: "purple",
    icon: <path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1M15 4v4M9 10v4M17 16v4" />,
  },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

function PlanIcon({ tab }: { tab: (typeof TABS)[number] }) {
  return (
    <span aria-hidden="true" className={cn("price-icon", `price-icon--${tab.tone}`)}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {tab.icon}
      </svg>
    </span>
  );
}

/**
 * Pricing for one service (client pricing document): starting price, three monthly packages and a
 * custom quote with selectable add ons. Desktop: three stacked rows split by thin dividers.
 * Mobile: the same rows become a clearly visible three-way tab switcher.
 */
export function ServicePricing({ pricing, slug, serviceTitle }: { pricing: Pricing; slug: string; serviceTitle: string }) {
  const uid = useId();
  const [tab, setTab] = useState<Tab>("starting");
  const [open, setOpen] = useState(false);
  const [addOns, setAddOns] = useState<string[]>([]);

  const contact = (pkg: string, extra?: string[]) => {
    const q = new URLSearchParams({ service: slug, package: pkg });
    if (extra && extra.length) q.set("addons", extra.join("|"));
    return `/contact?${q.toString()}`;
  };
  const toggle = (a: string) => setAddOns((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));

  const onKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = TABS[(i + (e.key === "ArrowRight" ? 1 : TABS.length - 1)) % TABS.length]!;
    setTab(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  const panel = (id: Tab) => ({
    id: `${uid}-panel-${id}`,
    role: "tabpanel" as const,
    "aria-labelledby": `${uid}-tab-${id}`,
    className: cn("price-row", tab !== id && "is-inactive"),
  });

  return (
    <section id="pricing" aria-labelledby={`${uid}-title`} className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="pill">Pricing</p>
            <h2 id={`${uid}-title`} className="t-h2 mt-4">
              {serviceTitle} pricing
            </h2>
          </div>
          <p className="t-body lg:col-span-5">
            Clear starting prices, simple monthly packages, or a quote shaped around you. All prices in USD.
          </p>
        </div>

        {/* Mobile tab switcher */}
        <div role="tablist" aria-label="Pricing options" className="price-tabs">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              id={`${uid}-tab-${t.id}`}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              aria-controls={`${uid}-panel-${t.id}`}
              tabIndex={tab === t.id ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn("price-tab", `price-tab--${t.tone}`)}
            >
              <PlanIcon tab={t} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        <div className="price-rows">
          {/* 1. Starting price */}
          <div {...panel("starting")}>
            <div className="price-row-head">
              <PlanIcon tab={TABS[0]!} />
              <h3 className="t-h4">Starting prices</h3>
            </div>
            <div className="price-row-body">
              <p className="price-kicker">Starting at</p>
              <p className="price-amount">
                {usd(pricing.starting.price)}
                <span className="price-plus">+</span>
                <span className="price-for">{pricing.starting.label}</span>
              </p>
              <p className="mt-3 max-w-[40rem] text-muted">{pricing.starting.description}</p>
              <p className="price-note mt-4">{pricing.scopeNote}</p>
              <Link href={contact(`${pricing.starting.label} (from ${usd(pricing.starting.price)})`)} className="price-cta mt-6">
                Get Started <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* 2. Monthly packages */}
          <div {...panel("monthly")}>
            <div className="price-row-head">
              <PlanIcon tab={TABS[1]!} />
              <h3 className="t-h4">Monthly packages</h3>
            </div>
            <div className="price-row-body">
              <ul className="price-plans">
                {pricing.monthly.map((p) => (
                  <li key={p.name} className="price-plan">
                    <p className="font-display text-lg font-semibold">{p.name}</p>
                    <p className="mt-1">
                      <span className="price-plan-amount">{usd(p.price)}</span>
                      <span className="text-muted">/month</span>
                    </p>
                    <ul className="mt-4 space-y-2 text-[0.95rem]">
                      {p.features.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <CheckIcon size={16} className="price-check mt-[0.2rem] shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={contact(`${p.name} monthly package (${usd(p.price)}/month)`)} className="price-plan-cta">
                      Get Started <span aria-hidden="true">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="price-note mt-5">Monthly prices are starting estimates. Final pricing depends on project scope.</p>
            </div>
          </div>

          {/* 3. Custom quote + add ons */}
          <div {...panel("custom")}>
            <div className="price-row-head">
              <PlanIcon tab={TABS[2]!} />
              <h3 className="t-h4">Custom quotes</h3>
            </div>
            <div className="price-row-body">
              <p className="font-display text-lg leading-snug">{pricing.custom[0]}</p>
              <p className="mt-2 text-muted">{pricing.custom[1]}</p>

              <div className="addons mt-6">
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${uid}-addons`}
                  onClick={() => setOpen((o) => !o)}
                  className="addons-toggle"
                >
                  <span className="flex flex-wrap items-center gap-2">
                    View Optional Add ons
                    {addOns.length > 0 && <span className="addons-count">{addOns.length} selected</span>}
                  </span>
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={cn("shrink-0 transition-transform duration-300", open && "rotate-180")}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div id={`${uid}-addons`} hidden={!open}>
                  <fieldset className="addons-list">
                    <legend className="price-note px-4 pt-3">Select any add ons you’d like included in your quote.</legend>
                    {pricing.addOns.map((a) => (
                      <label key={a} className="addon">
                        <input type="checkbox" checked={addOns.includes(a)} onChange={() => toggle(a)} />
                        <span aria-hidden="true" className="addon-dot" />
                        <span>{a}</span>
                      </label>
                    ))}
                  </fieldset>
                </div>
              </div>

              {pricing.separateCosts && <p className="price-note mt-4">{pricing.separateCosts}</p>}

              <Link href={contact("Custom quote", addOns)} className="price-cta mt-6">
                Request a Custom Quote <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <p className="price-note mt-6">Prices shown are starting estimates in USD. Final costs depend on project requirements. Domain registration, hosting, third party subscriptions, API usage and advertising spend are charged separately where applicable.</p>
      </div>
    </section>
  );
}
