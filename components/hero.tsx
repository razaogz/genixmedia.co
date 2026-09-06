'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import { WebGLShader } from '@/components/ui/web-gl-shader';

const HEADLINE = 'THE SOLE DIGITAL PARTNER FOR BUSINESSES BUILT ONLINE.';

function AnimatedHeadline() {
  return (
    <h1 className="font-display text-4xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
      {HEADLINE.split(' ').map((word, wi) => (
        <span key={wi} className="mr-4 inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 3 + wi * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word === 'NEEDS.' ? (
              <span className="text-gradient-white">{word}</span>
            ) : (
              word
            )}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

function MagneticButton({
  children,
  variant = 'primary',
  onClick,
}: {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const btn = ref.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={
        variant === 'primary'
          ? 'group relative overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90'
          : 'group relative overflow-hidden rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.06]'
      }
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <ArrowRight
          size={16}
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </motion.button>
  );
}

function HeroPanel({
  kind,
  label,
  description,
  children,
}: {
  kind: 'assets' | 'reputation' | 'software' | 'growth';
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <article className={`hero-panel hero-panel--${kind}`}>
      <div className="hero-panel__surface">
        <div className="hero-panel__visual">{children}</div>
        <div className="hero-panel__copy">
          <span>{label}</span>
          <small>{description}</small>
        </div>
      </div>
    </article>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType === 'touch' || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 7;
    ref.current.style.setProperty('--hero-pan-x', `${x.toFixed(2)}px`);
    ref.current.style.setProperty('--hero-pan-y', `${y.toFixed(2)}px`);
  };

  const resetPointer = () => {
    ref.current?.style.setProperty('--hero-pan-x', '0px');
    ref.current?.style.setProperty('--hero-pan-y', '0px');
  };

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="hero-section relative w-full bg-black"
    >
      <div className="absolute inset-0 z-0">
        <WebGLShader />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,transparent_55%)]" />

      <motion.div
        style={{ y }}
        className="hero-content relative z-10 flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          DIGITAL ASSET MANAGEMENT • PR & REPUTATION • SAAS
        </motion.div>

        <AnimatedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="mt-8 max-w-2xl text-base text-white/50 sm:text-lg"
        >
          From managing digital assets and reputation to driving growth and building SaaS Genix brings the digital capabilities your business needs all under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/contact">
            <MagneticButton onClick={() => {}}>
              Explore Genix
            </MagneticButton>
          </Link>
          <Link href="/solutions">
            <MagneticButton variant="secondary" onClick={() => {}}>
              <Compass size={16} className="mr-1" />
              View Solutions
            </MagneticButton>
          </Link>
        </motion.div>
      </motion.div>

      <div className="hero-supporting-panels" aria-label="Genix Media capabilities">
        <HeroPanel kind="assets" label="DIGITAL ASSETS" description="Manage. Organize. Scale.">
          <div className="hero-assets-stack" aria-hidden="true">
            <span className="hero-assets-stack__back" />
            <span className="hero-assets-stack__middle" />
            <span className="hero-assets-stack__front">
              <i />
              <b />
              <em />
            </span>
            <span className="hero-assets-stack__folder">↗</span>
          </div>
        </HeroPanel>

        <HeroPanel kind="reputation" label="PR & REPUTATION" description="Visibility that builds trust.">
          <div className="hero-reputation-list" aria-hidden="true">
            <div className="hero-reputation-list__top"><span /> MEDIA MENTION <b>+</b></div>
            <div><i /> Brand Coverage <strong>active</strong></div>
            <div><i /> Positive Sentiment <strong>steady</strong></div>
          </div>
        </HeroPanel>

        <HeroPanel kind="software" label="SAAS & SOFTWARE" description="Build. Operate. Scale.">
          <div className="hero-software-window" aria-hidden="true">
            <div className="hero-software-window__bar"><i /><i /><i /></div>
            <div className="hero-software-window__body">
              <div className="hero-software-window__sidebar"><span /><span /><span /><span /></div>
              <div className="hero-software-window__workspace">
                <span /><span /><span /><b /><b />
              </div>
            </div>
          </div>
        </HeroPanel>

        <HeroPanel kind="growth" label="GROWTH" description="Acquire. Convert. Scale.">
          <div className="hero-growth-chart" aria-hidden="true">
            <div className="hero-growth-chart__labels"><span>↑</span><small>momentum</small></div>
            <svg viewBox="0 0 180 68" preserveAspectRatio="none">
              <path d="M4 58 C24 53, 28 48, 45 51 S65 43, 82 45 S102 34, 117 37 S138 24, 151 27 S168 12, 176 8" />
              <path className="hero-growth-chart__glow" d="M4 58 C24 53, 28 48, 45 51 S65 43, 82 45 S102 34, 117 37 S138 24, 151 27 S168 12, 176 8" />
              <circle cx="176" cy="8" r="3" />
            </svg>
          </div>
        </HeroPanel>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
          <motion.div
            className="h-2 w-1 rounded-full bg-white/60"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
