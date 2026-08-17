import { PageShell } from '@/components/page-shell';
import { Portfolio } from '@/components/portfolio';
import { Testimonials } from '@/components/testimonials';

export default function PortfolioPage() {
  return (
    <PageShell>
      <div className="pt-20" />
      <Portfolio />
      <Testimonials />
    </PageShell>
  );
}
