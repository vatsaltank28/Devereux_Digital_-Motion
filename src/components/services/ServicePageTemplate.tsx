import Link from "next/link";
import type { Service } from "@/data/types";
import { getAdjacentServices } from "@/data/services";
import { getProjectsForService } from "@/data/projects";
import { getFaqs } from "@/data/faqs";
import { getTestimonialsForService } from "@/data/testimonials";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";
import { ServiceHero } from "./ServiceHero";
import { ProblemList } from "./ProblemList";
import { DeliverablesGrid } from "./DeliverablesGrid";
import { ProcessSteps } from "./ProcessSteps";
import { ServiceProjects } from "./ServiceProjects";
import { BenefitsBlock } from "./BenefitsBlock";
import { Testimonials } from "./Testimonials";
import { PricingBlock } from "./PricingBlock";
import { FAQAccordion } from "./FAQAccordion";
import { ServiceSection } from "./ServiceSection";
import { ServiceCTA } from "./ServiceCTA";

/**
 * Reusable service detail template (PRD §9). All copy comes from `Service` + related data modules;
 * sequence follows DESIGN.md §5.2. Sections without content (e.g. testimonials) are omitted, never faked.
 */
export function ServicePageTemplate({ service }: { service: Service }) {
  const projects = getProjectsForService(service.slug);
  const testimonials = getTestimonialsForService(service.slug);
  const faqs = getFaqs(service.slug);
  const { prev, next } = getAdjacentServices(service.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ])}
      />
      <ServiceHero service={service} />
      <ProblemList items={service.problems} />
      <DeliverablesGrid items={service.deliverables} />
      <ProcessSteps steps={service.processSteps} />
      <ServiceProjects service={service} projects={projects} />
      <BenefitsBlock items={service.benefits} />
      <Testimonials items={testimonials} />
      <PricingBlock service={service} />
      {faqs.length > 0 && (
        <ServiceSection id="faqs" label="FAQs" title="Frequently asked questions">
          <FAQAccordion faqs={faqs} />
        </ServiceSection>
      )}
      <ServiceCTA service={service} />

      <nav aria-label="Other services" className="border-t border-line">
        <div className="wrap-wide grid divide-y divide-line sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          {[
            { dir: "Previous service", s: prev },
            { dir: "Next service", s: next },
          ].map(({ dir, s }, i) => (
            <Link
              key={dir}
              href={`/services/${s.slug}`}
              className="arrow-host group flex items-center justify-between gap-6 py-8 transition-colors hover:text-accent-bright sm:px-8 sm:first:pl-0 sm:last:pr-0"
            >
              <span>
                <span className="t-caption block">{dir}</span>
                <span className="t-h4 mt-1 block">{s.title}</span>
              </span>
              <ArrowRight className={i === 0 ? "rotate-180" : undefined} />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
