"use client";

/* eslint-disable react-hooks/immutability --
   R3F's `useFrame` is an imperative render loop: shader uniforms and object transforms are mutated per frame by
   design (React state would re-render 60×/s). The memoised material/geometry are owned by this component. */

/**
 * The WebGL half of the hero stage: one particle swarm whose shape is a pure function of scroll progress
 * (`prog.v`, written by the GSAP timeline in ScrollStage), ring → helix → horizon → tunnel, plus a camera that
 * holds still, then dives down the tunnel at the end. Scrolling back reverses everything exactly.
 */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { particleFragment, particleVertex } from "./shaders";
import { T, easeInOut, sm, smooth } from "./timeline";

export interface Progress {
  v: number;
}
type Tier = "low" | "high";

const COUNT = { high: 28000, low: 12000 } as const;
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
  const swarm = useRef<THREE.Points>(null);

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
        uOpacity: { value: 1 },
        uPixel: { value: 1 },
        uSizeScale: { value: 21 },
        uShape: { value: 1 },
        uWarm: { value: 1 },
      },
    });
    return { geometry: g, material: m };
  }, [tier]);

  useEffect(
    () => () => {
      geometry.dispose();
      material.dispose();
    },
    [geometry, material],
  );

  useFrame((state) => {
    const p = prog.v;
    const t = state.clock.elapsedTime;
    const portrait = size.width / size.height < 1;

    // Camera holds, then dives down the tunnel.
    const z = lerp(9.2, -15, easeInOut(sm(T.tunnelFly, p)));
    camera.position.set(0, 0.04, z);
    camera.lookAt(0, 0, z - 9);

    // Shader index: 1 ring · 2 helix · 3 horizon · 4 tunnel
    const shape = 1 + sm(T.toHelix, p) + sm(T.toHorizon, p) + sm(T.toTunnel, p);
    const u = material.uniforms;
    u.uTime!.value = t;
    u.uPixel!.value = gl.getPixelRatio();
    u.uShape!.value = shape;
    u.uOpacity!.value = 1 - smooth(sm(T.dustOut, p));

    if (swarm.current) {
      swarm.current.visible = (u.uOpacity!.value as number) > 0.002;
      // The helix turns slightly so its depth reads; other shapes face the camera.
      const helix = 1 - Math.min(Math.abs(shape - 2), 1);
      swarm.current.rotation.set(0, 0.35 * helix, 0);
      // Portrait screens: shrink ring/helix to fit the narrow frame; horizon/tunnel stay full size.
      const narrow = 1 - smooth(Math.min(Math.max(shape - 2, 0), 1));
      swarm.current.scale.setScalar(portrait ? lerp(1, 0.62, narrow) : 1);
    }
  });

  return <points ref={swarm} geometry={geometry} material={material} frustumCulled={false} />;
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
      camera={{ position: [0, 0.04, 9.2], fov: 35, near: 0.05, far: 60 }}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onFail();
        });
        onReady();
      }}
    >
      <Rig prog={prog} tier={tier} />
    </Canvas>
  );
}
