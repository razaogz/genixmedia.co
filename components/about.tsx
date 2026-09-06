'use client';

import { useRef, useState, type ReactNode } from 'react';
import { SectionReveal } from '@/components/section-utils';

type CapabilityId = 'assets' | 'technology' | 'reputation' | 'growth';

interface CapabilityCard {
  id: CapabilityId;
  label: string;
  sub: string;
  icon: ReactNode;
  placement: string;
  rotation: string;
}

const ICONS = {
  assets: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
      <path d="m4.5 7.5 7.5 4.3 7.5-4.3M12 11.8V21" />
    </svg>
  ),
  technology: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9 2v3m6-3v3m-6 14v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" />
    </svg>
  ),
  reputation: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3 20 6v5c0 5.2-3.3 8.4-8 10-4.7-1.6-8-4.8-8-10V6l8-3Z" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 17 10 11l4 4 6-7" />
      <path d="M15 8h5v5" />
    </svg>
  ),
} as const;

const CARDS: CapabilityCard[] = [
  {
    id: 'assets',
    label: 'ASSETS',
    sub: 'Digital Asset Management',
    icon: ICONS.assets,
    placement: 'ecosystem-card--assets',
    rotation: 'rotateY(-7deg) rotateX(3deg)',
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    sub: 'SaaS & Software',
    icon: ICONS.technology,
    placement: 'ecosystem-card--technology',
    rotation: 'rotateY(7deg) rotateX(-2deg)',
  },
  {
    id: 'reputation',
    label: 'REPUTATION',
    sub: 'PR & Reputation',
    icon: ICONS.reputation,
    placement: 'ecosystem-card--reputation',
    rotation: 'rotateY(-6deg) rotateX(-2deg)',
  },
  {
    id: 'growth',
    label: 'GROWTH',
    sub: 'Marketing & Acquisition',
    icon: ICONS.growth,
    placement: 'ecosystem-card--growth',
    rotation: 'rotateY(6deg) rotateX(3deg)',
  },
];

function EcosystemCard({
  card,
  active,
  onActiveChange,
}: {
  card: CapabilityCard;
  active: boolean;
  onActiveChange: (id: CapabilityId | null) => void;
}) {
  return (
    <article
      className={`ecosystem-card ${card.placement} ${active ? 'is-active' : ''}`}
      style={{ '--card-rotation': card.rotation } as React.CSSProperties}
      onMouseEnter={() => onActiveChange(card.id)}
      onMouseLeave={() => onActiveChange(null)}
    >
      <div className="ecosystem-card__face">
        <div className="ecosystem-card__content">
          <div className="ecosystem-card__icon">{card.icon}</div>
          <div>
            <h3>{card.label}</h3>
            <p>{card.sub}</p>
          </div>
          <span className="ecosystem-card__mark" aria-hidden="true">↗</span>
        </div>
      </div>
    </article>
  );
}

export function About() {
  const [activeId, setActiveId] = useState<CapabilityId | null>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ecosystemRef.current;
    if (!element || event.pointerType === 'touch') return;
    const bounds = element.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 8;
    element.style.setProperty('--eco-shift-x', `${x.toFixed(2)}px`);
    element.style.setProperty('--eco-shift-y', `${y.toFixed(2)}px`);
  };

  const resetPointer = () => {
    ecosystemRef.current?.style.setProperty('--eco-shift-x', '0px');
    ecosystemRef.current?.style.setProperty('--eco-shift-y', '0px');
  };

  return (
    <section id="genix-ecosystem" className="relative overflow-hidden bg-black py-28 sm:py-36 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 xl:grid-cols-2 xl:gap-10">
          <div>
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

          <SectionReveal delay={0.15}>
            <div
              ref={ecosystemRef}
              className="ecosystem-visual"
              onPointerMove={handlePointerMove}
              onPointerLeave={resetPointer}
            >
              <svg className="ecosystem-connections" viewBox="0 0 100 100" aria-hidden="true">
                <g>
                  <line x1="50" y1="50" x2="50" y2="15" />
                  <line x1="50" y1="50" x2="19" y2="50" />
                  <line x1="50" y1="50" x2="81" y2="50" />
                  <line x1="50" y1="50" x2="50" y2="85" />
                  <circle cx="50" cy="50" r="0.9" />
                  <circle cx="50" cy="15" r="0.7" />
                  <circle cx="19" cy="50" r="0.7" />
                  <circle cx="81" cy="50" r="0.7" />
                  <circle cx="50" cy="85" r="0.7" />
                </g>
              </svg>

              <div className="ecosystem-core" aria-label="Genix digital ecosystem">
                <span>GENIX</span>
                <small>DIGITAL ECOSYSTEM</small>
              </div>

              {CARDS.map((card) => (
                <EcosystemCard
                  key={card.id}
                  card={card}
                  active={activeId === card.id}
                  onActiveChange={setActiveId}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
