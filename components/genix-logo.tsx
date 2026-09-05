'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface GenixLogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function GenixLogo({ className = 'h-10', showWordmark = true }: GenixLogoProps) {
  return (
    <div className={`relative flex items-center gap-1 ${className}`}>
      <div className="relative aspect-square h-full">
        <Image
          src="/assets/images/genix-logo-new-transparent.png"
          alt="Genix"
          fill
          sizes="(max-width: 640px) 40px, 64px"
          className="object-contain"
          priority
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <motion.span
            className="font-display text-sm font-semibold tracking-[0.08em] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            GENIX
          </motion.span>
          <span className="text-[7px] font-medium tracking-[0.28em] text-white/40">
            MEDIA
          </span>
        </div>
      )}
    </div>
  );
}
