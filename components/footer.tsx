'use client';

import { useState } from 'react';
import { ArrowUpRight, Send } from 'lucide-react';
import { GenixLogo } from '@/components/genix-logo';

const FOOTER_LINKS: Record<string, { label: string; href: string }[]> = {
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' },
  ],
  Solutions: [
    { label: 'Reputation Management', href: '#services' },
    { label: 'Brand Protection', href: '#services' },
    { label: 'Account Recovery Guidance', href: '#services' },
    { label: 'Crisis Management', href: '#services' },
  ],
  Services: [
    { label: 'Online Presence Optimization', href: '#services' },
    { label: 'Personal Branding', href: '#services' },
    { label: 'Verification Consulting', href: '#services' },
    { label: 'Digital Advisory', href: '#services' },
  ],
  Resources: [
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Why Genix', href: '#why' },
  ],
};

const SOCIALS = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/genixmediaco',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/genixmedia_co',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNav = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/10 pt-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-4">
            <GenixLogo className="h-10" />
            <p className="mt-6 max-w-sm text-sm text-white/40">
              A premium Digital Reputation Management &amp; Social Media
              Solutions company helping individuals, brands, and public
              figures protect, recover, and grow their online presence.
            </p>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                Newsletter
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) {
                    setSubscribed(true);
                    setEmail('');
                    setTimeout(() => setSubscribed(false), 3000);
                  }
                }}
                className="mt-3 flex max-w-sm items-center gap-2 border-b border-white/10 pb-2"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
                />
                <button
                  type="submit"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
                  aria-label="Subscribe"
                >
                  {subscribed ? <span className="text-xs">✓</span> : <Send size={14} />}
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-xs text-white/60">Subscribed. Welcome aboard.</p>
              )}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-xs uppercase tracking-[0.2em] text-white/40">
                  {title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {links.map((l) => (
                    <li key={l.label}>
                      <button
                        onClick={() => handleNav(l.href)}
                        className="group flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-white"
                      >
                        {l.label}
                        <ArrowUpRight
                          size={12}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Socials row */}
        <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-white/10 py-8">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition-colors hover:border-white/30 hover:text-white"
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Genix Media. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Trust. Innovation. Lasting digital partnerships.
          </p>
        </div>
      </div>
    </footer>
  );
}
