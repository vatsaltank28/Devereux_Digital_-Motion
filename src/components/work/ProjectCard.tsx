import Image from "next/image";
import Link from "next/link";
import { categoryLabel, coverImage, type PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/** Portfolio card styled as a browser window: thumbnail, type badge, mono stack line, title, summary. */
export function ProjectCard({ project, className, priority, headingLevel = 3 }: { project: PortfolioProject; className?: string; priority?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const thumb = coverImage(project.media[0]);
  const cs = project.caseStudy;
  const badge = cs?.badge ?? (project.kind === "collection" ? "Work samples" : categoryLabel(project.category));
  const tags = cs?.tags ?? project.tech;
  return (
    <article className={cn("project-card group", className)}>
      <div className="project-card-chrome" aria-hidden="true">
        <span /><span /><span />
      </div>
      <div className="project-card-media">
        <Image
          src={thumb.src}
          alt={thumb.alt}
          width={thumb.width}
          height={thumb.height}
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 32vw"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
        <span className="project-card-badge">{badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="project-card-meta">{tags && tags.length > 0 ? tags.join(" · ") : categoryLabel(project.category)}</p>
        <H className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-muted">{project.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-bright" aria-hidden="true">
          {cs ? "View case study" : "View project"} <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </article>
  );
}
