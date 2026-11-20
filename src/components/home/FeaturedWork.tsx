import Link from "next/link";
import { featuredProjects } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ProjectCard } from "@/components/work/ProjectCard";

/** Homepage Selected Work: one strong project per pillar, each opening its own case study. */
export function FeaturedWork() {
  return (
    <section aria-labelledby="featured-work-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div>
            <SectionLabel>Selected work</SectionLabel>
            <SplitHeading id="featured-work-title" className="t-h2 mt-5 max-w-[18ch]">
              Ideas brought to life.
            </SplitHeading>
            <p className="t-body mt-4 max-w-[36rem]">
              A selection of digital experiences, creative projects and business solutions we’ve delivered.
            </p>
          </div>
          <Link href="/work" className="link-arrow max-sm:hidden">
            Explore All Projects
          </Link>
        </div>
        <ul className="review-rail flex gap-4 md:grid md:grid-cols-2 xl:grid-cols-4">
          {featuredProjects.slice(0, 4).map((p) => (
            <li key={p.slug} className="flex max-md:w-[82%] max-md:shrink-0 max-md:snap-start">
              <ProjectCard project={p} className="w-full" />
            </li>
          ))}
        </ul>
        <Link href="/work" className="btn btn-secondary mt-6 w-full sm:hidden">
          <span>Explore All Projects</span>
        </Link>
      </div>
    </section>
  );
}
