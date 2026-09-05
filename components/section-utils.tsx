'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function SectionReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div
      className={`max-w-3xl ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      }`}
    >
      {eyebrow && (
        <SectionReveal>
          <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-white/40">
            {eyebrow}
          </span>
        </SectionReveal>
      )}
      <SectionReveal delay={0.1}>
        <h2 className="mt-4 font-display text-3xl font-semibold uppercase tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </SectionReveal>
      {subtitle && (
        <SectionReveal delay={0.2}>
          <p className="mt-6 text-base text-white/50 sm:text-lg">{subtitle}</p>
        </SectionReveal>
      )}
    </div>
  );
}
