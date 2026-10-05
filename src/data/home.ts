import {
  Award,
  BarChart3,
  Brain,
  CalendarCheck,
  Crosshair,
  FileText,
  Globe2,
  GraduationCap,
  Infinity as InfinityIcon,
  LayoutDashboard,
  Library,
  Lightbulb,
  LifeBuoy,
  ListChecks,
  Map as MapIcon,
  MessagesSquare,
  Mic,
  Presentation,
  Route,
  ShieldCheck,
  Sparkles,
  Timer,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Homepage copy — carried over from the WordPress homepage.           */
/* Edit the text here; no component changes needed.                    */
/* ------------------------------------------------------------------ */

/**
 * Scrolling announcement strip.
 * NOTE: copied from the WordPress site — update the batch dates before publishing.
 */
export const ANNOUNCEMENTS: { label: string; text: string }[] = [
  {
    label: 'FMGE Repeaters',
    text: 'Exclusive batch for FMGE repeaters · Limited seats · Call +91 93 44 288 749'
  },
  {
    label: 'AMC Online',
    text: 'Australian Medical Council · AMC Exam Preparation Course · ONLINE · Next batch starts SEPTEMBER 2026 · 15 slots per batch · Few slots left'
  },
  {
    label: 'AMC Offline',
    text: 'AMC Exam Preparation Course · OFFLINE classroom programme · Limited to 15 doctors per batch · Call / WhatsApp +91 93442 88749'
  }
];

export const HOME_HERO = {
  title: 'Plan Your Medical Career In Australia',
  highlight: 'Let’s Make It Happen',
  lead: 'Everything you need – and more... For AMC Examinations.',
  quote: 'Experience unmatched AMC exam preparation with Dr. Lifeboat.',
  cta: 'Start Learning Now'
};

export const HERO_PROOF = [
  { value: '100+', label: 'hours of live & recorded AMC video tutorials' },
  { value: '4', label: 'expert-led sessions every week' },
  { value: '1:1', label: 'mentorship and custom study plans' }
];

export const CEO_LETTER = {
  greeting: 'Dear Students,',
  paragraphs: [
    'As someone who truly believes in the power of persistence and smart preparation, I understand how demanding the AMC, PLAB and FMGE exam journey is. That’s precisely why we built this platform — to make your path clearer, more focused, and driven by reliable, high-yield content rooted in actual past AMC questions.',
    'Our goal goes beyond helping you pass the exam. We aim to boost your confidence, strengthen your understanding, and support your aspirations of building a successful medical career. We’re honored to stand beside aspiring doctors from across the globe and remain committed to providing you with the tools, mentorship, and motivation you need — every step of the way. Remember, consistency is key to your success. Begin your preparation journey today, and you’ll be one step closer to achieving your goal.',
    'Thank you for placing your trust in us. Let’s move forward and succeed together.'
  ],
  signoff: 'CEO, Dr. Lifeboat'
};

export const WHAT_WE_DO = {
  offline: {
    badge: 'Offline · Trivandrum centre',
    title: 'Offline AMC Coaching Program – Trivandrum Centre',
    intro:
      'Our exclusive Offline AMC Coaching Program in Trivandrum is thoughtfully crafted for international medical graduates who are committed to clearing the AMC / PLAB exams through a focused and immersive learning experience. This in-person program offers a unique blend of:',
    points: [
      'Expert-led, structured classroom instruction',
      'A distraction-free, academically driven environment',
      'A modern, sophisticated study setting designed for deep focus'
    ],
    highlight: 'Our Trivandrum centre is more than just a classroom — it’s your launchpad to a medical career.',
    body: 'We recognize that every student’s journey is unique. That’s why we provide personalized 1:1 mentorship, customized study plans, and continuous academic support — all tailored to your unique strengths and learning needs. Our experienced faculty walks an extra mile to ensure that you reach your highest potential, ensuring you meet — and exceed — the rigorous benchmarks in the exams. We foster a distraction-free, focused learning environment, offering dedicated physical study spaces to help you stay productive and fully immersed in your preparation — with minimal digital interruptions.'
  },
  online: {
    badge: 'Online · Anywhere, anytime',
    title: 'Smart, Flexible & Focused Learning — Anywhere, Anytime',
    intro:
      'Our flexible online platform is designed to meet the needs of modern medical graduates, combining live interactive sessions with experienced mentors, AI-powered adaptive mock exams, and detailed performance analytics to make your preparation both efficient and strategically focused. With access to a comprehensive suite of resources, including:',
    points: [
      'Engaging video lectures',
      'Extensive practice question banks',
      'AI-driven progress tracking',
      'Collaborative discussion forums'
    ],
    body: 'You can study at your own pace, on your own schedule, without compromising on quality. Whether you’re revising late at night or squeezing in practice between shifts, our platform ensures that every minute of your preparation counts.'
  }
};

export const WHAT_WE_OFFER: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: GraduationCap,
    title: 'Expert Faculty',
    description:
      'Learn from highly experienced doctors and educators who specialize in AMC/PLAB exam content and strategy. 4 expert-led sessions weekly — dive deep into high-yield AMC/PLAB topics, engage in recall-based discussions, and get your questions answered in real time.'
  },
  {
    icon: Lightbulb,
    title: 'Concept-Based Learning & High-Yield Content',
    description: 'Our curriculum is based on recurring themes and recall questions from previous AMC exams.'
  },
  {
    icon: MessagesSquare,
    title: 'Interactive Learning',
    description:
      'Face-to-face interaction for better conceptual clarity and active learning. Engage in live discussions with experienced mentors, Q&A sessions, and concept-based lectures that promote real understanding — not just memorization.'
  },
  {
    icon: LayoutDashboard,
    title: 'Student Portal',
    description:
      'Access our comprehensive digital platform designed to assist and optimize your AMC exam preparation journey. Gain secure, personalized log in to a specialized dashboard customized to your individual learning path. Track your progress, access exclusive resources, and stay organized all in one place.'
  },
  {
    icon: ListChecks,
    title: 'Comprehensive Qbanks & Recalls',
    description:
      'Access a vast library of AMC/PLAB-style MCQs, past year recalls, and mock exams with detailed explanations, plus proven exam-oriented strategies for a targeted approach.'
  },
  {
    icon: BarChart3,
    title: 'Weekly Assessments & Progress Tracking',
    description:
      'Stay accountable with regular tests, a structured study plan, performance analytics, and feedback to fine-tune your prep. Review sessions to reinforce weak areas.'
  }
];

