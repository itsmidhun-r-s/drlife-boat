import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { VALUES, VALUES_INTRO } from '../../data/home';

const Values = () => (
  <section id="values" className="section">
    <div className="container-custom">
      <SectionHeading eyebrow="Our values" title={<>Our <span className="gradient-text">Values</span></>} description={VALUES_INTRO} />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        {VALUES.map(({ icon: Icon, title, description, tint }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <article className="surface surface-hover relative h-full overflow-hidden p-7">
              <span aria-hidden className="absolute right-5 top-3 font-display text-6xl font-extrabold text-fg/[0.05]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`grid h-12 w-12 place-items-center rounded-xl text-ink-950 ${tint}`}>
                <Icon className="h-6 w-6" aria-hidden />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Values;
