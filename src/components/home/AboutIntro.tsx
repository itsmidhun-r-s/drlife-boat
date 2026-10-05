import { Quote } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { ABOUT_PARAGRAPHS } from '../../data/content';
import { CEO_LETTER } from '../../data/home';

/** "About Us" + the CEO's letter to students. */
const AboutIntro = () => (
  <section id="about" className="section">
    <div className="container-custom grid items-start gap-10 lg:grid-cols-2 lg:gap-14 grid-cols-1">
      <Reveal>
        <SectionHeading align="left" eyebrow="About us" title={<>About <span className="gradient-text">Us</span></>} />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
          {ABOUT_PARAGRAPHS.map((p, i) => (
            <p key={i}>
              {i === 0 ? (
                <>
                  <strong className="font-semibold text-fg">Dr. Lifeboat</strong>
                  {p.replace('Dr. Lifeboat', '')}
                </>
              ) : (
                p
              )}
            </p>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <figure className="surface relative overflow-hidden bg-gradient-to-br from-surface to-tint-cream/60 p-7 md:p-9">
          <Quote className="h-9 w-9 text-primary/60" aria-hidden />
          <figcaption className="sr-only">Letter from the CEO</figcaption>
          <h3 className="mt-3 text-xl font-bold">{CEO_LETTER.greeting}</h3>
          <div className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-muted">
            {CEO_LETTER.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-6 border-t border-line pt-5 font-display text-base font-bold text-fg">{CEO_LETTER.signoff}</p>
        </figure>
      </Reveal>
    </div>
  </section>
);

export default AboutIntro;
