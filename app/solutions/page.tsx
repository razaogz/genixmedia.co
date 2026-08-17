'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';
import { PageShell } from '@/components/page-shell';
import { SOLUTIONS } from '@/lib/site-config';

const ICONS: Record<string, LucideIcon> = {
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
};

export default function SolutionsPage() {
  return (
    <PageShell>
      <section className="relative pt-40 pb-20 sm:pt-48">
        <SectionDecor variant="shards" />
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            eyebrow="Solutions"
            title={
              <>
                The Genix{' '}
                <span className="text-gradient-white">Ecosystem</span>
              </>
            }
            subtitle="Four interconnected capabilities, one partner. Explore the solutions that power modern digital businesses."
          />

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
            {SOLUTIONS.map((s, i) => {
              const Icon = ICONS[s.icon] ?? LifeBuoy;
              return (
                <SectionReveal key={s.slug} delay={i * 0.1}>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="group block h-full rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-[#a855f7]/40"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:border-[#a855f7]/40 group-hover:text-white">
                        <Icon size={22} />
                      </div>
                      <span className="font-display text-3xl font-semibold leading-none text-white/10 transition-colors group-hover:text-[#a855f7]/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="mt-6 text-xs uppercase tracking-[0.2em] text-white/40">
                      {s.eyebrow}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/50">{s.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                      Learn more
                      <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
