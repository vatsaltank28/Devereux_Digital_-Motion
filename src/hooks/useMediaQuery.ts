"use client";

import { useSyncExternalStore } from "react";

/**
 * SSR-safe media-query subscription. Returns `serverValue` during SSR/hydration
 * so server and client markup always agree, then the live value.
 */
export function useMediaQuery(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", notify);
      return () => mql.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

/** True only on devices with a fine pointer that can hover (mouse/trackpad). */
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
