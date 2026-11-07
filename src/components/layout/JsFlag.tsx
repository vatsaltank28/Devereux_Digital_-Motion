"use client";

import { useLayoutEffect } from "react";

/**
 * Re-asserts the `js` class on <html> after React has hydrated/rendered the root.
 * The inline head script sets it before first paint, but if React re-renders <html> (e.g. a hydration
 * recovery on some hosts) its className prop overwrites the class list and drops `js`, which flips the
 * homepage to its static (no-animation) fallback. This keeps the animated stage visible.
 */
export function JsFlag() {
  useLayoutEffect(() => {
    const html = document.documentElement;
    html.classList.add("js");
    const mo = new MutationObserver(() => {
      if (!html.classList.contains("js")) html.classList.add("js");
    });
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);
  return null;
}
