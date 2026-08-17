'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
  ArrowRight,
} from 'lucide-react';
import { GenixLogo } from '@/components/genix-logo';
import { cn } from '@/lib/utils';
import { SOLUTIONS } from '@/lib/site-config';

const SOLUTION_ICONS: Record<string, typeof LifeBuoy> = {
  LifeBuoy,
  ShieldCheck,
  TrendingUp,
  Workflow,
};

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Solutions', href: '/solutions', mega: true },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 120 && y > lastY) setHidden(true);
      else setHidden(false);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center" aria-label="Genix Media home">
          <GenixLogo className="h-8" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) =>
            item.mega ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setMegaOpen(true)}
                onMouseLeave={() => setMegaOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    'group relative flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    isActive(item.href) ? 'text-white' : 'text-white/60 hover:text-white'
                  )}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={cn(
                      'transition-transform duration-300',
                      megaOpen && 'rotate-180'
                    )}
                  />
                  <span
                    className={cn(
                      'absolute inset-x-3 bottom-1 h-px origin-left bg-white transition-transform duration-300',
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
                <MegaMenu open={megaOpen} />
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'group relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
                  isActive(item.href) ? 'text-white' : 'text-white/60 hover:text-white'
                )}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute inset-x-3 bottom-1 h-px origin-left bg-white transition-transform duration-300',
                    isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 lg:inline-block"
          >
            Contact
          </Link>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-md p-2 text-white/80 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#050505]/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
              <div className="my-2 h-px bg-white/10" />
              <p className="px-3 pb-1 text-xs uppercase tracking-[0.2em] text-white/40">
                Solutions
              </p>
              {SOLUTIONS.map((s) => {
                const Icon = SOLUTION_ICONS[s.icon] ?? LifeBuoy;
                return (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    <Icon size={16} className="text-white/50" />
                    {s.title}
                  </Link>
                );
              })}
              <div className="my-2 h-px bg-white/10" />
              <Link
                href="/contact"
                className="mt-1 rounded-full bg-white py-3 text-center text-sm font-semibold text-black"
              >
                Contact
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function MegaMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute left-1/2 top-full -translate-x-1/2 pt-3"
        >
          <div className="w-[640px] overflow-hidden rounded-2xl border border-white/10 bg-[#0A0714]/95 p-2 shadow-2xl backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-1">
              {SOLUTIONS.map((s) => {
                const Icon = SOLUTION_ICONS[s.icon] ?? LifeBuoy;
                return (
                  <Link
                    key={s.slug}
                    href={`/solutions/${s.slug}`}
                    className="group flex items-start gap-3 rounded-xl p-4 transition-colors hover:bg-white/5"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/60 transition-colors group-hover:border-[#a855f7]/40 group-hover:text-white">
                      <Icon size={18} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-[0.15em] text-white/40">
                        {s.eyebrow}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-white">
                        {s.title}
                      </div>
                      <div className="mt-1 text-xs text-white/50 line-clamp-2">
                        {s.desc}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link
              href="/solutions"
              className="mt-1 flex items-center justify-between rounded-xl border-t border-white/5 px-4 py-3 text-sm text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              View all solutions
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
