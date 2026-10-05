import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { OUR_FEATURES, OUR_FEATURES_INTRO } from '../../data/home';

const OurFeatures = () => (
  <section id="why" className="section border-y border-line bg-surface-2">
    <div className="container-custom">
      <SectionHeading eyebrow="Our features" title={<>Our <span className="gradient-text">Features</span></>} description={OUR_FEATURES_INTRO} />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1">
        {OUR_FEATURES.map(({ icon: Icon, title, description }, i) => (
          <Reveal key={title} delay={(i % 4) * 0.05}>
            <article className="surface surface-hover h-full p-5">
              <span className="icon-tile">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-base font-bold leading-snug">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default OurFeatures;
