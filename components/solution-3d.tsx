'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PURPLE_LIGHT = '#c084fc';
const DEEP_VIOLET = '#5b21b6';

function material(color: string, emissive = '#000000') {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.35,
    roughness: 0.22,
    clearcoat: 0.7,
    clearcoatRoughness: 0.25,
    emissive,
    emissiveIntensity: emissive === '#000000' ? 0 : 0.25,
  });
}

function createVisual(variant: string) {
  const group = new THREE.Group();

  if (variant === 'shield') {
    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(0.72, 0.55, 1.1, 6),
      material('#0d0818')
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.95, 0.03, 12, 48),
      material('#a855f7', '#7c3aed')
    );
    ring.rotation.x = Math.PI / 3;
    group.add(body, ring);
  } else if (variant === 'growth') {
    [0, 1, 2, 3].forEach((i) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.28, 0.28 + i * 0.22, 0.28),
        material('#0d0818')
      );
      bar.position.set(-0.6 + i * 0.42, -0.4 + i * 0.28, 0);
      group.add(bar);
    });
    const line = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 2.2, 8),
      material('#c084fc', '#a855f7')
    );
    line.position.y = 0.35;
    line.rotation.z = -0.5;
    group.add(line);
  } else if (variant === 'chip') {
    const core = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.18, 1),
      material('#0d0818')
    );
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.12, 0.55),
      material('#1a1030', '#7c3aed')
    );
    top.position.y = 0.22;
    group.add(core, top);
    [-1, 1].forEach((sx) =>
      [-1, 1].forEach((sz) => {
        const pin = new THREE.Mesh(
          new THREE.BoxGeometry(0.04, 0.18, 0.04),
          material('#c084fc')
        );
        pin.position.set(sx * 0.52, -0.18, sz * 0.52);
        group.add(pin);
      })
    );
  } else {
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 48, 48),
      new THREE.MeshPhysicalMaterial({
        color: '#0b0512',
        metalness: 0.15,
        roughness: 0.18,
        transmission: 0.55,
        thickness: 0.8,
        ior: 1.35,
        clearcoat: 0.6,
        clearcoatRoughness: 0.35,
        attenuationColor: '#6d28d9',
        attenuationDistance: 1.1,
      })
    );
    const wire = new THREE.Mesh(
      new THREE.SphereGeometry(0.92, 24, 16),
      new THREE.MeshBasicMaterial({ color: '#7c3aed', wireframe: true, transparent: true, opacity: 0.42 })
    );
    group.add(core, wire);
  }

  return group;
}

export function SolutionVisual({ variant }: { variant: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const keyLight = new THREE.DirectionalLight(PURPLE_LIGHT, 0.85);
    keyLight.position.set(3, 2, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(DEEP_VIOLET, 0.4);
    fillLight.position.set(-3, -1, -2);
    scene.add(fillLight);

    const visual = createVisual(variant);
    scene.add(visual);

    let frame = 0;
    const resize = () => {
      const width = canvas.clientWidth || 112;
      const height = canvas.clientHeight || 112;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const animate = (time: number) => {
      visual.rotation.y = time * 0.0002;
      visual.position.y = Math.sin(time * 0.0014) * 0.05;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      visual.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [variant]);

  return (
    <div className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 opacity-90 sm:h-32 sm:w-32">
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
    </div>
  );
}
