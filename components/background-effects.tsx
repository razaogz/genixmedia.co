'use client';

import { useEffect, useRef } from 'react';

export function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationId: number;

    const stars: {
      x: number;
      y: number;
      z: number;
      size: number;
      opacity: number;
      twinkle: number;
    }[] = [];

    const STAR_COUNT = Math.min(
      150,
      Math.floor((width * height) / 10000)
    );

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        size: Math.random() * 1.2 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    let time = 0;
    function render() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      time += 0.002;

      // Subtle nebula clouds (white/grey, very faint)
      const blobs = [
        { x: width * 0.2 + Math.sin(time) * 60, y: height * 0.3 + Math.cos(time * 0.8) * 40, r: 400, color: 'rgba(255, 255, 255, 0.025)' },
        { x: width * 0.8 + Math.cos(time * 0.7) * 50, y: height * 0.6 + Math.sin(time) * 30, r: 350, color: 'rgba(255, 255, 255, 0.02)' },
        { x: width * 0.5 + Math.sin(time * 1.2) * 80, y: height * 0.85 + Math.cos(time * 0.6) * 20, r: 300, color: 'rgba(255, 255, 255, 0.015)' },
      ];
      blobs.forEach((b) => {
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      });

      // Stars with parallax
      const parallaxX = (mouseX - width / 2) * 0.01;
      const parallaxY = (mouseY - height / 2) * 0.01;

      stars.forEach((s) => {
        s.twinkle += 0.02;
        const opacity = s.opacity * (0.6 + Math.sin(s.twinkle) * 0.4);
        const px = s.x + parallaxX * s.z * 10;
        const py = s.y + parallaxY * s.z * 10;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 h-full w-full"
        aria-hidden
      />
      {/* Subtle light beams */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute -right-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.015] blur-[100px]" />
      </div>
      {/* Noise overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
