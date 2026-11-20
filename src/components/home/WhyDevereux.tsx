import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ExpectList } from "@/components/services/WhatToExpect";

/** Why choose Devereux + what to expect, in one compact block (client revision). */
export function WhyDevereux() {
  return (
    <section aria-labelledby="why-devereux-title" className="section-tight border-t border-line">
      <div className="wrap-wide grid gap-7 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionLabel>Why Devereux</SectionLabel>
          <SplitHeading id="why-devereux-title" className="t-h2 mt-5 max-w-[16ch]">
            One agency. Multiple capabilities.
          </SplitHeading>
          <Reveal>
            <p className="t-body mt-5 max-w-[34rem]">
              Solutions built around your business. From your first website to advanced business automation, we bring the
              creative, technical and marketing expertise together to help your business move forward.
            </p>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7 lg:pt-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-subtle">What to expect</h3>
          <ExpectList />
        </Reveal>
      </div>
    </section>
  );
}
