import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCardGrid } from "@/components/services/ServiceCardGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Web design and development, digital marketing, paid advertising, ecommerce, video and content, AI and business solutions, and branding from Devereux Digitals.",
  path: "/services",
});

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="Seven services. One standard of craft."
        description="Choose a service to see what we deliver, how we work and how to get started. Each one is run by the same team, to the same standard."
        trail={[{ name: "Home", href: "/" }, { name: "Services" }]}
      />
      <section aria-label="All services" className="pb-[var(--section-y)]">
        <div className="wrap-wide">
          <ServiceCardGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
