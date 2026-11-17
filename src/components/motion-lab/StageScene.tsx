"use client";

/* eslint-disable react-hooks/immutability --
   R3F's `useFrame` is an imperative render loop: shader uniforms and object transforms are mutated per frame by
   design (React state would re-render 60×/s). The memoised material/geometry are owned by this component. */

/**
 * The WebGL half of the cinematic stage. Every transform here is a pure function of the shared scroll
 * progress (`prog.v`, written by the GSAP master timeline) — no timers, no per-scene state machines —
 * so scrolling back reverses the camera, particles and star exactly.
 *
 *  • Particle sphere  — custom shader, Fibonacci lattice, white rim → violet core
 *  • Flat star        — screen-constant billboard at the sphere's centre
 *  • Camera           — dolly from outside the sphere to inside it, then retreats unseen
 *  • Chrome star      — thick bevelled extrusion, procedural violet/white light-formers, enters from the right
 */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { createChromeStarGeometry, createFlatStarGeometry } from "./chromeStar";
import { particleFragment, particleVertex } from "./shaders";
import { T, cardState, easeInOut, easeOut, sm, smooth } from "./timeline";

export interface Progress {
  v: number;
}
type Tier = "low" | "high";

const COUNT = { high: 28000, low: 12000 } as const;
const REST_Z = 8.6;
const lerp = THREE.MathUtils.lerp;

function fibonacciSphere(count: number): { positions: Float32Array; rand: Float32Array } {
  const positions = new Float32Array(count * 3);
  const rand = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    positions.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
    rand.set([rnd(), rnd(), rnd()], i * 3);
  }
  return { positions, rand };
}

function Rig({ prog, tier }: { prog: Progress; tier: Tier }) {
  const { camera, size, gl } = useThree();
  const sphere = useRef<THREE.Points>(null);
  const flat = useRef<THREE.Mesh>(null);
  const chrome = useRef<THREE.Mesh>(null);

  const { geometry, material } = useMemo(() => {
    const { positions, rand } = fibonacciSphere(COUNT[tier]);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 3));
    const m = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uRadius: { value: 2.6 },
        uSpread: { value: 0 },
        uOpacity: { value: 0 },
        uPixel: { value: 1 },
        uSizeScale: { value: 21 },
        uShape: { value: 0 },
        uWarm: { value: 0 },
      },
    });
    return { geometry: g, material: m };
  }, [tier]);
  const chromeGeo = useMemo(() => createChromeStarGeometry(), []);
  const flatGeo = useMemo(() => createFlatStarGeometry(), []);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
      chromeGeo.dispose();
      flatGeo.dispose();
    },
    [geometry, material, chromeGeo, flatGeo],
  );

  useFrame((state) => {
    const p = prog.v;
    const t = state.clock.elapsedTime;
    const portrait = size.width / size.height < 1;

    // Camera: outside → inside the sphere → (unseen) back to rest for the chrome star.
    const fly = easeInOut(sm(T.fly, p));
    const back = smooth(sm(T.camBack, p));
    // Approach the sphere, hold while the swarm morphs (New Era), dive down the tunnel, then return
    // (unseen, behind the gallery) to rest for the chrome star.
    let z = lerp(13.5, 9.2, fly);
    z = lerp(z, -15, easeInOut(sm(T.tunnelFly, p)));
    z = lerp(z, REST_Z, back);
    const drift = smooth(sm(T.chromeIn, p));
    camera.position.set(Math.sin(t * 0.12) * 0.12 * drift, 0.04 + Math.cos(t * 0.1) * 0.06 * drift, z);
    camera.lookAt(0, 0, z - 9);

    // Particle sphere
    const mat = material.uniforms;
    mat.uTime!.value = t;
    mat.uPixel!.value = gl.getPixelRatio();
    mat.uOpacity!.value = smooth(sm(T.dustIn, p)) * (1 - smooth(sm(T.dustOut, p)));
    mat.uSpread!.value = 0;
    const shape = sm(T.toRing, p) + sm(T.toHelix, p) + sm(T.toHorizon, p) + sm(T.toTunnel, p);
    mat.uShape!.value = shape;
    mat.uWarm!.value = smooth(sm(T.warm, p));
    if (sphere.current) {
      sphere.current.visible = (mat.uOpacity!.value as number) > 0.002;
      // The sphere tumbles; formed shapes settle upright so they read clearly.
      const still = smooth(Math.min(shape, 1));
      sphere.current.rotation.y = lerp(t * 0.07 + p * 2.4, shape > 1.5 && shape < 2.5 ? 0.35 : 0, still);
      sphere.current.rotation.x = lerp(Math.sin(t * 0.05) * 0.2 + p * 0.6, 0, still);
      // Portrait screens: shrink the ring/helix to fit the narrow frame; horizon/tunnel return to full size.
      const narrow = still * (1 - smooth(Math.min(Math.max(shape - 2, 0), 1)));
      sphere.current.scale.setScalar(portrait ? lerp(1, 0.62, narrow) : 1);
    }

    // Flat star: constant on-screen size (scales with camera distance), billboarded.
    if (flat.current) {
      const vis = smooth(sm(T.dustIn, p)) * (1 - smooth(sm(T.starOut, p)));
      const d = Math.max(camera.position.length(), 0.8);
      flat.current.visible = vis > 0.002;
      flat.current.scale.setScalar(Math.max(0.03, d * 0.017) * vis);
      flat.current.quaternion.copy(camera.quaternion);
    }

    // Chrome star: lives INSIDE the violet card's window. Its centre, size and anchor are derived from the same
    // card rectangle the DOM clips to, so it is always composed for that window (small peek → large card → full
    // frame, where it is cropped by the frame like a hero crop) while slowly turning.
    if (chrome.current) {
      const cp = easeOut(sm(T.chromeIn, p));
      chrome.current.visible = p > T.cardPeek - 0.01;
      const viewH = 2 * Math.tan(THREE.MathUtils.degToRad(17.5)) * REST_Z;
      const viewW = viewH * (size.width / size.height);
      const { box, a, b } = cardState(p, size.width < 768);
      const cardW = 1 - box.l - box.r;
      const cardH = 1 - box.t - box.b;
      // Anchors/sizes measured from the benchmark frames (star ≈ 0.6 of card height, centred ≈ 70% across).
      // Portrait: copy sits at the top of the card, so the star is kept low and cropped by the bottom/right edges.
      const ax = lerp(lerp(0.62, portrait ? 0.62 : 0.7, a), portrait ? 0.68 : 0.76, b);
      const k = lerp(lerp(1.05, portrait ? 0.62 : 0.74, a), portrait ? 0.6 : 0.82, b);
      const ay = lerp(lerp(0.6, portrait ? 0.74 : 0.58, a), portrait ? 0.9 : 0.58, b);
      const cx = box.l + cardW * ax;
      const cy = box.t + cardH * ay;
      chrome.current.position.set((cx - 0.5) * viewW, (0.5 - cy) * viewH, 0);
      chrome.current.scale.setScalar(0.5 * k * cardH * viewH);
      chrome.current.rotation.set(
        lerp(0.3, 0.1, cp) + Math.sin(t * 0.2) * 0.03,
        lerp(-1.1, 0.3, cp) + Math.sin(t * 0.17) * 0.06,
        lerp(0.8, 0.5, cp) + Math.sin(t * 0.11) * 0.04,
      );
    }
  });

  return (
    <>
      <points ref={sphere} geometry={geometry} material={material} frustumCulled={false} />
      <mesh ref={flat} geometry={flatGeo} visible={false}>
        <meshBasicMaterial color="#ffffff" toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={chrome} geometry={chromeGeo} visible={false}>
        <meshPhysicalMaterial
          color="#eef0ff"
          metalness={1}
          roughness={0.14}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>
    </>
  );
}

