import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { SERVICES } from '../../data/home';

const Services = () => (
  <section className="section border-t border-line bg-surface-2">
    <div className="container-custom">
      <SectionHeading eyebrow={SERVICES.eyebrow} title={<>{SERVICES.title.replace(' Exam Preparation!', '')} <span className="gradient-text">Exam Preparation!</span></>} />

      <div className="mt-12 grid gap-5 md:grid-cols-3 grid-cols-1">
        {SERVICES.items.map(({ icon: Icon, title, description }, i) => (
          <Reveal key={title} delay={i * 0.07}>
            <article className="surface surface-hover h-full p-7 text-center">
              <span className="icon-tile mx-auto h-14 w-14">
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

export default Services;
