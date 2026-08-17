import { notFound } from 'next/navigation';
import { SolutionDetail } from '@/components/solution-detail';
import { SOLUTION_BY_SLUG } from '@/lib/site-config';

export default function Page() {
  const solution = SOLUTION_BY_SLUG('digital-assets');
  if (!solution) notFound();
  return <SolutionDetail solution={solution} />;
}
