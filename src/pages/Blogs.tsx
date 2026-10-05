import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import SectionHeading from '../components/common/SectionHeading';
import Reveal from '../components/common/Reveal';
import ResultCard from '../components/blog/ResultCard';
import { RESULTS, SPECIALITIES } from '../data/results';
import { cn } from '../utils/cn';
import eventPhoto1 from '../../assets/blogs/our events/spec1.jpg';
import eventPhoto2 from '../../assets/blogs/our events/spec2.jpg';
import eventPhoto3 from '../../assets/blogs/our events/spec3.jpg';
import eventPhoto4 from '../../assets/blogs/our events/spec4.jpg';
import eventPhoto5 from '../../assets/blogs/our events/spec5.jpg';

const FILTERS = ['All', 'Offline', 'Online'] as const;

const EVENT_PHOTOS = [
  { src: eventPhoto1, alt: 'Bright Dr. Lifeboat classroom with tables and teaching equipment' },
  { src: eventPhoto2, alt: 'A comfortable study and discussion space at Dr. Lifeboat' },
  { src: eventPhoto3, alt: 'Learning space with a partition and collaborative seating' },
  { src: eventPhoto4, alt: 'Dr. Lifeboat classroom arranged for group learning' },
  { src: eventPhoto5, alt: 'Medical teaching space with an anatomy model' }
];

const Blogs = () => {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');
  const list = RESULTS.filter((r) => filter === 'All' || r.mode === filter);

  return (
    <>
      <SEO title="Blogs" description="Congratulations to our online and offline students on clearing the AMC 1 examination." />
      <PageHeader
        eyebrow="Blogs"
        title={<>Our students&apos; <span className="gradient-text">success stories</span></>}
        description="Congratulations to our incredible students on clearing the AMC 1 examination."
      >
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter results">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                filter === f ? 'border-primary bg-primary text-ink-950' : 'border-line text-fg-soft hover:border-primary/50 hover:text-fg'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-custom grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {list.map((r, i) => (
            <Reveal key={r.slug} delay={(i % 3) * 0.06}>
              <ResultCard result={r} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-2 py-16">
        <div className="container-custom">
          <SectionHeading eyebrow="Our specialities" title={<>Our <span className="gradient-text">Specialities</span></>} />
          <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {SPECIALITIES.map(({ name, image }) => (
              <li
                key={name}
                className="surface flex flex-col items-center gap-3 p-4 text-center text-sm font-medium text-fg-soft"
              >
                <img
                  src={image}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 rounded-full object-cover"
                />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-16">
        <div className="container-custom">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3 flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Learning at Dr. Lifeboat
            </p>
            <h2 className="text-3xl font-bold">
              Our <span className="gradient-text">Events</span>
            </h2>
            <p className="mt-3 leading-relaxed text-muted">
              Discover the latest happenings at Dr. Lifeboat. Join our engaging events, interactive
              workshops, and medical symposiums that keep you updated on the medical field.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EVENT_PHOTOS.map(({ src, alt }) => (
              <figure
                key={src}
                className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-sm"
              >
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blogs;
