"use client";

import Image from "next/image";
import { useRef, type ReactNode } from "react";
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
 * Accessible image viewer on the native <dialog>: focus-trapped, Esc closes, click outside closes.
 * Used for portfolio work, chat proof and the featured review photo.
 */
export function Lightbox({ image, children, label, caption, className }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button type="button" aria-label={label} onClick={() => ref.current?.showModal()} className={cn("cursor-zoom-in", className)}>
        {children}
      </button>
      <dialog
        ref={ref}
        aria-label={caption ?? image.alt}
        className="lightbox"
        onClick={(e) => {
          if (e.target === e.currentTarget) ref.current?.close();
        }}
      >
        <figure className="lightbox-inner">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 768px) 94vw, 80vw"
            className="lightbox-img"
          />
          {caption && <figcaption className="mt-3 text-center text-sm text-white/70">{caption}</figcaption>}
        </figure>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          className="lightbox-close"
          aria-label="Close"
          autoFocus
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
