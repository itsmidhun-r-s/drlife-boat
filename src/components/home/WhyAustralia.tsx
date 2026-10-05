import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { WHY_AUSTRALIA } from '../../data/content';

const WhyAustralia = () => (
  <section className="section">
    <div className="container-custom">
      <SectionHeading
        eyebrow="Why Australia"
        title={
          <>
            Why become a <span className="gradient-text">Registered Doctor</span> in Australia?
          </>
        }
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3 grid-cols-1">
        {WHY_AUSTRALIA.map((s, i) => (
          <Reveal key={s.value} delay={i * 0.08}>
            <div className="surface h-full p-6 text-center lg:p-8">
              <p className="gradient-text font-display text-4xl font-extrabold lg:text-5xl">{s.value}</p>
              <p className="mx-auto mt-3 max-w-[16rem] text-sm leading-relaxed text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WhyAustralia;
