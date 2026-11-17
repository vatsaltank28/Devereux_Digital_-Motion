"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef } from "react";
import type { StageContent } from "@/data/stage";
import { gsap, useGSAP } from "@/lib/gsap";
import { StaticStage } from "./StaticStage";
import { StageHud } from "./StageHud";
import { T } from "./timeline";
import type { Progress } from "./StageScene";
import { ArrowRight } from "@/components/ui/Icons";

const StageCanvas = dynamic(() => import("./StageCanvas"), { ssr: false });

interface ScrollStageProps {
  content: StageContent;
  /** Lab mode: unsmoothed scrub (deterministic captures) + progress HUD. */
  debug?: boolean;
}

/**
 * Hero scroll stage. A sticky black stage inside a tall section; one GSAP timeline (scrubbed by ScrollTrigger)
 * fades the copy beats and writes `prog.v`, which the particle scene reads every frame. Native scrolling, no
 * pin-spacer, no scroll hijack. Reduced motion / no JS → <StaticStage>. No WebGL → the copy still plays over a
 * soft CSS glow.
 */
export function ScrollStage({ content, debug = false }: ScrollStageProps) {
  const root = useRef<HTMLElement>(null);
  const prog = useRef<Progress>({ v: 0 });

  const onUnavailable = useCallback(() => {
    document.documentElement.dataset.stageGl = "off";
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const $ = (name: string) => el.querySelector<HTMLElement>(`[data-st="${name}"]`)!;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = $("hero");
        const services = $("services");
        const about = $("about");
        const cue = $("cue");
        const chips = gsap.utils.toArray<HTMLElement>("[data-st=chip]", el);

        gsap.set([services, about], { autoAlpha: 0 });
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: el, start: "top top", end: "bottom bottom", scrub: debug ? true : 0.6, invalidateOnRefresh: true },
        });
        const dur = (r: readonly [number, number]) => r[1] - r[0];
        tl.to(prog.current, { v: 1, duration: 1 }, 0);

        // The stage is always dark: while it fills the screen the header switches to light ink.
        const html = document.documentElement;
        const st = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom top+=80",
            onToggle: (self) => (html.dataset.overStage = self.isActive ? "1" : "0"),
          },
        });
        void st;

        tl.to(cue, { autoAlpha: 0, duration: dur(T.cueOut) }, T.cueOut[0]);
        tl.to(hero, { autoAlpha: 0, y: -40, ease: "power2.in", duration: dur(T.heroOut) }, T.heroOut[0]);

        tl.to(services, { autoAlpha: 1, duration: 0.02 }, T.servicesIn[0]);
        tl.fromTo(
          chips,
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, ease: "power2.out", stagger: 0.008, duration: dur(T.servicesIn) },
          T.servicesIn[0],
        );
        tl.to(services, { autoAlpha: 0, y: -30, ease: "power2.in", duration: dur(T.servicesOut) }, T.servicesOut[0]);

        tl.fromTo(about, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, ease: "power2.out", duration: dur(T.aboutIn) }, T.aboutIn[0]);
        tl.to(about, { autoAlpha: 0, y: -24, ease: "power2.in", duration: dur(T.aboutOut) }, T.aboutOut[0]);
      });

      return () => {
        mm.revert();
        delete document.documentElement.dataset.overStage;
      };
    },
    { scope: root, dependencies: [debug] },
  );

  const left = content.services.items.slice(0, 4);
  const right = content.services.items.slice(4);

  return (
    <>
      <section ref={root} data-stage-animated="" aria-label="Introduction" className="relative h-[420svh] md:h-[480svh]">
        <div data-st="stick" className="st-stick sticky top-0 h-[100svh] w-full overflow-hidden bg-black text-white">
          <div className="absolute inset-0 z-0">
            <div aria-hidden="true" className="st-gl-fallback absolute inset-0" />
            <StageCanvas prog={prog} onUnavailable={onUnavailable} />
          </div>

          {/* 1 — hero copy, centred inside the particle ring */}
          <div data-st="hero" className="absolute inset-0 z-10 grid place-items-center px-[var(--gutter)] pt-[var(--header-h)] text-center">
            <div className="max-w-[34rem]">
              <h1 className="font-display text-[clamp(1.9rem,1.2rem+2.6vw,3.3rem)] font-semibold leading-[1.04] tracking-[-0.035em] [text-shadow:0_2px_30px_#000]">
                {content.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-[30rem] text-[clamp(0.95rem,0.9rem+0.25vw,1.1rem)] leading-relaxed text-white/80 [text-shadow:0_1px_16px_#000]">
                {content.hero.body}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={content.hero.primary.href} className="btn bg-white text-black hover:bg-white/90">
                  <span>{content.hero.primary.label}</span>
                  <ArrowRight />
                </Link>
                <Link href={content.hero.secondary.href} className="btn border border-white/30 text-white hover:border-white/70">
                  <span>{content.hero.secondary.label}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2 — the seven services, either side of the helix */}
          <div data-st="services" className="absolute inset-0 z-10 px-[var(--gutter)] pt-[calc(var(--header-h)+1rem)]">
            <p className="text-center font-display text-[clamp(1.3rem,1rem+1.2vw,2rem)] font-semibold tracking-[-0.02em] [text-shadow:0_2px_24px_#000]">
              {content.services.title}
            </p>
            <div className="mx-auto mt-6 grid h-[calc(100%-var(--header-h)-6rem)] max-w-[1180px] grid-cols-2 items-center gap-x-[min(30vw,22rem)] max-md:mt-0 max-md:h-auto max-md:grid-cols-1 max-md:gap-1.5 max-md:pt-[40svh]">
              {[left, right].map((col, c) => (
                <ul key={c} className={c === 0 ? "space-y-3 justify-self-end max-md:space-y-1.5 max-md:justify-self-stretch" : "space-y-3 justify-self-start max-md:space-y-1.5 max-md:justify-self-stretch"}>
                  {col.map((s) => (
                    <li key={s.href} data-st="chip">
                      <Link
                        href={s.href}
                        className="flex items-center justify-between gap-6 rounded-xl border border-white/15 bg-black/55 px-4 py-3 text-[0.95rem] font-medium backdrop-blur-md transition-colors hover:border-white/50 max-md:py-[0.45rem] max-md:text-[0.82rem]"
                      >
                        {s.title}
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          {/* 3 — who we are, over the horizon */}
          <div data-st="about" className="absolute inset-x-0 top-[22%] z-10 px-[var(--gutter)] text-center">
            <p className="font-display text-[clamp(1.6rem,1.1rem+2.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.03em] [text-shadow:0_2px_24px_#000]">
              {content.about.title}
            </p>
            <p className="mx-auto mt-4 max-w-[36rem] text-[clamp(0.95rem,0.9rem+0.25vw,1.08rem)] leading-relaxed text-white/80 [text-shadow:0_1px_14px_#000]">
              {content.about.body}
            </p>
          </div>

          {/* Scroll cue */}
          <div data-st="cue" aria-hidden="true" className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <span className="rounded-full border border-white/25 px-3 py-1 text-xs tracking-wide text-white/70">Scroll</span>
          </div>
        </div>
        {debug && <StageHud rootRef={root} prog={prog} />}
      </section>

      <div data-stage-static="">
        <StaticStage content={content} />
      </div>
    </>
  );
}
