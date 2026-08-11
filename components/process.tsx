'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageCircle, Search, Compass, Rocket, Gauge, LifeBuoy } from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const STEPS = [
  { icon: MessageCircle, label: 'DISCOVERY', desc: 'We understand your business, objectives, challenges, and the outcomes you’re ultimately trying to achieve.' },
  { icon: Search, label: 'ANALYSIS', desc: 'We assess your current systems, digital presence, opportunities, and underlying problems holding you back.' },
  { icon: Compass, label: 'STRATEGY', desc: 'We define the right approach across growth, technology, automation, or digital asset management for your needs.' },
  { icon: Rocket, label: 'IMPLEMENTATION', desc: 'Our team builds, deploys, and executes the solution with precision from start to finish.' },
  { icon: Gauge, label: 'OPTIMIZATION', desc: 'We monitor performance, identify new opportunities, and continuously improve what we’ve built over time.' },
  { icon: LifeBuoy, label: 'ONGOING PARTNERSHIP', desc: 'As your business evolves, our systems, strategy, and support evolve alongside it for long-term growth.' },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="relative py-32 sm:py-40">
      <SectionDecor variant="rings" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeader
          eyebrow="Our Process"
          title={
            <>
              BUILT AROUND
              <br />
              <span className="text-gradient-white">YOUR BUSINESS.</span>
            </>
          }
          subtitle="From the first conversation to ongoing optimization, we build and execute solutions around your goals, challenges, and opportunities."
        />

        <div ref={ref} className="relative mt-20">
          <div className="absolute left-8 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-8 top-0 w-px bg-white md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {STEPS.map((step, i) => (
              <SectionReveal key={step.label} delay={0.05}>
                <div
                  className={`relative flex items-center gap-6 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-8 z-10 -translate-x-1/2 md:left-1/2">
                    <motion.div
                      whileInView={{ scale: [0.5, 1.2, 1] }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-[#050505] text-white"
                    >
                      <step.icon size={20} />
                    </motion.div>
                  </div>

                  <div className="ml-20 w-full md:ml-0 md:w-[calc(50%-3rem)]">
                    <div className="border-b border-white/5 pb-6 transition-colors hover:border-white/20">
                      <div className="flex items-center gap-3">
                        <span className="font-display text-3xl font-semibold text-white/20">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="text-lg font-semibold uppercase tracking-tight text-white">
                          {step.label}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-white/50">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
