'use client';

import { useEffect, useRef, type PointerEvent, type ReactNode } from 'react';
import Image from 'next/image';
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
  register,
}: {
  card: CapabilityCard;
  register: (id: CapabilityId, element: HTMLElement | null) => void;
}) {
  return (
    <article
      ref={(element) => register(card.id, element)}
      className={`ecosystem-card ${card.placement}`}
      style={{ '--card-rotation': card.rotation } as React.CSSProperties}
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
  const cardRefs = useRef(new Map<CapabilityId, HTMLElement>());
  const interactionRef = useRef(
    new Map<CapabilityId, { current: number[]; target: number[] }>(),
  );
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const registerCard = (id: CapabilityId, element: HTMLElement | null) => {
    if (element) {
      cardRefs.current.set(id, element);
      if (!interactionRef.current.has(id)) {
        interactionRef.current.set(id, { current: [0, 0, 0, 0, 1, 1], target: [0, 0, 0, 0, 1, 1] });
      }
    } else {
      cardRefs.current.delete(id);
    }
  };

  const animateCards = () => {
    let needsAnotherFrame = false;

    cardRefs.current.forEach((cardElement, id) => {
      const interaction = interactionRef.current.get(id);
      if (!interaction) return;

      let hasMotion = false;
      interaction.current = interaction.current.map((value, index) => {
        const next = value + (interaction.target[index] - value) * 0.16;
        if (Math.abs(interaction.target[index] - next) > 0.01) hasMotion = true;
        return next;
      });

      const [translateX, translateY, tiltX, tiltY, brightness, scale] = interaction.current;
      cardElement.style.setProperty('--card-translate-x', `${translateX.toFixed(2)}px`);
      cardElement.style.setProperty('--card-translate-y', `${translateY.toFixed(2)}px`);
      cardElement.style.setProperty('--card-tilt-x', `${tiltX.toFixed(2)}deg`);
      cardElement.style.setProperty('--card-tilt-y', `${tiltY.toFixed(2)}deg`);
      cardElement.style.setProperty('--card-brightness', brightness.toFixed(3));
      cardElement.style.setProperty('--card-scale', scale.toFixed(4));

      if (hasMotion) needsAnotherFrame = true;
    });

    frameRef.current = needsAnotherFrame ? requestAnimationFrame(animateCards) : null;
  };

  const scheduleAnimation = () => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(animateCards);
  };

  const setCardTargets = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') {
      resetCards();
      return;
    }

    let closestId: CapabilityId | null = null;
    let closestDistance = Number.POSITIVE_INFINITY;
    const distances = new Map<CapabilityId, { distance: number; x: number; y: number }>();

    cardRefs.current.forEach((cardElement, id) => {
      const bounds = cardElement.getBoundingClientRect();
      const nearestX = Math.max(bounds.left, Math.min(event.clientX, bounds.right));
      const nearestY = Math.max(bounds.top, Math.min(event.clientY, bounds.bottom));
      const distance = Math.hypot(event.clientX - nearestX, event.clientY - nearestY);
      const normalizedX = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
      const normalizedY = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));

      distances.set(id, { distance, x: normalizedX, y: normalizedY });
      if (distance < closestDistance) {
        closestId = id;
        closestDistance = distance;
      }
    });

    cardRefs.current.forEach((cardElement, id) => {
      const interaction = interactionRef.current.get(id);
      const pointer = distances.get(id);
      if (!interaction || !pointer) return;

      const proximity = id === closestId ? Math.max(0, 1 - pointer.distance / 150) : 0;
      interaction.target = [
        pointer.x * 8 * proximity,
        pointer.y * 6 * proximity,
        -pointer.y * 3.2 * proximity,
        pointer.x * 3.2 * proximity,
        1 + 0.1 * proximity,
        1 + 0.012 * proximity,
      ];
    });

    scheduleAnimation();
  };

  const resetCards = () => {
    interactionRef.current.forEach((interaction) => {
      interaction.target = [0, 0, 0, 0, 1, 1];
    });
    scheduleAnimation();
  };

  return (
    <section id="genix-ecosystem" className="relative overflow-hidden py-28 sm:py-36 lg:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 xl:grid-cols-[0.68fr_1.32fr] xl:gap-16">
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
              className="ecosystem-visual"
              onPointerMove={setCardTargets}
              onPointerLeave={resetCards}
            >
              <div className="ecosystem-connections" aria-hidden="true">
                <span className="ecosystem-connection ecosystem-connection--top" />
                <span className="ecosystem-connection ecosystem-connection--left" />
                <span className="ecosystem-connection ecosystem-connection--right" />
                <span className="ecosystem-connection ecosystem-connection--bottom" />
              </div>

              <div className="ecosystem-core" aria-label="Genix digital ecosystem">
                <Image
                  className="ecosystem-core__logo"
                  src="/assets/images/genix-logo-new-transparent.png"
                  alt="Genix"
                  width={128}
                  height={128}
                  priority
                />
              </div>

              {CARDS.map((card) => (
                <EcosystemCard
                  key={card.id}
                  card={card}
                  register={registerCard}
                />
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
