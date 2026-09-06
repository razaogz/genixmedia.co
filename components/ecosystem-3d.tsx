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
  { id: 'assets', label: 'Digital Assets', short: 'Asset Management' },
  { id: 'technology', label: 'Technology', short: 'SaaS & Software' },
  { id: 'reputation', label: 'Reputation', short: 'PR' },
  { id: 'growth', label: 'Growth', short: 'Marketing & Acquisition' },
];

const PURPLE = '#a855f7';
const PURPLE_DEEP = '#6d28d9';
const WHITE_SOFT = '#e9e5ff';

function makeGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#0a0612',
    metalness: 0.2,
    roughness: 0.15,
    transmission: 0.6,
    thickness: 1.2,
    ior: 1.4,
    clearcoat: 0.8,
    clearcoatRoughness: 0.2,
    attenuationColor: new THREE.Color('#5b21b6'),
    attenuationDistance: 1.5,
  });
}

function makeMetalMaterial(color: string, emissive = '#000000', emissiveIntensity = 0): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: 0.9,
    roughness: 0.25,
    clearcoat: 0.5,
    clearcoatRoughness: 0.3,
    emissive,
    emissiveIntensity,
  });
}

function createCapabilityNode(id: CapabilityId): THREE.Group {
  const group = new THREE.Group();
  group.userData.id = id;

  if (id === 'assets') {
    const shape = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.3, 0),
      makeMetalMaterial('#c4b5fd', PURPLE_DEEP, 0.15)
    );
    group.add(shape);
    const wire = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.38, 0),
      new THREE.MeshBasicMaterial({ color: PURPLE, wireframe: true, transparent: true, opacity: 0.3 })
    );
    group.add(wire);
  } else if (id === 'technology') {
    const core = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.12, 0.4),
      makeMetalMaterial('#1a1030', PURPLE_DEEP, 0.1)
    );
    group.add(core);
    const top = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.08, 0.2),
      makeMetalMaterial('#c4b5fd', PURPLE, 0.2)
    );
    top.position.y = 0.1;
    group.add(top);
    [-1, 1].forEach((sx) =>
      [-1, 1].forEach((sz) => {
        const pin = new THREE.Mesh(
          new THREE.BoxGeometry(0.03, 0.1, 0.03),
          makeMetalMaterial('#e9e5ff')
        );
        pin.position.set(sx * 0.22, -0.1, sz * 0.22);
        group.add(pin);
      })
    );
  } else if (id === 'reputation') {
    const shield = new THREE.Mesh(
      new THREE.CylinderGeometry(0.28, 0.2, 0.5, 5),
      makeMetalMaterial('#c4b5fd', PURPLE_DEEP, 0.12)
    );
    shield.rotation.x = Math.PI;
    group.add(shield);
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(0.34, 0.025, 8, 32),
      makeMetalMaterial('#e9e5ff', PURPLE, 0.15)
    );
    ring.rotation.x = Math.PI / 2.5;
    group.add(ring);
  } else {
    [0, 1, 2].forEach((i) => {
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 0.14 + i * 0.12, 0.14),
        makeMetalMaterial(i === 2 ? '#c4b5fd' : '#1a1030', i === 2 ? PURPLE : '#000000', i === 2 ? 0.2 : 0)
      );
      bar.position.set(-0.14 + i * 0.14, -0.2 + i * 0.14, 0);
      group.add(bar);
    });
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(0.05, 0.12, 4),
      makeMetalMaterial('#e9e5ff', PURPLE, 0.2)
    );
    arrow.position.set(0.2, 0.22, 0);
    arrow.rotation.z = -Math.PI / 4;
    group.add(arrow);
  }

  return group;
}

interface Ecosystem3DProps {
  activeId: CapabilityId | null;
  onHover: (id: CapabilityId | null) => void;
}

