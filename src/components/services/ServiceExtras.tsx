import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * Compact, service specific information blocks (master prompt §9 to §12, §21).
 * Every statement here restates commitments already made in the FAQs, pricing or Terms,
 * and platforms are only those listed in the client's own service scope.
 */

const PLATFORMS: Record<string, string[]> = {
  "ecommerce-solutions": ["Shopify", "WooCommerce"],
  "paid-advertising": ["Meta Ads (Facebook & Instagram)", "Google Ads"],
};

const AUTOMATE = [
  { title: "AI chatbots", text: "Answer customer questions, capture enquiries and support visitors." },
  { title: "Lead automation", text: "Capture, qualify and route leads, with timely follow ups." },
  { title: "CRM automation", text: "Keep contacts organised and pipelines up to date." },
  { title: "Workflow automation", text: "Connect your tools and remove repetitive manual steps." },
  { title: "AI assistants", text: "Help with information processing and repetitive tasks." },
  { title: "Custom AI tools", text: "Solutions designed around one specific workflow." },
];

const WORKFLOW = ["Customer enquiry", "Automation captures data", "Lead qualification", "CRM updated", "Team notified"];

const TRUST: Record<string, { title: string; points: string[] }> = {
  "ai-business-solutions": {
    title: "How we handle your systems",
    points: [
      "Data handling is agreed before work starts: which tools touch your data and where it goes.",
      "A human review step wherever an error would matter.",
      "Third party API usage and subscriptions are billed separately from our fees.",
      "Ownership and access to workflows are confirmed in your proposal.",
      "Monitoring and adjustments are available through our monthly packages.",
      "We explain plainly what a tool can and can’t be relied on to do.",
    ],
  },
  "paid-advertising": {
    title: "How we manage your budget",
    points: [
      "We recommend your business owns its ad accounts, with access given to us.",
      "Advertising spend is paid separately from our management fees.",
      "Campaign objectives are agreed before anything launches.",
      "Conversion tracking is set up where the platform allows.",
      "Results are reported transparently, and no specific return is guaranteed.",
    ],
  },
  "digital-marketing": {
    title: "Organic marketing, not paid ads",
    points: [
      "This service covers strategy, social media management, content calendars and organic growth.",
      "It also includes community engagement, lead nurturing and performance reporting.",
      "Paid campaigns are a separate service, and the two work well together.",
    ],
  },
};

function Tick() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="expect-tick">
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export function ServiceExtras({ slug }: { slug: string }) {
  const platforms = PLATFORMS[slug];
  const trust = TRUST[slug];
  const isAi = slug === "ai-business-solutions";
  if (!platforms && !trust && !isAi) return null;

  return (
    <section aria-label="Service details" className="border-t border-line py-8 md:py-12">
      <div className="wrap-wide space-y-8 md:space-y-10">
        {isAi && (
          <div>
            <SectionLabel>Capabilities</SectionLabel>
            <h2 className="t-h3 mt-4">What can we automate?</h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">
              {AUTOMATE.map((a) => (
                <li key={a.title} className="rounded-2xl border border-line bg-surface p-4">
                  <h3 className="font-display font-semibold">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{a.text}</p>
                </li>
              ))}
            </ul>
            <figure className="mt-6 rounded-2xl border border-dashed border-line-strong p-4 md:p-5">
              <figcaption className="text-xs font-semibold uppercase tracking-[0.1em] text-subtle">Example workflow, for illustration</figcaption>
              <ol className="workflow mt-3">
                {WORKFLOW.map((w, i) => (
                  <li key={w} className="workflow-step">
                    <span className="workflow-num">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ol>
            </figure>
          </div>
        )}

        {(trust || platforms) && (
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            {trust && (
              <div className="lg:col-span-8">
                <h2 className="t-h4">{trust.title}</h2>
                <ul className="mt-3 space-y-2">
                  {trust.points.map((p) => (
                    <li key={p} className="expect-item">
                      <Tick />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {platforms && (
              <div className="lg:col-span-4">
                <h2 className="t-h4">Platforms we work with</h2>
                <ul className="chip-group mt-3">
                  {platforms.map((p) => (
                    <li key={p} className="home-chip">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
