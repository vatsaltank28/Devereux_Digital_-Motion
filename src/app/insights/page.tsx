import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles, articleCover, categoryOf, insightCategories, readMinutes } from "@/data/insights";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Insights & Guides: Websites, Ecommerce, AI Automation & Software",
  description:
    "Practical guides for business owners, each solving one specific problem with a website, online store, automation or custom software.",
  path: "/insights",
  image: articleCover(articles[0]!),
});

export default function InsightsPage() {
  const featured = articles[0]!;
  const fcat = categoryOf(featured.category);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Insights & Guides", path: "/insights" }])} />
      <PageHero
        label="Insights & Guides"
        title="Specific answers to digital problems."
        description="Practical guides for businesses on websites, online stores, automation and software. One problem per guide."
        trail={[{ name: "Home", href: "/" }, { name: "Insights & Guides" }]}
      />

      <section aria-label="Featured guide" className="pb-8 md:pb-12">
        <div className="wrap-wide">
          <article className="insight-featured group">
            <div className="insight-featured-media">
              <Image src={articleCover(featured)} alt="" width={1600} height={900} priority sizes="(max-width: 1024px) 92vw, 55vw" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-7 lg:p-10">
              <p className="insight-meta"><span>Featured</span><span aria-hidden="true">·</span><span>{fcat.short}</span><span aria-hidden="true">·</span><span>{readMinutes(featured)} min read</span></p>
              <h2 className="t-h3 mt-3">
                <Link href={`/insights/${featured.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">{featured.title}</Link>
              </h2>
              <p className="t-body mt-3">{featured.excerpt}</p>
              {featured.forWho && <p className="mt-3 text-sm text-muted">For: {featured.forWho}</p>}
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-bright" aria-hidden="true">Read the guide <span className="transition-transform group-hover:translate-x-0.5">→</span></span>
            </div>
          </article>

          <nav aria-label="Guide categories" className="insight-cats mt-6">
            {insightCategories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="insight-cat">
                {c.label} <span className="work-filter-count">{articles.filter((a) => a.category === c.id).length}</span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      {insightCategories.map((c) => {
        const list = articles.filter((a) => a.category === c.id);
        return (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="section-tight border-t border-line scroll-mt-[calc(var(--header-h)+1rem)]">
            <div className="wrap-wide grid gap-6 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                  <h2 id={`${c.id}-title`} className="t-h3">{c.short}</h2>
                  <p className="t-body mt-2 max-w-[34ch]">{c.blurb}</p>
                  <Link href={`/services/${c.service}`} className="link-arrow mt-2 inline-flex min-h-11 items-center text-sm" aria-label={`Related service for ${c.short}`}>Related service</Link>
                </div>
              </div>
              <ul className="guide-index lg:col-span-8">
                {list.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/insights/${a.slug}`} className="guide-row">
                      <span className="guide-row-title">{a.title}</span>
                      <span className="guide-row-for">{a.forWho}</span>
                      <span className="guide-row-time">{readMinutes(a)} min</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <FinalCTA
        heading="Don't see your problem here?"
        description="Tell us what you're working through."
        primaryLabel="Ask us directly"
        location="insights-final-cta"
      />
    </>
  );
}
