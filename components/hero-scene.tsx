'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Environment,
  MeshTransmissionMaterial,
  Stars,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

function CrystalSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    const targetX = mouse.y * 0.2;
    const targetY = mouse.x * 0.3;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={1.5}
          roughness={0.05}
          ior={1.5}
          chromaticAberration={0.04}
          backside
          samples={6}
          resolution={256}
          distortion={0.2}
          distortionScale={0.3}
          temporalDistortion={0.1}
          color="#ffffff"
          attenuationColor="#cccccc"
          attenuationDistance={0.5}
        />
      </mesh>

      <mesh scale={0.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
      </mesh>
      <mesh scale={0.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

function OrbitingStar() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() * 0.5;
    ref.current.position.x = Math.cos(t) * 2.6;
    ref.current.position.z = Math.sin(t) * 2.6;
    ref.current.position.y = Math.sin(t * 0.7) * 0.6;
    ref.current.rotation.z = t;
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <pointLight color="#ffffff" intensity={2} distance={6} />
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.02, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[0, 0, -Math.PI / 4]}>
        <boxGeometry args={[0.5, 0.02, 0.02]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function EnergyRing({
  radius,
  tilt,
  speed,
}: {
  radius: number;
  tilt: [number, number, number];
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.008, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
    </mesh>
  );
}

function FloatingShard({
  position,
  scale,
  geometry,
}: {
  position: [number, number, number];
  scale: number;
  geometry: 'ico' | 'octa';
}) {
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <mesh position={position} scale={scale}>
        {geometry === 'ico' ? (
          <icosahedronGeometry args={[1, 0]} />
        ) : (
          <octahedronGeometry args={[1, 0]} />
        )}
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.15}
          emissive="#888888"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.8, 0.03);
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.5 + 0.5,
      0.03
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene() {
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }).map((_, i) => ({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3 - 1,
        ] as [number, number, number],
        scale: Math.random() * 0.15 + 0.05,
        geometry: (i % 2 === 0 ? 'ico' : 'octa') as 'ico' | 'octa',
      })),
    []
  );

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, -3, 2]} intensity={0.6} color="#ffffff" />
      <spotLight
        position={[0, 8, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#ffffff"
      />

      <CrystalSphere />
      <OrbitingStar />

      <EnergyRing radius={2.4} tilt={[Math.PI / 2.5, 0, 0]} speed={0.3} />
      <EnergyRing radius={2.8} tilt={[Math.PI / 3, Math.PI / 4, 0]} speed={-0.2} />
      <EnergyRing radius={3.2} tilt={[Math.PI / 2, Math.PI / 6, Math.PI / 4]} speed={0.15} />

      {shards.map((s, i) => (
        <FloatingShard key={i} {...s} />
      ))}

      <Sparkles count={50} scale={8} size={2} speed={0.3} color="#ffffff" opacity={0.4} />
      <Stars radius={50} depth={20} count={1200} factor={3} saturation={0} fade speed={0.5} />

      <Environment preset="night" />
      <CameraRig />
    </>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 h-full w-full">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
