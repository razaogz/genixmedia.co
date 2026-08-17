import { PageShell } from '@/components/page-shell';
import { About } from '@/components/about';
import { WhyChooseUs } from '@/components/why-choose-us';
import { Statistics } from '@/components/statistics';

export default function AboutPage() {
  return (
    <PageShell>
      <div className="pt-20" />
      <About />
      <WhyChooseUs />
      <Statistics />
    </PageShell>
  );
}
