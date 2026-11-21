import Link from "next/link";
import { projectsForService } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/work/ProjectCard";

/**
 * Case studies for this service, shown first on the service page (client request: proof before
 * anything else). Swipeable row on phones to keep scrolling short, grid from tablet up.
 * Renders nothing for services without case studies.
 */
export function ServiceCaseStudies({ slug, serviceTitle }: { slug: string; serviceTitle: string }) {
  const studies = projectsForService(slug).filter((p) => p.caseStudy);
  if (studies.length === 0) return null;
  const cat = studies[0]!.category;
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 md:mb-8">
          <div>
            <SectionLabel>{`${serviceTitle} case studies`}</SectionLabel>
            <h2 id="case-studies-title" className="t-h2 mt-4">
              Real projects, live results.
            </h2>
          </div>
          <Link href={`/work?category=${cat}`} className="link-arrow inline-flex min-h-11 items-center text-sm">
            All {studies.length > 1 ? `${studies.length} ` : ""}case studies
          </Link>
        </div>
        <ul className="svc-cs">
          {studies.map((p) => (
            <li key={p.slug} className="flex">
              <ProjectCard project={p} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
