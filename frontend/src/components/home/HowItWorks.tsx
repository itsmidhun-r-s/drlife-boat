import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { STEPS } from '../../data/content';

const HowItWorks = () => (
  <section className="py-20">
    <div className="container-custom">
      <SectionHeading
        eyebrow="How it works"
        title={
          <>
            From enrolment to <span className="text-primary">exam day</span> in three steps
          </>
        }
      />

      <ol className="relative mt-14 grid gap-8 md:grid-cols-3">
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-6 hidden h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent md:block"
        />
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 0.1}>
            <li className="relative text-center">
              <span className="relative z-10 mx-auto grid h-12 w-12 place-items-center rounded-full border border-primary/40 bg-ink-950 font-display text-lg font-bold text-primary">
                {i + 1}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
                {step.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </section>
);

export default HowItWorks;
