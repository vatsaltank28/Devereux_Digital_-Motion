"use client";

/**
 * THE SIGNAL CORE — DESIGN.md §3.2 / MASTERPROMPT §7.
 *
 * Concept: one dark-chrome knot (the agency's craft) wrapped by three orbits carrying eight nodes —
 * one per service. A single blue signal pulses at the centre. Lit by one soft key, one blue rim and
 * procedural light-formers (no downloaded HDRI), so the payload is code only.
 *
 * Ownership: React Three Fiber owns everything inside the canvas. No React state changes per frame —
 * all motion runs in `useFrame` against refs. No post-processing (bloom is faked by a bright unlit core).
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";

type Tier = "low" | "high";

interface SignalCoreSceneProps {
  tier: Tier;
  /** When false the render loop is paused (offscreen / tab hidden). */
  active: boolean;
  /** Hand over to the static fallback if the frame rate keeps sagging. */
  perfFallback?: boolean;
  onReady: () => void;
  onFail: () => void;
}

const QUALITY = {
  high: { knotTubular: 240, knotRadial: 40, ringSegments: 180, particles: 170, dpr: [1, 1.75] as [number, number], pointer: true },
  low: { knotTubular: 120, knotRadial: 20, ringSegments: 96, particles: 48, dpr: 1 as number, pointer: false },
} as const;

/** 3 + 3 + 2 nodes = eight services. */
const ORBITS = [
  { radius: 2.2, tilt: [1.05, 0.15, 0.1], speed: 0.11, nodes: 3, tube: 0.011, color: "#63a5ff", opacity: 0.75, hot: true },
  { radius: 2.75, tilt: [-0.55, 0.55, 0.35], speed: -0.075, nodes: 3, tube: 0.007, color: "#f7f8fa", opacity: 0.22, hot: false },
  { radius: 3.3, tilt: [0.3, -0.45, 0.85], speed: 0.05, nodes: 2, tube: 0.006, color: "#398bff", opacity: 0.4, hot: false },
] as const;

const CAMERA_REST_Z = 10.6;

function Rig({ children, pointer }: { children: React.ReactNode; pointer: boolean }) {
  const group = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!pointer) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer]);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;
    // On wide canvases (desktop layout) sit the sculpture right of centre so it never fights the headline.
    g.position.x = THREE.MathUtils.damp(g.position.x, state.size.width > 700 ? 0.55 : 0, 4, dt);
    // Damped, limited pointer parallax (≈ ±0.22 rad) — desktop only.
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, target.current.x * 0.22, 2.4, dt);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, target.current.y * 0.14, 2.4, dt);

    // Camera: intro dolly-in (starts further back and settles), slow drift, gentle push-back as the hero scrolls away.
    const scroll = Math.min(window.scrollY / window.innerHeight, 1);
    const cam = state.camera;
    cam.position.z = THREE.MathUtils.damp(cam.position.z, CAMERA_REST_Z + scroll * 1.8, 1.6, dt);
    cam.position.x = Math.sin(t * 0.13) * 0.28;
    cam.position.y = 0.1 + Math.cos(t * 0.11) * 0.16;
    cam.lookAt(0, 0, 0);
  });

  return <group ref={group}>{children}</group>;
}

function Core({ tubular, radial }: { tubular: number; radial: number }) {
  const knot = useRef<THREE.Mesh>(null);
  const pulse = useRef<THREE.Mesh>(null);

  useFrame((state, dt) => {
    if (knot.current) {
      knot.current.rotation.y += dt * 0.14;
      knot.current.rotation.x += dt * 0.055;
    }
    if (pulse.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.07;
      pulse.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      <mesh ref={knot} scale={1.22}>
        <torusKnotGeometry args={[0.72, 0.235, tubular, radial, 2, 3]} />
        <meshPhysicalMaterial
          color="#0a0b0f"
          metalness={1}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.08}
          sheen={1}
          sheenColor="#2f7dff"
          sheenRoughness={0.35}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* The signal: a small unlit core that reads as emission without any bloom pass. */}
      <mesh ref={pulse}>
        <icosahedronGeometry args={[0.3, 2]} />
        <meshBasicMaterial color="#8dbbff" toneMapped={false} />
      </mesh>
      <mesh scale={1.9}>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#398bff" transparent opacity={0.07} depthWrite={false} toneMapped={false} />
      </mesh>
    </group>
  );
}

