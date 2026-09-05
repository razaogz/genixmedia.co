import './globals.css';
import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { SmoothScroll } from '@/components/smooth-scroll';
import { LoadingScreen } from '@/components/loading-screen';

export const metadata: Metadata = {
  title: 'Genix Media — Digital Reputation Management & Social Media Solutions',
  description:
    'Genix Media is a premium Digital Reputation Management & Social Media Solutions company helping creators, brands, businesses, and public figures protect, recover, optimize, and grow their online presence.',
  icons: {
    icon: '/favicon.jpg',
    shortcut: '/favicon.jpg',
    apple: '/favicon.jpg',
  },
  openGraph: {
    title: 'Genix Media — Digital Reputation Management & Social Media Solutions',
    description:
      'We help individuals, creators, influencers, brands, businesses, and public figures protect, recover, optimize, and grow their online presence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Genix Media',
    description: 'Digital Reputation Management & Social Media Solutions.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <LoadingScreen />
        <SmoothScroll />
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
