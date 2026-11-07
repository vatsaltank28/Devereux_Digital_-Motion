import type { Project, Service } from "@/data/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

/** S05 — Portfolio / past work for this service. Shows concept studies honestly until approved work exists. */
export function ServiceProjects({ service, projects }: { service: Service; projects: Project[] }) {
  const shown = projects.slice(0, 3);
  const concept = shown.some((p) => p.isConcept);
  return (
    <section id="work" aria-labelledby="service-work-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel>Work</SectionLabel>
            <SplitHeading id="service-work-title" className="t-h2 mt-5">
              {service.shortTitle} work
            </SplitHeading>
            {concept && (
              <p className="t-body mt-5 max-w-[34rem]">
                Concept studies that show how we approach this kind of brief. Approved client work will replace them.
              </p>
            )}
          </div>
          <LinkButton href="/work" variant="secondary" arrow location={`service-work:${service.slug}`}>
            All work
          </LinkButton>
        </div>

        {shown.length > 0 ? (
          <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
            {shown.map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="t-body">No published projects for this service yet.</p>
        )}
      </div>
    </section>
  );
}
