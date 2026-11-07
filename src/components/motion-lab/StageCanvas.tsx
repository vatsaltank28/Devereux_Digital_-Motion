"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore, Component, type ReactNode } from "react";
import { getQualityTierCached, type QualityTier } from "@/lib/capabilities";
import { cn } from "@/lib/cn";
import type { Progress } from "./StageScene";

// three / R3F / drei stay out of the initial bundle: loaded only when the stage mounts on a capable device.
const StageScene = dynamic(() => import("./StageScene"), { ssr: false });

class Boundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
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

interface StageCanvasProps {
  prog: { current: Progress };
  /** Called when 3D cannot run (no WebGL / weak device / error) so the parent can switch to the static stage. */
  onUnavailable: () => void;
  className?: string;
}

export default function StageCanvas({ prog, onUnavailable, className }: StageCanvasProps) {
  const tier = useSyncExternalStore<QualityTier>(subscribeNoop, getQualityTierCached, () => "low");
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (tier === "off" || failed) onUnavailable();
  }, [tier, failed, onUnavailable]);

  useEffect(() => {
    const el = host.current?.parentElement;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e?.isIntersecting ?? true), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (tier === "off" || failed) return null;
  return (
    <div ref={host} aria-hidden="true" className={cn("pointer-events-none absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0", className)}>
      <Boundary onError={() => setFailed(true)}>
        <StageScene
          prog={prog.current}
          tier={tier === "high" ? "high" : "low"}
          active={visible}
          onReady={() => setReady(true)}
          onFail={() => setFailed(true)}
        />
      </Boundary>
    </div>
  );
}
