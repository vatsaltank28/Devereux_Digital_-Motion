import Link from "next/link";
import type { Project } from "@/data/types";
import { getService } from "@/data/services";
import { getRelatedProjects } from "@/data/projects";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { ProjectCard } from "./ProjectCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { CheckIcon } from "@/components/ui/Icons";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line py-12 md:py-16">
      <div className="wrap-wide grid gap-6 lg:grid-cols-12 lg:gap-16">
        <h2 className="t-h3 lg:col-span-4">{title}</h2>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

/** Case-study detail (PRD §11): overview, challenge, approach, deliverables, visuals, verified results, related, CTA. */
export function CaseStudyLayout({ project }: { project: Project }) {
  const services = project.serviceTags
    .map((slug) => getService(slug))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = getRelatedProjects(project.slug, 3);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ])}
      />

      <header className="relative isolate overflow-hidden pb-12 pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)] lg:pb-16">
        <div className="hero-atmosphere absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="wrap-wide">
          <div className="mb-8">
            <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: project.title }]} />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {project.isConcept && <span className="pill">Concept project</span>}
            <span className="text-sm text-muted">{project.industry}</span>
          </div>
          <SplitHeading as="h1" trigger="load" delay={0.05} className="t-h1 mt-6 max-w-[18ch]">
            {project.title}
          </SplitHeading>
          <p className="hero-rise t-lead mt-7" style={{ animationDelay: "0.4s" }}>
            {project.summary}
          </p>
          <dl className="hero-rise mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-6 text-sm" style={{ animationDelay: "0.55s" }}>
            <div>
              <dt className="text-subtle">Services</dt>
              <dd className="mt-1.5 space-y-1">
                {services.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="link-quiet block text-ink">
                    {s.shortTitle}
                  </Link>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-subtle">Type</dt>
              <dd className="mt-1.5 text-ink">{project.isConcept ? "In-house concept study" : "Client project"}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="wrap-wide">
        <Reveal y={20}>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface" style={{ aspectRatio: "16 / 10" }}>
            {project.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={project.heroImage} alt="" className="h-full w-full object-cover" />
            ) : (
              <ProjectArt variant={project.art} className="h-full w-full" />
            )}
          </div>
        </Reveal>
        {project.isConcept && (
          <p className="t-caption mt-3">
            Concept artwork. This is an in-house study, not a commissioned client project, and it makes no claims about results.
          </p>
        )}
      </div>

      <div className="mt-16 md:mt-24">
        <Block title="Challenge">
          <p className="t-lead max-w-[36rem]">{project.challenge}</p>
        </Block>
        <Block title="Approach">
          <p className="t-lead max-w-[36rem]">{project.approach}</p>
        </Block>
        <Block title="Deliverables">
          <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {project.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-[1.02rem]">
                <CheckIcon className="mt-1 shrink-0 text-accent-bright" />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block title="Results">
          {project.results.length > 0 ? (
            <ul className="space-y-4">
              {project.results.map((r) => (
                <li key={r} className="t-lead">
                  {r}
                </li>
              ))}
            </ul>
          ) : (
            <p className="t-body">
              {project.isConcept
                ? "No results are claimed for concept studies."
                : "Verified outcomes will be added once approved by the client."}
            </p>
          )}
        </Block>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="section-tight border-t border-line">
          <div className="wrap-wide">
            <h2 id="related-title" className="t-h2 mb-12">
              Related work
            </h2>
            <ul className="grid gap-x-8 gap-y-14 md:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCTA
        heading="Have a similar brief?"
        description="Tell us about your project and we’ll reply to talk through how we’d approach it."
        service={services[0]?.slug}
        location={`case-study:${project.slug}`}
      />
    </>
  );
}
