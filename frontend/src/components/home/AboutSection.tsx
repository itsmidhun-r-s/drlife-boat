import { Quote } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';

const AboutSection = () => (
  <section className="py-20">
    <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <SectionHeading
          align="left"
          eyebrow="About us"
          title={
            <>
              Guided by an <span className="text-primary">internationally trained</span> doctor
            </>
          }
        />
        <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-400">
          <p>
            <span className="font-semibold text-white">Dr. Lifeboat</span> is an internationally
            trained medical graduate with vast teaching experience in AMC, PLAB and FMGE pathways.
            With a strong understanding of exam psychology, pattern trends, and student struggles,
            Dr. Lifeboat has mentored hundreds of students to success — especially those who have
            faced multiple setbacks.
          </p>
          <p>
            That is why we provide high-quality, exam-focused preparation material, interactive
            quizzes to reinforce learning, performance analytics to track your progress, and expert
            mentorship and support to guide you every step of the way.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <figure className="surface relative p-8 md:p-10">
          <Quote className="h-10 w-10 text-primary/40" aria-hidden />
          <blockquote className="mt-4 font-display text-xl font-semibold leading-snug text-white md:text-2xl">
            Our goal is to rescue committed students from cycles of repeated failure and guide them
            to their final destination —{' '}
            <span className="gradient-text">SUCCESS</span>.
          </blockquote>
          <figcaption className="mt-6 text-sm text-slate-500">— The DrLifeBoat mission</figcaption>
        </figure>
      </Reveal>
    </div>
  </section>
);

export default AboutSection;
