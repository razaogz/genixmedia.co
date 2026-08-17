'use client';

import { motion } from 'framer-motion';
import { LifeBuoy, ShieldCheck, TrendingUp, Workflow } from 'lucide-react';

const NODES = [
  {
    id: 'assets',
    label: 'ASSETS',
    sub: 'Digital Asset Management',
    icon: LifeBuoy,
    pos: 'top',
  },
  {
    id: 'reputation',
    label: 'REPUTATION',
    sub: 'PR & Reputation',
    icon: ShieldCheck,
    pos: 'right',
  },
  {
    id: 'growth',
    label: 'GROWTH',
    sub: 'Marketing & Acquisition',
    icon: TrendingUp,
    pos: 'bottom',
  },
  {
    id: 'technology',
    label: 'TECHNOLOGY',
    sub: 'SaaS & Software',
    icon: Workflow,
    pos: 'left',
  },
] as const;

export function EcosystemDiagram() {
  return (
    <div className="relative mx-auto w-full max-w-[460px]">
      {/* Desktop / tablet radial layout */}
      <div className="relative hidden aspect-square sm:block">
        {/* Connecting lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 400"
          fill="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="line-glow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[
            { x1: 200, y1: 80, x2: 200, y2: 200 },
            { x1: 320, y1: 200, x2: 200, y2: 200 },
            { x1: 200, y1: 320, x2: 200, y2: 200 },
            { x1: 80, y1: 200, x2: 200, y2: 200 },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="url(#line-glow)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
            />
          ))}
          {/* Pulsing dots traveling toward center */}
          {NODES.map((_, i) => (
            <motion.circle
              key={i}
              r="2.5"
              fill="#a855f7"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: [0, 1, 0] }}
              viewport={{ once: false }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.6,
                ease: 'easeInOut',
              }}
              cy={200}
              cx={200}
            />
          ))}
        </svg>

        {/* Center node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative flex h-28 w-28 items-center justify-center rounded-2xl border border-[#a855f7]/30 bg-[#0A0714] backdrop-blur-xl">
            <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),transparent_70%)]" />
            <div className="relative text-center">
              <div className="font-display text-lg font-bold tracking-tight text-white">
                GENIX
              </div>
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                Ecosystem
              </div>
            </div>
          </div>
        </motion.div>

        {/* Surrounding nodes */}
        {NODES.map((node, i) => {
          const Icon = node.icon;
          const positions: Record<string, string> = {
            top: 'left-1/2 top-0 -translate-x-1/2',
            right: 'right-0 top-1/2 -translate-y-1/2',
            bottom: 'left-1/2 bottom-0 -translate-x-1/2',
            left: 'left-0 top-1/2 -translate-y-1/2',
          };
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.12 }}
              whileHover={{ scale: 1.05 }}
              className={`absolute z-20 ${positions[node.pos]}`}
            >
              <div className="group relative flex w-32 flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-3 text-center backdrop-blur-xl transition-colors hover:border-[#a855f7]/40">
                <div className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.15),transparent_70%)] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 transition-colors group-hover:border-[#a855f7]/40 group-hover:text-white">
                  <Icon size={16} />
                </div>
                <div className="relative">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-white">
                    {node.label}
                  </div>
                  <div className="mt-0.5 text-[9px] leading-tight text-white/40">
                    {node.sub}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Mobile stacked layout */}
      <div className="flex flex-col items-center gap-5 sm:hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-[#a855f7]/30 bg-[#0A0714]"
        >
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),transparent_70%)]" />
          <div className="relative text-center">
            <div className="font-display text-base font-bold tracking-tight text-white">
              GENIX
            </div>
          </div>
        </motion.div>

        {NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex w-full max-w-xs items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70">
                <Icon size={18} />
              </div>
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-white">
                  {node.label}
                </div>
                <div className="mt-0.5 text-[11px] text-white/40">{node.sub}</div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
