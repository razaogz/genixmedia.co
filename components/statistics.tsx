'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { SectionReveal } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const STATS = [
  { value: 1000, suffix: '+', label: 'CASES & PROJECTS DELIVERED' },
  { value: 500, prefix: '$', suffix: 'k+', label: 'CLIENT VALUE MANAGED' },
  { value: 100, suffix: '%', label: 'Success Rate on eligible cases' },
  { value: 20, suffix: '+', label: 'countries Served' },
];

function Counter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    const duration = 2000;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setCount(value);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return (
    <span className="text-gradient-white">
      {count}
      {suffix}
    </span>
  );
}

export function Statistics() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="relative py-20 sm:py-28">
      <SectionDecor variant="ribbons" />
      <div className="mx-auto max-w-7xl px-6">
        <div
          ref={ref}
          className="grid grid-cols-2 gap-8 border-y border-white/10 py-12 md:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <SectionReveal key={s.label} delay={i * 0.1}>
              <div className="text-center">
                <div className="font-display text-5xl font-semibold uppercase tracking-tight sm:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} active={inView} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/40">
                  {s.label}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
