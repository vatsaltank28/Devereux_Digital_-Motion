import type { ReactNode } from "react";

/**
 * Route wrapper. The old opacity fade was removed for performance: any opacity animation around the
 * page delays the browser's Largest Contentful Paint for the hero text (measured: LCP 2.5s → 3.7s).
 */
export default function Template({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
