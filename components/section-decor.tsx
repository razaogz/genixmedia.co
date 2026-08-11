'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

type Variant = 'cubes' | 'shards' | 'rings' | 'spheres' | 'ribbons';

interface DecorItem {
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
}

function makeItems(count: number, seed: number): DecorItem[] {
  return Array.from({ length: count }).map((_, i) => {
    const r = (n: number) => {
      const x = Math.sin((i + 1) * seed + n) * 10000;
      return x - Math.floor(x);
    };
    return {
      left: `${Math.floor(r(1) * 90)}%`,
      top: `${Math.floor(r(2) * 80) + 10}%`,
      size: Math.floor(r(3) * 40) + 16,
      delay: r(4) * 3,
      duration: r(5) * 8 + 6,
      rotate: Math.floor(r(6) * 360),
    };
  });
}

function FloatingShard({ item, kind }: { item: DecorItem; kind: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: item.left, top: item.top, width: item.size, height: item.size }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, delay: item.delay }}
    >
      <motion.div
        animate={{ rotateX: 360, rotateY: 360, y: [0, -12, 0] }}
        transition={{
          duration: item.duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
      >
        <div
          className="h-full w-full border border-white/10"
          style={{
            background:
              kind === 0
                ? 'rgba(255,255,255,0.04)'
                : 'linear-gradient(135deg, rgba(255,255,255,0.06), transparent)',
            clipPath:
              kind === 1
                ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
                : kind === 2
                ? 'polygon(50% 0%, 100% 100%, 0% 100%)'
                : 'none',
            borderRadius: kind === 0 ? '8px' : 0,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function ChromeSphere({ item }: { item: DecorItem }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: item.left,
        top: item.top,
        width: item.size,
        height: item.size,
        background:
          'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), rgba(255,255,255,0.04) 60%, transparent)',
        border: '1px solid rgba(255,255,255,0.12)',
      }}
      initial={{ opacity: 0, scale: 0, y: 0 }}
      whileInView={{ opacity: 1, scale: 1, y: [-16, 0] }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 1, delay: item.delay },
        scale: { duration: 1, delay: item.delay },
        y: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
}

function HoloRing({ item }: { item: DecorItem }) {
  return (
    <motion.div
      className="absolute rounded-full border border-dashed border-white/10"
      style={{ left: item.left, top: item.top, width: item.size * 2, height: item.size * 2 }}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 360 }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 1, delay: item.delay },
        scale: { duration: 1, delay: item.delay },
        rotate: { duration: item.duration * 2, repeat: Infinity, ease: 'linear' },
      }}
    />
  );
}

function EnergyRibbon({ item }: { item: DecorItem }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: item.left,
        top: item.top,
        width: item.size * 3,
        height: 1,
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
      }}
      initial={{ opacity: 0, scaleX: 0, rotate: item.rotate }}
      whileInView={{ opacity: 1, scaleX: 1, rotate: [item.rotate, item.rotate + 8, item.rotate] }}
      viewport={{ once: true }}
      transition={{
        opacity: { duration: 1.2, delay: item.delay },
        scaleX: { duration: 1.2, delay: item.delay },
        rotate: { duration: item.duration, repeat: Infinity, ease: 'easeInOut' },
      }}
    />
  );
}

export function SectionDecor({ variant }: { variant: Variant }) {
  const items = useMemo(() => {
    switch (variant) {
      case 'cubes':
        return makeItems(5, 1.1);
      case 'shards':
        return makeItems(6, 2.3);
      case 'rings':
        return makeItems(4, 3.7);
      case 'spheres':
        return makeItems(5, 4.9);
      case 'ribbons':
        return makeItems(4, 5.5);
      default:
        return makeItems(4, 1);
    }
  }, [variant]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Volumetric fog */}
      <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-white/[0.015] blur-[100px]" />
      <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-white/[0.015] blur-[100px]" />

      {/* Light beams */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {variant === 'cubes' &&
        items.map((it, i) => <FloatingShard key={i} item={it} kind={0} />)}
      {variant === 'shards' &&
        items.map((it, i) => <FloatingShard key={i} item={it} kind={(i % 2) + 1} />)}
      {variant === 'rings' && items.map((it, i) => <HoloRing key={i} item={it} />)}
      {variant === 'spheres' && items.map((it, i) => <ChromeSphere key={i} item={it} />)}
      {variant === 'ribbons' && items.map((it, i) => <EnergyRibbon key={i} item={it} />)}
    </div>
  );
}
