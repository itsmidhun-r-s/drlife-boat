import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Laptop, MapPin, Stethoscope } from 'lucide-react';
import type { CourseItem } from '../../data/courses';
import { cn } from '../../utils/cn';

/** Cover art per course type (used when a course has no photo of its own). */
const coverFor = (c: CourseItem) => {
  if (c.exam === 'PLAB') return { bg: 'from-ink-900 to-ink-700', text: 'text-white', code: 'text-primary' };
  if (c.mode === 'Online') return { bg: 'from-tint-sky to-[#b9dde6]', text: 'text-ink-950', code: 'text-ink-950' };
  if (c.mode === 'Offline') return { bg: 'from-primary-300 to-primary-500', text: 'text-ink-950', code: 'text-ink-950' };
  return { bg: 'from-tint-cream to-tint-peach', text: 'text-ink-950', code: 'text-ink-950' };
};

const ModeBadge = ({ mode }: { mode: NonNullable<CourseItem['mode']> }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-fg/5 px-2.5 py-1 text-xs font-semibold text-fg-soft">
    {mode === 'Online' ? <Laptop className="h-3 w-3" aria-hidden /> : <MapPin className="h-3 w-3" aria-hidden />}
    {mode}
  </span>
);

const CourseCard = ({ course, className }: { course: CourseItem; className?: string }) => {
  const cover = coverFor(course);
  return (
    <Link
      to={`/courses/${course.slug}`}
      className={cn('surface surface-hover group flex h-full flex-col overflow-hidden', className)}
    >
      <div className={cn('relative aspect-[16/9] overflow-hidden bg-gradient-to-br', cover.bg)}>
        {course.image ? (
          <img src={course.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <>
            <div aria-hidden className="bg-grid absolute inset-0 opacity-70" />
            <Stethoscope aria-hidden className={cn('absolute -bottom-4 -right-3 h-32 w-32 opacity-15 transition duration-500 group-hover:scale-110 group-hover:-rotate-6', cover.text)} strokeWidth={1.25} />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <span className={cn('font-display text-4xl font-extrabold leading-none tracking-tight', cover.code)}>{course.exam}</span>
              <span className={cn('mt-1 text-xs font-semibold uppercase tracking-[0.14em] opacity-80', cover.text)}>
                {course.mode ? `${course.mode} course` : 'Course'}
              </span>
            </div>
          </>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow-sm">
          <Clock className="h-3 w-3 text-accent" aria-hidden />
          {course.duration}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-primary/15 px-2.5 py-1 text-accent">{course.exam}</span>
          {course.mode && <ModeBadge mode={course.mode} />}
        </div>
        <h3 className="mt-3 text-lg font-bold leading-snug">{course.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{course.summary}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-fg">
          Learn more
          <ArrowRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
};

export default CourseCard;
