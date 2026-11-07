import { featuredProjects } from "@/data/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import { ProjectCard } from "@/components/portfolio/ProjectCard";

const LAYOUT = [
  { span: "md:col-span-7", aspect: "4 / 3", offset: "" },
  { span: "md:col-span-5", aspect: "1 / 1", offset: "md:mt-28" },
  { span: "md:col-span-5", aspect: "1 / 1", offset: "" },
  { span: "md:col-span-7", aspect: "4 / 3", offset: "md:mt-28" },
] as const;

/**
 * H04 — Featured work. Shows the concept studies and says so plainly (PRD §8 H04, DESIGN.md §3.3).
 * Replace with approved case studies in src/data/projects.ts — this component needs no change.
 */
export function FeaturedWork() {
  const items = featuredProjects.slice(0, LAYOUT.length);
  return (
    <section aria-labelledby="work-title" className="section border-t border-line">
      <div className="wrap-wide">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="03">Selected work</SectionLabel>
            <SplitHeading id="work-title" className="t-h2 mt-6 max-w-[15ch]">
              How we approach the brief.
            </SplitHeading>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="t-body">
              These are in-house concept studies that show how we would tackle typical briefs. Approved client case studies will appear here as they are published.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-x-8 gap-y-16 md:grid-cols-12">
          {items.map((project, i) => {
            const l = LAYOUT[i]!;
            return (
              <div key={project.slug} className={`${l.span} ${l.offset}`}>
                <ProjectCard project={project} aspect={l.aspect} />
              </div>
            );
          })}
        </div>

        <Reveal className="mt-16 flex justify-start md:justify-center">
          <LinkButton href="/work" variant="secondary" arrow location="featured-work">
            View all work
          </LinkButton>
        </Reveal>
      </div>
    </section>
  );
}
