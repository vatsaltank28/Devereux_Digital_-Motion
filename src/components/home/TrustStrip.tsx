import Image from "next/image";
import Link from "next/link";
import { proof } from "@/data/home";

/** Compact credibility band for the short landing page; the full track record lives on /work. */
export function TrustStrip() {
  return (
    <section aria-label="Track record" className="border-y border-line bg-surface">
      <div className="wrap-wide grid gap-10 py-12 md:py-14 lg:grid-cols-12 lg:items-center">
        <dl className="grid grid-cols-3 gap-6 lg:col-span-7">
          {proof.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2rem,1.4rem+2.4vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4 lg:col-span-5 lg:justify-end">
          <ul className="flex -space-x-3" aria-label="Creators we work with">
            {proof.creators.map((c) => (
              <li key={c.name}>
                <Image src={c.image} alt={c.name} width={44} height={44} className="size-11 rounded-full border-2 border-[var(--color-surface)] object-cover" />
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted">
            Trusted by creators with <span className="text-ink">1.8M+ subscribers</span>.{" "}
            <Link href="/work" className="link-quiet whitespace-nowrap text-ink">
              See the work →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
