import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCardGrid } from "@/components/services/ServiceCardGrid";

/** H02, Services overview: seven live services plus a direct route to a conversation. */
export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section" style={{ paddingTop: "clamp(2rem, 1rem + 3vw, 4rem)" }}>
      <div className="wrap-wide">
        <div className="mb-6 grid gap-4 md:mb-12 md:gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Services</SectionLabel>
            <SplitHeading id="services-title" className="t-h2 mt-4 max-w-[16ch]">
              Everything your business needs to show up online.
            </SplitHeading>
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="t-body">
              Seven services that work on their own or together. Choose one to see what we deliver, how we work and what it involves.
            </p>
          </Reveal>
        </div>
        <ServiceCardGrid />
      </div>
    </section>
  );
}
