import { Navbar } from '@/components/navbar';
import { IntroSection } from '@/components/intro-section';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Solutions } from '@/components/solutions';
import { Statistics } from '@/components/statistics';
import { Testimonials } from '@/components/testimonials';
import { FAQ } from '@/components/faq';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <>
      <IntroSection />
      <Navbar />
      <Hero />
      <About />
      <Solutions />
      <Statistics />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