interface StageSceneProps {
  prog: Progress;
  tier: Tier;
  active: boolean;
  onReady: () => void;
  onFail: () => void;
}

export default function StageScene({ prog, tier, active, onReady, onFail }: StageSceneProps) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={tier === "high" ? [1, 1.75] : 1}
      camera={{ position: [0, 0.04, 13.5], fov: 35, near: 0.05, far: 60 }}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMappingExposure = 1.1;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail();
        });
        onReady();
      }}
    >
      {/* Procedural light-formers (no HDRI download): white softbox, violet strips, pink floor bounce. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3.2} position={[-4, 4, 4]} scale={[9, 4, 1]} color="#ffffff" />
        {/* Face reflects toward +X/+Z (see rotation below), so the key softbox lives there; a cool fill sits opposite. */}
        <Lightformer form="rect" intensity={3.6} position={[4.5, 1.5, 7]} scale={[7, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={0.8} position={[-4, -2, 8]} scale={[6, 3, 1]} color="#b9b4ff" />
        <Lightformer form="rect" intensity={1.4} position={[6, 0, -2]} rotation-y={Math.PI / 2} scale={[8, 2.5, 1]} color="#7a3dff" />
        <Lightformer form="ring" intensity={1.2} position={[0, 0, -8]} scale={9} color="#8d5bff" />
        <Lightformer form="rect" intensity={0.5} position={[0, -5, 2]} scale={[12, 2, 1]} color="#ff9bf2" />
        <Lightformer form="rect" intensity={0.6} position={[4, 5, 3]} scale={[6, 2, 1]} color="#c9c4ff" />
      </Environment>
      <Rig prog={prog} tier={tier} />
    </Canvas>
  );
}
