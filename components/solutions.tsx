'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';
import { SolutionVisual } from '@/components/solution-3d';
import { SITE_CONFIG } from '@/lib/site-config';

const PILLARS = [
  {
    num: '01',
    tag: 'BUILD',
    title: 'Build Your Digital Presence',
    desc: 'Establish a credible, cohesive digital presence across platforms, media, websites, and digital assets.',
    href: '/solutions/growth',
    visual: 'globe',
  },
  {
    num: '02',
    tag: 'PROTECT',
    title: 'Protect Assets & Reputation',
    desc: 'Recover compromised accounts, manage public perception, and defend your digital identity.',
    href: '/solutions/digital-assets',
    visual: 'shield',
  },
  {
    num: '03',
    tag: 'GROW',
    title: 'Acquire & Scale Growth',
    desc: 'Engineer measurable customer acquisition systems across paid media, content, and lead generation.',
    href: '/solutions/growth',
    visual: 'growth',
  },
  {
    num: '04',
    tag: 'TECHNOLOGY',
    title: 'Automate With Software',
    desc: 'Modernize operations with custom SaaS, AI systems, and sales automation built for scale.',
    href: '/solutions/technology',
    visual: 'chip',
  },
] as const;

function SolutionCard({ card, index }: { card: (typeof PILLARS)[number]; index: number }) {
  return (
    <SectionReveal delay={index * 0.08} className="h-full">
      <Link href={card.href} className="group block h-full">
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="relative flex h-full min-h-[260px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 backdrop-blur-md transition-colors duration-500 hover:border-purple-400/30 sm:p-7"
        >
          {/* Pillar label: subtle number + readable category */}
          <div className="relative flex items-baseline gap-2">
            <span className="font-display text-sm font-medium tabular-nums text-white/25">
              {card.num}
            </span>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 transition-colors duration-500 group-hover:text-white">
              {card.tag}
            </span>
          </div>

          {/* 3D visual area */}
          <div className="relative mt-4 flex h-20 items-center sm:h-24">
            <SolutionVisual variant={card.visual} />
          </div>

          <h3 className="relative mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-white sm:text-xl">
            {card.title}
          </h3>
          <p className="relative mt-3 flex-1 text-sm leading-relaxed text-white/50">
            {card.desc}
          </p>

          <div className="relative mt-6 flex items-center gap-2 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
            Explore Solution
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>
      </Link>
    </SectionReveal>
  );
}

function CommunicationCTA() {
  const hasWhatsapp = Boolean(SITE_CONFIG.whatsapp);
  const hasPhone = Boolean(SITE_CONFIG.phone);

  return (
    <SectionReveal delay={0.2}>
      <div className="mx-auto mt-24 flex max-w-xl flex-col items-center text-center">
        <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
          Not sure what you need?
        </h3>
        <p className="mt-4 text-base text-white/50">
          Tell us the problem. We&apos;ll identify the right solution and
          recommend the best approach for your business.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {hasWhatsapp && (
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-purple-400/40 hover:bg-white/[0.06]"
            >
              <WhatsappIcon size={16} className="text-white/70 group-hover:text-white" />
              WhatsApp
            </a>
          )}
          {hasPhone && (
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-purple-400/40 hover:bg-white/[0.06]"
            >
              <PhoneIcon size={16} className="text-white/70 group-hover:text-white" />
              Call Us
            </a>
          )}
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:border-purple-400/40 hover:bg-white/[0.06]"
          >
            <MailIcon size={16} className="text-white/70 group-hover:text-white" />
            Email Us
          </a>
          <Link
            href="/contact"
            className="group relative overflow-hidden rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageIcon size={16} />
              Send a Message
            </span>
          </Link>
        </div>
      </div>
    </SectionReveal>
  );
}

export function Solutions() {
  return (
    <section id="solutions" className="relative py-28 sm:py-36">
      <SectionDecor variant="shards" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Solutions"
          title={
            <>
              Solutions{' '}
              <span className="font-light italic text-white/50">for your business</span>
            </>
          }
          subtitle="Whatever your situation, Genix has a solution. Identify your need and we'll connect you to the right capabilities."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((card, i) => (
            <SolutionCard key={card.title} card={card} index={i} />
          ))}
        </div>

        <CommunicationCTA />
      </div>
    </section>
  );
}

function WhatsappIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.207zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function PhoneIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5-L2 7" />
    </svg>
  );
}

function MessageIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
