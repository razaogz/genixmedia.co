'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export type CapabilityId = 'assets' | 'technology' | 'reputation' | 'growth';

export interface Capability {
  id: CapabilityId;
  label: string;
  short: string;
}

export const CAPABILITIES: Capability[] = [
  { id: 'assets', label: 'Assets', short: 'Digital Asset Management' },
  { id: 'technology', label: 'Technology', short: 'SaaS & Software' },
  { id: 'reputation', label: 'Reputation', short: 'PR & Reputation' },
  { id: 'growth', label: 'Growth', short: 'Marketing & Acquisition' },
];

const PURPLE = 0xa855f7;
const PURPLE_DEEP = 0x6d28d9;
const WHITE_SOFT = 0xe9e5ff;

interface CardPlacement {
  position: [number, number, number];
  rotation: [number, number, number];
}

const CARD_PLACEMENTS: Record<CapabilityId, CardPlacement> = {
  assets: { position: [0, 2.2, -0.5], rotation: [-0.35, 0.15, 0] },
  technology: { position: [-2.3, 0.2, 0.4], rotation: [0.1, 0.45, -0.05] },
  reputation: { position: [2.3, 0.2, 0.4], rotation: [0.1, -0.45, 0.05] },
  growth: { position: [0, -2.0, -0.3], rotation: [0.35, 0.15, 0] },
};

function makeGlassCardMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0x0a0612,
    metalness: 0.15,
    roughness: 0.12,
    transmission: 0.5,
    thickness: 0.8,
    ior: 1.4,
    clearcoat: 0.9,
    clearcoatRoughness: 0.15,
    attenuationColor: new THREE.Color(0x4c1d95),
    attenuationDistance: 2.0,
  });
}

function makeCardEdgeMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0x1a1030,
    metalness: 0.85,
    roughness: 0.2,
    clearcoat: 0.6,
    clearcoatRoughness: 0.3,
    emissive: new THREE.Color(PURPLE_DEEP),
    emissiveIntensity: 0.08,
  });
}

function makeCoreMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: 0x0a0612,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.7,
    thickness: 1.0,
    ior: 1.35,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    attenuationColor: new THREE.Color(0x7c3aed),
    attenuationDistance: 1.2,
  });
}

function createRoundedCardGeometry(): { front: THREE.BufferGeometry; back: THREE.BufferGeometry; edge: THREE.BufferGeometry } {
  const w = 2.2;
  const h = 1.3;
  const depth = 0.18;
  const r = 0.12;
  const seg = 4;

  const shape = new THREE.Shape();
  shape.moveTo(-w / 2 + r, -h / 2);
  shape.lineTo(w / 2 - r, -h / 2);
  shape.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  shape.lineTo(w / 2, h / 2 - r);
  shape.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  shape.lineTo(-w / 2 + r, h / 2);
  shape.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  shape.lineTo(-w / 2, -h / 2 + r);
  shape.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);

  const front = new THREE.ShapeGeometry(shape, seg);
  const back = new THREE.ShapeGeometry(shape, seg);
  back.rotateY(Math.PI);
  back.translate(0, 0, -depth);

  const edge = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelSegments: 2,
    curveSegments: seg * 3,
  });
  edge.translate(0, 0, 0);

  return { front, back, edge };
}

interface Ecosystem3DProps {
  activeId: CapabilityId | null;
  onHover: (id: CapabilityId | null) => void;
  isMobile: boolean;
}

