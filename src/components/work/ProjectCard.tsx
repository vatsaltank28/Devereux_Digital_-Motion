import Image from "next/image";
import Link from "next/link";
import { categoryLabel, coverImage, type PortfolioProject } from "@/data/portfolio";
import { cn } from "@/lib/cn";

/** Reusable portfolio card: thumbnail, category, title, short description, View Project. */
export function ProjectCard({ project, className, priority }: { project: PortfolioProject; className?: string; priority?: boolean }) {
  const cover = project.media[0];
  const thumb = coverImage(cover);
  return (
    <article className={cn("project-card group", className)}>
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
        {project.media.some((m) => m.type === "video") && (
          <span className="project-card-badge">Video</span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="project-card-meta">
          <span>{categoryLabel(project.category)}</span>
          {project.kind === "collection" && <span className="text-subtle">· Work samples</span>}
        </p>
        <h3 className="mt-1.5 font-display text-lg font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-muted">{project.summary}</p>
        {project.tech && project.tech.length > 0 && (
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.08em] text-subtle">{project.tech.join(" · ")}</p>
        )}
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-bright" aria-hidden="true">
          View project <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </article>
  );
}
