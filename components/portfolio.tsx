'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const FILTERS = ['All', 'Reputation', 'Branding', 'Social', 'Growth'];

const PROJECTS = [
  { title: 'Nebula Reputation', category: 'Reputation', tag: 'Full reputation overhaul for a public-facing founder', img: 'https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Lumen Identity', category: 'Branding', tag: 'Digital identity rebuild for an emerging creator brand', img: 'https://images.pexels.com/photos/3781338/pexels-photo-3781338.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Orbit Social', category: 'Social', tag: 'Social media optimization and platform issue resolution', img: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Vertex Presence', category: 'Growth', tag: 'Online presence growth and credibility-building campaign', img: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Pulse Crisis', category: 'Reputation', tag: 'Crisis management and rapid reputation recovery', img: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { title: 'Aurora Content', category: 'Social', tag: 'Content strategy to reinforce a trusted digital identity', img: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

function LaptopMockup({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-80, 80], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-80, 80], [-6, 6]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <SectionReveal delay={(index % 3) * 0.1}>
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={() => { x.set(0); y.set(0); }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group relative"
      >
        <div className="relative overflow-hidden rounded-t-xl border border-white/10 bg-[#0a0a0a] p-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-white/5">
            <div className="flex items-center gap-1.5 border-b border-white/5 bg-[#050505] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="h-2 w-2 rounded-full bg-white/20" />
              <span className="ml-3 text-[10px] text-white/30">{project.title.toLowerCase().replace(/\s/g, '')}.com</span>
            </div>
            <div className="relative h-full overflow-hidden">
              <motion.img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover"
                style={{ transform: 'translateZ(20px)' }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </div>
        </div>
        <div className="relative mx-auto h-2 w-[110%] -translate-x-[4.5%] rounded-b-xl border border-white/10 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]" />

        <div className="mt-5 flex items-center justify-between" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <h3 className="text-lg font-semibold text-white">{project.title}</h3>
            <p className="text-sm text-white/40">{project.tag}</p>
          </div>
          <span className="text-xs uppercase tracking-[0.15em] text-white/50">
            {project.category}
          </span>
        </div>
      </motion.div>
    </SectionReveal>
  );
}

export function Portfolio() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="relative py-32 sm:py-40">
      <SectionDecor variant="shards" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Portfolio"
          title={
            <>
              Selected Work,
              <br />
              <span className="text-gradient-white">Crafted With Intent.</span>
            </>
          }
          subtitle="A glimpse into the reputation, identity, and social media solutions we've crafted."
        />

        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <LaptopMockup key={p.title} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