function Orbit({
  radius,
  tilt,
  speed,
  nodes,
  tube,
  color,
  opacity,
  hot,
  segments,
  chrome,
}: (typeof ORBITS)[number] & { segments: number; chrome: THREE.Material }) {
  const spin = useRef<THREE.Group>(null);
  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.1, 20, 20), []);
  const hotMat = useMemo(() => new THREE.MeshBasicMaterial({ color: "#8dbbff", toneMapped: false }), []);
  const spokeMat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: "#398bff", transparent: true, opacity: 0.2, depthWrite: false }),
    [],
  );

  useEffect(
    () => () => {
      nodeGeo.dispose();
      hotMat.dispose();
      spokeMat.dispose();
    },
    [nodeGeo, hotMat, spokeMat],
  );

  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += dt * speed;
  });

  const inner = 1.15;
  const angles = Array.from({ length: nodes }, (_, i) => (i / nodes) * Math.PI * 2 + radius);

  return (
    <group rotation={[tilt[0], tilt[1], tilt[2]]}>
      <group ref={spin}>
        <mesh>
          <torusGeometry args={[radius, tube, 8, segments]} />
          <meshBasicMaterial color={color} transparent opacity={opacity} depthWrite={false} toneMapped={false} />
        </mesh>
        {angles.map((a, i) => {
          const isHot = hot && i === 0;
          const len = radius - inner;
          return (
            <group key={i} rotation={[0, 0, a]}>
              <mesh position={[radius, 0, 0]} geometry={nodeGeo} material={isHot ? hotMat : chrome} />
              <mesh position={[inner + len / 2, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={spokeMat}>
                <cylinderGeometry args={[0.004, 0.004, len, 4]} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    // Deterministic pseudo-random so SSR-less remounts look identical.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 4 + rand() * 5;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi) - 2;
    }
    return arr;
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.012;
  });

  if (count === 0) return null;
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} sizeAttenuation color="#8fb8ff" transparent opacity={0.55} depthWrite={false} toneMapped={false} />
    </points>
  );
}

function Scene({ tier }: { tier: Tier }) {
  const q = QUALITY[tier];
  const chrome = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: "#0c0d11", metalness: 1, roughness: 0.18, clearcoat: 1, envMapIntensity: 1.2 }),
    [],
  );
  useEffect(() => () => chrome.dispose(), [chrome]);

  return (
    <>
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.4} position={[-4, 5, 3]} scale={[9, 3, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={4} position={[5.5, -1, -3]} rotation-y={Math.PI / 2} scale={[7, 1.4, 1]} color="#2f7dff" />
        <Lightformer form="ring" intensity={2} position={[0, 0, -7]} scale={8} color="#398bff" />
        <Lightformer form="rect" intensity={1.1} position={[0, -5, 2]} scale={[11, 1, 1]} color="#cfe0ff" />
      </Environment>
      <directionalLight position={[-3, 4, 5]} intensity={0.9} color="#ffffff" />
      <pointLight position={[3.5, -1.2, -4]} intensity={36} color="#398bff" distance={16} decay={2} />

      <Rig pointer={q.pointer}>
        <Core tubular={q.knotTubular} radial={q.knotRadial} />
        {ORBITS.map((o, i) => (
          <Orbit key={i} {...o} segments={q.ringSegments} chrome={chrome} />
        ))}
      </Rig>
      <Dust count={q.particles} />
    </>
  );
}

export default function SignalCoreScene({ tier, active, perfFallback = true, onReady, onFail }: SignalCoreSceneProps) {
  const [dpr, setDpr] = useState<number | [number, number]>(QUALITY[tier].dpr);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={dpr}
      camera={{ position: [0, 0.1, CAMERA_REST_Z + 1.6], fov: 32, near: 0.1, far: 60 }}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMappingExposure = 1.05;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail();
        });
        onReady();
      }}
    >
      {/* If frame rate sags, drop resolution first; if it keeps sagging, hand over to the static fallback. */}
      <PerformanceMonitor onDecline={() => setDpr(1)} flipflops={3} onFallback={perfFallback ? onFail : undefined} />
      <Scene tier={tier} />
    </Canvas>
  );
}
