import type { CourseItem } from '../../data/courses';
import Reveal from '../common/Reveal';
import CourseCard from './CourseCard';

/** Responsive grid that centres an incomplete last row (e.g. 5 courses = 3 + 2). */
const CourseGrid = ({ courses }: { courses: CourseItem[] }) => (
  <div className="flex flex-wrap justify-center gap-6">
    {courses.map((c, i) => (
      <Reveal key={c.slug} delay={(i % 3) * 0.06} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
        <CourseCard course={c} />
      </Reveal>
    ))}
  </div>
);

export default CourseGrid;
