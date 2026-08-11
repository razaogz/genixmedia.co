'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { GenixLogo } from '@/components/genix-logo';

const VIDEO_SRC =
  'https://res.cloudinary.com/ohimcwqb/video/upload/v1786380756/0083E2A8-9C20-474E-A9FF-FA5C227227E9.mp4';

export function IntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let settled = false;

    const attemptSoundAutoplay = async () => {
      try {
        video.muted = false;
        await video.play();
        setSoundEnabled(true);
      } catch {
        if (settled) return;
        try {
          video.muted = true;
          await video.play();
          if (!soundEnabled) setSoundBlocked(true);
        } catch {
          setSoundBlocked(true);
        }
      }
    };

    attemptSoundAutoplay();

    const onCanPlay = () => {
      if (!settled) attemptSoundAutoplay();
    };
    video.addEventListener('canplay', onCanPlay);

    return () => {
      settled = true;
      video.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  const handleEnableSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    setSoundEnabled(true);
    setSoundBlocked(false);
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-6 py-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-white/[0.02] blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-white/[0.02] blur-[120px]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="mb-8"
      >
        <GenixLogo className="h-10" />
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[960px]"
      >
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-black">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="h-full w-full object-contain"
              controls
              autoPlay
              playsInline
              preload="auto"
            />
          </div>

          {/* Enable Sound control */}
          {soundBlocked && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleEnableSound}
              className="absolute bottom-5 right-5 z-10 flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-medium text-white backdrop-blur-md transition-colors hover:border-white/30 hover:bg-black/80"
            >
              <Volume2 size={14} />
              Enable Sound
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-10 flex flex-col items-center gap-3"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Welcome to Genix Media
        </p>
        <p className="text-xs text-white/30">Scroll to explore</p>
      </motion.div>
    </section>
  );
}
