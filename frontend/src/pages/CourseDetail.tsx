import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, FileQuestion, PlayCircle } from 'lucide-react';
import SEO from '../components/common/SEO';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import PageLoader from '../components/common/PageLoader';
import { buttonVariants } from '../components/common/buttonVariants';
import { courseService } from '../services/course.service';

const CourseDetail = () => {
  const { slug = '' } = useParams();

  const {
    data: course,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => courseService.getBySlug(slug),
    enabled: !!slug,
    retry: false
  });

  const { data: modules = [] } = useQuery({
    queryKey: ['course-modules', course?._id],
    queryFn: () => courseService.getModules(course!._id),
    enabled: !!course?._id,
    retry: false
  });

  if (isLoading) return <PageLoader />;

  if (isError || !course) {
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

  return (
    <>
      <SEO title={course.title} description={course.description} />
      <PageHeader eyebrow={course.category ?? 'Course'} title={course.title} description={course.description}>
        <div className="flex flex-wrap gap-3">
          <Link to="/pricing" className={buttonVariants({ size: 'lg' })}>
            Enroll Now
          </Link>
          <Link to="/courses" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
            <ArrowLeft className="h-4 w-4" />
            All courses
          </Link>
        </div>
      </PageHeader>

      <section className="py-14">
        <div className="container-custom max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">Curriculum</h2>
          {modules.length === 0 ? (
            <p className="text-slate-400">The curriculum for this course will be published soon.</p>
          ) : (
            <div className="space-y-4">
              {modules.map((m, i) => (
                <div key={m._id} className="surface p-5">
                  <h3 className="font-semibold">
                    <span className="mr-2 text-primary">{String(i + 1).padStart(2, '0')}</span>
                    {m.title}
                  </h3>
                  {m.description && <p className="mt-1 text-sm text-slate-400">{m.description}</p>}
                  {m.videos && m.videos.length > 0 && (
                    <ul className="mt-4 divide-y divide-white/5">
                      {m.videos.map((v) => (
                        <li key={v._id}>
                          <Link
                            to={`/watch/${v._id}?level=${v.accessLevel ?? 'low'}`}
                            className="flex items-center gap-3 py-2.5 text-sm text-slate-300 transition hover:text-white"
                          >
                            <PlayCircle className="h-4 w-4 shrink-0 text-primary" />
                            {v.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CourseDetail;
