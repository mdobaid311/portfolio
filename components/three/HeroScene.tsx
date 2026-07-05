"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 5200;
const RING_COUNT = 900;

// deterministic PRNG so the galaxy is identical on every visit
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Galaxy() {
  const group = useRef<THREE.Group>(null!);
  const pointer = useRef({ x: 0, y: 0 });

  const [positions, colors] = useMemo(() => {
    const rand = mulberry32(311);
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const bone = new THREE.Color("#e9ede4");
    const acid = new THREE.Color("#baff39");
    const dim = new THREE.Color("#39412f");

    for (let i = 0; i < COUNT; i++) {
      // spiral galaxy: radius with power falloff, 3 arms, vertical spread shrinking outward
      const radius = Math.pow(rand(), 0.65) * 5.2;
      const armAngle = ((i % 3) / 3) * Math.PI * 2;
      const rot = radius * 0.85 + armAngle;
      const spread = (1 - radius / 5.2) * 0.55 + 0.08;

      const x = Math.cos(rot) * radius + (rand() - 0.5) * spread * 2.2;
      const y = (rand() - 0.5) * spread * 1.4;
      const z = Math.sin(rot) * radius + (rand() - 0.5) * spread * 2.2;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const roll = rand();
      const c = roll > 0.94 ? acid : roll > 0.5 ? bone : dim;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  const ringPositions = useMemo(() => {
    const rand = mulberry32(78);
    const pos = new Float32Array(RING_COUNT * 3);
    for (let i = 0; i < RING_COUNT; i++) {
      const angle = (i / RING_COUNT) * Math.PI * 2;
      const radius = 6.4 + (rand() - 0.5) * 0.06;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (rand() - 0.5) * 0.04;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    g.rotation.y += delta * 0.04;

    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      state.pointer.x,
      0.03
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      state.pointer.y,
      0.03
    );
    g.rotation.x = 0.42 + pointer.current.y * 0.08;
    g.rotation.z = pointer.current.x * 0.05;
  });

  return (
    <group ref={group} rotation={[0.42, 0, 0]} position={[1.4, 0.2, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.028}
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#baff39"
          transparent
          opacity={0.5}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 8.5], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Galaxy />
    </Canvas>
  );
}
