import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";
import { showCampaignMetrics, type MarketingCaseStudy } from "@/data/marketingCaseStudies";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";

/** Compact marketing case study. Performance figures render only when confirmed (or in local preview). */
export function MarketingCaseStudyView({ p, cs, prev, next }: { p: PortfolioProject; cs: MarketingCaseStudy; prev: PortfolioProject; next: PortfolioProject }) {
  const showMetrics = showCampaignMetrics(cs);
  const facts = [
    { label: "Industry", value: cs.industry },
    { label: "Campaign", value: cs.campaignType },
    { label: "Duration", value: cs.duration },
    { label: "Target market", value: cs.market },
    ...(showMetrics ? [{ label: cs.budgetLabel, value: cs.budget }] : []),
  ];
  const story = [
    { title: "Overview", body: cs.overview },
    { title: "The challenge", body: cs.challenge },
    { title: "Our strategy", body: cs.strategy },
  ];

  return (
    <article className="cs">
      <header className="pt-[calc(var(--header-h)+1.25rem)] sm:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="wrap-wide">
          <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Marketing", href: "/services/digital-marketing" }, { name: p.title }]} />
          <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <span className="cs-badge">{cs.categoryName}</span>
              <h1 className="t-h1 mt-3">{p.title}</h1>
              <p className="t-lead mt-3 max-w-[32ch]">{cs.headline}</p>
            </div>
            <dl className="cs-facts lg:col-span-5">
              {facts.map((f) => (
                <div key={f.label} className="cs-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      {showMetrics && (
        <section aria-labelledby="performance-title" className="cs-section">
          <div className="wrap-wide">
            <h2 id="performance-title" className="t-h3">Campaign performance</h2>
            <dl className="mk-tiles mt-5">
              {cs.tiles.map((t, i) => (
                <div key={t.label} className={i === 0 ? "mk-tile is-primary" : "mk-tile"}>
                  <dt>{t.label}</dt>
                  <dd>{t.value}</dd>
                </div>
              ))}
            </dl>
            <details className="mk-more">
              <summary>View all campaign metrics</summary>
              <dl>
                <div><dt>{cs.budgetLabel}</dt><dd>{cs.budget}</dd></div>
                {cs.moreMetrics.map((m) => (
                  <div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>
                ))}
              </dl>
            </details>
          </div>
        </section>
      )}

      <section aria-label="Campaign story" className="cs-section border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-7 lg:col-span-6">
            {story.map((s) => (
              <div key={s.title}>
                <h2 className="t-h4">{s.title}</h2>
                <p className="t-body mt-2">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="t-h4">What we did</h2>
            <ul className="mt-4 space-y-3">
              {cs.actions.map((a) => (
                <li key={a} className="cs-ring-item">{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="impact-title" className="cs-section pt-0">
        <div className="wrap-wide">
          <div className="mk-impact">
            <div>
              <h2 id="impact-title" className="t-h3">The impact</h2>
              <p className="t-body mt-3 max-w-[62ch]">{showMetrics ? cs.impact : cs.outcome}</p>
            </div>
            <LinkButton href={`/contact?service=${cs.service}`} arrow location={`marketing-case-study:${p.slug}`} className="shrink-0 max-sm:w-full">
              Start a project
            </LinkButton>
          </div>
        </div>
      </section>

      <nav aria-label="More marketing case studies" className="cs-section pt-0">
        <div className="wrap-wide grid grid-cols-2 gap-3 sm:gap-4">
          <Link href={`/work/${prev.slug}`} className="cs-pn">
            <span className="cs-pn-k">Previous</span>
            <span className="cs-pn-t">← {prev.title}</span>
          </Link>
          <Link href={`/work/${next.slug}`} className="cs-pn items-end text-right">
            <span className="cs-pn-k">Next</span>
            <span className="cs-pn-t">{next.title} →</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
