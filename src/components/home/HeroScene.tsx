"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { getQualityTierCached, type QualityTier } from "@/lib/capabilities";
import { SignalFallback } from "@/components/visuals/SignalFallback";
import { cn } from "@/lib/cn";

// The whole 3D stack (three, R3F, drei) lives behind this dynamic import — it never enters the initial bundle.
const SignalCoreScene = dynamic(() => import("./SignalCoreScene"), { ssr: false });

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const subscribeNoop = () => () => {};

/**
 * Hero visual host. Decides — once, on the client — between:
 *   • the live 3D Signal Core (quality tier "high" | "low"), and
 *   • the static SVG composition (WebGL missing, reduced motion, data-saver, weak device, runtime failure).
 * The SVG is always rendered first as the poster, so the hero is never empty and never shifts layout.
 * The canvas is decorative: the host is aria-hidden and pointer-events: none (scroll + text selection unaffected).
 */
export function HeroScene({ className }: { className?: string }) {
  const tier = useSyncExternalStore<QualityTier>(subscribeNoop, getQualityTierCached, () => "off");
  const hostRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [visible, setVisible] = useState(true);
  // QA aid: `?scene=force` disables only the frame-rate fallback (e.g. to inspect the scene on software GL).
  const [perfFallback] = useState(() => typeof window === "undefined" || new URLSearchParams(window.location.search).get("scene") !== "force");

  // Defer scene boot until the browser is idle so it never competes with LCP.
  useEffect(() => {
    if (tier === "off") return;
    const win = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number; cancelIdleCallback?: (id: number) => void };
    let id: number;
    if (win.requestIdleCallback) {
      id = win.requestIdleCallback(() => setArmed(true), { timeout: 1500 });
      return () => win.cancelIdleCallback?.(id);
    }
    id = window.setTimeout(() => setArmed(true), 400);
    return () => window.clearTimeout(id);
  }, [tier]);

  // Pause rendering when the hero is offscreen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showScene = tier !== "off" && armed && !failed;
  const sceneLive = showScene && ready;

  return (
    <div ref={hostRef} aria-hidden="true" className={cn("pointer-events-none select-none", className)}>
      <SignalFallback
        className={cn(
          "absolute inset-0 h-full w-full transition-opacity duration-[1200ms] ease-out",
          sceneLive ? "opacity-0" : "opacity-100",
        )}
      />
      {showScene && (
        <div className={cn("absolute inset-0 transition-opacity duration-[1400ms] ease-out", sceneLive ? "opacity-100" : "opacity-0")}>
          <SceneBoundary onError={() => setFailed(true)}>
            <SignalCoreScene
              tier={tier === "high" ? "high" : "low"}
              active={visible}
              perfFallback={perfFallback}
              onReady={() => setReady(true)}
              onFail={() => setFailed(true)}
            />
          </SceneBoundary>
        </div>
      )}
    </div>
  );
}
