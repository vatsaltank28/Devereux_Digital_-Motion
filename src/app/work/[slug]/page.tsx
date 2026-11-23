import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolio, demoProjects, getProject, coverImage, categoryLabel, portfolioCategories, relatedProjects } from "@/data/portfolio";
import { MarketingCaseStudyView } from "@/components/work/MarketingCaseStudyView";
import { getService } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { LinkButton } from "@/components/ui/Button";
import { MediaGallery } from "@/components/work/MediaGallery";
import { ProjectCard } from "@/components/work/ProjectCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { CaseStudyView } from "@/components/work/CaseStudyView";

type Params = { slug: string };
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return portfolio.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  if (p.demo) {
    return buildMetadata({ title: `${p.title} Case Study | ${p.demo.categoryName}`, description: p.demo.headline, path: `/work/${p.slug}`, noindex: !p.demo.resultsConfirmed });
  }
  const cover = p.media[0];
  const img = coverImage(cover);
  return buildMetadata({ title: p.caseStudy ? `${p.title} Case Study | ${categoryLabel(p.category)}` : `${p.title} | ${categoryLabel(p.category)}`, description: p.summary, path: `/work/${p.slug}`, image: img.src });
}

/** Reusable case study template. Every section after the gallery renders only when real data exists. */
export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const serviceSlug = portfolioCategories.find((c) => c.id === p.category)?.service ?? "";
  const service = getService(serviceSlug);
  const related = relatedProjects(p);
  const story: { title: string; body?: string }[] = [
    { title: "Overview", body: p.overview },
    { title: "The challenge", body: p.challenge },
    { title: "Our solution", body: p.solution },
  ].filter((s) => s.body);

  if (p.demo) {
    const i = demoProjects.findIndex((x) => x.slug === p.slug);
    const prev = demoProjects[(i - 1 + demoProjects.length) % demoProjects.length]!;
    const next = demoProjects[(i + 1) % demoProjects.length]!;
    return (
      <>
        <MarketingCaseStudyView p={p} cs={p.demo} prev={prev} next={next} />
        <FinalCTA heading={p.demo.cta.title} description={p.demo.cta.body} service={p.demo.service} primaryLabel="Start a project" location={`demo-cta:${p.slug}`} />
      </>
    );
  }

  if (p.caseStudy) {
    const studies = portfolio.filter((x) => x.caseStudy);
    const i = studies.findIndex((x) => x.slug === p.slug);
    const prev = studies[(i - 1 + studies.length) % studies.length];
    const next = studies[(i + 1) % studies.length];
    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: p.title, path: `/work/${p.slug}` },
          ])}
        />
        <CaseStudyView p={p} cs={p.caseStudy} prev={prev} next={next} />
        <FinalCTA service={serviceSlug || undefined} location={`project-cta:${p.slug}`} />
      </>
    );
  }

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: p.title, path: `/work/${p.slug}` },
        ])}
      />
      <header className="pt-[calc(var(--header-h)+1.5rem)] sm:pt-[calc(var(--header-h)+3rem)]">
        <div className="wrap-wide">
          <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: p.title }]} />
          <div className="mt-6 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-8">
              <SectionLabel>{categoryLabel(p.category)}</SectionLabel>
              <h1 className="t-h1 mt-5 max-w-[20ch]">{p.title}</h1>
            </div>
            <div className="lg:col-span-4">
              <p className="t-body">{p.summary}</p>
              {p.kind === "collection" && (
                <p className="t-caption mt-3">A collection of work samples. Full project write ups are being prepared.</p>
              )}
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Project gallery" className="py-8 md:py-12">
        <div className="wrap-wide">
          <MediaGallery media={p.media} title={p.title} />
        </div>
      </section>

      {(story.length > 0 || p.deliverables?.length || p.tech?.length || p.results?.length) && (
        <section aria-label="Project details" className="border-t border-line py-10 md:py-14">
          <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-8 lg:col-span-7">
              {story.map((s) => (
                <div key={s.title}>
                  <h2 className="t-h4">{s.title}</h2>
                  <p className="t-body mt-2.5">{s.body}</p>
                </div>
              ))}
              {p.results && p.results.length > 0 && (
                <div>
                  <h2 className="t-h4">Results</h2>
                  <ul className="mt-3 space-y-2">
                    {p.results.map((r) => (
                      <li key={r} className="t-body">{r}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <aside className="space-y-8 lg:col-span-4 lg:col-start-9">
              {p.deliverables && p.deliverables.length > 0 && (
                <div>
                  <h2 className="t-h4">Deliverables</h2>
                  <ul className="mt-3 space-y-2.5">
                    {p.deliverables.map((d) => (
                      <li key={d} className="expect-item">{d}</li>
                    ))}
                  </ul>
                </div>
              )}
              {p.tech && p.tech.length > 0 && (
                <div>
                  <h2 className="t-h4">Technology</h2>
                  <ul className="chip-group mt-3">
                    {p.tech.map((t) => (
                      <li key={t} className="home-chip">{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </aside>
          </div>
        </section>
      )}

      <section aria-label="Project links" className="border-t border-line py-8 md:py-10">
        <div className="wrap-wide flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {p.liveUrl && (
            <LinkButton href={p.liveUrl} arrow location={`live-project:${p.slug}`} className="max-sm:w-full">
              View Live Project
            </LinkButton>
          )}
          {service && (
            <LinkButton href={`/services/${service.slug}`} variant="secondary" location={`project-service:${p.slug}`} className="max-sm:w-full">
              About {service.shortTitle}
            </LinkButton>
          )}
          <Link href="/work" className="link-arrow sm:ml-2">
            Explore all work
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-tight border-t border-line">
          <div className="wrap-wide">
            <h2 id="related-title" className="t-h3">Related work</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="flex">
                  <ProjectCard project={r} className="w-full" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA service={serviceSlug || undefined} location={`project-cta:${p.slug}`} />
    </>
  );
}
