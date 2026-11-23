import type { Metadata } from "next";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { Suspense } from "react";
import { WorkGrid, WorkGridView } from "@/components/work/WorkGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Our Work: Websites, Stores, Automation & Brands",
  description:
    "Selected work from Devereux Digitals across web design, ecommerce, AI automation, branding and marketing. Browse by category and open any project for the full gallery.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }])} />
      <PageHero
        label="Selected work"
        title="Ideas brought to life."
        description="A selection of digital experiences, creative projects and business solutions we’ve delivered. Filter by category and open any project for the full gallery."
        trail={[{ name: "Home", href: "/" }, { name: "Work" }]}
      />
      <section aria-label="Projects" className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          {/* Static "all" grid is prerendered; the URL filter applies on the client. */}
          <Suspense fallback={<WorkGridView filter="all" />}>
            <WorkGrid />
          </Suspense>
        </div>
      </section>
      <FinalCTA
        heading="Have something worth bringing to the market?"
        description="Whether you’re launching a new product, growing a business, promoting software or building an online community, let’s develop a marketing strategy around your goals."
        primaryLabel="Start a project"
        location="work-final-cta"
      />
    </>
  );
}
