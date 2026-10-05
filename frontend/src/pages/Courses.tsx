import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowRight, BookOpen, Search } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { buttonVariants } from '../components/common/buttonVariants';
import { courseService, type Course } from '../services/course.service';
import { TRACKS } from '../data/content';
import { cn } from '../utils/cn';

const CourseCard = ({ course }: { course: Course }) => (
  <Link
    to={`/courses/${course.slug}`}
    className="surface group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40"
  >
    <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-ink-700 to-ink-900">
      {course.thumbnail ? (
        <img
          src={course.thumbnail}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="grid h-full place-items-center text-primary/60">
          <BookOpen className="h-10 w-10" />
        </div>
      )}
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {course.category && (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-primary">{course.category}</span>
        )}
        {course.level && (
          <span className="rounded-full bg-white/5 px-2.5 py-1 capitalize text-slate-300">
            {course.level}
          </span>
        )}
      </div>
      <h3 className="mt-3 text-lg font-semibold leading-snug">{course.title}</h3>
      {course.description && (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-400">{course.description}</p>
      )}
      <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-white">
        View course
        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

const CardSkeleton = () => (
  <div className="surface overflow-hidden">
    <div className="skeleton aspect-video rounded-none" />
    <div className="space-y-3 p-5">
      <div className="skeleton h-4 w-1/3" />
      <div className="skeleton h-6 w-4/5" />
      <div className="skeleton h-4 w-full" />
    </div>
  </div>
);

const Courses = () => {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getAll()
  });

  const setQuery = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value);
    else next.delete('q');
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return data ?? [];
    return (data ?? []).filter((c) =>
      [c.title, c.category, c.level, c.description].some((v) => v?.toLowerCase().includes(term))
    );
  }, [data, q]);

  const chips = ['', ...TRACKS.map((t) => t.code)];
  const hasCourses = (data?.length ?? 0) > 0;

  return (
    <>
      <SEO title="Courses" description="Browse DrLifeBoat's AMC, PLAB and FMGE preparation courses." />
      <PageHeader
        eyebrow="Courses"
        title="Find the right course for your exam"
        description="Structured, expert-led preparation for AMC, PLAB and FMGE."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses…"
              aria-label="Search courses"
              className="h-11 w-full rounded-xl border border-white/10 bg-ink-900/80 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by exam">
            {chips.map((chip) => {
              const active = q.toLowerCase() === chip.toLowerCase();
              return (
                <button
                  key={chip || 'all'}
                  type="button"
                  onClick={() => setQuery(chip)}
                  aria-pressed={active}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    active
                      ? 'border-primary bg-primary text-ink-950'
                      : 'border-white/10 text-slate-300 hover:border-primary/50 hover:text-white'
                  )}
                >
                  {chip || 'All'}
                </button>
              );
            })}
          </div>
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-custom">
          {isLoading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <CardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isLoading && hasCourses && filtered.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          {!isLoading && hasCourses && filtered.length === 0 && (
            <EmptyState
              icon={Search}
              title="No courses match your search"
              description="Try a different keyword or clear the filter."
              action={<Button onClick={() => setQuery('')}>Clear search</Button>}
            />
          )}

          {!isLoading && !hasCourses && (
            <div className="space-y-10">
              <EmptyState
                icon={isError ? AlertCircle : BookOpen}
                title={isError ? "We couldn't load the courses" : 'Courses are being added'}
                description={
                  isError
                    ? 'Please check your connection and try again, or reach out and we will help you choose.'
                    : 'New courses are on the way. Reach out and we will help you choose the right pathway.'
                }
                action={
                  <>
                    {isError && (
                      <Button variant="secondary" onClick={() => refetch()} isLoading={isFetching}>
                        Try again
                      </Button>
                    )}
                    <Link to="/contact" className={buttonVariants()}>
                      Talk to us
                    </Link>
                  </>
                }
              />
              <div className="grid gap-5 md:grid-cols-3">
                {TRACKS.map((t) => (
                  <div key={t.code} className="surface p-6">
                    <p className="font-display text-3xl font-extrabold text-primary">{t.code}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Courses;
