'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { GenixLogo } from '@/components/genix-logo';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 120 && y > lastY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="fixed left-1/2 top-6 z-50 -translate-x-1/2"
    >
      <div
        className={cn(
          'flex w-max items-center gap-2 rounded-full bg-transparent px-4 py-2 transition-all duration-500'
        )}
      >
        <button
          onClick={() => handleNav('#home')}
          className="flex items-center pl-1"
          aria-label="Genix Media home"
        >
          <GenixLogo className="h-7" />
        </button>

        <div className="mx-1 hidden h-6 w-px bg-white/10 lg:block" />

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="group relative rounded-full px-3 py-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              {link.label}
              <span className="absolute inset-x-3 bottom-0.5 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
            </button>
          ))}
        </div>

        <div className="mx-1 hidden h-6 w-px bg-white/10 lg:block" />

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-white/50 transition-colors hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>

        <button
          onClick={() => handleNav('#contact')}
          className="hidden rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-black transition-opacity hover:opacity-90 lg:block"
        >
          Let&apos;s Talk
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-white/80 lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-1/2 top-full mt-2 w-[90vw] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-[#8b5cf6]/30 bg-[#050505]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 rounded-full bg-white py-2.5 text-sm font-semibold text-black"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
