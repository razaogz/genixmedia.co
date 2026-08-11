'use client';

import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  ShieldCheck,
  Network,
  Users,
  Zap,
  Lock,
  Handshake,
} from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Platform Expertise',
    desc: 'Deep experience navigating complex account recovery, verification, platform restrictions, identity issues, bans, unbans, and other platform-related challenges across major social platforms.',
  },
  {
    icon: Network,
    title: 'Established Industry Network',
    desc: 'Access to a broad network of platform specialists, trusted industry contacts, and established escalation pathways when cases require specialized attention.',
  },
  {
    icon: Users,
    title: 'A Team Behind Every Solution',
    desc: "Genix isn't operated by one person behind a screen. Our team works across client operations, software, automation, growth, and platform cases simultaneously to deliver consistent execution.",
  },
  {
    icon: Zap,
    title: 'Speed & Execution',
    desc: 'Digital problems move quickly. Our systems and team are structured to assess, prioritize, and execute efficiently on time-sensitive matters.',
  },
  {
    icon: Lock,
    title: 'Confidential By Default',
    desc: 'Sensitive business information, client communications, platform cases, and digital assets are handled with discretion and appropriate security practices.',
  },
  {
    icon: Handshake,
    title: 'Built For Long-Term Partnerships',
    desc: 'From growth and software to digital asset management, our goal is to become part of the infrastructure behind your business—not another one-off vendor.',
  },
];

function FeatureCard({
  icon: Icon,
  title,
  desc,
  index,
}: {
  icon: typeof ShieldCheck;
  title: string;
  desc: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 150, damping: 15 });
  const sy = useSpring(ry, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(sx, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sy, [-0.5, 0.5], [-10, 10]);

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
    <SectionReveal delay={(index % 3) * 0.1} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -6 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl transition-colors duration-500 hover:border-[#a855f7]/50"
      >
        {/* Purple neon border glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 shadow-[0_0_30px_rgba(168,85,247,0.25)] transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4 + index * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="relative mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 transition-colors duration-500 group-hover:border-[#a855f7]/40 group-hover:text-white"
        >
          <Icon className="h-6 w-6" />
        </motion.div>

        <h3 className="relative text-base font-semibold uppercase tracking-tight text-white">
          {title}
        </h3>
        <p className="relative mt-3 text-sm text-white/50">{desc}</p>
      </motion.div>
    </SectionReveal>
  );
}

export function WhyChooseUs() {
  return (
    <section id="why" className="relative py-32 sm:py-40">
      <SectionDecor variant="spheres" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Why Genix"
          title={
            <>
              Built to Solve
              <br />
              <span className="text-gradient-white">
                Complex Digital Challenges
              </span>
            </>
          }
          subtitle="Genix Media combines platform expertise, growth systems, automation, and strategic execution to deliver solutions where conventional agencies stop."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} {...f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
