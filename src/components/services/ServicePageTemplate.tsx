import Link from "next/link";
import type { Service } from "@/data/types";
import { getAdjacentServices } from "@/data/services";
import { getFaqs } from "@/data/faqs";
import { getReviews } from "@/data/reviews";
import { included } from "@/data/included";
import { serviceWork } from "@/data/media";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { ArrowRight } from "@/components/ui/Icons";
import { ServiceHero } from "./ServiceHero";
import { IncludedList } from "./IncludedList";
import { WorkGallery } from "./WorkGallery";
import { ReviewWall } from "./ReviewWall";
import { ProcessSteps } from "./ProcessSteps";
import { WhatToExpect } from "./WhatToExpect";
import { ServiceExtras } from "./ServiceExtras";
import { projectsForService } from "@/data/portfolio";
import { ServicePricing } from "./ServicePricing";
import { getPricing } from "@/data/pricing";
import { FAQAccordion } from "./FAQAccordion";
import { ServiceSection } from "./ServiceSection";
import { ServiceCTA } from "./ServiceCTA";

/**
 * Reusable service detail template (PRD §9). All copy comes from `Service` + related data modules;
 * sequence follows DESIGN.md §5.2. Sections without content (e.g. testimonials) are omitted, never faked.
 */
export function ServicePageTemplate({ service }: { service: Service }) {
  const reviews = getReviews(service.slug);
  const work = serviceWork[service.slug] ?? [];
  // Editing is delivered by Devereux Edits: per the client, show only what's included, reviews and the link.
  const isEditing = service.slug === "video-content";
  const faqs = getFaqs(service.slug);
  const price = getPricing(service.slug);
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
      {/* Master prompt §7 order: Overview, Included, Selected Work, Pricing & Add ons, How It Works,
          Why Choose (What to expect), Reviews, FAQs, CTA. Sections without real content are omitted. */}
      <JsonLd data={serviceJsonLd({ title: service.title, description: service.seoDescription, slug: service.slug })} />
      <ServiceHero service={service} cover={work[0]} />
      <IncludedList items={included[service.slug] ?? []} />
      <ServiceExtras slug={service.slug} />
      {!isEditing && <WorkGallery images={work} serviceTitle={service.title} projects={projectsForService(service.slug)} />}
      {price && <ServicePricing pricing={price} slug={service.slug} serviceTitle={service.shortTitle} />}
      {service.processSteps.length > 0 && <ProcessSteps steps={service.processSteps} />}
      <WhatToExpect />
      <ReviewWall reviews={reviews} serviceTitle={service.shortTitle} />
      {faqs.length > 0 && (
        <ServiceSection id="faqs" label="FAQs" title="Questions, answered">
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
