import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { FEATURES } from '../../data/content';

const Features = () => (
  <section className="border-y border-white/5 bg-ink-900/40 py-20">
    <div className="container-custom">
      <SectionHeading
        eyebrow="Why DrLifeBoat"
        title={
          <>
            Everything you need to <span className="text-primary">pass with confidence</span>
          </>
        }
        description="We offer more than just classes — a comprehensive, student-centric learning experience built to help you clear the exam."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map(({ icon: Icon, title, description }, i) => (
          <Reveal key={title} delay={(i % 4) * 0.06}>
            <div className="surface group h-full p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-ink-950">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="text-base font-semibold leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
