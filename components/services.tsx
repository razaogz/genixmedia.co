'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Megaphone,
  Share2,
  Target,
  TrendingUp,
  Bot,
  PhoneCall,
  Workflow,
  LayoutGrid,
  LifeBuoy,
  BadgeCheck,
  AtSign,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const PILLARS = [
  {
    number: '01',
    title: 'Growth Operations',
    desc: 'Customer acquisition built around measurable growth.',
    services: [
      { icon: Megaphone, label: 'Paid Media', desc: 'Performance-focused campaigns across Meta and other relevant advertising platforms.' },
      { icon: Share2, label: 'Social Media & Content', desc: 'Strategy, content creation, and management designed to build attention and demand.' },
      { icon: Target, label: 'Lead Generation', desc: 'Systems and campaigns engineered to generate qualified opportunities.' },
      { icon: TrendingUp, label: 'Growth Strategy', desc: 'Connecting acquisition, conversion, and retention into one scalable growth system.' },
    ],
  },
  {
    number: '02',
    title: 'Software & Automation',
    desc: 'Technology that turns repetitive operations into scalable systems.',
    services: [
      { icon: Bot, label: 'AI Lead Systems', desc: 'Capture, qualify, route, and follow up with leads automatically.' },
      { icon: PhoneCall, label: 'AI Voice & Scheduling', desc: 'AI-powered calling, qualification, appointment booking, and customer interactions.' },
      { icon: Workflow, label: 'CRM & Sales Automation', desc: 'Automated pipelines, follow-ups, reminders, and lead management.' },
      { icon: LayoutGrid, label: 'SaaS Solutions', desc: 'Purpose-built software for recurring business and operational challenges.' },
    ],
  },
  {
    number: '03',
    title: 'Digital Asset & Reputation Management',
    desc: 'Protecting, recovering, and strengthening your digital presence.',
    services: [
      { icon: LifeBuoy, label: 'Account Recovery', desc: 'Support for disabled, compromised, restricted, or inaccessible accounts.' },
      { icon: BadgeCheck, label: 'Verification Services', desc: 'Guidance and legitimate assistance with platform verification processes.' },
      { icon: AtSign, label: 'Username & Digital Asset Services', desc: 'Assistance involving usernames and other valuable digital identity assets.' },
      { icon: ShieldCheck, label: 'Brand & Reputation Protection', desc: 'Help with impersonation, reputation issues, platform disputes, and protecting your digital brand.' },
    ],
  },
];

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sy = useSpring(ry, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <SectionReveal delay={index * 0.12} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-[#a855f7]/40"
      >
        {/* Purple glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.18),transparent_70%)]" />
        </div>

        <div className="relative flex items-start justify-between">
          <span className="font-display text-5xl font-semibold leading-none text-white/10 transition-colors duration-500 group-hover:text-[#a855f7]/30">
            {pillar.number}
          </span>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-colors duration-500 group-hover:border-[#a855f7]/40 group-hover:text-white"
          >
            {(() => {
              const HeadIcon = pillar.services[0].icon;
              return <HeadIcon size={22} />;
            })()}
          </motion.div>
        </div>

        <h3 className="relative mt-6 font-display text-xl font-semibold uppercase tracking-tight text-white">
          {pillar.title}
        </h3>
        <p className="relative mt-3 text-sm text-white/50">
          {pillar.desc}
        </p>

        <div className="relative mt-8 flex flex-col gap-5">
          {pillar.services.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="group/item flex gap-4 border-b border-white/5 pb-5 transition-colors last:border-0 last:pb-0 hover:border-white/10"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors group-hover/item:border-[#a855f7]/30 group-hover/item:text-white">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-white/80">
                    {s.label}
                  </p>
                  <p className="mt-1 text-xs text-white/40">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </SectionReveal>
  );
}

function CTABlock() {
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

  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

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
        <motion.button
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onClick={() => scrollTo('#contact')}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="group relative mt-8 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_0_30px_rgba(168,85,247,0.35)] transition-opacity hover:opacity-90"
        >
          <span className="relative z-10 flex items-center gap-2">
            Talk to Genix
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </span>
        </motion.button>
      </div>
    </SectionReveal>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-32 sm:py-40">
      <SectionDecor variant="shards" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Our Expertise"
          title={
            <>
              Integrated Solutions for
              <br />
              <span className="text-gradient-white">
                Modern Digital Businesses
              </span>
            </>
          }
          subtitle="Genix Media combines growth, technology, and digital asset management into one ecosystem—helping businesses scale, automate operations, and protect their digital presence."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.number} pillar={p} index={i} />
          ))}
        </div>

        <CTABlock />
      </div>
    </section>
  );
}
