"use client";

/** Renders the current year at view time (not frozen at build). */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
