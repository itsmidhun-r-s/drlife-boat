import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import FaqAccordion from '../components/common/FaqAccordion';
import Reveal from '../components/common/Reveal';
import { buttonVariants } from '../components/common/buttonVariants';
import AnnouncementBar from '../components/home/AnnouncementBar';
import Hero from '../components/home/Hero';
import AboutIntro from '../components/home/AboutIntro';
import WhatWeDo from '../components/home/WhatWeDo';
import WhatWeOffer from '../components/home/WhatWeOffer';
import AdaptiveTest from '../components/home/AdaptiveTest';
import AustraliaBand from '../components/home/AustraliaBand';
import OurFeatures from '../components/home/OurFeatures';
import Values from '../components/home/Values';
import Services from '../components/home/Services';
import CTA from '../components/home/CTA';
import CourseGrid from '../components/courses/CourseGrid';
import ResultCard from '../components/blog/ResultCard';
import { COURSES, COURSES_INTRO } from '../data/courses';
import { RESULTS } from '../data/results';
import { FAQS } from '../data/faq';

const Home = () => (
  <>
    <SEO />
    <AnnouncementBar />
    <Hero />
    <AboutIntro />
    <WhatWeDo />
    <WhatWeOffer />

    {/* Courses */}
    <section id="courses" className="section border-y border-line bg-surface-2">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Most in demand courses"
          title={<>Our <span className="gradient-text">Courses</span></>}
          description={COURSES_INTRO}
        />
        <div className="mt-12">
          <CourseGrid courses={COURSES} />
        </div>
        <div className="mt-10 text-center">
          <Link to="/courses" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            Browse all courses <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>

    <AdaptiveTest />
    <AustraliaBand />
    <OurFeatures />
    <Values />
    <Services />

    {/* Results */}
    <section className="section">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our testimonials"
          title={<>Our students are <span className="gradient-text">clearing AMC 1</span></>}
          description="Congratulations to our online and offline students on their results."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {RESULTS.slice(0, 3).map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.07}>
              <ResultCard result={r} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/blogs" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            View all results <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="section border-t border-line bg-surface-2">
      <div className="container-custom max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={<>Frequently asked <span className="gradient-text">questions</span></>} />
        <div className="mt-10">
          <FaqAccordion items={FAQS.slice(0, 4)} />
        </div>
        <div className="mt-8 text-center">
          <Link to="/faq" className={buttonVariants({ variant: 'outline' })}>
            Everything about the AMC exam
          </Link>
        </div>
      </div>
    </section>

    <CTA />
  </>
);

export default Home;
