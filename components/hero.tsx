'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import { ArrowRight, Compass } from 'lucide-react';

const HeroScene = dynamic(
  () => import('@/components/hero-scene').then((m) => m.HeroScene),
  { ssr: false }
);

const HEADLINE = 'BUILDING THE DIGITAL OPERATING SYSTEM YOUR BUSINESS NEEDS.';

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

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      <motion.div style={{ opacity }} className="absolute inset-0">
        <HeroScene />
      </motion.div>

      <motion.div
        style={{ y }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/60"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          DIGITAL ASSET MANAGEMENT • Automation • Digital Asset &amp; Reputation Management
        </motion.div>

        <AnimatedHeadline />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.6 }}
          className="mt-8 max-w-2xl text-base text-white/50 sm:text-lg"
        >
          Genix combines growth operations, intelligent software and
          specialized platform solutions and digital asset management to help
          brands, creators and businesses grow, automate and manage their
          digital presence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.8 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton onClick={() => scrollTo('#contact')}>
            Explore Genix 
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={() => scrollTo('#services')}>
            <Compass size={16} className="mr-1" />
            View Solutions 
          </MagneticButton>
        </motion.div>
      </motion.div>

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
