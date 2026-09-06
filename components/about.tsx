'use client';

import { useState, useCallback, useEffect } from 'react';
import { SectionReveal } from '@/components/section-utils';
import { Ecosystem3D, CAPABILITIES, type CapabilityId } from '@/components/ecosystem-3d';

interface CardLabel {
  id: CapabilityId;
  icon: string;
  label: string;
  sub: string;
  className: string;
}

const CARD_LABELS: CardLabel[] = [
  {
    id: 'assets',
    icon: 'diamond',
    label: 'ASSETS',
    sub: 'Digital Asset Management',
    className: 'left-1/2 -translate-x-1/2 top-[8%]',
  },
  {
    id: 'technology',
    icon: 'cpu',
    label: 'TECHNOLOGY',
    sub: 'SaaS & Software',
    className: 'left-[6%] top-[42%]',
  },
  {
    id: 'reputation',
    icon: 'shield',
    label: 'REPUTATION',
    sub: 'PR & Reputation',
    className: 'right-[6%] top-[42%]',
  },
  {
    id: 'growth',
    icon: 'trending-up',
    label: 'GROWTH',
    sub: 'Marketing & Acquisition',
    className: 'left-1/2 -translate-x-1/2 bottom-[10%]',
  },
];

const ICON_SVG: Record<string, React.ReactNode> = {
  diamond: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z" />
    </svg>
  ),
  cpu: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  shield: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  'trending-up': (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
};

const ARROW_SVG = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export function About() {
  const [activeId, setActiveId] = useState<CapabilityId | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const onHover = useCallback((id: CapabilityId | null) => setActiveId(id), []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section
      id="genix-ecosystem"
      className="relative min-h-screen overflow-hidden bg-black py-28 sm:py-36 lg:py-40"
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.05] blur-[100px]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-4">
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
          </div>

          {/* 3D visual column with 2D text overlays */}
          <div className="order-2 lg:order-2">
            <SectionReveal delay={0.15}>
              <div className="relative aspect-square w-full max-w-[600px] mx-auto lg:aspect-[4/5] lg:max-w-none lg:h-[600px]">
                {/* Radial backdrop glow */}
                <div
                  className="pointer-events-none absolute inset-[15%] rounded-full bg-gradient-radial from-purple-500/[0.06] via-transparent to-transparent blur-[50px]"
                  aria-hidden
                />

                {/* 3D canvas — glass cards floating in space */}
                <div className="absolute inset-0">
                  <Ecosystem3D activeId={activeId} onHover={onHover} isMobile={isMobile} />
                </div>

                {/* 2D text overlays — flat typography on top of 3D glass cards */}
                <div className="pointer-events-none absolute inset-0">
                  {CARD_LABELS.map((card) => {
                    const isActive = activeId === card.id;
                    const isOtherActive = activeId !== null && activeId !== card.id;
                    return (
                      <div
                        key={card.id}
                        className={`absolute ${card.className} pointer-events-auto cursor-default`}
                        onMouseEnter={() => setActiveId(card.id)}
                        onMouseLeave={() => setActiveId(null)}
                      >
                        <div
                          className={`flex items-center gap-3 rounded-xl border px-4 py-2.5 backdrop-blur-[2px] transition-all duration-300 ${
                            isActive
                              ? 'border-purple-400/40 bg-white/[0.06]'
                              : isOtherActive
                                ? 'border-white/5 bg-white/[0.01] opacity-40'
                                : 'border-white/10 bg-white/[0.03]'
                          }`}
                          style={{ minWidth: '180px' }}
                        >
                          <div
                            className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                              isActive
                                ? 'border-purple-400/40 text-white'
                                : 'border-white/10 text-white/50'
                            }`}
                          >
                            {ICON_SVG[card.icon]}
                          </div>
                          <div className="flex flex-1 flex-col">
                            <span
                              className={`text-[11px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                                isActive ? 'text-white' : 'text-white/70'
                              }`}
                            >
                              {card.label}
                            </span>
                            <span
                              className={`text-[10px] transition-colors duration-300 ${
                                isActive ? 'text-white/50' : 'text-white/30'
                              }`}
                            >
                              {card.sub}
                            </span>
                          </div>
                          <div
                            className={`flex-shrink-0 transition-all duration-300 ${
                              isActive ? 'text-purple-400 opacity-100' : 'text-white/20 opacity-0'
                            }`}
                          >
                            {ARROW_SVG}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Central GENIX label */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-white/80">
                      GENIX
                    </span>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
