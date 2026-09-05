'use client';

import { motion } from 'framer-motion';

type Variant = 'cubes' | 'shards' | 'rings' | 'spheres' | 'ribbons';

export function SectionDecor({ variant: _variant }: { variant: Variant }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Subtle ambient fog */}
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-white/[0.015] blur-[100px]" />
      <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-white/[0.015] blur-[100px]" />

      {/* Faint vertical light beam */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
