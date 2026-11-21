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
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e) return;
        if (e.isIntersecting) {
          setLoad(true);
          vid.current?.play().catch(() => {});
        } else vid.current?.pause();
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
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
