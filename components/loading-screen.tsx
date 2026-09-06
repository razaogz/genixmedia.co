'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LOADING_DURATION = 2000;
const FADE_DURATION = 0.45;

export function LoadingScreen() {
  const [phase, setPhase] = useState<'loading' | 'fading' | 'done'>('loading');

  useEffect(() => {
    document.body.dataset.loading = 'true';
    const timer = window.setTimeout(() => setPhase('fading'), LOADING_DURATION);

    return () => {
      window.clearTimeout(timer);
      delete document.body.dataset.loading;
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <motion.div
      data-loading-screen
      className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black"
      animate={{ opacity: phase === 'fading' ? 0 : 1 }}
      transition={{ duration: FADE_DURATION, ease: 'easeInOut' }}
      onAnimationComplete={() => {
        if (phase !== 'fading') return;
        setPhase('done');
        window.requestAnimationFrame(() => {
          delete document.body.dataset.loading;
        });
      }}
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
            transition={{ duration: LOADING_DURATION / 1000, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
}
