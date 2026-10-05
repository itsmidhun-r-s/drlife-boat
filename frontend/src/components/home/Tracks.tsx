import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { TRACKS } from '../../data/content';

const Tracks = () => (
  <section className="py-20">
    <div className="container-custom">
      <SectionHeading
        eyebrow="Choose your pathway"
        title={
          <>
            One platform, <span className="text-primary">three exam pathways</span>
          </>
        }
        description="Pick the exam you are preparing for and follow a curriculum designed around it."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {TRACKS.map((track, i) => (
          <Reveal key={track.code} delay={i * 0.08}>
            <Link
              to={`/courses?q=${track.code}`}
              className="surface group relative flex h-full flex-col overflow-hidden p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/40"
            >
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:bg-primary/20"
              />
              <span className="font-display text-4xl font-extrabold text-primary">{track.code}</span>
              <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">{track.name}</p>
              <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-400">
                {track.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                View {track.code} courses
                <ArrowUpRight className="h-4 w-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Tracks;
