import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCardGrid } from "@/components/services/ServiceCardGrid";

/** H02 — Services overview: eight cards, each routing to its own page (or honestly marked as not yet available). */
export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section">
      <div className="wrap-wide">
        <div className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel index="01">Services</SectionLabel>
            <SplitHeading id="services-title" className="t-h2 mt-6 max-w-[16ch]">
              Everything your business needs to show up online.
            </SplitHeading>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="t-body">
              Seven services that work on their own or together, with an eighth on the way. Choose one to see what we deliver and how we work.
            </p>
          </Reveal>
        </div>
        <ServiceCardGrid />
      </div>
    </section>
  );
}
