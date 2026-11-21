import { cn } from "@/lib/cn";

interface LogoMarkProps {
  size?: number;
  /** Draw the mark on first paint. Skipped automatically for reduced motion. */
  animateOnMount?: boolean;
  className?: string;
}

/**
 * Devereux Digitals mark, a "D" form with a single signal node.
 * PLACEHOLDER until the client supplies the final logo (PRD §18); keep the API when swapping the SVG.
 *
 * The stroke draw is pure CSS (`pathLength=1` + dashoffset keyframes, see `.logo-draw` in features.css):
 * no animation library and no client JavaScript, so it costs nothing on the main thread.
 */
export function LogoMark({ size = 30, animateOnMount = true, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(animateOnMount && "logo-draw", className)}
    >
      <path
        pathLength={1}
        d="M8 6.5V25.5H15C20.5 25.5 24 21.6 24 16C24 10.4 20.5 6.5 15 6.5H8Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path pathLength={1} d="M13.5 12.5V19.5" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="27.5" cy="16" r="2.25" fill="var(--color-accent)" style={{ transformOrigin: "27.5px 16px", transformBox: "fill-box" }} />
    </svg>
  );
}
