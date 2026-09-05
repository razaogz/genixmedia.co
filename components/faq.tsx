'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { SectionDecor } from '@/components/section-decor';

const FAQS = [
  {
    q: 'What is reputation management?',
    a: 'Reputation management is the practice of monitoring, protecting, and strengthening how you appear online. We audit your digital footprint, address harmful or inaccurate content, and build a credible, trusted presence across search, social, and review platforms.',
  },
  {
    q: 'How can Genix Media help with social media issues?',
    a: 'We help resolve account restrictions, platform challenges, impersonation, negative sentiment, and content issues. From recovery guidance to crisis response, we provide strategic, hands-on support tailored to your situation.',
  },
  {
    q: 'Do you work with businesses and individuals?',
    a: 'Yes. We work with creators, influencers, brands, businesses, and public figures. Every engagement is shaped around your specific identity, goals, and the reputation challenges you face.',
  },
  {
    q: 'Can you help improve my online presence?',
    a: 'Absolutely. We optimize your profiles, content, and visibility so the right people find the right story about you. Our goal is a stronger, more trusted digital identity that supports your long-term growth.',
  },
  {
    q: 'Do you offer personalized solutions?',
    a: 'Every engagement is tailored. We do not sell templates—we architect solutions specific to your goals, audience, and the reputation or social challenges you are navigating.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Yes. We operate across 20+ countries and work with clients worldwide. Our process is fully remote-friendly and async-capable across time zones.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-32 sm:py-40">
      <SectionDecor variant="rings" />
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeader
          eyebrow="FAQ"
          title={
            <>
              Questions,
              <br />
              <span className="text-gradient-white">Answered.</span>
            </>
          }
        />

        <SectionReveal delay={0.2}>
          <Accordion
            type="single"
            collapsible
            className="mt-12 space-y-2"
            defaultValue="item-0"
          >
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="overflow-hidden rounded-lg border border-white/10 px-6 transition-colors data-[state=open]:border-white/20"
              >
                <AccordionTrigger className="py-6 text-left text-lg font-medium text-white hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-white/50">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
