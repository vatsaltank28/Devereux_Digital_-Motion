"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { PortfolioMedia } from "@/data/portfolio";
import { Lightbox } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

/**
 * Project media gallery. Slide order is the data order (main image first, then video, then screens).
 * Swipe on touch (scroll snap), arrows + thumbnails on desktop, ←/→ keys, full screen for images.
 * Videos never autoplay and only appear when a real file exists in the data.
 */
export function MediaGallery({ media, title }: { media: PortfolioMedia[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = media.length;

  const go = useCallback(
    (i: number) => {
      const el = track.current;
      if (!el) return;
      const next = Math.max(0, Math.min(count - 1, i));
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
    },
    [count],
  );

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => setIndex(Math.round(el.scrollLeft / Math.max(1, el.clientWidth)));
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // Pause any playing video when it leaves view.
  useEffect(() => {
    track.current?.querySelectorAll("video").forEach((v) => {
      const slide = v.closest("[data-slide]");
      if (slide && Number(slide.getAttribute("data-slide")) !== index && !v.paused) v.pause();
    });
  }, [index]);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  return (
    <div className="media-gallery" role="region" aria-roledescription="carousel" aria-label={`${title} gallery`}>
      <div className="relative">
        <div ref={track} className="media-track" tabIndex={0} onKeyDown={onKey}>
          {media.map((m, i) => (
            <div key={m.src} data-slide={i} className="media-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${count}`}>
              {m.type === "image" ? (
                <Lightbox image={m} label={`View full screen: ${m.alt}`} caption={m.alt} className="media-frame block w-full">
                  <Image src={m.src} alt={m.alt} width={m.width} height={m.height} quality={90} priority={i === 0} sizes="(max-width: 1024px) 94vw, 70vw" className="media-img" />
                </Lightbox>
              ) : (
                <div className="media-frame">
                  <video className="media-img" controls playsInline preload="none" poster={m.poster.src} aria-label={m.alt}>
                    <source src={m.src} />
                  </video>
                </div>
              )}
              <p className="t-caption mt-2.5">{m.alt}</p>
            </div>
          ))}
        </div>
        {count > 1 && (
          <>
            <button type="button" className="media-arrow media-arrow--prev" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous slide">
              ←
            </button>
            <button type="button" className="media-arrow media-arrow--next" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label="Next slide">
              →
            </button>
          </>
        )}
      </div>
      {count > 1 && (
        <div className="media-thumbs" aria-label="Choose slide">
          {media.map((m, i) => {
            const t = m.type === "video" ? m.poster : m;
            return (
              <button
                key={m.src}
                type="button"
                aria-current={i === index}
                aria-label={`Show slide ${i + 1}: ${m.alt}`}
                onClick={() => go(i)}
                className={cn("media-thumb", i === index && "is-active")}
              >
                <Image src={t.src} alt="" width={t.width} height={t.height} sizes="96px" className="h-full w-full object-cover object-top" />
                {m.type === "video" && <span aria-hidden="true" className="media-thumb-play">▶</span>}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
