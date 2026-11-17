import Image from "next/image";
import { proof } from "@/data/home";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/** Stats + creators, from the Devereux Edits track record. */
export function ProofSection() {
  return (
    <section aria-labelledby="proof-title" className="section border-t border-line">
      <div className="wrap-wide">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionLabel>Track record</SectionLabel>
            <SplitHeading id="proof-title" className="t-h2 mt-6">
              {proof.title}
            </SplitHeading>
          </div>
          <p className="t-body max-w-[30rem] lg:col-span-4 lg:col-start-9 lg:self-end">{proof.intro}</p>
        </div>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          {proof.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-bg p-8 md:p-10">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-3 font-display text-[clamp(2.75rem,2rem+3vw,4.5rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                {s.value}
              </dd>
            </Reveal>
          ))}
        </dl>

        <h3 className="t-h4 mt-16">Creators we work with</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {proof.creators.map((c) => (
            <li key={c.name}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[var(--radius-card-sm)] border border-line bg-surface p-4 transition-colors hover:border-line-strong"
              >
                <Image src={c.image} alt="" width={52} height={52} className="size-13 rounded-full object-cover" />
                <span>
                  <span className="block font-semibold">{c.name}</span>
                  <span className="block text-sm text-muted">{c.subs} subscribers</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
