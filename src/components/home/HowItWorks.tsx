import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { AMC_STEPS } from '../../data/content';

/** The 6-step AMC registration path (from the original FAQ page). */
const HowItWorks = () => (
  <section className="section">
    <div className="container-custom">
      <SectionHeading
        eyebrow="The AMC pathway"
        title={
          <>
            Steps to becoming a <span className="gradient-text">registered doctor</span> in Australia
          </>
        }
        description="A structured pathway guided by the Australian Medical Council and the Medical Board of Australia."
      />

      <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {AMC_STEPS.map((step, i) => (
          <Reveal key={step} delay={(i % 3) * 0.07}>
            <li className="surface flex h-full items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 font-display text-lg font-bold text-accent">
                {i + 1}
              </span>
              <span className="pt-2 text-sm font-medium leading-snug text-fg-soft">{step}</span>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
