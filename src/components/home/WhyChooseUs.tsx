import { whyUs } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/** H03, Why Devereux Digitals. Approach statements only: no invented years, counts, awards or results. */
export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-title" className="section border-t border-line">
      <div className="wrap-wide grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel>Why Devereux</SectionLabel>
          <SplitHeading id="why-title" className="t-h1 mt-6 max-w-[14ch]">
            {whyUs.statement}
          </SplitHeading>
          <Reveal>
            <p className="t-lead mt-8 max-w-[30rem]">{whyUs.intro}</p>
          </Reveal>
        </div>

        <ul className="lg:col-span-5 lg:col-start-8">
          {whyUs.differentiators.map((d, i) => (
            <li key={d.title} className="border-t border-line py-7 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-7">
              <Reveal delay={i * 0.05}>
                <div className="flex gap-5">
                  <span aria-hidden="true" className="mt-[0.7rem] h-px w-6 shrink-0 bg-accent" />
                  <div>
                    <h3 className="t-h4">{d.title}</h3>
                    <p className="t-body mt-2.5">{d.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
