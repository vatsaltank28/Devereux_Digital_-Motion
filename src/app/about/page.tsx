import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Meet Lorenzo Devereux, founder of Devereux Digitals. Our story, our approach and the commitment behind every project we deliver.",
  path: "/about",
});

/* Copy from the client document "About Devereux Digitals" (Changes, Services and Reviews). */

const founder = {
  name: "Lorenzo Devereux",
  role: "Founder & CEO, Devereux Digitals",
  expertise: ["Digital Strategy", "Technology", "Business Innovation"],
  bio: [
    "Lorenzo Devereux is the founder and CEO of Devereux Digitals, an agency established on the belief that every business deserves access to reliable, innovative and effective digital solutions.",
    "With a focus on Digital Strategy, Technology and Business Innovation, Lorenzo recognised a gap in the market for businesses seeking dependable digital expertise under one roof. This inspired the creation of Devereux Digitals: an agency designed to bring together creativity, technology and strategic thinking to help businesses navigate the digital landscape, strengthen their presence and unlock new opportunities for growth.",
    "His vision is to build an agency recognised for its commitment to quality, innovation and meaningful client relationships.",
  ],
};

const approach = [
  { title: "Understanding", body: "We take the time to understand your business, objectives and challenges before recommending solutions." },
  { title: "Strategic Thinking", body: "We develop clear strategies that align with your goals and provide direction for every project." },
  { title: "Innovation", body: "We combine creative thinking with modern technology to develop effective and forward-thinking solutions." },
  { title: "Quality Execution", body: "We prioritise professionalism, precision and attention to detail in everything we deliver." },
  { title: "Meaningful Results", body: "We focus on creating practical digital solutions that deliver value and support sustainable business growth." },
];

