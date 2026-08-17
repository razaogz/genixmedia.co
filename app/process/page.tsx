import { PageShell } from '@/components/page-shell';
import { Process } from '@/components/process';
import { FAQ } from '@/components/faq';

export default function ProcessPage() {
  return (
    <PageShell>
      <div className="pt-20" />
      <Process />
      <FAQ />
    </PageShell>
  );
}
