'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export function WebGLShader() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    let resizeObserver: ResizeObserver | null = null;

    const init = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) return;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(width, height);
      renderer.setClearColor(0x020106, 1);
      container.appendChild(renderer.domElement);
      renderer.domElement.classList.add('block', 'h-full', 'w-full');

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      const uniforms = {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
      };

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uResolution;

          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            vec2 u = f * f * (3.0 - 2.0 * f);
            return mix(
              mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
              mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), u.x),
              u.y
            );
          }

          float fbm(vec2 p) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 5; i++) {
              value += noise(p) * amplitude;
              p = p * 2.02 + vec2(17.2, 9.4);
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            float aspect = uResolution.x / uResolution.y;
            vec2 p = (vUv - 0.5) * vec2(aspect, 1.0);
            float time = uTime * 0.14;
            float dist = length(p);

            // --- Fluid liquid-metal folds ---
            vec2 flow = p * vec2(1.35, 1.75);
            flow += vec2(time * 0.35, -time * 0.16);
            float fluid = fbm(flow + vec2(fbm(flow * 0.9), fbm(flow * 0.7 + 8.0)) * 0.42);
            float fold = sin((p.x * 2.8 + fluid * 2.7) - time * 1.2) * 0.5 + 0.5;
            float ridge = smoothstep(0.58, 0.92, fold) * smoothstep(0.0, 0.92, fluid);
            float highlight = pow(max(ridge, 0.0), 1.8);

            // Second, slower layer for depth
            vec2 flow2 = p * vec2(0.7, 0.9) + vec2(-time * 0.18, time * 0.12);
            float fluid2 = fbm(flow2 * 1.3 + 5.0);
            float deepFold = smoothstep(0.55, 0.85, fluid2) * 0.5;

            // --- Central atmospheric bloom ---
            float bloom = exp(-dist * 1.6) * (0.7 + fluid * 0.3);
            float bloomPulse = 0.85 + sin(time * 0.6) * 0.08;

            // --- Color composition ---
            vec3 black = vec3(0.005, 0.002, 0.010);
            vec3 violet = vec3(0.26, 0.07, 0.50);
            vec3 lavender = vec3(0.52, 0.28, 0.84);
            vec3 magenta = vec3(0.38, 0.13, 0.62);

            // Base: black with deep violet atmosphere
            vec3 color = black;
            color += violet * (fluid * 0.36 + deepFold * 0.18);
            color += lavender * highlight * 0.40;
            color += magenta * deepFold * 0.16;

            // Central bloom — deep purple glow behind content
            color += violet * bloom * 0.28 * bloomPulse;
            color += lavender * bloom * bloom * 0.18;

            // Subtle bloom on ridges for dimensional specular
            color += lavender * highlight * highlight * 0.12;

            // Slight center calm so text stays readable, but keep purple present
            float centerCalm = smoothstep(0.0, 0.28, abs(p.y));
            color *= 0.72 + centerCalm * 0.28;

            // Vignette — darker edges, richer center
            float vignette = smoothstep(1.25, 0.30, dist);
            color *= 0.38 + vignette * 0.62;

            // Tone mapping — keep blacks deep and purples rich but slightly darker
            color = color / (color + vec3(0.62));
            color *= 1.18;

            gl_FragColor = vec4(color, 1.0);
          }
        `,
      });

      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
      scene.add(mesh);
      const clock = new THREE.Clock();

      const render = () => {
        uniforms.uTime.value = clock.getElapsedTime();
        renderer!.render(scene, camera);
        animationId = requestAnimationFrame(render);
      };
      render();

      const onResize = () => {
        if (!renderer) return;
        const nextWidth = container.clientWidth;
        const nextHeight = container.clientHeight;
        if (nextWidth === 0 || nextHeight === 0) return;
        renderer.setSize(nextWidth, nextHeight);
        uniforms.uResolution.value.set(nextWidth, nextHeight);
      };

      resizeObserver = new ResizeObserver(onResize);
      resizeObserver.observe(container);
    };

    init();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver?.disconnect();
      renderer?.dispose();
      if (renderer?.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 block h-full w-full" />;
}
