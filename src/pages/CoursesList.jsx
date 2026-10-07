import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';

const CourseCard = ({ title, description, duration, exam, theme, slug }) => {
  const coverTheme = theme === 'dark'
    ? 'bg-gradient-to-br from-slate-900 to-slate-700 text-white'
    : 'bg-gradient-to-br from-amber-300 to-orange-400 text-slate-950';

  return (
    <Link
      to={`/courses/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-[#e7e7e7] bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className={`relative flex min-h-44 flex-col justify-end p-6 ${coverTheme}`}>
        <p className="text-3xl font-extrabold">{exam}</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em]">{exam} course</p>
        <span className="absolute right-8 mt-[-8rem] rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-900">
          {duration}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-slate-950">
          Learn more
          <span aria-hidden className="text-orange-600 transition-transform group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
};

const featuredCourseSlugs = ['plab-part-1-offline-course', 'amc-mcq-offline-course'];

const CoursesList = () => {
  const visibleCourses = COURSES.filter((course) => featuredCourseSlugs.includes(course.slug));
  const courses = visibleCourses.length > 0 ? visibleCourses : COURSES.slice(0, 2);

  return (
    <div className="mx-auto max-w-[1240px] px-5 py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course.slug}
            title={course.title}
            description={course.summary}
            duration={course.duration}
            exam={course.exam}
            theme={course.exam === 'PLAB' ? 'dark' : 'orange'}
            slug={course.slug}
          />
        ))}
      </div>
    </div>
  );
};

export default CoursesList;