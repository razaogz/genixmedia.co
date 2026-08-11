'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GenixLogo } from '@/components/genix-logo';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#050505]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200],
                }}
                transition={{
                  duration: 2.5,
                  delay: Math.random() * 1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <GenixLogo className="h-16 w-auto" />
              <motion.div
                className="absolute inset-0 overflow-hidden"
                style={{
                  WebkitMaskImage:
                    'linear-gradient(90deg, transparent 30%, white 50%, transparent 70%)',
                  maskImage:
                    'linear-gradient(90deg, transparent 30%, white 50%, transparent 70%)',
                }}
              >
                <motion.div
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-white to-transparent"
                  initial={{ x: '-200%' }}
                  animate={{ x: '400%' }}
                  transition={{ duration: 1.2, delay: 1, ease: 'easeInOut' }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-8 h-px w-48 overflow-hidden rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-white"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, delay: 0.4, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
