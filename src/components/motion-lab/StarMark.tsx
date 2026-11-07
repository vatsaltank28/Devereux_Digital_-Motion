/** Path of the concave four-point star on a 100-unit grid. Shared by the 2-D card icon and the CSS mask hole. */
export const STAR_PATH = "M50 2C53 34 66 47 98 50C66 53 53 66 50 98C47 66 34 53 2 50C34 47 47 34 50 2Z";

/** `url(...)` for CSS `mask-image`, so the revealing hole is exactly the card's ✦ icon. */
export const STAR_MASK_URI = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><path d='${STAR_PATH}'/></svg>")`;

export function StarMark({ size = 64, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" focusable="false" className={className}>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}
