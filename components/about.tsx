'use client';

import { motion } from 'framer-motion';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';
import { EcosystemDiagram } from '@/components/ecosystem-diagram';

export function About() {
  return (
    <section id="about" className="relative py-32 sm:py-40">
      <SectionDecor variant="cubes" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="The Genix Ecosystem"
              align="left"
              title={
                <>
                  EVERY DIGITAL NEED.
                  <br />
                  <span className="text-gradient-white">ONE PARTNER</span>
                </>
              }
            />
            <SectionReveal delay={0.2}>
              <p className="mt-8 text-lg text-white/60">
                <span className="font-medium text-white">
                  Genix brings the essential digital capabilities of modern business under one roof.
                </span>{' '}
                From{' '}
                <span className="font-medium text-white">
                  digital asset management and PR
                </span>{' '}
                to{' '}
                <span className="font-medium text-white">
                  growth, software and SaaS
                </span>
                , we help businesses build, operate and scale their digital presence without having to manage multiple specialized partners.
              </p>
            </SectionReveal>
          </div>

          <SectionReveal delay={0.25}>
            <EcosystemDiagram />
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
