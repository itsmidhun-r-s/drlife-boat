import { Quote } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { ABOUT_PARAGRAPHS } from '../../data/content';

const AboutSection = () => (
  <section className="section">
    <div className="container-custom grid items-center gap-12 lg:grid-cols-2 grid-cols-1">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow="About us"
          title={
            <>
              About <span className="gradient-text">Us</span>
            </>
          }
        />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i}>
              {i === 0 ? (
                <>
                  <span className="font-semibold text-fg">Dr. Lifeboat</span>
                  {p.replace('Dr. Lifeboat', '')}
                </>
              ) : (
                p
              )}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <figure className="surface relative overflow-hidden">
          <img src="/images/site/doctor.jpg" alt="Doctor with a stethoscope" loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
          <div className="relative p-8 md:p-10">
          <Quote className="h-10 w-10 text-accent/40" aria-hidden />
          <blockquote className="mt-4 font-display text-xl font-semibold leading-snug text-fg md:text-2xl">
            Our goal is to rescue committed students from cycles of repeated failure and guide them
            to their final destination — <span className="gradient-text">SUCCESS</span>.
          </blockquote>
          <figcaption className="mt-6 text-sm text-subtle">— Dr. Lifeboat</figcaption>
          </div>
        </figure>
      </Reveal>
    </div>
  </section>
);

export default AboutSection;
