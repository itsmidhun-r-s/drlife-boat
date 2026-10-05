import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import FaqAccordion from '../components/common/FaqAccordion';
import { buttonVariants } from '../components/common/buttonVariants';
import { FAQS } from '../data/content';

const FAQ = () => (
  <>
    <SEO title="FAQs" description="Answers to common questions about DrLifeBoat's AMC, PLAB and FMGE preparation." />
    <PageHeader
      eyebrow="FAQ"
      title="Frequently asked questions"
      description="Can't find what you are looking for? Reach out and we'll help."
    />
    <section className="py-14">
      <div className="container-custom max-w-3xl">
        <FaqAccordion items={FAQS} />
        <div className="surface mt-10 flex flex-col items-center gap-4 p-8 text-center">
          <h2 className="text-xl font-semibold">Still have questions?</h2>
          <p className="text-sm text-slate-400">Talk to an expert — we usually reply quickly.</p>
          <Link to="/contact" className={buttonVariants()}>
            Contact us
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default FAQ;
