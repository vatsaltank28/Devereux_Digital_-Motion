import type { Service } from "@/data/types";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { CheckIcon } from "@/components/ui/Icons";
import { ServiceSection } from "./ServiceSection";

/**
 * S08 — Pricing & packages. NEVER shows invented prices.
 *  • pricingMode "packages" + approved `packages[]` → tier cards (no "best value" badge unless client picks one).
 *  • otherwise (default "quote") → honest "request a tailored proposal" with the factors that shape it.
 */
export function PricingBlock({ service }: { service: Service }) {
  const ctaHref = `/contact?service=${service.slug}`;

  if (service.pricingMode === "packages" && service.packages.length > 0) {
    return (
      <ServiceSection id="pricing" label="Pricing" title="Packages">
        <ul className="grid gap-4 md:grid-cols-2">
          {service.packages.map((pkg) => (
            <li key={pkg.name} className="card flex flex-col p-7">
              <h3 className="t-h3">{pkg.name}</h3>
              <p className="mt-4 font-display text-3xl tracking-tight">{pkg.price}</p>
              <p className="t-caption mt-1">{pkg.billing}</p>
              <p className="t-body mt-5 text-[0.98rem]">{pkg.summary}</p>
              <ul className="mt-6 space-y-2.5 text-[0.95rem]">
                {pkg.includes.map((inc) => (
                  <li key={inc} className="flex gap-3">
                    <CheckIcon className="mt-1 shrink-0 text-accent-bright" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
              {pkg.excludes && pkg.excludes.length > 0 && (
                <p className="t-caption mt-6">Not included: {pkg.excludes.join(", ")}</p>
              )}
              <LinkButton href={ctaHref} variant="secondary" className="mt-8 self-start" location={`pricing:${service.slug}`}>
                Discuss {pkg.name}
              </LinkButton>
            </li>
          ))}
        </ul>
      </ServiceSection>
    );
  }

  return (
    <ServiceSection id="pricing" label="Pricing" title="Priced to your project">
      <Reveal>
        <p className="t-lead max-w-[34rem]">
          We don’t publish fixed packages, because the right scope depends on the project. You’ll receive a tailored proposal that sets out what is included, what isn’t, and how payment works.
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h3 className="t-h4 mt-12">What shapes your proposal</h3>
        <ul className="mt-5 divide-y divide-line border-y border-line">
          {service.pricingFactors.map((f) => (
            <li key={f} className="flex gap-4 py-4 text-[1.02rem] text-muted">
              <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 bg-accent" />
              {f}
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1} className="mt-10">
        <LinkButton href={ctaHref} arrow location={`pricing:${service.slug}`}>
          Request a tailored proposal
        </LinkButton>
      </Reveal>
    </ServiceSection>
  );
}
