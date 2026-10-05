import { Check, Eye, Rocket } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { MISSION, VISION } from '../../data/content';

const VisionMission = () => (
  <section id="vision" className="border-y border-line bg-surface-2 section">
    <div className="container-custom">
      <SectionHeading
        eyebrow="Our goals"
        title={
          <>
            Our <span className="gradient-text">Vision</span> &amp; Mission
          </>
        }
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2 grid-cols-1">
        <Reveal>
          <article className="surface h-full overflow-hidden">
            <img src="/images/site/vision.jpg" alt="" loading="lazy" decoding="async" className="aspect-[16/8] w-full object-cover" />
            <div className="p-7 md:p-9">
              <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-accent">
                <Eye className="h-6 w-6" />
              </span>
              <h3 className="text-2xl font-bold">Our Vision</h3>
              <p className="mt-4 leading-relaxed text-muted">{VISION}</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="surface h-full overflow-hidden">
            <img src="/images/site/mission.jpg" alt="" loading="lazy" decoding="async" className="aspect-[16/8] w-full object-cover" />
            <div className="p-7 md:p-9">
            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-accent">
              <Rocket className="h-6 w-6" />
            </span>
            <h3 className="text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 leading-relaxed text-muted">{MISSION.intro}</p>
            <ul className="mt-4 space-y-2.5">
              {MISSION.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-fg-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm leading-relaxed text-muted">{MISSION.outro}</p>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  </section>
);

export default VisionMission;
