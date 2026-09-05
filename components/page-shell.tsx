import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
