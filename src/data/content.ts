import {
  Award,
  Briefcase,
  Cpu,
  GraduationCap,
  Library,
  MonitorPlay,
  Target,
  UserCheck,
  Users,
  type LucideIcon
} from 'lucide-react';
import advancedLearningTechnologyImage from '../../assets/about us/Advanced Learning Technology.jpg';
import communitySupportImage from '../../assets/about us/community support and accountability.webp';
import comprehensiveStudyResourcesImage from '../../assets/about us/Comprehensive Study Resources.webp';
import excellentTrackRecordImage from '../../assets/about us/Excellent Track Record.avif';
import expertFacultyImage from '../../assets/about us/Expert Faculty & Real Exam Insights.jpg';
import focusedApproachImage from '../../assets/about us/Focused, Result-Oriented Approach.webp';
import liveOfflineClassesImage from '../../assets/about us/Live & Offline Class Options.webp';
import personalizedLearningImage from '../../assets/about us/Personalized, Student-Centred Learning.jpg';
import supportBeyondExamImage from '../../assets/about us/Support Beyond the Exam.jpg';

/* ------------------------------------------------------------------ */
/* All copy below is carried over from the WordPress site.             */
/* ------------------------------------------------------------------ */

export const HERO = {
  title: 'Looking to Practice medicine in Australia?',
  text: 'Moving to Australia and working as a doctor is a big decision to make. To help you in your journey we have brought together some information and resources.'
};

export const ABOUT_PARAGRAPHS = [
  'Dr. Lifeboat is an internationally trained medical graduate with vast teaching experience in AMC, PLAB and FMGE pathways. With a strong understanding of exam psychology, pattern trends, and student struggles, Dr. Lifeboat has mentored hundreds of students to success — especially those who’ve faced multiple setbacks. Our goal is to rescue committed students from cycles of repeated failure and guide them to their final destination — SUCCESS.',
  "That's why we provide high-quality, exam-focused preparation material, interactive quizzes to reinforce learning, performance analytics to track your progress, and expert mentorship and support to guide you every step of the way."
];

export const VISION =
  'To be the most trusted and result-driven platform for international medical graduates, empowering them to achieve success in the AMC/PLAB exams and confidently begin their medical careers in Australia/UK. We envision a future where every aspiring doctor, regardless of background or location, has access to expert guidance, high-yield resources, and a supportive community that turns their Australian medical dream into reality.';

export const MISSION = {
  intro:
    'We understand that pursuing a medical career in Australia is a dream for many aspiring healthcare professionals. Our mission is to provide comprehensive, student-centred AMC/PLAB exams preparation through:',
  points: [
    'Expert-led coaching and mentorship',
    'High-quality, exam-focused content',
    'Adaptive technology for smarter learning',
    'Personalised academic support',
    'A distraction-free and collaborative study environment'
  ],
  outro:
    'With our innovative online coaching and free AI-driven adaptive tests, we are here to support you every step of the way — empowering you with the knowledge, skills, and confidence needed to excel in the Australian Medical Council (AMC)/PLAB exams. We are committed to helping students not just pass exams, but build lasting confidence, clinical competence, and clarity on their journey to becoming medical professionals in Australia/UK.'
};

export const STAND_OUT_INTRO =
  'We’re not just another AMC/PLAB coaching center — from first-time preparation to final revision, Dr.Lifeboat is your trusted partner in your AMC/PLAB journey. Here’s what sets us apart:';

