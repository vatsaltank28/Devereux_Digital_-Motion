import Link from "next/link";
import { hero } from "@/data/home";
import { publishedServices } from "@/data/services";
import { ctaLabels } from "@/lib/site";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { LinkButton } from "@/components/ui/Button";
import Magnet from "@/components/reactbits/Magnet";
import { HeroScene } from "./HeroScene";

/**
 * H01 — Hero. Real HTML text; the 3D object sits behind/right of it and never carries copy.
 * Entrance: GSAP SplitText on the H1 (owner), CSS keyframes for the supporting copy + CTAs
 * (so they are visible without JS and never wait on a library to load).
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <div className="hero-atmosphere absolute inset-0 -z-10" aria-hidden="true" />

      <div className="wrap-wide relative z-10 pb-6 pt-[calc(var(--header-h)+2.25rem)] sm:pt-[calc(var(--header-h)+3.5rem)] lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:pb-16 lg:pt-[calc(var(--header-h)+2rem)]">
        <SplitHeading
          as="h1"
          id="hero-title"
          trigger="load"
          delay={0.1}
          className="t-display max-w-[12ch] sm:max-w-[16ch] lg:max-w-none"
        >
          {hero.headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </SplitHeading>

        <p className="hero-rise t-lead mt-7 max-w-[34rem] sm:mt-9" style={{ animationDelay: "0.55s" }}>
          {hero.description}
        </p>

        <div className="hero-rise mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4" style={{ animationDelay: "0.7s" }}>
          <Magnet padding={70} magnetStrength={3.5} maxOffset={12} wrapperClassName="max-sm:block max-sm:w-full">
            <LinkButton href="/#services" arrow location="hero-primary" className="max-sm:w-full">
              {ctaLabels.explore}
            </LinkButton>
          </Magnet>
          <LinkButton href="/contact" variant="secondary" location="hero-secondary" className="max-sm:w-full">
            {ctaLabels.talk}
          </LinkButton>
        </div>
      </div>

      {/* 3D / fallback — in flow beneath the CTAs on phones, behind-right of the copy from lg up */}
      <div className="relative z-0 mx-auto -mt-2 h-[min(94vw,440px)] w-full max-w-[560px] lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[60%] lg:max-w-none">
        <HeroScene className="absolute inset-0 hero-scene-in" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(90deg, var(--color-bg) 0%, rgba(5,5,5,0.62) 22%, rgba(5,5,5,0) 55%)" }}
        />
      </div>

      {/* Quick route into every service — structural information, not decoration */}
      <nav aria-label="Services" className="wrap-wide relative z-10 mt-auto border-t border-line">
        <ul className="flex flex-wrap gap-x-7 gap-y-2 py-5 text-sm">
          {publishedServices.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="link-quiet">
                {s.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