export function Ecosystem3D({ activeId, onHover }: Ecosystem3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<CapabilityId | null>(activeId);
  const onHoverRef = useRef<(id: CapabilityId | null) => void>(onHover);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.3));
    const keyLight = new THREE.DirectionalLight(PURPLE, 0.9);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);
    const fillLight = new THREE.DirectionalLight(PURPLE_DEEP, 0.4);
    fillLight.position.set(-4, -1, -2);
    scene.add(fillLight);
    const rimLight = new THREE.DirectionalLight(WHITE_SOFT, 0.35);
    rimLight.position.set(0, 4, -3);
    scene.add(rimLight);

    const root = new THREE.Group();
    scene.add(root);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.65, 1),
      makeGlassMaterial()
    );
    root.add(core);

    const innerCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 32),
      new THREE.MeshBasicMaterial({ color: PURPLE, transparent: true, opacity: 0.4 })
    );
    root.add(innerCore);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.85, 0),
      new THREE.MeshBasicMaterial({ color: PURPLE, wireframe: true, transparent: true, opacity: 0.25 })
    );
    root.add(shell);

    const rings: THREE.Mesh[] = [];
    [
      { radius: 1.6, tube: 0.012, rotX: Math.PI / 2, rotZ: 0 },
      { radius: 2.0, tube: 0.008, rotX: Math.PI / 2.2, rotZ: Math.PI / 4 },
      { radius: 2.4, tube: 0.006, rotX: Math.PI / 1.8, rotZ: -Math.PI / 6 },
    ].forEach((r) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r.radius, r.tube, 8, 80),
        makeMetalMaterial('#e9e5ff', PURPLE, 0.05)
      );
      ring.rotation.x = r.rotX;
      ring.rotation.z = r.rotZ;
      rings.push(ring);
      root.add(ring);
    });

    const nodeOrbit = new THREE.Group();
    nodeOrbit.rotation.x = 0.3;
    root.add(nodeOrbit);

    const nodeData: { group: THREE.Group; id: CapabilityId; yOffset: number; floatPhase: number }[] = [];
    CAPABILITIES.forEach((cap, i) => {
      const angle = (i / CAPABILITIES.length) * Math.PI * 2;
      const radius = 2.0;
      const nodeGroup = createCapabilityNode(cap.id);
      nodeGroup.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.3,
        Math.sin(angle) * radius
      );
      nodeOrbit.add(nodeGroup);
      nodeData.push({
        group: nodeGroup,
        id: cap.id,
        yOffset: Math.sin(angle * 0.5) * 0.3,
        floatPhase: i * 1.5,
      });
    });

    const lineGroup = new THREE.Group();
    root.add(lineGroup);
    const lines: { line: THREE.Line; id: CapabilityId }[] = [];
    nodeData.forEach((nd) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        nd.group.position.clone(),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: PURPLE,
        transparent: true,
        opacity: 0.15,
      });
      const line = new THREE.Line(geo, mat);
      lineGroup.add(line);
      lines.push({ line, id: nd.id });
    });

    const particleCount = reducedMotion ? 30 : 80;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 1.5;
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
        size: 0.025,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      })
    );
    root.add(particles);

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

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      const currentActive = activeIdRef.current;

      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      root.rotation.y = mouse.x * 0.35 + (reducedMotion ? 0 : elapsed * 0.08);
      root.rotation.x = -mouse.y * 0.2;

      if (!reducedMotion) {
        core.rotation.y = elapsed * 0.15;
        core.rotation.x = elapsed * 0.08;
        shell.rotation.y = -elapsed * 0.1;
        shell.rotation.z = elapsed * 0.05;
        innerCore.scale.setScalar(1 + Math.sin(elapsed * 1.2) * 0.05);
      }

      rings.forEach((ring, i) => {
        if (!reducedMotion) {
          ring.rotation.z += 0.001 * (i + 1);
        }
      });

      nodeData.forEach((nd) => {
        if (!reducedMotion) {
          nd.group.position.y = nd.yOffset + Math.sin(elapsed * 0.8 + nd.floatPhase) * 0.08;
          nd.group.rotation.y = elapsed * 0.3;
        }
        const isActive = currentActive === nd.id;
        const isOtherActive = currentActive !== null && currentActive !== nd.id;
        const targetScale = isActive ? 1.35 : isOtherActive ? 0.85 : 1.0;
        nd.group.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);
      });

      lines.forEach((ln) => {
        const nd = nodeData.find((n) => n.id === ln.id)!;
        const pos = ln.line.geometry.attributes.position as THREE.BufferAttribute;
        pos.setXYZ(1, nd.group.position.x, nd.group.position.y, nd.group.position.z);
        pos.needsUpdate = true;

        const isActive = currentActive === ln.id;
        const isOtherActive = currentActive !== null && currentActive !== ln.id;
        const mat = ln.line.material as THREE.LineBasicMaterial;
        const targetOpacity = isActive ? 0.5 : isOtherActive ? 0.05 : 0.15;
        mat.opacity += (targetOpacity - mat.opacity) * 0.08;
      });

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(nodeOrbit.children, true);
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
      onHoverRef.current(hoveredId);

      if (!reducedMotion) {
        particles.rotation.y = elapsed * 0.02;
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

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
        if (obj instanceof THREE.Line) {
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
  }, [reducedMotion]);

  return <div ref={mountRef} className="h-full w-full" />;
}
