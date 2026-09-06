'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return loading ? (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.16),transparent_38%),#030303]"
      aria-label="Loading Genix Media"
    >
      <div className="flex w-full max-w-xs flex-col items-center px-8">
        <div className="flex items-center gap-3">
          <motion.img
            src="/assets/images/genix-logo-new-transparent.png"
            alt="Genix"
            className="h-16 w-16 object-contain sm:h-[4.5rem] sm:w-[4.5rem]"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
          <div className="flex flex-col items-start leading-none">
            <span className="text-xl font-bold tracking-[0.18em] text-white sm:text-2xl">
              GENIX
            </span>
            <span className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.34em] text-white/40">
              MEDIA
            </span>
          </div>
        </div>
        <div className="mt-8 h-px w-56 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-white"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, ease: 'linear' }}
          />
        </div>
        <span className="mt-3 text-[0.55rem] font-medium uppercase tracking-[0.35em] text-white/35">
          Loading
        </span>
      </div>
    </motion.div>
  ) : null;
}