export const STAND_OUT: { icon: LucideIcon; title: string; description: string; image: string }[] = [
  {
    icon: UserCheck,
    title: 'Personalized, Student-Centred Learning',
    image: personalizedLearningImage,
    description:
      'Every student’s journey is unique. That’s why we offer 1:1 mentorship, custom study schedules, and continuous academic support tailored to your strengths and weaknesses.'
  },
  {
    icon: Library,
    title: 'Comprehensive Study Resources',
    image: comprehensiveStudyResourcesImage,
    description:
      'Our comprehensive study material is curated by subject matter experts and gives you an in-depth understanding of all crucial topics across subjects, to help you stay ahead of the curve.'
  },
  {
    icon: GraduationCap,
    title: 'Expert Faculty & Real Exam Insights',
    image: expertFacultyImage,
    description:
      'Learn from highly experienced mentors and practicing doctors who know the AMC/PLAB exams inside out. Our curriculum is built around high-yield topics, past-year recalls, and real exam strategies.'
  },
  {
    icon: MonitorPlay,
    title: 'Live & Offline Class Options',
    image: liveOfflineClassesImage,
    description:
      'Choose between live online classes or join us at our Trivandrum center for face-to-face learning, collaborative study spaces, and a focused, distraction-free atmosphere.'
  },
  {
    icon: Cpu,
    title: 'Advanced Learning Technology',
    image: advancedLearningTechnologyImage,
    description:
      'AI-based adaptive mock tests adjust to your performance, helping you focus on the areas that matter most. Smart learning, smarter results.'
  },
  {
    icon: Briefcase,
    title: 'Support Beyond the Exam',
    image: supportBeyondExamImage,
    description:
      'We guide you not only through the exam but also through your career journey with CV building tips, interview prep, and documentation assistance for the Australian medical process.'
  },
  {
    icon: Users,
    title: 'Community Support & Accountability',
    image: communitySupportImage,
    description:
      'Become part of a dynamic community of motivated medical graduates who share your goals. Our active Telegram and WhatsApp study groups foster collaboration and accountability.'
  },
  {
    icon: Award,
    title: 'Excellent Track Record',
    image: excellentTrackRecordImage,
    description:
      'We have maintained an excellent track record for over 2+ years in delivering outstanding results. Our students consistently perform well, thanks to strategic preparation and mentorship.'
  },
  {
    icon: Target,
    title: 'Focused, Result-Oriented Approach',
    image: focusedApproachImage,
    description:
      'Everything we do is designed with one goal in mind — your success in the AMC/PLAB exams. Structured study plans, frequent assessments, and exam-focused teaching keep you on track.'
  }
];

/** Numbers that appear on the WordPress pages. */
export const HERO_STATS = [
  { value: '100+', label: 'hours of live & recorded AMC video tutorials' },
  { value: '2+', label: 'years of excellent results' },
  { value: '1:1', label: 'mentorship & custom study plans' },
  { value: '2', label: 'ways to learn: online or at our Trivandrum centre' }
];

export const TRACKS = [
  {
    code: 'AMC',
    name: 'Australian Medical Council',
    description:
      'Prepare for AMC Part 1 (MCQ) with expert-led classes, recall-based questions and adaptive mock tests.',
    to: '/courses?filter=AMC'
  },
  {
    code: 'PLAB',
    name: 'Professional & Linguistic Assessments Board',
    description:
      'A complete PLAB Part 1 course with high-yield notes aligned with the latest NHS guidelines.',
    to: '/courses?filter=PLAB'
  },
  {
    code: 'FMGE',
    name: 'Foreign Medical Graduate Examination',
    description:
      'Experienced mentoring for the FMGE pathway. Get in touch and we will guide you to the right plan.',
    to: '/contact?course=FMGE'
  }
];

export const WHY_AUSTRALIA = [
  { value: '$156,000', label: 'Average annual salary of Registered Doctors in Australia' },
  { value: '5,000+', label: 'Current openings for the role of Registered Doctors' },
  { value: '185,000+', label: 'Visas for Skilled Workers in Australia' }
];

export const AMC_STEPS = [
  'AMC Document Evaluation',
  'AMC MCQ Examination (Part 1)',
  'English Language Proficiency',
  'AMC Clinical Examination / Workplace-Based Assessment (Part 2)',
  'Provisional Registration and Employment',
  'Visa and Sponsorship'
];