export function Ecosystem3D({ activeId, onHover, isMobile }: Ecosystem3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<CapabilityId | null>(activeId);
  const onHoverRef = useRef<(id: CapabilityId | null) => void>(onHover);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  activeIdRef.current = activeId;
  onHoverRef.current = onHover;

  useEffect(() => {
    setReducedMotion(
      typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, []);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 8.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.25));

    const keyLight = new THREE.DirectionalLight(PURPLE, 0.7);
    keyLight.position.set(3, 3, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(PURPLE_DEEP, 0.35);
    fillLight.position.set(-4, -1, -2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(WHITE_SOFT, 0.3);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const root = new THREE.Group();
    scene.add(root);

    // --- Central Genix core ---
    const coreGroup = new THREE.Group();
    root.add(coreGroup);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.38, 1),
      makeCoreMaterial()
    );
    coreGroup.add(core);

    const innerGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 24, 24),
      new THREE.MeshBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.35 })
    );
    coreGroup.add(innerGlow);

    const coreShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.MeshBasicMaterial({ color: PURPLE, wireframe: true, transparent: true, opacity: 0.18 })
    );
    coreGroup.add(coreShell);

    // --- 3D glass cards ---
    const { front: frontGeo, back: backGeo, edge: edgeGeo } = createRoundedCardGeometry();

    const cardGroups: { group: THREE.Group; id: CapabilityId; basePos: THREE.Vector3; floatPhase: number }[] = [];

    CAPABILITIES.forEach((cap) => {
      const placement = CARD_PLACEMENTS[cap.id];
      const group = new THREE.Group();
      group.userData.id = cap.id;
      group.position.set(...placement.position);
      group.rotation.set(...placement.rotation);

      // Front glass face
      const front = new THREE.Mesh(frontGeo.clone(), makeGlassCardMaterial());
      group.add(front);

      // Back glass face
      const back = new THREE.Mesh(backGeo.clone(), makeGlassCardMaterial());
      group.add(back);

      // Edge/frame (the visible thickness)
      const edge = new THREE.Mesh(edgeGeo.clone(), makeCardEdgeMaterial());
      group.add(edge);

      // Thin border accent on front face
      const borderGeo = new THREE.EdgesGeometry(frontGeo.clone());
      const border = new THREE.LineSegments(
        borderGeo,
        new THREE.LineBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.4 })
      );
      border.position.z = 0.001;
      group.add(border);

      root.add(group);
      cardGroups.push({
        group,
        id: cap.id,
        basePos: new THREE.Vector3(...placement.position),
        floatPhase: Math.random() * Math.PI * 2,
      });
    });

    // --- Connection lines from core to each card ---
    const lineGroup = new THREE.Group();
    root.add(lineGroup);
    const lines: { line: THREE.Line; id: CapabilityId; cardGroup: THREE.Group }[] = [];

    cardGroups.forEach((cg) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        cg.basePos.clone(),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: PURPLE,
        transparent: true,
        opacity: 0.2,
      });
      const line = new THREE.Line(geo, mat);
      lineGroup.add(line);
      lines.push({ line, id: cg.id, cardGroup: cg.group });
    });

    // --- Subtle particles ---
    const particleCount = isMobile ? 25 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.5 + Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: PURPLE,
        size: 0.018,
        transparent: true,
        opacity: 0.35,
        sizeAttenuation: true,
      })
    );
    root.add(particles);

    // --- Interaction ---
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.tx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.ty = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener('mousemove', onMouseMove);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    mount.addEventListener('pointermove', onPointerMove);

    const resize = () => {
      const w = mount.clientWidth || 400;
      const h = mount.clientHeight || 400;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    let frame = 0;
    const clock = new THREE.Clock();
    let lastHover: CapabilityId | null = null;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const currentActive = activeIdRef.current;

      // Parallax
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      root.rotation.y = mouse.x * 0.18 + (reducedMotion ? 0 : elapsed * 0.03);
      root.rotation.x = -mouse.y * 0.12;

      // Core animation
      if (!reducedMotion) {
        core.rotation.y = elapsed * 0.12;
        core.rotation.x = elapsed * 0.06;
        coreShell.rotation.y = -elapsed * 0.08;
        innerGlow.scale.setScalar(1 + Math.sin(elapsed * 1.5) * 0.06);
      }

      // Cards float + respond to active state
      cardGroups.forEach((cg) => {
        if (!reducedMotion) {
          cg.group.position.y = cg.basePos.y + Math.sin(elapsed * 0.6 + cg.floatPhase) * 0.06;
        }
        const isActive = currentActive === cg.id;
        const isOtherActive = currentActive !== null && currentActive !== cg.id;
        const targetScale = isActive ? 1.08 : isOtherActive ? 0.95 : 1.0;
        cg.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.06);

        // Edge emissive intensity
        const edgeMesh = cg.group.children.find((c) => c instanceof THREE.Mesh && (c.material as THREE.MeshPhysicalMaterial).emissive) as THREE.Mesh | undefined;
        if (edgeMesh) {
          const mat = edgeMesh.material as THREE.MeshPhysicalMaterial;
          const targetEmissive = isActive ? 0.25 : 0.08;
          mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.06;
        }

        // Border opacity
        const border = cg.group.children.find((c) => c instanceof THREE.LineSegments) as THREE.LineSegments | undefined;
        if (border) {
          const bMat = border.material as THREE.LineBasicMaterial;
          const targetOpacity = isActive ? 0.7 : isOtherActive ? 0.15 : 0.4;
          bMat.opacity += (targetOpacity - bMat.opacity) * 0.06;
        }
      });

      // Connection lines
      lines.forEach((ln) => {
        const pos = ln.line.geometry.attributes.position as THREE.BufferAttribute;
        const worldPos = new THREE.Vector3();
        ln.cardGroup.getWorldPosition(worldPos);
        // Convert world position back to root's local space
        root.worldToLocal(worldPos);
        pos.setXYZ(1, worldPos.x, worldPos.y, worldPos.z);
        pos.needsUpdate = true;

        const isActive = currentActive === ln.id;
        const isOtherActive = currentActive !== null && currentActive !== ln.id;
        const mat = ln.line.material as THREE.LineBasicMaterial;
        const targetOpacity = isActive ? 0.6 : isOtherActive ? 0.08 : 0.2;
        mat.opacity += (targetOpacity - mat.opacity) * 0.06;
      });

      // Raycaster hover detection
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(root.children, true);
      let hoveredId: CapabilityId | null = null;
      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && !obj.userData.id) {
          obj = obj.parent;
        }
        if (obj && obj.userData.id) {
          hoveredId = obj.userData.id as CapabilityId;
        }
      }
      if (hoveredId !== lastHover) {
        lastHover = hoveredId;
        onHoverRef.current(hoveredId);
      }

      if (!reducedMotion) {
        particles.rotation.y = elapsed * 0.015;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    setReady(true);
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      mount.removeEventListener('mousemove', onMouseMove);
      mount.removeEventListener('pointermove', onPointerMove);
      resizeObserver.disconnect();
      root.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
        if (obj instanceof THREE.Line || obj instanceof THREE.LineSegments) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion, isMobile]);

  return <div ref={mountRef} className="h-full w-full" data-ready={ready} />;
}
