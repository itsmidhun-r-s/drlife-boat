export type Exam = 'AMC' | 'PLAB';
export type Mode = 'Online' | 'Offline';

export interface CourseHighlight {
  title: string;
  text: string;
  icon?: string;
}

export interface CourseLesson {
  title: string;
  image?: string;
}

export interface CourseItem {
  slug: string;
  title: string;
  exam: Exam;
  /** Only set when the WordPress page states it (e.g. "Offline" / "Online"). */
  mode?: Mode;
  duration: string;
  summary: string;
  about?: string;
  backgroundImage?: string;
  tags?: string[];
  chapterCount?: number;
  introHighlights?: string[];
  highlights: CourseHighlight[];
  topics?: string[];
  lessons?: CourseLesson[];
  /** Optional photo: drop a file in /public/images and set e.g. '/images/amc-offline.jpg'. */
  image?: string;
}

const RECALL_AMC =
  'Curated notes and essential textbooks based on the latest RACGP and AMC guidelines. Includes subject-wise recall questions for all six subjects, aligned with current exam trends.';
const AMC_ABOUT =
  'A warm welcome from Dr. Lifeboat! We are thrilled to have you on board as you take this important step towards your AMC journey. Begin your AMC journey with confidence. At Dr. Lifeboat, you are not just joining a course — you are becoming part of a supportive learning community committed to your medical journey in Australia. Your success in the AMC journey is at the heart of everything we do. We do not just prepare you for an exam — with the right tools, guidance, and support, we prepare you for success in your medical career in Australia. We are here to guide you every step of the way.';
const AMC_GOAL =
  'Your goals are our mission. Let’s navigate your AMC pathway together!';
const AMC_HIGHLIGHTS: CourseHighlight[] = [
  {
    title: 'Comprehensive Content Coverage',
    text: 'All AMC Part 1 subjects covered in depth, with an emphasis on case-based clinical scenario MCQs that mirror actual exam patterns.'
  },
  {
    title: 'Smarter Practice, Better Results',
    text: 'In-depth explanations with ruled-out options, mock exams, timed tests, and spaced repetition techniques to reinforce learning.'
  },
  {
    title: 'Performance Tracking',
    text: 'Track your performance with personalized analytics and feedback to fine-tune your preparation.'
  },
  {
    title: 'Flexible, Accessible & Personalized',
    text: 'Study anytime, anywhere, on desktop or mobile, with a customized study plan to structure your exam preparation.'
  },
  {
    title: 'Structured Revision & Exam Techniques',
    text: 'Build strong exam strategy, revision discipline, and confidence for the final lap.'
  }
];

export const COURSES_INTRO =
  'We specialize in helping international medical graduates confidently prepare for the AMC Part 1 (MCQ) Examination. With expert-led classes, structured study plans, and targeted high-yield content, our course is designed to take the guesswork out of your preparation and fast-track your success.';

