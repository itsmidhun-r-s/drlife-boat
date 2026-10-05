import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  FileQuestion,
  Laptop,
  MapPin,
  MessageCircle,
  Phone
} from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';
import CourseCard from '../components/courses/CourseCard';
import { buttonVariants } from '../components/common/buttonVariants';
import { COURSES, findCourse } from '../data/courses';
import { SITE } from '../utils/site';

const CourseDetail = () => {
  const { slug } = useParams();
  const course = findCourse(slug);

  if (!course) {
    return (
      <section className="container-custom py-20">
        <SEO title="Course not found" />
        <EmptyState
          icon={FileQuestion}
          title="Course not found"
          description="This course may have been moved or is not available right now."
          action={
            <Link to="/courses" className={buttonVariants()}>
              Back to courses
            </Link>
          }
        />
      </section>
    );
  }

  const others = COURSES.filter((item) => item.slug !== course.slug).slice(0, 3);
  const description = `${course.summary} ${course.highlights[0]?.text ?? ''}`.trim();

  return (
    <>
      <SEO title={course.title} description={description} image={course.backgroundImage} />

      <section className="relative h-56 overflow-hidden bg-gradient-to-br from-ink-950 to-ink-700 sm:h-64 md:h-72">
        {course.backgroundImage && (
          <img
            src={course.backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/45 to-ink-950/20" />
        <div className="container-custom relative flex h-full items-end pb-8 sm:pb-10">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
            {course.exam} preparation
          </p>
        </div>
        <div className="absolute right-4 top-4 flex flex-col items-end gap-2 sm:right-8 sm:top-6">
          <span className="rounded-full bg-pink-600 px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow sm:text-xs">
            PREMIUM
          </span>
          <span className="rounded-full bg-blue-600 px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow sm:text-xs">
            RECORDED
          </span>
          <span className="rounded-full bg-orange-500 px-3 py-1 text-[10px] font-bold tracking-wide text-white shadow sm:text-xs">
            {course.chapterCount ?? course.lessons?.length ?? 0} Chapters
          </span>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-7 sm:py-9">
        <div className="container-custom">
          <Link
            to="/courses"
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="h-4 w-4" />
            All courses
          </Link>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold uppercase leading-tight tracking-tight text-fg sm:text-3xl md:text-4xl">
                {course.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {course.tags?.map((tag) => (
                  <span key={tag} className="rounded-full bg-fg/5 px-3 py-1.5 text-xs font-medium text-fg-soft">
                    {tag}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-xs font-semibold text-accent">
                  <Clock className="h-3.5 w-3.5" />
                  {course.duration}
                </span>
                {course.mode && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/5 px-3 py-1.5 text-xs font-semibold text-fg-soft">
                    {course.mode === 'Online' ? (
                      <Laptop className="h-3.5 w-3.5" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5" />
                    )}
                    {course.mode}
                  </span>
                )}
              </div>
            </div>
            <Link
              to={`/contact?course=${course.slug}`}
              className={buttonVariants({ size: 'lg', className: 'shrink-0' })}
            >
              BUY Now
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-surface-2 py-10 sm:py-14">
        <div className="container-custom grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            {course.about && (
              <section className="surface p-6 sm:p-8">
                <h2 className="text-2xl font-bold">
                  About <span className="gradient-text">Course</span>
                </h2>
                <p className="mt-4 leading-relaxed text-muted">{course.about}</p>
                {course.introHighlights && course.introHighlights.length > 0 && (
                  <ul className="mt-5 space-y-3 border-t border-line pt-5">
                    {course.introHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-fg-soft">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

            {course.highlights.length > 0 && (
              <section className="surface p-6 sm:p-8">
                <h2 className="text-2xl font-bold">
                  Premium Course <span className="gradient-text">Highlights</span>
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.highlights.map((highlight) => (
                    <li key={highlight.title} className="rounded-xl border border-line bg-bg p-5">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <h3 className="mt-3 font-semibold text-fg">{highlight.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {course.topics && course.topics.length > 0 && (
              <section className="surface p-6 sm:p-8">
                <h2 className="text-2xl font-bold">
                  What you&apos;ll <span className="gradient-text">learn in this course</span>
                </h2>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {course.topics.map((topic) => (
                    <li
                      key={topic}
                      className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-fg-soft"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {course.lessons && course.lessons.length > 0 && (
              <section className="surface p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-accent">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold">Course Lessons</h2>
                    <p className="mt-1 text-sm text-muted">{course.lessons.length} course modules</p>
                  </div>
                </div>
                <ol className="mt-6 grid gap-3 sm:grid-cols-2">
                  {course.lessons.map((lesson, index) => (
                    <li
                      key={lesson.title}
                      className="flex min-w-0 items-center gap-3 rounded-xl border border-line bg-bg p-4"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-sm font-bold text-accent">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 font-medium text-fg">{lesson.title}</span>
                    </li>
                  ))}
                </ol>
              </section>
            )}
          </div>

          <aside className="surface h-fit p-6 lg:sticky lg:top-24">
            <p className="eyebrow">Start your journey</p>
            <h2 className="mt-2 text-xl font-semibold">{course.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{course.summary}</p>
            <Link
              to={`/contact?course=${course.slug}`}
              className={buttonVariants({ fullWidth: true, size: 'lg', className: 'mt-6' })}
            >
              Enroll Now
            </Link>
            <a
              href={SITE.phoneHref}
              className={buttonVariants({ variant: 'secondary', fullWidth: true, className: 'mt-3' })}
            >
              <Phone className="h-4 w-4 text-accent" />
              {SITE.phone}
            </a>
            <a
              href={SITE.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: 'ghost', fullWidth: true, className: 'mt-2' })}
            >
              <MessageCircle className="h-4 w-4 text-success" />
              WhatsApp us
            </a>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="border-t border-line py-14">
          <div className="container-custom">
            <h2 className="mb-8 text-2xl font-bold">Other courses</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((item) => (
                <CourseCard key={item.slug} course={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CourseDetail;
