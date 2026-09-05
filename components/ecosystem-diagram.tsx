'use client';

import { motion } from 'framer-motion';
import { LifeBuoy, ShieldCheck, TrendingUp, Workflow } from 'lucide-react';

const NODES = [
  { id: 'assets', label: 'ASSETS', sub: 'Digital Asset Management', icon: LifeBuoy, pos: 'top' },
  { id: 'reputation', label: 'REPUTATION', sub: 'PR & Reputation', icon: ShieldCheck, pos: 'right' },
  { id: 'growth', label: 'GROWTH', sub: 'Marketing & Acquisition', icon: TrendingUp, pos: 'bottom' },
  { id: 'technology', label: 'TECHNOLOGY', sub: 'SaaS & Software', icon: Workflow, pos: 'left' },
] as const;

const ICONS: Record<string, typeof LifeBuoy> = {
  assets: LifeBuoy,
  reputation: ShieldCheck,
  growth: TrendingUp,
  technology: Workflow,
};

export function EcosystemDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      {/* Subtle radial glow behind the whole diagram */}
      <div
        className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/[0.035] blur-[100px] pointer-events-none"
        aria-hidden
      />

      {/* Desktop / tablet cross layout */}
      <div className="relative hidden aspect-[560/460] sm:block">
        {/* Connection lines + traveling pulses (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 460"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="ecos-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.03" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Vertical: top -> center, center -> bottom */}
          <line x1="280" y1="62" x2="280" y2="200" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="280" y1="260" x2="280" y2="398" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          {/* Horizontal: left -> center, center -> right */}
          <line x1="62" y1="230" x2="210" y2="230" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />
          <line x1="350" y1="230" x2="498" y2="230" stroke="rgba(255,255,255,0.10)" strokeWidth="1" />

          {/* Traveling pulses from center toward each node */}
          {[
            { x: 280, y: 200, tx: 280, ty: 62, dur: 5, delay: 0 },
            { x: 280, y: 230, tx: 498, ty: 230, dur: 4.5, delay: 1.2 },
            { x: 280, y: 260, tx: 280, ty: 398, dur: 5.5, delay: 0.6 },
            { x: 280, y: 230, tx: 62, ty: 230, dur: 4.8, delay: 1.8 },
          ].map((pulse, i) => (
            <motion.circle
              key={i}
              r="3"
              fill="#c084fc"
              initial={{ cx: pulse.x, cy: pulse.y, opacity: 0 }}
              animate={{ cx: [pulse.x, pulse.tx], cy: [pulse.y, pulse.ty], opacity: [0, 0.7, 0] }}
              transition={{ duration: pulse.dur, repeat: Infinity, ease: 'linear', delay: pulse.delay }}
            />
          ))}
        </svg>

        {/* Center GENIX node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex h-[136px] w-[160px] flex-col items-center justify-center rounded-[20px] border border-purple-400/25 bg-white/[0.035] backdrop-blur-xl shadow-[0_0_50px_rgba(130,70,255,0.10)]">
            <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.10),transparent_70%)]" />
            <div className="relative text-center">
              <div className="font-display text-xl font-bold tracking-tight text-white">
                GENIX
              </div>
              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-white/45">
                Digital Ecosystem
              </div>
            </div>
          </div>
        </motion.div>

        {/* Surrounding nodes */}
        {NODES.map((node, i) => {
          const Icon = ICONS[node.id] ?? LifeBuoy;
          const positions: Record<string, string> = {
            top: 'left-1/2 top-0 -translate-x-1/2',
            right: 'right-0 top-1/2 -translate-y-1/2',
            bottom: 'left-1/2 bottom-0 -translate-x-1/2',
            left: 'left-0 top-1/2 -translate-y-1/2',
          };
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className={`absolute z-20 ${positions[node.pos]}`}
            >
              <div className="group flex w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-3.5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.045] hover:-translate-y-1">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/65 transition-colors group-hover:text-white">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-semibold tracking-wide text-white">
                    {node.label}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-white/45">
                    {node.sub}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile: GENIX on top, nodes in a 2-col grid */}
      <div className="flex flex-col items-center gap-6 sm:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex h-[120px] w-[148px] flex-col items-center justify-center rounded-[20px] border border-purple-400/25 bg-white/[0.035] backdrop-blur-xl shadow-[0_0_50px_rgba(130,70,255,0.10)]"
        >
          <div className="absolute inset-0 rounded-[20px] bg-[radial-gradient(circle_at_50%_45%,rgba(168,85,247,0.10),transparent_70%)]" />
          <div className="relative text-center">
            <div className="font-display text-lg font-bold tracking-tight text-white">
              GENIX
            </div>
            <div className="mt-1 text-[8px] font-medium uppercase tracking-[0.22em] text-white/45">
              Digital Ecosystem
            </div>
          </div>
        </motion.div>

        <div className="grid w-full max-w-xs grid-cols-2 gap-3">
          {NODES.map((node, i) => {
            const Icon = ICONS[node.id] ?? LifeBuoy;
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-3.5 backdrop-blur-md"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white/65">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-wide text-white">
                    {node.label}
                  </div>
                  <div className="mt-0.5 text-[11px] leading-relaxed text-white/45">
                    {node.sub}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
