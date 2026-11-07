"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/data/types";
import { getService } from "@/data/services";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { ArrowUpRight } from "@/components/ui/Icons";

interface ProjectCardProps {
  project: Project;
  /** CSS aspect-ratio for the artwork, e.g. "4 / 3" or "1 / 1" */
  aspect?: string;
  className?: string;
}

/**
 * Editorial project card (DESIGN.md §4.6). All information stays visible on touch — hover only adds a slow image push.
 * GSAP owns the artwork reveal (clip-path mask + scale settle) on the two wrapper layers; the hover scale
 * lives on a third inner layer in CSS, so no two systems ever write the same property on the same node.
 */
export function ProjectCard({ project, aspect = "4 / 3", className }: ProjectCardProps) {
  const root = useRef<HTMLElement>(null);
  const mask = useRef<HTMLDivElement>(null);
  const settle = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = { trigger: root.current, start: "top 86%", once: true };
        gsap.fromTo(mask.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power3.inOut", scrollTrigger: st });
        gsap.fromTo(settle.current, { scale: 1.08 }, { scale: 1, duration: 1.5, ease: "power3.out", scrollTrigger: st });
      });
    },
    { scope: root },
  );

  const tags = project.serviceTags
    .map((slug) => getService(slug)?.shortTitle)
    .filter((t): t is string => Boolean(t));

  return (
    <article ref={root} className={cn("group relative", className)}>
      <div ref={mask} className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface">
        <div ref={settle} style={{ aspectRatio: aspect }}>
          {project.heroImage ? (
            // Real project imagery slot — swap to next/image once approved assets exist.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.heroImage} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <ProjectArt
              variant={project.art}
              className="h-full w-full transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.035] group-focus-within:scale-[1.035]"
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        {project.isConcept && <span className="pill pill-outline">Concept project</span>}
        <span className="text-sm text-subtle">{project.industry}</span>
      </div>

      <h3 className="t-h3 mt-3 max-w-[24ch]">
        <Link
          href={`/work/${project.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          onClick={() => track("case_study_open", { project: project.slug })}
        >
          {project.title}
        </Link>
      </h3>
      <p className="t-body mt-3 max-w-[46ch] text-[0.98rem]">{project.summary}</p>

      <div className="mt-5 flex items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span
          aria-hidden="true"
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-[var(--color-on-accent)] group-focus-within:border-accent group-focus-within:bg-accent group-focus-within:text-[var(--color-on-accent)]"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Focus ring for the stretched link, drawn around the whole card */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-[calc(var(--radius-card)+8px)] ring-2 ring-transparent transition-shadow group-has-[a:focus-visible]:ring-accent-bright"
      />
    </article>
  );
}
