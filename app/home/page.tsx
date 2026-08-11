import { Navbar } from '@/components/navbar';
import { IntroSection } from '@/components/intro-section';
import { Hero } from '@/components/hero';
import { About } from '@/components/about';
import { Services } from '@/components/services';
import { WhyChooseUs } from '@/components/why-choose-us';
import { Statistics } from '@/components/statistics';
import { Process } from '@/components/process';
import { Portfolio } from '@/components/portfolio';
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
      <Services />
      <WhyChooseUs />
      <Statistics />
      <Process />
      <Portfolio />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
