"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CookieConsent = dynamic(() => import("./CookieConsent").then((m) => m.CookieConsent), { ssr: false });

/**
 * Non critical, below the fold UI mounted once the browser is idle after first paint, so it never
 * competes with the page's own hydration (keeps Total Blocking Time low). The consent banner already
 * waits ~1.2s before appearing, so deferring its code changes nothing visible.
 */
export function DeferredUI() {
  const [ready, setReady] = useState(false);
  // "Cookie settings" clicked before the banner code loaded: load it now and open in settings mode.
  const [openSettings, setOpenSettings] = useState(false);
  useEffect(() => {
    const early = () => {
      setOpenSettings(true);
      setReady(true);
    };
    window.addEventListener("devereux:open-consent", early, { once: true });
    return () => window.removeEventListener("devereux:open-consent", early);
  }, []);
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 2000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 800);
    return () => clearTimeout(t);
  }, []);
  return ready ? <CookieConsent openSettings={openSettings} /> : null;
}
