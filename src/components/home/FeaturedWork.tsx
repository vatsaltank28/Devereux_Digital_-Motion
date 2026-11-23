import Link from "next/link";
import { categoryLabel, featuredProjects, type PortfolioCategory } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ProjectCard } from "@/components/work/ProjectCard";
import { WorkFilter } from "./WorkFilter";

const TOP = new Set(["reloop", "apparelnbags", "seamless-ai", "law-firm-brand-identity", "clip", "anhem"]);
const CATEGORIES: PortfolioCategory[] = ["web", "ecommerce", "ai", "branding"];
const filters = [
  { id: "all", label: "All", count: TOP.size },
  ...CATEGORIES.map((id) => ({ id, label: categoryLabel(id), count: featuredProjects.filter((p) => p.category === id).length })),
];

/** Selected work with a light filter. "All" shows the strongest six; a category shows all of its featured work. */
export function FeaturedWork() {
  return (
    <section id="selected-work" aria-labelledby="featured-work-title" className="section-tight scroll-mt-[var(--header-h)] border-t border-line">
      <div className="wrap-wide">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <h2 id="featured-work-title" className="t-h2 mt-4 max-w-[18ch]">Ideas brought to life.</h2>
          </div>
          <Link href="/work" className="link-arrow inline-flex min-h-11 items-center">Explore all projects</Link>
        </div>
        <WorkFilter filters={filters}>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p) => (
              <li key={p.slug} className="sw-item flex" data-cat={p.category} data-top={TOP.has(p.slug) || undefined}>
                <ProjectCard project={p} className="w-full" />
              </li>
            ))}
          </ul>
        </WorkFilter>
      </div>
    </section>
  );
}
