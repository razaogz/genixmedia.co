'use client';

import { motion } from 'framer-motion';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

export function About() {
  return (
    <section id="about" className="relative py-32 sm:py-40">
      <SectionDecor variant="cubes" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="About Genix"
              align="left"
              title={
                <>
                  BUILT FOR THE DIGITAL SIDE OF BUSINESS
                  <br />
                  <span className="text-gradient-white">
                    
                  </span>
                </>
              }
            />
            <SectionReveal delay={0.2}>
              <p className="mt-8 text-lg text-white/60">
                Genix helps businesses build, grow, and manage their digital presence through software, growth operations, and digital asset & reputation management.
              </p>
            </SectionReveal>
            <SectionReveal delay={0.3}>
              <p className="mt-4 text-lg text-white/60">
                From building intelligent SaaS and automation systems to driving customer acquisition and solving complex platform challenges, we bring multiple digital capabilities together under one roof.

               
                
              </p>
            </SectionReveal>
          </div>

          <div className="relative h-[400px] sm:h-[500px]">
            {/* Floating 3D cubes */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${[10, 60, 30, 70][i]}%`,
                  top: `${[10, 30, 55, 65][i]}%`,
                  width: `${[96, 64, 80, 56][i]}px`,
                  height: `${[96, 64, 80, 56][i]}px`,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 }}
              >
                <motion.div
                  animate={{ rotateX: 360, rotateY: 360 }}
                  transition={{ duration: 20 + i * 4, repeat: Infinity, ease: 'linear' }}
                  style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%' }}
                >
                  <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
                    {[
                      { transform: 'translateZ(40px)', bg: 'rgba(255,255,255,0.06)' },
                      { transform: 'rotateY(180deg) translateZ(40px)', bg: 'rgba(255,255,255,0.05)' },
                      { transform: 'rotateY(90deg) translateZ(40px)', bg: 'rgba(255,255,255,0.04)' },
                      { transform: 'rotateY(-90deg) translateZ(40px)', bg: 'rgba(255,255,255,0.04)' },
                      { transform: 'rotateX(90deg) translateZ(40px)', bg: 'rgba(255,255,255,0.07)' },
                      { transform: 'rotateX(-90deg) translateZ(40px)', bg: 'rgba(255,255,255,0.03)' },
                    ].map((face, fi) => (
                      <div
                        key={fi}
                        className="absolute inset-0 rounded-lg border border-white/10"
                        style={{ transform: face.transform, background: face.bg }}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}

            {/* Chrome sphere */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              animate={{
                background: [
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 60%, transparent)',
                  'radial-gradient(circle at 70% 70%, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 60%, transparent)',
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), rgba(255,255,255,0.02) 60%, transparent)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
            />

            {/* Holographic rings */}
            <motion.div
              className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              style={{ borderStyle: 'dashed' }}
            />
            <motion.div
              className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ borderStyle: 'dashed' }}
            />

            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[80px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
