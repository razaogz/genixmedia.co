'use client';

import { motion } from 'framer-motion';

interface GenixLogoProps {
  className?: string;
  showStar?: boolean;
  animateStar?: boolean;
}

export function GenixLogo({
  className = 'h-10 w-auto',
  showStar = true,
  animateStar = false,
}: GenixLogoProps) {
  return (
    <div className={`relative flex items-center ${className}`}>
      <svg
        viewBox="0 0 200 56"
        className="h-full w-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chrome-text" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#e8e8e8" />
            <stop offset="60%" stopColor="#b0b0b0" />
            <stop offset="100%" stopColor="#d4d4d4" />
          </linearGradient>
          <linearGradient id="chrome-shine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="55%" stopColor="#aaaaaa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="star-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cccccc" />
            <stop offset="100%" stopColor="#888888" />
          </radialGradient>
        </defs>

        <text
          x="48"
          y="40"
          fontFamily="'Geist', sans-serif"
          fontWeight="600"
          fontSize="34"
          letterSpacing="1"
          fill="url(#chrome-text)"
        >
          GENIX
        </text>
        <text
          x="48"
          y="40"
          fontFamily="'Geist', sans-serif"
          fontWeight="600"
          fontSize="34"
          letterSpacing="1"
          fill="url(#chrome-shine)"
          opacity="0.5"
        >
          GENIX
        </text>
        <text
          x="48"
          y="52"
          fontFamily="'Geist', sans-serif"
          fontWeight="400"
          fontSize="7"
          letterSpacing="6"
          fill="#999999"
        >
          MEDIA
        </text>

        {showStar && (
          <g transform="translate(24, 28)">
            <motion.path
              d="M0,-18 L5,-5 L18,0 L5,5 L0,18 L-5,5 L-18,0 L-5,-5 Z"
              fill="url(#star-glow)"
              animate={animateStar ? { rotate: 360 } : undefined}
              transition={
                animateStar
                  ? { duration: 12, repeat: Infinity, ease: 'linear' }
                  : undefined
              }
              style={{ transformOrigin: 'center' }}
            />
            <circle cx="0" cy="0" r="3" fill="#ffffff" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
}
