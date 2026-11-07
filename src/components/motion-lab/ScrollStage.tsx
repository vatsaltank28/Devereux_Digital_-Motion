"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useRef } from "react";
import type { StageContent } from "@/data/stage";
import { gsap, useGSAP } from "@/lib/gsap";
import { GalleryPanel, HeroCard, SideCardLeft, SideCardRight, StarCard } from "./StageParts";
import { StaticStage } from "./StaticStage";
import { StageHud } from "./StageHud";
import { STAR_MASK_URI } from "./StarMark";
import { CARD, T } from "./timeline";
import type { Progress } from "./StageScene";
import { ArrowRight } from "@/components/ui/Icons";

const StageCanvas = dynamic(() => import("./StageCanvas"), { ssr: false });

/** Scatter targets (vw / vh offsets from centre, degrees, scale, translateZ px) for the floating-panel field. */
const SCATTER = [
  { x: -30, y: -18, r: -6, s: 0.34, z: 80 },
  { x: 6, y: -8, r: 5, s: 0.38, z: 140 },
  { x: -14, y: 26, r: -3, s: 0.3, z: -40 },
  { x: -38, y: 16, r: 8, s: 0.18, z: -220 },
  { x: 30, y: -30, r: -7, s: 0.17, z: -300 },
  { x: -4, y: -36, r: 4, s: 0.16, z: -380 },
  { x: 36, y: -4, r: 9, s: 0.19, z: -180 },
] as const;

interface ScrollStageProps {
  content: StageContent;
  /** Lab mode: unsmoothed scrub (deterministic captures) + progress HUD. */
  debug?: boolean;
}

/**
 * Cinematic pinned scroll stage.
 *
 * ONE GSAP master timeline (0 → 1, scrubbed by ScrollTrigger) owns every DOM layer, the ✦ mask hole, and a
 * proxy `prog.v` that the R3F scene reads each frame. Nothing is triggered "on enter": every position, scale,
 * rotation and opacity is a function of scroll progress, so reversing the scroll reverses the sequence.
 * Layout is CSS `sticky` inside a tall section (no pin-spacer, no scroll hijack; native scrolling throughout).
 *
 * Reduced motion (CSS media query) and no-WebGL / no-JS show <StaticStage> instead.
 */