export const WHAT_WE_OFFER_CLOSING =
  'Join the growing community of successful AMC/PLAB candidates who trust Dr. Lifeboat for an efficient, smart, and focused approach to exam preparation. Whether you’re just beginning or fine-tuning your final revision, we are here to help you succeed — smarter and faster.';

export const ADAPTIVE_TEST = {
  eyebrow: 'AI-Based Adaptive Learning Mock Test',
  title: 'Smarter Practice. Better Results.',
  highlight: 'Absolutely Free.',
  paragraphs: [
    'We’re redefining AMC/PLAB preparation with cutting-edge technology. The adaptive tests adjust to your skill level, ensuring that you focus on areas that need improvement while reinforcing your strengths. This tailored approach maximizes your preparation efficiency and boosts your confidence.',
    'All our students get FREE access to an AI-powered adaptive mock test designed to mimic the real AMC Part 1 exam — but smarter. Our system doesn’t just test you — it learns from your performance and adapts in real time to focus on your weak areas, helping you improve faster and more effectively.',
    'Join Dr. Lifeboat today and unlock free access to our AI-powered learning tools. Because your success deserves more than just books and lectures.'
  ],
  subtitle: 'Experience the real AMC / PLAB exam',
  featuresTitle: 'What makes our adaptive mock test unique?',
  features: [
    { icon: Brain, title: 'AI-Driven Personalization', text: 'Questions adjust based on your performance level — so you’re always challenged at the right difficulty.' },
    { icon: Route, title: 'Smart Progress Tracking & Study Recommendations', text: 'Your study journey is automatically tracked, with intelligent insights and customized study recommendations to help you stay focused, every step of the way.' },
    { icon: BarChart3, title: 'Instant Performance Analytics', text: 'Receive detailed feedback on each attempt — accuracy, time per question, topic-wise scores, and improvement tips.' },
    { icon: Crosshair, title: 'Targeted Weak-Area Focus', text: 'Get more practice in the subjects and question types you struggle with, saving study time and boosting retention.' },
    { icon: Timer, title: 'Real AMC Exam Simulation', text: 'Timed tests, authentic question patterns, and an interface similar to the actual exam experience.' },
    { icon: InfinityIcon, title: 'Unlimited Access – 100% Free for Our Students', text: 'All enrolled students can access this tool at no extra cost via our learning platform.' }
  ] as { icon: LucideIcon; title: string; text: string }[],
  closing: 'Are you ready to take your AMC preparation to the next level?',
  closingSub: 'Enrol today and start your AMC journey with confidence!',
  cta: 'Try a Demo Test'
};

export const AUSTRALIA_BAND = {
  title: 'Looking to practice medicine in Australia?',
  text: 'Moving to Australia and working as a doctor is a big decision to make. To help you in your journey we have brought together some information and resources.',
  cta: 'Learn more'
};

