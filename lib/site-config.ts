export const SITE_CONFIG = {
  email: 'sales@genixmedia.co',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '',
  phone: process.env.NEXT_PUBLIC_PHONE || '',
};

export const SOLUTIONS = [
  {
    slug: 'digital-assets',
    eyebrow: 'Assets',
    title: 'Digital Asset Management',
    short: 'Digital Asset Management',
    icon: 'LifeBuoy',
    desc: 'Protecting, recovering, and strengthening your digital presence.',
    services: [
      { icon: 'LifeBuoy', label: 'Account Recovery', desc: 'Support for disabled, compromised, restricted, or inaccessible accounts.' },
      { icon: 'BadgeCheck', label: 'Verification Services', desc: 'Guidance and legitimate assistance with platform verification processes.' },
      { icon: 'AtSign', label: 'Username & Digital Asset Services', desc: 'Assistance involving usernames and other valuable digital identity assets.' },
      { icon: 'ShieldCheck', label: 'Brand & Reputation Protection', desc: 'Help with impersonation, reputation issues, platform disputes, and protecting your digital brand.' },
    ],
  },
  {
    slug: 'reputation',
    eyebrow: 'Reputation',
    title: 'PR & Reputation',
    short: 'PR & Reputation',
    icon: 'ShieldCheck',
    desc: 'Managing public perception, media relations, and brand trust.',
    services: [
      { icon: 'ShieldCheck', label: 'Brand & Reputation Protection', desc: 'Proactive monitoring and response to protect your brand image across platforms.' },
      { icon: 'Megaphone', label: 'PR & Media Relations', desc: 'Strategic communications and media outreach to shape your public narrative.' },
      { icon: 'BadgeCheck', label: 'Crisis Management', desc: 'Rapid response frameworks for reputation-threatening situations.' },
      { icon: 'Share2', label: 'Narrative & Content', desc: 'Crafting the stories and content that define how your business is perceived.' },
    ],
  },
  {
    slug: 'growth',
    eyebrow: 'Growth',
    title: 'Growth & Acquisition',
    short: 'Marketing & Acquisition',
    icon: 'TrendingUp',
    desc: 'Customer acquisition built around measurable growth.',
    services: [
      { icon: 'Megaphone', label: 'Paid Media', desc: 'Performance-focused campaigns across Meta and other relevant advertising platforms.' },
      { icon: 'Share2', label: 'Social Media & Content', desc: 'Strategy, content creation, and management designed to build attention and demand.' },
      { icon: 'Target', label: 'Lead Generation', desc: 'Systems and campaigns engineered to generate qualified opportunities.' },
      { icon: 'TrendingUp', label: 'Growth Strategy', desc: 'Connecting acquisition, conversion, and retention into one scalable growth system.' },
    ],
  },
  {
    slug: 'technology',
    eyebrow: 'Technology',
    title: 'SaaS & Software',
    short: 'SaaS & Software',
    icon: 'Workflow',
    desc: 'Technology that turns repetitive operations into scalable systems.',
    services: [
      { icon: 'Bot', label: 'AI Lead Systems', desc: 'Capture, qualify, route, and follow up with leads automatically.' },
      { icon: 'PhoneCall', label: 'AI Voice & Scheduling', desc: 'AI-powered calling, qualification, appointment booking, and customer interactions.' },
      { icon: 'Workflow', label: 'CRM & Sales Automation', desc: 'Automated pipelines, follow-ups, reminders, and lead management.' },
      { icon: 'LayoutGrid', label: 'SaaS Solutions', desc: 'Purpose-built software for recurring business and operational challenges.' },
    ],
  },
] as const;

export const SOLUTION_BY_SLUG = (slug: string) =>
  SOLUTIONS.find((s) => s.slug === slug);

export type Solution = (typeof SOLUTIONS)[number];
