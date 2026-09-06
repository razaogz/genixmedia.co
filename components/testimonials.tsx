'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const TESTIMONIALS = [
  {
    name: 'Mathis Kresko',
    role: 'Founder, Viralify',
    text: 'Genix helped us secure our agency’s preferred username across both Twitter and Instagram. They handled the process professionally, knew exactly how to approach it, and saved us a huge amount of time. Couldn’t be happier with the outcome.',
    avatar: 'https://i.ibb.co/gbxBJZFH/photo-2026-09-07-00-22-28.jpg',
  },
  {
    name: 'Keo',
    role: 'Only Fans Manager',
    text: 'Genix took a huge amount of work off our plate by handling our creator operations, content strategy, and social growth. Their team was organized, responsive, and genuinely focused on helping us build a stronger online presence.',
    avatar: 'https://i.ibb.co/Z6nNGsJF/746439889-17938637193312929-6192910546209565970-n.jpg',
  },
  {
    name: 'Bruce Mayers',
    role: 'CEO, Rabbt Media',
    text: 'The Speed is what i paid for XD',
    avatar: 'https://i.ibb.co/yBmWjv8d/2fecc0b36f56fb2d23c42f99e5b6fa0f.jpg',
  },
  {
    name: 'Judah Findley',
    role: 'Digital creator',
    text: 'helped us get our tax documents properly verified on our Facebook profile and guided us through the entire process until our payouts were finally released. He understood the issue, handled it professionally, and stayed involved until everything was resolved. Truly reliable and highly recommended.',
    avatar: 'https://i.ibb.co/fVTfvvS3/617240641-1308239404670991-4301149357452037082-n.jpg',
  },
  {
    name: 'Cedrick K.',
    role: 'Founder, Biggerz Casino',
    text: 'Our account was disabled unexpectedly, and we had no idea where to start. Genix handled the entire process professionally, kept us updated throughout, and helped us get our account back. Extremely smooth experience.',
    avatar: 'https://i.ibb.co/9HZ3PS0j/753540882-18021686828895394-4492161467556744415-n.jpg',
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
