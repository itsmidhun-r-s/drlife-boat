import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import FaqAccordion from '../components/common/FaqAccordion';
import { buttonVariants } from '../components/common/buttonVariants';
import Hero from '../components/home/Hero';
import Tracks from '../components/home/Tracks';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import AboutSection from '../components/home/AboutSection';
import CTA from '../components/home/CTA';
import { FAQS } from '../data/content';

const Home = () => (
  <>
    <SEO />
    <Hero />
    <Tracks />
    <Features />
    <HowItWorks />
    <AboutSection />

    <section className="pb-6 pt-4">
      <div className="container-custom max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-primary">answered</span>
            </>
          }
        />
        <div className="mt-10">
          <FaqAccordion items={FAQS.slice(0, 4)} />
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className={buttonVariants({ variant: 'outline' })}>
            See all FAQs
          </Link>
        </div>
      </div>
    </section>

    <CTA />
  </>
);

export default Home;
