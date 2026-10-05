import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import CTA from '../components/home/CTA';
import CourseGrid from '../components/courses/CourseGrid';
import { COURSES, COURSES_INTRO } from '../data/courses';
import { cn } from '../utils/cn';

const FILTERS = ['All', 'AMC', 'PLAB', 'Online', 'Offline'] as const;

const Courses = () => {
  const [params, setParams] = useSearchParams();
  const filter = FILTERS.find((f) => f.toLowerCase() === (params.get('filter') ?? '').toLowerCase()) ?? 'All';
  const q = params.get('q') ?? '';

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'All') next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return COURSES.filter((c) => {
      const byFilter = filter === 'All' || c.exam === filter || c.mode === filter;
      const byText = !term || `${c.title} ${c.summary} ${c.exam} ${c.mode ?? ''}`.toLowerCase().includes(term);
      return byFilter && byText;
    });
  }, [filter, q]);

  return (
    <>
      <SEO title="Courses" description={COURSES_INTRO} />
      <PageHeader eyebrow="Our course" title={<>Our <span className="gradient-text">Course</span></>} description={COURSES_INTRO}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative w-full sm:max-w-xs">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
            <input
              type="search"
              value={q}
              onChange={(e) => update('q', e.target.value)}
              placeholder="Search courses…"
              aria-label="Search courses"
              className="h-11 w-full rounded-xl border border-fg/25 bg-surface pl-10 pr-4 text-sm text-fg placeholder:text-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter courses">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => update('filter', f)}
                className={cn(
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                  filter === f
                    ? 'border-primary bg-primary text-ink-950'
                    : 'border-line text-fg-soft hover:border-primary/50 hover:text-fg'
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-custom">
          {list.length > 0 ? (
            <CourseGrid courses={list} />
          ) : (
            <EmptyState
              icon={Search}
              title="No courses match your search"
              description="Try a different keyword or clear the filters."
              action={
                <Button onClick={() => setParams({}, { replace: true })}>Clear filters</Button>
              }
            />
          )}
        </div>
      </section>
      <CTA />
    </>
  );
};

export default Courses;
