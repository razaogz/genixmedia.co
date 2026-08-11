'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.4 };
  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(trailX, { damping: 30, stiffness: 150, mass: 0.6 });
  const ringY = useSpring(trailY, { damping: 30, stiffness: 150, mass: 0.6 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(max-width: 1024px)').matches) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        'a, button, input, textarea, [role="button"], [data-cursor="pointer"]'
      );
      setIsPointer(!!interactive);
    };

    const leave = () => setIsVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden lg:block"
        style={{ x: dotX, y: dotY }}
      >
        <motion.div
          className="-ml-1 -mt-1 h-2 w-2 rounded-full bg-white"
          animate={{
            scale: isPointer ? 0 : 1,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden lg:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-ml-5 -mt-5 h-10 w-10 rounded-full border border-white/40"
          animate={{
            scale: isPointer ? 1.8 : 1,
            opacity: isVisible ? (isPointer ? 0.8 : 0.4) : 0,
            backgroundColor: isPointer
              ? 'rgba(255,255,255,0.08)'
              : 'rgba(255,255,255,0)',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
