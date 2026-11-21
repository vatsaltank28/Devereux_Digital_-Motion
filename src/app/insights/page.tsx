import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles, articleCover, categoryOf, insightCategories, readMinutes } from "@/data/insights";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { InsightCard } from "@/components/insights/InsightCard";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Insights & Guides: Websites, E-commerce, AI Automation & Software",
  description:
    "Practical guides for business owners on websites that generate leads, e-commerce stores that convert, AI automation and custom software. Written by the Devereux Digitals team.",
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
        title="Practical guides for growing businesses."
        description="Clear, no fluff advice on websites, online stores, AI automation and custom software. Real problems, practical fixes and the tools to use."
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
            <div className="wrap-wide">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-7">
                <div>
                  <p className="cs-label">{c.short}</p>
                  <h2 id={`${c.id}-title`} className="t-h2 mt-3">{c.label}</h2>
                  <p className="t-body mt-2 max-w-[52ch]">{c.blurb}</p>
                </div>
                <Link href={`/services/${c.service}`} className="link-arrow inline-flex min-h-11 items-center text-sm">Related service</Link>
              </div>
              <ul className="svc-cs">
                {list.map((a) => (
                  <li key={a.slug} className="flex">
                    <InsightCard article={a} className="w-full" />
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      <FinalCTA location="insights-final-cta" />
    </>
  );
}
