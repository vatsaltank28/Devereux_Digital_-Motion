import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui/PageHero";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FinalCTA } from "@/components/home/FinalCTA";
import { team } from "@/data/team";

export const metadata: Metadata = buildMetadata({
  title: "About Us",
  description:
    "Devereux Digitals is a digital agency founded by Lorenzo Devereux. What we believe, the standards we hold and the people behind the work.",
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

export default function AboutPage() {
  const colleagues = team.filter((m) => m.name !== founder.name);

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

      <section aria-labelledby="team-title" className="section-tight border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionLabel>The team</SectionLabel>
            <SplitHeading id="team-title" className="t-h2 mt-5 max-w-[16ch]">
              The right specialists. One point of contact.
            </SplitHeading>
            <Link href="/team" className="link-arrow mt-6 inline-flex min-h-11 items-center text-sm">
              Meet the team
            </Link>
          </div>
          <ul className="grid gap-4 lg:col-span-5 lg:col-start-8">
            {colleagues.map((m) => (
              <li key={m.name} className="about-person">
                {m.photo ? (
                  <Image src={m.photo.src} alt={`Portrait of ${m.name}`} width={160} height={160} sizes="80px" className="about-person-img" />
                ) : (
                  <span aria-hidden="true" className="about-person-img art-avatar">{m.monogram}</span>
                )}
                <span>
                  <span className="block font-display text-lg font-semibold">{m.name}</span>
                  <span className="block text-sm text-muted">{m.role}</span>
                </span>
              </li>
            ))}
          </ul>
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
