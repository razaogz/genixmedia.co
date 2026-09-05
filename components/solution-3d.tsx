'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

const PURPLE_LIGHT = '#c084fc';
const DEEP_VIOLET = '#5b21b6';

function SharedLights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 2, 4]} intensity={0.85} color={PURPLE_LIGHT} />
      <directionalLight position={[-3, -1, -2]} intensity={0.4} color={DEEP_VIOLET} />
    </>
  );
}

function CanvasShell({ children }: { children: React.ReactNode }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
    >
      <Suspense fallback={null}>
        <SharedLights />
        {children}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}

function GlobeMesh() {
  const wire = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (wire.current) wire.current.rotation.y += delta * 0.35;
    if (core.current) core.current.rotation.y -= delta * 0.12;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={core}>
        <sphereGeometry args={[0.7, 48, 48]} />
        <meshPhysicalMaterial
          color="#0b0512"
          metalness={0.15}
          roughness={0.18}
          transmission={0.55}
          thickness={0.8}
          ior={1.35}
          clearcoat={0.6}
          clearcoatRoughness={0.35}
          attenuationColor="#6d28d9"
          attenuationDistance={1.1}
        />
      </mesh>
      <mesh ref={wire}>
        <sphereGeometry args={[0.92, 24, 16]} />
        <meshBasicMaterial color="#7c3aed" wireframe transparent opacity={0.42} />
      </mesh>
    </Float>
  );
}

function ShieldMesh() {
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (inner.current) inner.current.rotation.y += delta * 0.15;
    if (ring.current) ring.current.rotation.z += delta * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      {/* Shield body */}
      <mesh ref={inner}>
        <cylinderGeometry args={[0.72, 0.55, 1.1, 6, 1, false]} />
        <meshPhysicalMaterial
          color="#0d0818"
          metalness={0.35}
          roughness={0.22}
          transmission={0.4}
          thickness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          attenuationColor="#7c3aed"
          attenuationDistance={0.9}
        />
      </mesh>
      {/* Orbiting ring */}
      <mesh ref={ring} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[0.95, 0.03, 12, 48]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.6}
          roughness={0.3}
          emissive="#7c3aed"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function GrowthMesh() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.25;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.45}>
      <group ref={group}>
        {/* Ascending bars */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[-0.6 + i * 0.42, -0.4 + i * 0.28, 0]}>
            <boxGeometry args={[0.28, 0.28 + i * 0.22, 0.28]} />
            <meshPhysicalMaterial
              color="#0d0818"
              metalness={0.4}
              roughness={0.25}
              clearcoat={0.7}
              clearcoatRoughness={0.25}
              attenuationColor="#7c3aed"
              attenuationDistance={0.8}
            />
          </mesh>
        ))}
        {/* Trajectory line */}
        <mesh position={[0, 0.35, 0]} rotation={[0, 0, -0.5]}>
          <cylinderGeometry args={[0.02, 0.02, 2.2, 8]} />
          <meshStandardMaterial
            color="#c084fc"
            metalness={0.5}
            roughness={0.3}
            emissive="#a855f7"
            emissiveIntensity={0.25}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ChipMesh() {
  const core = useRef<THREE.Mesh>(null);
  const top = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (core.current) core.current.rotation.y += delta * 0.1;
    if (top.current) top.current.rotation.y -= delta * 0.08;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.4}>
      {/* Main chip body */}
      <mesh ref={core}>
        <boxGeometry args={[1.0, 0.18, 1.0]} />
        <meshPhysicalMaterial
          color="#0d0818"
          metalness={0.45}
          roughness={0.2}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          attenuationColor="#7c3aed"
          attenuationDistance={0.7}
        />
      </mesh>
      {/* Upper layer */}
      <mesh ref={top} position={[0, 0.22, 0]}>
        <boxGeometry args={[0.55, 0.12, 0.55]} />
        <meshStandardMaterial
          color="#1a1030"
          metalness={0.5}
          roughness={0.25}
          emissive="#7c3aed"
          emissiveIntensity={0.12}
        />
      </mesh>
      {/* Pin grid */}
      {[-1, 1].flatMap((sx) =>
        [-1, 1].flatMap((sz) =>
          [-0.3, 0, 0.3].map((px) =>
            [-0.3, 0, 0.3].map((pz) => (
              <mesh
                key={`${sx}-${sz}-${px}-${pz}`}
                position={[sx * (0.52 + px * 0), -0.18, sz * (0.52 + pz * 0)]}
              >
                <boxGeometry args={[0.04, 0.18, 0.04]} />
                <meshStandardMaterial color="#c084fc" metalness={0.7} roughness={0.3} />
              </mesh>
            ))
          )
        )
      )}
    </Float>
  );
}

const MESHES: Record<string, React.ReactNode> = {
  globe: <GlobeMesh />,
  shield: <ShieldMesh />,
  growth: <GrowthMesh />,
  chip: <ChipMesh />,
};

export function SolutionVisual({ variant }: { variant: string }) {
  return (
    <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 opacity-90 sm:h-32 sm:w-32">
      <CanvasShell>{MESHES[variant] ?? <GlobeMesh />}</CanvasShell>
    </div>
  );
}
