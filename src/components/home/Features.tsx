import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { STAND_OUT, STAND_OUT_INTRO } from '../../data/content';

/** "What Makes Us Stand Out" — the 9 differentiators from the WordPress site. */
const Features = () => (
  <section id="why" className="border-y border-line bg-surface-2 section">
    <div className="container-custom">
      <SectionHeading
        eyebrow="What makes us"
        title={
          <>
            What makes us <span className="gradient-text">stand out</span>
          </>
        }
        description={STAND_OUT_INTRO}
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {STAND_OUT.map(({ title, description, image }, i) => (
          <Reveal key={title} delay={(i % 3) * 0.06}>
            <article className="surface group flex h-full items-start gap-4 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/40 sm:gap-5 sm:p-5">
              <img
                src={image}
                alt={title}
                loading="lazy"
                decoding="async"
                className="h-20 w-20 shrink-0 rounded-xl object-cover sm:h-24 sm:w-24"
              />
              <div className="min-w-0 py-0.5">
                <h3 className="text-sm font-bold leading-snug text-fg sm:text-base">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
