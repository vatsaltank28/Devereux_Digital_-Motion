import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { publishedServices } from "@/data/services";
import { serviceGroups } from "@/data/nav";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Devereux Digitals is a digital agency founded by Lorenzo Devereux. What we believe, the standards we hold and the services we deliver.",
  path: "/about",
});

/* Condensed from the client document "About Devereux Digitals". Facts are unchanged. */

const beliefs = [
  "Design should do more than decorate.",
  "Technology should solve a real problem.",
  "Creativity should move an idea forward.",
];

const founder = {
  name: "Lorenzo Devereux",
  role: "Founder & CEO, Devereux Digitals",
  expertise: ["Digital Strategy", "Technology", "Business Innovation"],
};

const standards = [
  { title: "Purpose", body: "Understand the business before proposing the work." },
  { title: "Clarity", body: "Open communication and honest expectations." },
  { title: "Craft", body: "Precision in the details nobody asks about." },
  { title: "Accountability", body: "We own our work, our timelines and our mistakes." },
  { title: "Progress", body: "Keep learning as the tools and the industry change." },
];

const capabilities = serviceGroups.map((g) => ({
  title: g.title,
  items: g.slugs.flatMap((slug) => publishedServices.filter((s) => s.slug === slug)),
}));

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About us"
        title="Good digital work has a purpose."
        description="Devereux Digitals is a digital agency where strategy, design and technology work as one discipline."
        trail={[{ name: "Home", href: "/" }, { name: "About Us" }]}
      />

      <section aria-label="What we believe" className="section-tight border-t border-line">
        <div className="wrap-wide">
          <Reveal>
            <ul className="about-beliefs">
              {beliefs.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="founder-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-[20rem] lg:col-span-4 lg:max-w-[22rem]">
            {/* Placeholder until the client supplies a professional photograph of the founder. */}
            <div className="founder-photo">
              <span aria-hidden="true" className="founder-mono">LD</span>
            </div>
          </Reveal>
          <div className="lg:col-span-7 lg:col-start-6">
            <SectionLabel>The founder</SectionLabel>
            <SplitHeading id="founder-title" className="t-h2 mt-5 max-w-[16ch]">
              Started to close a gap.
            </SplitHeading>
            <Reveal>
              <p className="t-lead mt-6 max-w-[38rem]">
                Lorenzo Devereux saw how hard it was for businesses to find dependable digital expertise in one place. He founded Devereux Digitals to change that.
              </p>
              <p className="mt-6 font-display text-lg font-semibold">{founder.name}</p>
              <p className="text-sm text-muted">{founder.role}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of expertise">
                {founder.expertise.map((e) => (
                  <li key={e} className="best-for-label">{e}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="standards-title" className="about-standards section-tight border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>Our standards</SectionLabel>
            <SplitHeading id="standards-title" className="t-h2 mt-5 max-w-[12ch]">
              What we hold ourselves to.
            </SplitHeading>
          </div>
          <dl className="about-standards-list lg:col-span-8">
            {standards.map((s) => (
              <div key={s.title}>
                <dt>{s.title}</dt>
                <dd>{s.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="services-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionLabel>What we do</SectionLabel>
            <SplitHeading id="services-title" className="t-h2 mt-5 max-w-[14ch]">
              Everything in one place.
            </SplitHeading>
            <Link href="/services" className="link-arrow mt-6 inline-flex min-h-11 items-center text-sm">
              View all services
            </Link>
          </div>
          <div className="about-services lg:col-span-8">
            {capabilities.map((g) => (
              <div key={g.title}>
                <h3>{g.title}</h3>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`}>
                        {s.title}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA
        heading="Have something worth building?"
        description="Tell us where it stands today."
        primaryLabel="Start a conversation"
        location="about-final-cta"
      />
    </>
  );
}