export function ScrollStage({ content, debug = false }: ScrollStageProps) {
  const root = useRef<HTMLElement>(null);
  const prog = useRef<Progress>({ v: 0 });

  const onUnavailable = useCallback(() => {
    document.documentElement.dataset.stage = "static";
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const $ = (name: string) => el.querySelector<HTMLElement>(`[data-st="${name}"]`)!;
      const $$ = (name: string) => gsap.utils.toArray<HTMLElement>(`[data-st="${name}"]`, el);

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const stick = $("stick");
        const white = $("white");
        const marquee = $("marquee");
        const hero = $("hero");
        const left = $("left");
        const right = $("right");
        const center = $("center");
        const copy = $("copy");
        const gallery = $("gallery");
        const cta = $("cta");
        const canvasWrap = $("canvas");
        const bars = $$("bar");
        const lines = $$("line");
        const ctaFade = $$("ctafade");
        const panels = $$("panel");
        const drifts = $$("drift");
        const W = () => stick.clientWidth;
        const H = () => stick.clientHeight;

        // ── ✦ mask hole on the white stage ────────────────────────────────────────────────
        const hole = { s: 0 };
        const maskStatic: Record<string, string> = {
          "mask-image": `linear-gradient(#000,#000), ${STAR_MASK_URI}`,
          "-webkit-mask-image": `linear-gradient(#000,#000), ${STAR_MASK_URI}`,
          "mask-position": "center, center",
          "-webkit-mask-position": "center, center",
          "mask-repeat": "no-repeat, no-repeat",
          "-webkit-mask-repeat": "no-repeat, no-repeat",
          "mask-composite": "exclude",
          "-webkit-mask-composite": "xor",
        };
        Object.entries(maskStatic).forEach(([k, v]) => white.style.setProperty(k, v));

        // The WebGL layer is masked to the SAME ✦ so the particle sphere only exists inside the silhouette
        // (exactly as in the benchmark); the mask is dropped once the silhouette covers the screen.
        const canvasMask = (on: boolean) => {
          for (const prefix of ["", "-webkit-"]) {
            canvasWrap.style.setProperty(`${prefix}mask-image`, on ? STAR_MASK_URI : "none");
            canvasWrap.style.setProperty(`${prefix}mask-position`, "center");
            canvasWrap.style.setProperty(`${prefix}mask-repeat`, "no-repeat");
          }
        };
        let canvasMasked = true;
        canvasMask(true);

        const applyHole = () => {
          const size = `100% 100%, ${hole.s.toFixed(1)}px ${hole.s.toFixed(1)}px`;
          white.style.setProperty("mask-size", size);
          white.style.setProperty("-webkit-mask-size", size);
          if (canvasMasked) {
            const px = `${hole.s.toFixed(1)}px ${hole.s.toFixed(1)}px`;
            canvasWrap.style.setProperty("mask-size", px);
            canvasWrap.style.setProperty("-webkit-mask-size", px);
          }
        };
        applyHole();

        // ── Header colour + white-layer culling (cheap, only writes on change) ─────────────
        let whiteHidden = false;
        const root$ = document.documentElement;
        const sync = () => {
          const p = prog.current.v;
          root$.dataset.stageLight = p < T.lightEnd ? "1" : "0";
          const hide = p > T.whiteOut;
          if (hide !== whiteHidden) {
            whiteHidden = hide;
            white.style.visibility = hide ? "hidden" : "visible";
            canvasMasked = !hide;
            canvasMask(!hide);
            if (!hide) applyHole();
          }
        };
        sync();

        // ── Master timeline ────────────────────────────────────────────────────────────────
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          onUpdate: sync,
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "bottom bottom",
            scrub: debug ? true : 0.7,
            invalidateOnRefresh: true,
          },
        });
        const dur = (r: readonly [number, number]) => r[1] - r[0];
        tl.to(prog.current, { v: 1, duration: 1 }, 0);

        const hideAt = (target: gsap.TweenTarget, t: number) => tl.to(target, { autoAlpha: 0, duration: 0.004 }, t);
        const showAt = (target: gsap.TweenTarget, t: number) => tl.to(target, { autoAlpha: 1, duration: 0.004 }, t);
        gsap.set([gallery, cta], { autoAlpha: 0 });
        // NOTE: elements with a pre-set start state use explicit fromTo values in px (never `set()` + percent
        // transforms): GSAP re-parses percent transforms as baked pixel offsets when ScrollTrigger refreshes
        // on resize/rotation, which permanently displaced the closing headline on phones.

        // Marquee slides left behind everything on the white stage
        tl.fromTo(marquee, { xPercent: 0 }, { xPercent: -48, duration: T.lightEnd + 0.04 }, 0);

        // A — hero card swings up and away
        tl.fromTo(
          hero,
          { yPercent: 0, xPercent: 0, rotation: () => (W() > 767 ? -7 : -2.5), rotateX: 0, scale: 1 },
          { yPercent: -125, xPercent: -14, rotation: -28, rotateX: 38, scale: 0.8, ease: "power2.in", duration: dur(T.heroExit) },
          T.heroExit[0],
        );
        hideAt(hero, T.heroExit[1]);

        // B — side cards swing in around a centre card
        tl.fromTo(left, { xPercent: -340, rotateY: 62, rotateZ: -8 }, { xPercent: -118, rotateY: 28, rotateZ: 0, ease: "power3.out", duration: dur(T.sideIn) }, T.sideIn[0]);
        tl.fromTo(right, { xPercent: 340, rotateY: -62, rotateZ: 8 }, { xPercent: 118, rotateY: -28, rotateZ: 0, ease: "power3.out", duration: dur(T.sideIn) }, T.sideIn[0]);
        tl.fromTo(center, { scale: 0.7, opacity: 0, y: "7vh" }, { scale: 1, opacity: 1, y: 0, ease: "power3.out", duration: 0.12 }, 0.1);
        tl.to(left, { xPercent: -60, rotateY: 84, ease: "power2.inOut", duration: dur(T.cardFocus) }, T.cardFocus[0]);
        tl.to(right, { xPercent: 60, rotateY: -84, ease: "power2.inOut", duration: dur(T.cardFocus) }, T.cardFocus[0]);

        // C — the ✦ opens in the card, then scales until its silhouette fills the screen
        const iconPx = () => center.offsetWidth * 0.34;
        const growPx = () => Math.max(W(), H()) * 3.6;
        tl.fromTo(hole, { s: 0 }, { s: iconPx, ease: "power2.out", duration: dur(T.holeOpen), onUpdate: applyHole }, T.holeOpen[0]);
        tl.to(hole, { s: growPx, ease: "power2.in", duration: dur(T.holeGrow), onUpdate: applyHole }, T.holeGrow[0]);

        // D — particle-sphere copy
        tl.fromTo(copy, { opacity: 0, y: 24 }, { opacity: 1, y: 0, ease: "power2.out", duration: dur(T.copyIn) }, T.copyIn[0]);
        tl.to(copy, { opacity: 0, y: -18, ease: "power2.in", duration: dur(T.copyOut) }, T.copyOut[0]);

        // E — gallery pans in, then scatters into a floating field in depth
        showAt(gallery, T.galleryIn[0] - 0.004);
        const pw = () => panels[0]!.offsetWidth;
        const rowX = (i: number) => (i - 1) * (pw() + W() * 0.03);
        panels.forEach((panel, i) => {
          const sc = SCATTER[i]!;
          const sx = () => (sc.x * W()) / 100;
          const sy = () => (sc.y * H()) / 100;
          if (i < 3) {
            // Panels rise from the bottom edge (as in the benchmark) and the row drifts slowly left while it settles.
            tl.fromTo(
              panel,
              { x: () => rowX(i) + W() * 0.06, y: () => H() * 1.08, scale: 1, rotation: 0, z: 0, opacity: 1 },
              { x: () => rowX(i) - W() * 0.04, y: 0, ease: "power3.out", duration: dur(T.galleryIn) + 0.03 },
              T.galleryIn[0] + i * 0.012,
            );
            tl.to(panel, { x: sx, y: sy, rotation: sc.r, scale: sc.s, z: sc.z, ease: "power3.inOut", duration: dur(T.scatter) }, T.scatter[0]);
          } else {
            tl.set(panel, { x: sx, y: sy, rotation: sc.r - 10, scale: 0.05, z: sc.z - 200, opacity: 0 }, 0);
            const s0 = T.scatter[0] + 0.025 * (i - 3);
            tl.to(panel, { opacity: 1, scale: sc.s, rotation: sc.r, z: sc.z, ease: "power3.out", duration: T.scatter[1] - s0 - 0.03 }, s0);
          }
          tl.to(panel, { opacity: 0, ease: "power2.in", duration: dur(T.panelsOut) }, T.panelsOut[0]);
        });
        drifts.forEach((d, i) => {
          const dir = i % 2 ? 1 : -1;
          tl.fromTo(d, { x: 0, y: 0 }, { x: `${dir * 3.5}vw`, y: `${dir * -3}vh`, duration: dur(T.drift) }, T.drift[0]);
        });
        hideAt(gallery, T.panelsOut[1]);

        // F — one floating panel is the violet card: it peeks in at the bottom-right (chrome star already inside,
        // clipped by the card edge), grows to a large card, then fills the frame. The WebGL layer is clipped to the
        // very same rectangle on the very same tweens, so the star can never leave the card.
        const rect = (t: number, r: number, b: number, l: number, round: number) => `inset(${t}px ${r}px ${b}px ${l}px round ${round}px)`;
        const margin = () => (W() > 900 ? 20 : 12);
        const fromInset = (i: { l: number; t: number; r: number; b: number }, round: number) => rect(H() * i.t, W() * i.r, H() * i.b, W() * i.l, round);
        const R0 = () => fromInset(CARD.peek, 18);
        const R1 = () => fromInset(W() > 767 ? CARD.largeDesktop : CARD.largeMobile, 24);
        const R2 = () => rect(margin(), margin(), margin(), margin(), 28);
        const clipTargets = [cta, canvasWrap];
        showAt(cta, T.cardPeek - 0.004);
        tl.set(canvasWrap, { clipPath: "inset(0px 0px 0px 0px)" }, 0);
        tl.set(clipTargets, { clipPath: R0 }, T.cardPeek);
        tl.fromTo(clipTargets, { clipPath: R0 }, { clipPath: R1, ease: "power2.inOut", duration: dur(T.cardGrow1), immediateRender: false }, T.cardGrow1[0]);
        tl.to(clipTargets, { clipPath: R2, ease: "power3.inOut", duration: dur(T.cardGrow2) }, T.cardGrow2[0]);
        tl.fromTo(bars, { opacity: 0 }, { opacity: 1, duration: dur(T.frame) }, T.frame[0]);
        tl.fromTo(
          lines,
          { y: (_i: number, target: Element) => (target as HTMLElement).offsetHeight * 1.2 },
          { y: 0, stagger: 0.025, ease: "power3.out", duration: 0.07 },
          T.ctaCopy[0],
        );
        tl.fromTo(ctaFade, { opacity: 0, y: 18 }, { opacity: 1, y: 0, stagger: 0.02, ease: "power2.out", duration: 0.06 }, T.ctaCopy[0] + 0.05);

        // Test hook for the comparison harness (read-only)
        (window as unknown as { __stage?: unknown }).__stage = {
          get progress() {
            return prog.current.v;
          },
        };

        return () => {
          delete root$.dataset.stageLight;
          delete (window as unknown as { __stage?: unknown }).__stage;
        };
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [debug] },
  );

  return (
    <>
      <section ref={root} data-stage-animated="" aria-label="Introduction" className="relative h-[560svh] md:h-[720svh]">
        <div data-st="stick" className="st-stick sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
          {/* F — closing violet card (clipped open by the timeline) */}
          <div data-st="cta" className="st-violet st-cta absolute inset-0 z-[2]">
            <div className="st-glow absolute inset-0" aria-hidden="true" />
            <div className="relative flex h-full flex-col justify-start px-[calc(var(--gutter)+8px)] pb-16 pt-[clamp(6rem,17svh,9rem)] md:max-w-[56%] md:justify-center md:pt-24">
              <h2 className="font-display text-[clamp(2.6rem,1.4rem+5vw,6.4rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
                {content.final.headline.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.1em]">
                    <span data-st="line" className={`block ${i === 1 ? "text-white/55" : ""}`}>
                      {line}
                    </span>
                  </span>
                ))}
              </h2>
              <p data-st="ctafade" className="mt-6 max-w-[26rem] text-[clamp(1rem,0.95rem+0.3vw,1.2rem)] leading-relaxed text-white/80">
                {content.final.body}
              </p>
              <div data-st="ctafade" className="mt-8">
                <Link href={content.final.cta.href} className="btn bg-white text-[#0b0220] hover:bg-white/90">
                  <span>{content.final.cta.label}</span>
                  <ArrowRight />
                </Link>
              </div>
            </div>
          </div>

          {/* E — gallery panels over black */}
          <ul data-st="gallery" className="st-gallery absolute inset-0 z-[1] m-0 list-none p-0">
            {content.gallery.map((item) => (
              <li key={item.title} data-st="panel" className="st-panel">
                <div data-st="drift" className="h-full w-full">
                  <GalleryPanel item={item} />
                </div>
              </li>
            ))}
          </ul>

          {/* A–C — white paper stage with the ✦ mask hole */}
          <div data-st="white" className="st-white absolute inset-0 z-[3] bg-white">
            <div data-st="marquee" className="st-marquee" aria-hidden="true">
              {[0, 1].map((k) => (
                <div key={k} className="st-marquee-row">
                  {content.marquee.map((m) => (
                    <span key={`${k}-${m}`} className="st-marquee-item">
                      {m}
                      <i aria-hidden="true" />
                    </span>
                  ))}
                </div>
              ))}
            </div>
            <div className="st-cards absolute inset-0">
              <div data-st="center" className="st-card">
                <StarCard content={content.starCard} />
              </div>
              <div data-st="left" className="st-card">
                <SideCardLeft content={content.sideCards.left} />
              </div>
              <div data-st="right" className="st-card">
                <SideCardRight content={content.sideCards.right} />
              </div>
              <div data-st="hero" className="st-hero">
                <HeroCard content={content.heroCard} />
              </div>
            </div>
          </div>

          <div data-st="canvas" className="absolute inset-0 z-[4]">
            <StageCanvas prog={prog} onUnavailable={onUnavailable} />
          </div>

          {/* D — copy that fades in beside the particle sphere */}
          <div data-st="copy" className="pointer-events-none absolute inset-0 z-[5]" aria-hidden="true">
            <div className="absolute inset-0" style={{ background: "radial-gradient(60% 45% at 14% 100%, rgba(0,0,0,0.85), transparent 70%)" }} />
            <div className="absolute bottom-[clamp(1.5rem,5vh,3.5rem)] left-[var(--gutter)] max-w-[26rem] space-y-4 text-[clamp(0.82rem,0.78rem+0.2vw,0.98rem)] leading-relaxed text-white/90 [text-shadow:0_1px_14px_#000]">
              {content.particleCopy.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <span className="absolute bottom-[clamp(1.5rem,5vh,3.5rem)] right-[var(--gutter)] text-right text-sm text-white/70">{content.cornerLabel}</span>
          </div>

          {/* White rim that appears as the violet card lands (page-frame, as in the benchmark's final state) */}
          {(["top", "bottom", "left", "right"] as const).map((side) => (
            <span key={side} data-st="bar" aria-hidden="true" className={`st-bar st-bar-${side}`} />
          ))}
        </div>
        {debug && <StageHud rootRef={root} prog={prog} />}
      </section>

      <div data-stage-static="">
        <StaticStage content={content} />
      </div>
    </>
  );
}
