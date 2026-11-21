"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { MediaImage } from "@/data/media";
import { cn } from "@/lib/cn";

interface LightboxProps {
  image: MediaImage;
  /** Trigger content (thumbnail, "See Chat →" text …) */
  children: ReactNode;
  label: string;
  caption?: string;
  className?: string;
}

/**
 * Accessible full screen image viewer on the native <dialog>: focus-trapped, Esc closes,
 * clicking the backdrop closes. The image fills the screen; tapping it toggles a zoomed,
 * scrollable view so long screenshots stay readable on phones.
 */
export function Lightbox({ image, children, label, caption, className }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const [zoomed, setZoomed] = useState(false);
  // The viewer body is only rendered while open: a page with many thumbnails hydrates one small
  // button per image instead of a hidden full size viewer each.
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && ref.current && !ref.current.open) ref.current.showModal();
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={label}
        onClick={() => {
          setZoomed(false);
          setOpen(true);
        }}
        className={cn("cursor-zoom-in", className)}
      >
        {children}
      </button>
      <dialog
        ref={ref}
        aria-label={caption ?? image.alt}
        className="lightbox"
        onClose={() => setOpen(false)}
        onClick={(e) => {
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.classList.contains("lightbox-stage")) ref.current?.close();
        }}
      >
        {open && (
          <>
        <figure className={cn("lightbox-inner", zoomed && "is-zoomed")}>
          <div className="lightbox-stage">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="100vw"
              className="lightbox-img"
              onClick={() => setZoomed((z) => !z)}
            />
          </div>
          <figcaption className="lightbox-cap">
            {caption && <span>{caption}</span>}
            <span className="text-white/50">{zoomed ? "Tap image to fit screen" : "Tap image to zoom"}</span>
          </figcaption>
        </figure>
        <button type="button" onClick={() => ref.current?.close()} className="lightbox-close" aria-label="Close" autoFocus>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
          </>
        )}
      </dialog>
    </>
  );
}
