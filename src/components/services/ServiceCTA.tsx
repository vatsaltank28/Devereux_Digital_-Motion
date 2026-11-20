import type { Service } from "@/data/types";
import { FinalCTA } from "@/components/home/FinalCTA";

/** S10, Service specific closing CTA; links to the enquiry form with this service pre selected. */
export function ServiceCTA({ service }: { service: Service }) {
  return (
    <FinalCTA
      heading={service.ctaHeading ?? `Ready to start your ${service.shortTitle} project?`}
      description="Tell us what you have in mind. We’ll reply to talk through the scope and whether we’re the right fit."
      service={service.slug}
      location={`service-cta:${service.slug}`}
    />
  );
}
