import { useId } from "react";
import { cn } from "@/lib/cn";

interface LogoMarkProps {
  size?: number;
  /** Fade the mark in on first paint. Skipped automatically for reduced motion. */
  animateOnMount?: boolean;
  className?: string;
}

/** Devereux Digitals "D" mark. Vector, with gradient stops themed in nav.css for dark and light mode. */
export function LogoMark({ size = 30, animateOnMount = true, className }: LogoMarkProps) {
  const gradient = `logo-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const width = Math.round(size * 1.45);
  return (
    <svg
      width={width}
      height={Math.round((width * 713) / 1156)}
      viewBox="32 40 1156 713"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", animateOnMount && "logo-draw", className)}
    >
      <defs>
        <linearGradient id={gradient} gradientUnits="userSpaceOnUse" x1="200" y1="60" x2="1050" y2="720">
          <stop offset="0" style={{ stopColor: "var(--logo-1)" }} />
          <stop offset=".55" style={{ stopColor: "var(--logo-2)" }} />
          <stop offset=".9" style={{ stopColor: "var(--logo-3)" }} />
          <stop offset="1" style={{ stopColor: "var(--logo-4)" }} />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradient})`}>
        <path d="M240 40H800C1020 40 1188 205 1188 398C1188 590 1020 753 800 753H340L655 305H833L622 606H810C925 606 1018 515 1018 410C1018 305 925 215 810 215H180Z" />
        <path d="M350 305H556L241 753H32Z" />
      </g>
    </svg>
  );
}
