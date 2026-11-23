import Image from "next/image";
import Link from "next/link";
import type { MediaImage } from "@/data/media";
import { projectsForService } from "@/data/portfolio";
import { Lightbox } from "@/components/ui/Lightbox";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/work/ProjectCard";

/**
 * Live projects for this service, shown directly under the hero (client request: real work first).
 * Swipeable row on phones, grid from tablet up, with the service's feature image underneath.
 * Renders nothing for services without case studies.
 */
export function ServiceCaseStudies({ slug, serviceTitle, spotlight }: { slug: string; serviceTitle: string; spotlight?: MediaImage }) {
  const studies = projectsForService(slug).filter((p) => p.caseStudy);
  if (studies.length === 0) return null;
  const cat = studies[0]!.category;
  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="section-tight scroll-mt-[var(--header-h)] border-t border-line">
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
        {spotlight && (
          <figure className="mx-auto mt-8 max-w-5xl md:mt-12">
            <Lightbox image={spotlight} label={`View full size: ${spotlight.alt}`} caption={`${serviceTitle}: ${spotlight.alt}`} className="work-tile group block w-full text-left">
              <Image
                src={spotlight.src}
                alt={spotlight.alt}
                width={spotlight.width}
                height={spotlight.height}
                sizes="(max-width: 1024px) 92vw, 64rem"
                quality={90}
                className="h-auto w-full"
              />
            </Lightbox>
            <figcaption className="t-caption mt-3">{spotlight.alt}</figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
