import Link from "next/link";
import { homeStage } from "@/data/stage";
import { ArrowRight } from "@/components/ui/Icons";
import { HeroShowcase } from "./HeroShowcase";

/** Landing hero: one clear promise, two actions and real work. Server rendered with CSS-only motion. */
export function HomeHero() {
  const { services } = homeStage;
  return (
    <section aria-labelledby="hero-title" className="home-hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="home-hero-grid" />
      <div aria-hidden="true" className="home-hero-glow" />

      <div className="wrap-wide grid items-center gap-10 pb-14 pt-[calc(var(--header-h)+2.5rem)] lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-[calc(var(--header-h)+4rem)]">
        <div className="lg:col-span-6">
          <p className="home-eyebrow">
            <span aria-hidden="true" className="home-eyebrow-dot" /> DEVEREUX DIGITALS — DIGITAL SOLUTIONS AGENCY
          </p>
          <h1 id="hero-title" className="mt-6 max-w-[17ch] font-display text-[clamp(2.35rem,1.35rem+3.4vw,4.5rem)] font-semibold leading-[1] tracking-[-0.04em]">
            Your next big move deserves more than an <span className="home-accent-text">ordinary digital agency.</span>
          </h1>
          <p className="t-lead mt-6 max-w-[35rem]">
            We build powerful digital experiences, launch growth campaigns and create solutions that move businesses, brands and communities forward.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn btn-primary">
              <span>Start a project</span>
              <ArrowRight />
            </Link>
            <Link href="/work" className="btn btn-secondary">
              Explore our work
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:col-span-6">
          <HeroShowcase />
        </div>
      </div>

      <nav className="home-ticker border-t border-line" aria-label={services.title}>
        <div className="home-ticker-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="home-ticker-row" aria-hidden={dup === 1 || undefined}>
              {services.items.map((s) => (
                <li key={s.title}>
                  {dup === 0 ? <Link href={s.href}>{s.title}</Link> : <span>{s.title}</span>}
                  <span aria-hidden="true" className="home-ticker-sep">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </nav>
    </section>
  );
}
