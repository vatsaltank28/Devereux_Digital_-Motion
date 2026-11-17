import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { publishedProjects } from "@/data/projects";
import { PageHero } from "@/components/ui/PageHero";
import { ProjectGrid } from "@/components/portfolio/ProjectGrid";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ProofSection } from "@/components/home/ProofSection";

export const metadata: Metadata = buildMetadata({
  title: "Work",
  description: "Selected concept studies from Devereux Digitals across web, e-commerce, branding, video, advertising, marketing and AI.",
  path: "/work",
});

export default function WorkPage() {
  const hasConcept = publishedProjects.some((p) => p.isConcept);
  return (
    <>
      <PageHero
        label="Work"
        title="Selected work and concept studies."
        description={
          hasConcept
            ? "These are in-house concept studies that show how we approach typical briefs. They are not commissioned client projects, and they make no claims about results. Approved client case studies will be added as they are published."
            : "A selection of our recent projects."
        }
        trail={[{ name: "Home", href: "/" }, { name: "Work" }]}
      />
      <section aria-label="Projects" className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <ProjectGrid projects={publishedProjects} />
        </div>
      </section>
      <ProofSection />
      <FinalCTA />
    </>
  );
}
