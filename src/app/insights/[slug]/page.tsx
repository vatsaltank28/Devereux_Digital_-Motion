import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleCover, categoryOf, getArticle, readMinutes, relatedArticles } from "@/data/insights";
import { getService } from "@/data/services";
import { site } from "@/lib/site";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/services/FAQAccordion";
import { ArticleBlocks } from "@/components/insights/ArticleBlocks";
import { InsightCard } from "@/components/insights/InsightCard";

type Params = { slug: string };
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) return {};
  return buildMetadata({ title: a.seoTitle, description: a.description, path: `/insights/${a.slug}`, image: articleCover(a) });
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();

  const cat = categoryOf(a.category);
  const service = getService(cat.service);
  const related = relatedArticles(a);
  const url = `${site.url}/insights/${a.slug}`;
  const share = [
    { label: "Share on LinkedIn", short: "in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "Share on X", short: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(a.title)}` },
    { label: "Share on Facebook", short: "f", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  ];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights & Guides", path: "/insights" },
          { name: a.title, path: `/insights/${a.slug}` },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: a.seoTitle,
          description: a.description,
          image: `${site.url}${articleCover(a)}`,
          mainEntityOfPage: url,
          author: { "@type": "Person", name: "Lorenzo Devereux", url: `${site.url}/about` },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
          keywords: [a.primaryKeyword, ...a.keywords].join(", "),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <div className="art-progress" aria-hidden="true" />

      <article>
        <header className="art-hero pt-[calc(var(--header-h)+1.25rem)] sm:pt-[calc(var(--header-h)+2.5rem)]">
          <div className="wrap-wide">
            <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Insights", href: "/insights" }, { name: cat.short, href: `/insights#${cat.id}` }]} />
            <p className="insight-meta mt-5"><span>{cat.label}</span><span aria-hidden="true">·</span><span>{readMinutes(a)} min read</span></p>
            <h1 className="art-title mt-3">{a.title}</h1>
            <p className="t-body mt-4 max-w-[62ch]">{a.description}</p>
            {a.forWho && <p className="mt-3 text-sm font-medium text-ink">For: {a.forWho}</p>}
            <p className="mt-5 flex items-center gap-3 text-sm text-muted">
              <span aria-hidden="true" className="art-avatar">LD</span>
              <span><span className="block font-semibold text-ink">Lorenzo Devereux</span>Founder & CEO, {site.name}</span>
            </p>
          </div>
        </header>

        <div className="wrap-wide mt-7 md:mt-10">
          <div className="art-cover">
            <Image src={articleCover(a)} alt={a.coverConcept} width={1600} height={900} priority sizes="(max-width: 1440px) 94vw, 1360px" className="h-full w-full object-cover" />
          </div>
        </div>

        <div className="wrap-wide art-layout">
          <aside className="art-rail" aria-label="Share this article">
            <p className="art-rail-k">Share</p>
            {share.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="art-share">{s.short}</a>
            ))}
          </aside>

          <div className="art-body">
            {a.intro.map((p) => <p key={p} className="art-lead">{p}</p>)}

            <aside className="art-takeaways" aria-labelledby="takeaways-title">
              <p id="takeaways-title" className="art-takeaways-title">Key takeaways</p>
              <ul>
                {a.takeaways.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </aside>

            {a.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="art-section">
                <h2 id={`${s.id}-h`}>{s.title}</h2>
                <ArticleBlocks blocks={s.blocks} />
              </section>
            ))}

            {a.tools && a.tools.length > 0 && (
              <section id="tools" aria-labelledby="tools-h" className="art-section">
                <h2 id="tools-h">Tools and technologies</h2>
                <ul className="art-tools">
                  {a.tools.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </section>
            )}

            <section id="faqs" aria-labelledby="faqs-h" className="art-section">
              <h2 id="faqs-h">Frequently asked questions</h2>
              <FAQAccordion faqs={a.faqs.map((f, i) => ({ id: `${a.slug}-${i}`, question: f.q, answer: f.a, sortOrder: i }))} />
            </section>

            <section id="conclusion" aria-labelledby="conclusion-h" className="art-section">
              <h2 id="conclusion-h">Conclusion</h2>
              {a.conclusion.map((p) => <p key={p}>{p}</p>)}
            </section>

            <aside className="art-cta" aria-labelledby="art-cta-title">
              <p id="art-cta-title" className="art-cta-title">{a.cta?.title ?? "Want to put this into practice?"}</p>
              <p className="art-cta-text">{a.cta?.text ?? "Tell us where things stand today."}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
                <LinkButton href={service ? `/contact?service=${service.slug}` : "/contact"} location={`insight-cta:${a.slug}`} arrow>
                  {a.cta?.label ?? "Start a conversation"}
                </LinkButton>
                {service && (
                  <Link href={`/services/${service.slug}`} className="link-quiet inline-flex min-h-11 items-center text-sm">
                    See our {service.shortTitle} service
                  </Link>
                )}
              </div>
            </aside>

            <p className="mt-8">
              <Link href={`/insights#${cat.id}`} className="link-quiet inline-flex min-h-11 items-center text-sm">
                Back to {cat.short} guides
              </Link>
            </p>
          </div>

          <nav className="art-toc" aria-label="On this page">
            <p className="art-rail-k">On this page</p>
            <ol>
              {a.sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
              ))}
              <li><a href="#faqs">FAQs</a></li>
            </ol>
          </nav>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="more-title" className="section-tight border-t border-line">
          <div className="wrap-wide">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-7">
              <h2 id="more-title" className="t-h2">More from Insights & Guides.</h2>
              <Link href="/insights" className="link-arrow inline-flex min-h-11 items-center text-sm">All guides</Link>
            </div>
            <ul className="svc-cs">
              {related.map((r) => (
                <li key={r.slug} className="flex"><InsightCard article={r} className="w-full" /></li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
