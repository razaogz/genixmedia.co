'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionReveal } from '@/components/section-utils';
import { Ecosystem3D, CAPABILITIES, type CapabilityId } from '@/components/ecosystem-3d';

export function About() {
  const [activeId, setActiveId] = useState<CapabilityId | null>(null);
  const onHover = useCallback((id: CapabilityId | null) => setActiveId(id), []);

  return (
    <section id="about" className="relative overflow-hidden py-28 sm:py-36 lg:py-40">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 rounded-full bg-purple-600/[0.04] blur-[120px]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Desktop: text left, 3D right */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Text column */}
          <div className="order-1 lg:order-1">
            <SectionReveal>
              <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/40">
                The Genix Ecosystem
              </span>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Every Digital
                <br />
                Need.
                <br />
                <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                  One Partner
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="mt-7 max-w-md text-base leading-relaxed text-white/55 sm:text-lg">
                Genix brings the essential digital capabilities of modern business under one roof.
                From digital asset management and PR to growth, software and SaaS, we help
                businesses build, operate and scale their digital presence without having to
                manage multiple specialized partners.
              </p>
            </SectionReveal>

            {/* Capability list — interactive */}
            <SectionReveal delay={0.3}>
              <div className="mt-10 flex flex-col gap-1.5">
                {CAPABILITIES.map((cap) => (
                  <button
                    key={cap.id}
                    onMouseEnter={() => setActiveId(cap.id)}
                    onMouseLeave={() => setActiveId(null)}
                    className="group flex items-center gap-4 rounded-xl border border-transparent px-4 py-3 text-left transition-all duration-300 hover:border-white/10 hover:bg-white/[0.03]"
                  >
                    <div
                      className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-all duration-300 ${
                        activeId === cap.id
                          ? 'bg-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.6)] scale-150'
                          : 'bg-white/20'
                      }`}
                    />
                    <div className="flex flex-1 items-baseline justify-between gap-4">
                      <span
                        className={`text-sm font-semibold transition-colors duration-300 ${
                          activeId === cap.id ? 'text-white' : 'text-white/65'
                        }`}
                      >
                        {cap.label}
                      </span>
                      <span
                        className={`text-xs transition-colors duration-300 ${
                          activeId === cap.id ? 'text-white/45' : 'text-white/25'
                        }`}
                      >
                        {cap.short}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </SectionReveal>
          </div>

          {/* 3D visual column */}
          <div className="order-2 lg:order-2">
            <SectionReveal delay={0.15}>
              <div className="relative aspect-square w-full max-w-[640px] lg:aspect-[4/5] lg:max-w-none">
                {/* Radial backdrop glow */}
                <div
                  className="pointer-events-none absolute inset-[10%] rounded-full bg-gradient-radial from-purple-500/[0.08] via-transparent to-transparent blur-[60px]"
                  aria-hidden
                />
                <Ecosystem3D activeId={activeId} onHover={onHover} />
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
