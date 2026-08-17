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
  Megaphone,
  Share2,
  Target,
  Bot,
  PhoneCall,
  LayoutGrid,
  BadgeCheck,
  AtSign,
} from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';
import { PageShell } from '@/components/page-shell';
import { SOLUTIONS, type Solution } from '@/lib/site-config';

const ICONS: Record<string, LucideIcon> = {
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
  Megaphone,
  Share2,
  Target,
  Bot,
  PhoneCall,
  LayoutGrid,
  BadgeCheck,
  AtSign,
};

export function SolutionDetail({ solution }: { solution: Solution }) {
  const Icon = ICONS[solution.icon] ?? LifeBuoy;

  return (
    <PageShell>
      <section className="relative pt-40 pb-20 sm:pt-48">
        <SectionDecor variant="cubes" />
        <div className="mx-auto max-w-7xl px-6">
          <Link
            href="/solutions"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
          >
            <ArrowRight size={14} className="rotate-180" />
            All Solutions
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70">
              <Icon size={26} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                {solution.eyebrow}
              </div>
              <h1 className="font-display text-3xl font-semibold uppercase tracking-tight text-white sm:text-5xl">
                {solution.title}
              </h1>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-lg text-white/60">{solution.desc}</p>
        </div>
      </section>

      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {solution.services.map((s, i) => {
              const SIcon = ICONS[s.icon] ?? LifeBuoy;
              return (
                <SectionReveal key={s.label} delay={i * 0.1}>
                  <div className="group flex h-full gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl transition-colors duration-500 hover:border-[#a855f7]/30">
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-colors group-hover:border-[#a855f7]/40 group-hover:text-white">
                      <SIcon size={20} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white">
                        {s.label}
                      </h3>
                      <p className="mt-2 text-sm text-white/50">{s.desc}</p>
                    </div>
                  </div>
                </SectionReveal>
              );
            })}
          </div>

          <SectionReveal delay={0.2}>
            <div className="mt-16 flex flex-col items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-tight text-white">
                Ready to get started?
              </h2>
              <p className="max-w-md text-sm text-white/50">
                Talk to Genix about your {solution.title.toLowerCase()} needs.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-opacity hover:opacity-90"
                >
                  Send a Message
                </Link>
                <Link
                  href="/solutions"
                  className="rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                >
                  Explore Other Solutions
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageShell>
  );
}
