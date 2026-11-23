import Image from "next/image";
import type { Service } from "@/data/types";
import type { MediaImage } from "@/data/media";
import { EditsCard } from "./EditsPromo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { LinkButton } from "@/components/ui/Button";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import Magnet from "@/components/reactbits/Magnet";

/** S01, Service introduction. Same entrance grammar as the home hero, with service specific artwork. */
export function ServiceHero({
  service,
  cover,
  workHref = "#work",
  showVisual = true,
}: {
  service: Service;
  cover?: MediaImage;
  /** Where "View Our Work" goes: live case studies when the service has them. */
  workHref?: string;
  /** Off for services that lead with live projects directly under the hero. */
  showVisual?: boolean;
}) {
  const isEditing = service.slug === "video-content";
  return (
    <header className="relative isolate overflow-hidden pb-10 pt-[calc(var(--header-h)+1.5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+4rem)] lg:pb-28">
      <div className="hero-atmosphere absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className={showVisual ? "lg:col-span-7" : "lg:col-span-9"}>
          <div className="mb-5 md:mb-8">
            <Breadcrumbs
              trail={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: service.shortTitle }]}
            />
          </div>
          <SectionLabel index={service.number}>Service</SectionLabel>
          <SplitHeading as="h1" trigger="load" delay={0.05} className="t-h1 mt-6 max-w-[15ch]">
            {service.heroHeadline}
          </SplitHeading>
          <p className="hero-rise t-lead mt-5 md:mt-7" style={{ animationDelay: "0.4s" }}>
            {service.heroDescription}
          </p>
          <p className="hero-rise t-body mt-4 md:mt-5" style={{ animationDelay: "0.5s" }}>
            {service.intro}
          </p>
          {service.bestFor && (
            <p className="hero-rise best-for mt-5" style={{ animationDelay: "0.56s" }}>
              <span className="best-for-label">Best for</span>
              <span>{service.bestFor}</span>
            </p>
          )}
          {!isEditing && (
            <div className="hero-rise mt-7 flex md:mt-9 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={{ animationDelay: "0.62s" }}>
              <Magnet padding={70} magnetStrength={3.5} maxOffset={12} wrapperClassName="max-sm:block max-sm:w-full">
                <LinkButton href={`/contact?service=${service.slug}`} arrow location={`service-hero:${service.slug}`} className="max-sm:w-full">
                  Start Your Project
                </LinkButton>
              </Magnet>
              {(cover || !showVisual) && (
                <LinkButton href={workHref} variant="secondary" location={`service-hero-work:${service.slug}`} className="max-sm:w-full">
                  View Our Work
                </LinkButton>
              )}
            </div>
          )}
        </div>

        {showVisual && (
          <div className="hero-scene-in lg:col-span-5">
            {isEditing ? (
              <EditsCard compact />
            ) : (
              <figure>
                <div className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface" style={{ aspectRatio: "4 / 3" }}>
                  {cover ? (
                    <Image src={cover.src} alt={cover.alt} width={cover.width} height={cover.height} priority sizes="(max-width: 1024px) 92vw, 40vw" className="h-full w-full object-cover object-top" />
                  ) : (
                    <ProjectArt variant={service.art} className="h-full w-full" />
                  )}
                </div>
                {cover && <figcaption className="t-caption mt-3 max-sm:hidden">{cover.alt}</figcaption>}
              </figure>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
