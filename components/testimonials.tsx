'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'Founder, Nebula Labs',
    text: 'Genix Media helped me recover my online reputation after a difficult moment. They handled everything with discretion and professionalism, and within weeks the narrative shifted. Truly world-class.',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Marcus Rivera',
    role: 'Creator, Lumen Co.',
    text: 'My social accounts were restricted and I felt powerless. Genix guided me through every step of the recovery process and restored my presence. I finally have peace of mind.',
    avatar: 'https://images.pexels.com/photos/220457/pexels-photo-220457.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Priya Sharma',
    role: 'Public Figure, Orbit Group',
    text: 'Working with Genix feels like having a dedicated reputation team in your corner. Their strategic guidance transformed how I appear online and gave me real confidence.',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'James Okonkwo',
    role: 'CEO, Vertex Ventures',
    text: 'From the first call, their team understood the sensitivity of our situation. They protected our brand, resolved our social media issues, and stayed with us long after. A genuine long-term partner.',
    avatar: 'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Sofia Lindqvist',
    role: 'Influencer, Aurora Media',
    text: 'Genix doesn\'t just fix problems—they elevate your entire digital presence. The trust they rebuilt around my name is something I carry every day. This is what premium support looks like.',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  return (
    <section id="testimonials" className="relative py-32 sm:py-40">
      <SectionDecor variant="spheres" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={
            <>
              Trusted By
              <br />
              <span className="text-gradient-white">Those Who Value Trust.</span>
            </>
          }
          subtitle="What creators, founders, and public figures say about trusting Genix Media."
        />

        <SectionReveal delay={0.2}>
          <div className="relative mx-auto mt-16 max-w-3xl">
            <div className="relative h-[340px] sm:h-[300px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full border-b border-white/10 pb-8">
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={18} className="fill-white text-white" />
                      ))}
                    </div>

                    <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
                      &ldquo;{TESTIMONIALS[index].text}&rdquo;
                    </p>

                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                        <img
                          src={TESTIMONIALS[index].avatar}
                          alt={TESTIMONIALS[index].name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{TESTIMONIALS[index].name}</div>
                        <div className="text-sm text-white/40">{TESTIMONIALS[index].role}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-8 bg-white' : 'w-2 bg-white/20'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
