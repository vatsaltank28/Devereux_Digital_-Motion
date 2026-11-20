"use client";

import Link from "next/link";
import type { Service } from "@/data/types";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import SpotlightCard from "@/components/reactbits/SpotlightCard";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * H02 service card. The whole card is the hit area (stretched link on the title), so the accessible
 * name stays short while touch targets stay large. Coming-soon renders as a plain, non-interactive card.
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  if (service.status !== "published") {
    return (
      <div
        className={cn(
          "relative flex h-full min-h-[17rem] flex-col rounded-[var(--radius-card)] border border-dashed border-line-strong bg-transparent p-6 md:p-7",
          className,
        )}
      >
        <div className="flex items-start justify-between">
          <span className="font-display text-sm tabular-nums text-subtle">{service.number}</span>
          <ServiceGlyph slug={service.slug} className="text-subtle" />
        </div>
        <h3 className="t-h4 mt-auto pt-10 text-muted">{service.title}</h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-subtle">{service.shortDescription}</p>
        <span className="pill pill-outline mt-6 self-start">Not yet available</span>
      </div>
    );
  }

  return (
    <SpotlightCard className={cn("group flex h-full flex-col p-5 sm:min-h-[17rem] sm:p-6 md:p-7", className)}>
      <div className="flex items-start justify-between max-sm:absolute max-sm:right-5 max-sm:top-5">
        <span />
        <ServiceGlyph slug={service.slug} className="text-muted transition-colors duration-300 group-hover:text-ink" />
      </div>
      <h3 className="t-h4 mt-auto pr-12 sm:pr-0 sm:pt-10">
        <Link
          href={`/services/${service.slug}`}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          onClick={() => track("service_card_click", { service: service.slug })}
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-muted sm:mt-3">{service.shortDescription}</p>
      {service.bestFor && (
        <p className="best-for mt-3 sm:mt-4">
          <span className="best-for-label">Best for</span>
          <span>{service.bestFor}</span>
        </p>
      )}
      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold sm:mt-6" aria-hidden="true">
        Explore service <ArrowRight size={16} />
      </span>
    </SpotlightCard>
  );
}
