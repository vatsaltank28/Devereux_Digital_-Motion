"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Walkthrough video tuned for Core Web Vitals: the poster is a prioritised, responsive
 * next/image (it is the LCP element), and the MP4 is only attached once the frame nears
 * the viewport. Plays muted while visible, pauses off screen. Reduced motion: poster only,
 * with a play button that loads native controls.
 */
export function LazyVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [manual, setManual] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // The frame is usually on screen at load, so never start the MP4 during page start up: wait for
    // the load event, then an idle slot (+ a short settle delay). The poster covers that gap, and
    // video download/decode no longer competes with hydration or the first interaction.
    let inView = false;
    let settled = false;
    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (inView && settled) {
        setLoad(true);
        vid.current?.play().catch(() => {});
      }
    };
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    const afterLoad = () => {
      timer = setTimeout(() => {
        const go = () => {
          settled = true;
          start();
        };
        if (w.requestIdleCallback) idleId = w.requestIdleCallback(go, { timeout: 3000 });
        else go();
      }, 1500);
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        inView = e.isIntersecting;
        if (inView) start();
        else vid.current?.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.removeEventListener("load", afterLoad);
      if (timer) clearTimeout(timer);
      if (idleId !== undefined) w.cancelIdleCallback?.(idleId);
    };
  }, []);

  return (
    <div ref={box} className="relative aspect-[16/10] bg-surface-3">
      <Image src={poster} alt={label} fill priority sizes="(max-width: 1440px) 94vw, 1360px" className="object-cover object-top" />
      {(load || manual) && (
        <video
          ref={vid}
          className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
          src={src}
          muted
          loop
          playsInline
          autoPlay={!manual}
          controls={manual}
          aria-label={label}
          onCanPlay={() => setReady(true)}
        />
      )}
      {!load && !manual && (
        <button type="button" onClick={() => setManual(true)} className="absolute inset-0 hidden place-items-center motion-reduce:grid" aria-label={`Play: ${label}`}>
          <span className="grid size-14 place-items-center rounded-full bg-black/60 text-white">▶</span>
        </button>
      )}
    </div>
  );
}
