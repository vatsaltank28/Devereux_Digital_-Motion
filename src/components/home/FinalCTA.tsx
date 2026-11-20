import { finalCta } from "@/data/home";
import { site, ctaLabels } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkButton } from "@/components/ui/Button";
import Magnet from "@/components/reactbits/Magnet";
import { SignalLines } from "@/components/visuals/SignalLines";

interface FinalCTAProps {
  heading?: string;
  description?: string;
  /** Pre-selects a service in the enquiry form, e.g. "web-design-development". */
  service?: string;
  primaryLabel?: string;
  location?: string;
}

/** H05, Final CTA. Reused by every page so the conversion path is identical everywhere. */
export function FinalCTA({
  heading = finalCta.headline,
  description = finalCta.description,
  service,
  primaryLabel = ctaLabels.startProject,
  location = "final-cta",
}: FinalCTAProps) {
  const href = service ? `/contact?service=${encodeURIComponent(service)}` : "/contact";
  return (
    <section aria-labelledby="cta-title" className="section relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="cta-glow absolute inset-0 -z-10" />
      <SignalLines className="pointer-events-none absolute -right-[18%] top-1/2 -z-10 h-[150%] max-h-[900px] -translate-y-1/2 opacity-70 md:-right-[6%] md:opacity-100" />

      <div className="wrap-wide">
        <SplitHeading id="cta-title" className="t-h1 max-w-[17ch]">
          {heading}
        </SplitHeading>
        <Reveal>
          <p className="t-lead mt-8 max-w-[30rem]">{description}</p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Magnet padding={90} magnetStrength={3.5} maxOffset={14} wrapperClassName="max-sm:block max-sm:w-full">
            <LinkButton href={href} arrow location={location} className="max-sm:w-full">
              {primaryLabel}
            </LinkButton>
          </Magnet>
          {site.contact.email && (
            <a className="link-quiet text-[1.0625rem]" href={`mailto:${site.contact.email}`}>
              or write to {site.contact.email}
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