export const OUR_FEATURES_INTRO =
  'We offer more than just classes — we provide a comprehensive, student-centric learning experience designed to help you confidently clear the AMC Part 1 / PLAB exams and build a successful medical career.';

export const OUR_FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  { icon: Presentation, title: '4 Expert-Led Classes per Week', description: 'Focused on high-yield AMC topics, recall-based discussions, and live Q&A sessions.' },
  { icon: LayoutDashboard, title: 'Exclusive Student Portal', description: 'One-stop access to materials, lectures, assessments, performance reports, and more.' },
  { icon: MapIcon, title: 'Structured Curriculum', description: 'A well-planned roadmap aligned with AMC exam standards for systematic progress.' },
  { icon: Lightbulb, title: 'Concept-Based Learning', description: 'Emphasis on understanding, not memorizing — covering high-yield clinical knowledge.' },
  { icon: Library, title: 'All Study Materials at Your Fingertips', description: 'Unlimited access to high-yield notes, recorded lectures, recall discussions, question banks, mock exams, and more.' },
  { icon: Sparkles, title: 'Interactive Learning Tools', description: 'AI-based adaptive mock tests that adapt to your performance and focus on weak areas, topic-wise quizzes, and real-time analytics.' },
  { icon: CalendarCheck, title: 'Custom Study Plans & Schedules', description: 'Structured study plans designed by our mentors. Stay on track with weekly targets and reminders tailored to your exam timeline.' },
  { icon: TrendingUp, title: 'Performance Tracking & Analytics', description: 'Monitor your progress with detailed performance reports, mock test scores, and personalized feedback to help you improve strategically.' },
  { icon: ListChecks, title: 'AMC Qbanks, MCQ Recalls & PYQs', description: 'Practice with thousands of questions modeled after real AMC exams.' },
  { icon: Timer, title: 'Weekly Quizzes & Grand Mocks', description: 'Regular assessments to track progress and improve exam readiness.' },
  { icon: MessagesSquare, title: 'In-depth Topic Discussions & MCQ Analysis', description: 'Master key concepts through detailed explanations and group reviews.' },
  { icon: UserCheck, title: '1:1 Mentorship', description: 'Individual attention and custom study plans tailored to your strengths and weaknesses.' }
];

export const VALUES_INTRO =
  'We are more than just an AMC/PLAB coaching institute — we are a team of passionate educators and mentors committed to shaping the future of international medical graduates. Our core values guide every decision, every class, and every interaction.';

export const VALUES: { icon: LucideIcon; title: string; description: string; tint: string }[] = [
  { icon: Award, title: 'Excellence in Education', tint: 'bg-tint-cream', description: 'We are dedicated to delivering high-quality, exam-focused education that empowers our students to succeed in the AMC/PLAB exams and beyond. Our curriculum, faculty, and resources reflect a commitment to academic excellence.' },
  { icon: UserCheck, title: 'Student-Centred Approach', tint: 'bg-tint-sky', description: 'Your journey is our priority. From personalized mentorship to 24/7 support, we tailor our services to fit your unique needs, goals, and pace of learning.' },
  { icon: ShieldCheck, title: 'Integrity & Honesty', tint: 'bg-tint-peach', description: 'We believe in being transparent, fair, and ethical in all our actions — from our pricing to our guidance. Trust is the foundation of every student relationship we build.' },
  { icon: TrendingUp, title: 'Growth & Continuous Improvement', tint: 'bg-tint-lilac', description: 'We constantly evolve our teaching methods, technology, and materials to stay ahead — ensuring our students always receive the most up-to-date and effective support.' },
  { icon: Users, title: 'Community & Collaboration', tint: 'bg-tint-cream', description: 'Success is a shared journey. We foster a strong community of learners, mentors, and alumni who support and uplift one another through every step of the AMC pathway.' },
  { icon: Globe2, title: 'Global Perspective, Local Support', tint: 'bg-tint-sky', description: 'While we serve students from across the world, we provide personalized, culturally aware support with a deep understanding of the Australian medical system.' }
];

export const SERVICES = {
  eyebrow: 'Our Services',
  title: 'Go Far Beyond Exam Preparation!',
  items: [
    { icon: FileText, title: 'Resume Guidance', description: 'Gain expert-backed strategies to craft a strong, standout resume that enhances your chances of securing your ideal job.' },
    { icon: Mic, title: 'Interview Coaching', description: 'Sharpen your interview skills with targeted guidance designed to help you make a lasting impression and present yourself with confidence.' },
    { icon: LifeBuoy, title: 'Ongoing Career Support', description: 'Benefit from continuous support throughout your journey — from exam preparation to post-exam career planning and beyond.' }
  ] as { icon: LucideIcon; title: string; description: string }[]
};
