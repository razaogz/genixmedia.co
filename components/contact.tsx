'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { SectionReveal, SectionHeader } from '@/components/section-utils';
import { supabase } from '@/lib/supabase';
import { SectionDecor } from '@/components/section-decor';

const SOCIALS = [
  {
    label: 'Instagram',
    value: '@genixmedia',
    href: 'https://instagram.com/genixmediaco',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'X',
    value: '@genixmedia_co',
    href: 'https://x.com/genixmedia_co',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'Genix Media',
    href: 'https://linkedin.com',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'sales@genixmedia.co',
    href: 'mailto:sales@genixmedia.co',
    icon: <Mail size={20} />,
  },
  {
    label: 'Location',
    value: 'Worldwide',
    href: '#',
    icon: <MapPin size={20} />,
  },
];

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    business: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name,
        email: form.email,
        company: form.company || null,
        business: form.business || null,
        message: form.message,
      });
      if (error) throw error;
      setStatus('success');
      setForm({ name: '', email: '', company: '', business: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'company', label: 'Company', type: 'text', required: false },
    { name: 'business', label: 'Business', type: 'text', required: false },
  ] as const;

  return (
    <section id="contact" className="relative py-32 sm:py-40">
      <SectionDecor variant="cubes" />
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title={
            <>
              Let&apos;s Protect &amp; Grow
              <br />
              <span className="text-gradient-white">Your Digital Presence.</span>
            </>
          }
          subtitle="Whether you need help managing your reputation, solving social media challenges, or strengthening your online brand, our team is ready to help. Get in touch today and let's build a stronger digital future together."
        />

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Form */}
          <SectionReveal>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                      {f.label}
                      {f.required && <span className="text-white/60">*</span>}
                    </label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.name as keyof typeof form]}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [f.name]: e.target.value }))
                      }
                      className="w-full border-b border-white/10 bg-transparent pb-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/40"
                      placeholder={f.label}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-white/40">
                  Message<span className="text-white/60">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="w-full resize-none border-b border-white/10 bg-transparent pb-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-white/40"
                  placeholder="Tell us about your situation..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
                {status === 'success' && <CheckCircle2 size={16} />}
                {status === 'idle' && <Send size={16} />}
                {status === 'success'
                  ? 'Message Sent'
                  : status === 'error'
                  ? 'Try Again'
                  : 'Send Message'}
              </button>

              {status === 'error' && (
                <p className="text-sm text-white/50">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </SectionReveal>

          {/* Socials */}
          <SectionReveal delay={0.15}>
            <div className="space-y-1">
              <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">
                Connect
              </p>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 border-b border-white/5 py-5 transition-colors hover:border-white/20"
                >
                  <span className="text-white/50 transition-colors group-hover:text-white">
                    {s.icon}
                  </span>
                  <div className="flex-1">
                    <div className="text-xs uppercase tracking-[0.15em] text-white/40">
                      {s.label}
                    </div>
                    <div className="text-base text-white/80 transition-colors group-hover:text-white">
                      {s.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
