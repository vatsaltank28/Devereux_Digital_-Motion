import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { howWeWork } from "@/data/home";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { Testimonials } from "@/components/services/Testimonials";
import { approvedTestimonials } from "@/data/testimonials";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Devereux Digitals is a full-service digital agency. Learn how we think about digital work, the principles we follow and how we collaborate.",
  path: "/about",
});

/** Principles are working values, stated as commitments of method — no unverifiable claims. Client to review. */
const principles = [
  {
    title: "Clarity before cleverness",
    body: "If a visitor can’t tell what you do and what to do next, nothing else matters. We design for understanding first.",
  },
  {
    title: "Craft is a habit",
    body: "Spacing, type, motion and copy get the same care as the headline feature. Small details are what make work feel considered.",
  },
  {
    title: "Honest about results",
    body: "We report what happened in plain language, and we don’t promise outcomes that depend on things outside our control.",
  },
  {
    title: "Built to be used",
    body: "Accessible, fast and maintainable by default, so the work keeps serving you after launch day.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Digital work that holds up."
        description="Devereux Digitals is a full-service digital agency. We bring design, development, marketing, content and business tooling together, so your digital presence is built as one thing rather than many."
        trail={[{ name: "Home", href: "/" }, { name: "About Us" }]}
      />

      <section aria-labelledby="pov-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Point of view</SectionLabel>
          </div>
          <div className="lg:col-span-8">
            <SplitHeading id="pov-title" className="t-h2 max-w-[20ch]">
              Good digital work is a series of clear decisions, made in the right order.
            </SplitHeading>
            <Reveal>
              <p className="t-lead mt-8">
                We start with what the work needs to do for your business. Then we choose the structure, the design, the tools and the channels that serve it, and we measure it against that goal afterwards.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section-tight border-t border-line">
        <div className="wrap-wide">
          <SectionLabel>Principles</SectionLabel>
          <SplitHeading id="principles-title" className="t-h2 mt-5">
            How we work, in four lines.
          </SplitHeading>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-surface">
                <Reveal delay={(i % 2) * 0.06} className="h-full p-7 md:p-10">
                  <h3 className="t-h3">{p.title}</h3>
                  <p className="t-body mt-4">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="collab-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Collaboration</SectionLabel>
            <SplitHeading id="collab-title" className="t-h2 mt-5 max-w-[10ch]">
              Working together
            </SplitHeading>
            <p className="t-body mt-6">{howWeWork.intro}</p>
          </div>
          <ol className="lg:col-span-8">
            {howWeWork.steps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-6 first:border-t-0 first:pt-0 md:grid-cols-[4rem_1fr]">
                <span className="font-display text-sm tabular-nums text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-h4">{s.title}</h3>
                  <p className="t-body mt-2">{s.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials items={approvedTestimonials} heading="What clients say" />
      <FinalCTA />
    </>
  );
}