const P = (d: string) => <path d={d} />;
const commitments = [
  {
    title: "Clear Communication",
    body: "We prioritise open, timely and professional communication, ensuring clients stay informed at every important stage of their projects.",
    icon: P("M21 12a8 8 0 0 1-11.6 7.14L4 20.5l1.36-4.9A8 8 0 1 1 21 12Z"),
  },
  {
    title: "Quality Delivery",
    body: "We are committed to delivering work that meets agreed requirements, reflects professional standards and aligns with our clients' expectations.",
    icon: P("M20 6 9 17l-5-5"),
  },
  {
    title: "Accountability",
    body: "We take responsibility for our work, respect agreed timelines and approach challenges with transparency and professionalism.",
    icon: P("M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z"),
  },
  {
    title: "Client-Centred Support",
    body: "We value every client relationship and aim to provide dependable guidance and support throughout and beyond project completion, within agreed service arrangements.",
    icon: P("M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z"),
  },
  {
    title: "Continuous Innovation",
    body: "We remain committed to learning, adapting and embracing evolving technologies to ensure our solutions remain relevant in an ever-changing digital environment.",
    icon: P("M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Building digital solutions. Creating business opportunities."
        description="Devereux Digitals brings creativity, technology and strategic thinking together in one dedicated agency, so businesses can establish their presence, improve their operations and grow."
        trail={[{ name: "Home", href: "/" }, { name: "About Us" }]}
      />

      {/* A. Meet the founder */}
      <section aria-labelledby="founder-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[24rem] lg:col-span-4 lg:max-w-none">
            {/* Placeholder until the client supplies a professional photograph of the founder. */}
            <div className="founder-photo">
              <span aria-hidden="true" className="founder-mono">LD</span>
              <div className="founder-tag">
                <p className="font-display text-lg font-semibold">{founder.name}</p>
                <p className="text-sm text-muted">{founder.role}</p>
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <SectionLabel>Meet the founder</SectionLabel>
            <SplitHeading id="founder-title" className="t-h2 mt-5 max-w-[20ch]">
              The vision behind Devereux Digitals.
            </SplitHeading>
            <Reveal>
              {founder.bio.map((p) => (
                <p key={p.slice(0, 24)} className="t-body mt-5 max-w-[44rem]">
                  {p}
                </p>
              ))}
              <div className="mt-7 flex flex-wrap items-center gap-2">
                <span className="t-caption mr-1 uppercase tracking-[0.14em]">Area of expertise</span>
                {founder.expertise.map((e) => (
                  <span key={e} className="best-for-label">
                    {e}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* B. Our story */}
      <section aria-labelledby="story-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel>Our story</SectionLabel>
            <SplitHeading id="story-title" className="t-h2 mt-5 max-w-[16ch]">
              Bridging businesses and the digital solutions they need.
            </SplitHeading>
          </div>
          <Reveal className="lg:col-span-7">
            <p className="t-lead">
              Devereux Digitals was established with a clear vision: to bridge the gap between businesses and the digital solutions they need to grow, compete and succeed.
            </p>
            <p className="t-body mt-5">
              We identified that many startups, small businesses, established companies and growing brands have the potential to achieve more but often struggle to find reliable digital expertise and the right technology to support their ambitions. <strong className="text-ink">We set out to change that.</strong>
            </p>
            <p className="t-body mt-5">
              Devereux Digitals brings together multiple areas of digital expertise, offering businesses access to a comprehensive range of solutions through one dedicated agency. From creative and technical services to strategic digital solutions, we help businesses establish their presence, improve their operations and create better opportunities for growth.
            </p>
            <p className="mt-7 border-l-2 border-accent pl-5 font-display text-xl leading-snug">
              Our purpose is simple: to make professional digital solutions more accessible, effective and valuable to the businesses we serve.
            </p>
          </Reveal>
        </div>
      </section>

      {/* C. Our approach */}
      <section aria-labelledby="approach-title" className="section-tight border-t border-line">
        <div className="wrap-wide">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel>Our approach</SectionLabel>
              <SplitHeading id="approach-title" className="t-h2 mt-5 max-w-[18ch]">
                Strategy meets creativity. Technology drives possibilities.
              </SplitHeading>
            </div>
            <Reveal className="lg:col-span-5">
              <p className="t-body">
                No two businesses are exactly alike. That&apos;s why we take a thoughtful, strategic approach to every project rather than relying on generic solutions. It is built around five principles.
              </p>
            </Reveal>
          </div>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((a, i) => (
              <li key={a.title} className="bg-surface">
                <Reveal delay={i * 0.05} className="h-full p-6">
                  <span className="font-display text-sm tabular-nums text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-h4 mt-3">{a.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{a.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-display text-lg">
            We don&apos;t simply aim to complete projects. <span className="text-accent-bright">We aim to create solutions that move businesses forward.</span>
          </p>
        </div>
      </section>

      {/* D. Our commitment */}
      <section aria-labelledby="commit-title" className="section-tight border-t border-line">
        <div className="wrap-wide">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel>Our commitment</SectionLabel>
              <SplitHeading id="commit-title" className="t-h2 mt-5 max-w-[18ch]">
                Excellence is not an option. It&apos;s our standard.
              </SplitHeading>
            </div>
            <Reveal className="lg:col-span-5">
              <p className="t-body">
                Great work should always be supported by professionalism, transparency and accountability. We strive to create a dependable experience where clients feel confident, informed and supported throughout their journey with us.
              </p>
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {commitments.map((c, i) => (
              <li key={c.title} className={i === commitments.length - 1 ? "sm:col-span-2 lg:col-span-1" : undefined}>
                <Reveal delay={(i % 3) * 0.05} className="commit-card">
                  <span aria-hidden="true" className="commit-icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {c.icon}
                    </svg>
                  </span>
                  <h3 className="t-h4 mt-4">{c.title}</h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
          <Reveal className="mt-10 text-center">
            <p className="mx-auto max-w-[40rem] text-muted">
              Every project is an opportunity to demonstrate what is possible when strategy, creativity and technology work together.
            </p>
            <p className="mt-3 font-display text-2xl font-semibold sm:text-3xl">
              Your vision. Our expertise. <span className="text-accent-bright">Shared progress.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