export const COURSES: CourseItem[] = [
  {
    slug: 'plab-part-1-offline-course',
    title: 'PLAB Part 1 Offline Course',
    exam: 'PLAB',
    mode: 'Offline',
    duration: '5 Months',
    summary: 'A complete PLAB exam preparation course.',
    about:
      'Welcome, future doctors. Begin your PLAB journey with confidence. Our comprehensive 5-month PLAB Part 1 MCQ preparation course is designed to equip you with clinical knowledge, critical thinking, exam strategies, and structured guidance. The course breaks the PLAB syllabus into clear, manageable steps to help you stay organized, motivated, and exam-ready whether you are preparing full-time or balancing other responsibilities.',
    backgroundImage: 'https://drlifeboat-storage.s3.ap-south-1.amazonaws.com/uploads/courses/1777614530855-plab4.jpg',
    tags: ['#Paediatrics'],
    chapterCount: 7,
    introHighlights: [
      AMC_GOAL,
      'Full recording access: all lectures are recorded and uploaded to your student portal so you can watch anytime, anywhere.',
      'High-yield study materials: curated notes and essential textbooks based on the latest NHS and UK guidelines, with subject-wise recall questions for all six subjects.',
      'Live expert-led lectures cover PLAB subjects including Medicine, Surgery, Paediatrics, Obstetrics & Gynaecology, and Psychiatry.',
      'Experienced tutors cover medical ethics and other topics, with teaching aligned to the exam blueprint.'
    ],
    highlights: [
      { title: 'Comprehensive Content Coverage', text: 'PLAB Part 1 subjects are covered in depth, with emphasis on case-based clinical scenario MCQs that mirror actual exam patterns.' },
      { title: 'Smarter Practice, Better Results', text: AMC_HIGHLIGHTS[1].text },
      { title: 'Performance Tracking', text: AMC_HIGHLIGHTS[2].text },
      { title: 'Flexible, Accessible & Personalized', text: AMC_HIGHLIGHTS[3].text }
    ],
    topics: [
      'Adult health – Medicine',
      'Adult health – Surgery',
      'Women’s health – Obstetrics',
      'Women’s health – Gynaecology',
      'Child health',
      'Population health',
      'Mental health',
      'Medical Ethics'
    ],
    lessons: []
  },
  {
    slug: 'amc-mcq-offline-course',
    title: 'AMC MCQ Offline Course',
    exam: 'AMC',
    mode: 'Offline',
    duration: '5 Months',
    summary: 'A complete AMC exam preparation course.',
    about: AMC_ABOUT,
    backgroundImage: 'https://drlifeboat-storage.s3.ap-south-1.amazonaws.com/uploads/courses/1777614796768-amc%206.jpg',
    tags: ['#Paediatrics', '#Cardiology'],
    chapterCount: 7,
    introHighlights: [
      'Full recording access: all lectures are recorded and uploaded to your student portal so you can watch anytime, anywhere.',
      AMC_GOAL
    ],
    highlights: [
      { title: 'High-Yield Study Materials', text: RECALL_AMC },
      ...AMC_HIGHLIGHTS
    ],
    topics: [
      'Adult health (Medicine)',
      'Adult health (Surgery)',
      'Women’s health (Obs & Gyn)',
      'Child health',
      'Population health',
      'Mental health',
      'Medical Ethics'
    ],
    lessons: [{ title: 'Welcome!' }]
  },
  {
    slug: 'amc-1-mcq-course',
    title: 'AMC 1 MCQ Course',
    exam: 'AMC',
    duration: '5 Months',
    summary: 'A complete AMC exam preparation course.',
    about: AMC_ABOUT,
    backgroundImage: 'https://drlifeboat-storage.s3.ap-south-1.amazonaws.com/uploads/courses/1777046900865-course%2012.jpg',
    chapterCount: 7,
    introHighlights: [
      'Full recording access: all lectures are recorded and uploaded to your student portal so you can watch anytime, anywhere.',
      AMC_GOAL
    ],
    highlights: [{ title: 'High-Yield Study Materials', text: RECALL_AMC }, ...AMC_HIGHLIGHTS],
    topics: [
      'Adult health – Medicine',
      'Adult health – Surgery',
      'Women’s health – Obstetrics',
      'Women’s health – Gynaecology',
      'Child health',
      'Population health',
      'Mental health',
      'Medical Ethics'
    ],
    lessons: [
      { title: 'Welcome to Dr Lifeboat' },
      { title: 'Cardiology | Demo' },
      { title: 'Ophthalmology' },
      { title: 'Respiratory' },
      { title: 'General Surgery' },
      { title: 'Rheumatology' },
      { title: 'Oncology' },
      { title: 'Cardiology' },
      { title: 'ENT' },
      { title: 'Nephrology' },
      { title: 'Pediatrics' },
      { title: 'Gastroenterology' },
      { title: 'Obs and Gyne' },
      { title: 'Endocrinology' },
      { title: 'Orthopaedic' },
      { title: 'Neurology' },
      { title: 'Psychiatry' },
      { title: 'Infectious Disease' },
      { title: 'Hematology' },
      { title: 'Dermatology' },
      { title: 'Ethics' },
      { title: 'High-yield MCQ | QBank' },
      { title: 'Books & Resources' },
      { title: 'Gynecology | Demo' }
    ]
  },
  {
    slug: 'question-bank-amc',
    title: 'Question Bank – AMC',
    exam: 'AMC',
    duration: '7 Chapters',
    summary: 'Explore AMC question-bank modules across core medical specialties, including a grand mock examination.',
    about:
      'The AMC question bank brings subject-based practice and exam preparation resources together in one place. Explore the modules below, including a grand mock examination.',
    backgroundImage: 'https://drlifeboat-storage.s3.ap-south-1.amazonaws.com/uploads/courses/1777101535588-qb5.png',
    chapterCount: 7,
    highlights: [],
    lessons: [
      { title: 'Ophthalmology' },
      { title: 'Respiratory' },
      { title: 'General Surgery' },
      { title: 'Rheumatology' },
      { title: 'Oncology' },
      { title: 'Cardiology' },
      { title: 'Grand Mock' },
      { title: 'Endocrinology' },
      { title: 'Demo' },
      { title: 'Obs and Gyne' },
      { title: 'Orthopaedic' },
      { title: 'Neurology' },
      { title: 'Nephrology' },
      { title: 'ENT' },
      { title: 'Hematology' },
      { title: 'Gastroenterology' },
      { title: 'Psychiatry' }
    ]
  },
  {
    slug: 'amc-mcq-online-dec-batch',
    title: 'AMC MCQ Online – Dec Batch',
    exam: 'AMC',
    mode: 'Online',
    duration: '5 Months',
    summary: 'A complete AMC exam preparation course.',
    about: AMC_ABOUT,
    backgroundImage: 'https://drlifeboat-storage.s3.ap-south-1.amazonaws.com/uploads/courses/1778432449251-course4.jpg',
    chapterCount: 7,
    introHighlights: [
      'Full recording access: all lectures are recorded and uploaded to your student portal so you can watch anytime, anywhere.',
      AMC_GOAL
    ],
    highlights: [{ title: 'High-Yield Study Materials', text: RECALL_AMC }, ...AMC_HIGHLIGHTS],
    topics: [
      'Adult health – Medicine',
      'Adult health – Surgery',
      'Women’s health – Obstetrics',
      'Women’s health – Gynaecology',
      'Child health',
      'Population health',
      'Mental health',
      'Medical Ethics'
    ],
    lessons: [
      { title: 'Welcome to Dr Lifeboat' },
      { title: 'Obs & Gynec' },
      { title: 'Endocrinology' }
    ]
  }
];

export const findCourse = (slug?: string) => COURSES.find((c) => c.slug === slug);
