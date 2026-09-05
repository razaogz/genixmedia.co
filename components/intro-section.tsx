'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';
import { GenixLogo } from '@/components/genix-logo';
import { WebGLShader } from '@/components/ui/web-gl-shader';

const VIDEO_SRC =
  'https://res.cloudinary.com/zigu4hor/video/upload/v1788293829/Copy_of_Genixfinalvideowith1strevison.mp4';

// Loader takes 2s + ~0.45s exit transition. Wait until the screen is fully gone.
const PLAY_DELAY = 2500;

export function IntroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundBlocked, setSoundBlocked] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let settled = false;
    let playTimer: ReturnType<typeof setTimeout>;

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

    // Only start playback after the loading screen has finished and exited.
    playTimer = setTimeout(() => {
      attemptSoundAutoplay();
    }, PLAY_DELAY);

    const onCanPlay = () => {
      setCanPlay(true);
    };
    video.addEventListener('canplay', onCanPlay);

    return () => {
      settled = true;
      clearTimeout(playTimer);
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
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black px-6 py-10">
      {/* Purple liquid-metal background — same treatment as hero */}
      <div className="absolute inset-0 z-0">
        <WebGLShader />
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.3)_0%,transparent_60%)]" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mb-8"
      >
        <GenixLogo className="h-10" />
      </motion.div>

      {/* Video container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[960px]"
      >
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-2 backdrop-blur-xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-white/5 bg-black">
            <video
              ref={videoRef}
              src={VIDEO_SRC}
              className="h-full w-full object-contain"
              controls
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
        className="relative z-10 mt-10 flex flex-col items-center gap-3"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
          Welcome to Genix Media
        </p>
        <p className="text-sm text-white/60">Digital operations, built for what comes next.</p>
      </motion.div>
    </section>
  );
}
