import {
  Award,
  BookOpen,
  Clock,
  MessageSquare,
  Target,
  TrendingUp,
  Users,
  Video,
  type LucideIcon
} from 'lucide-react';
import type { FaqItem } from '../components/common/FaqAccordion';

export const FEATURES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Users,
    title: '4 Expert-Led Classes per Week',
    description: 'Focused on high-yield AMC topics, recall-based discussions, and live Q&A sessions.'
  },
  {
    icon: BookOpen,
    title: 'Exclusive Student Portal',
    description:
      'One-stop access to materials, lectures, assessments, performance reports, and more.'
  },
  {
    icon: Target,
    title: 'Structured Curriculum',
    description: 'A well-planned roadmap aligned with AMC exam standards for systematic progress.'
  },
  {
    icon: TrendingUp,
    title: 'Concept-Based Learning',
    description:
      'Emphasis on understanding, not memorizing — covering high-yield clinical knowledge.'
  },
  {
    icon: Video,
    title: 'All Study Materials',
    description:
      'Unlimited access to high-yield notes, recorded lectures, recall discussions, question banks, mock exams.'
  },
  {
    icon: MessageSquare,
    title: 'Interactive Tools',
    description: 'AI-based adaptive mock tests, topic-wise quizzes, and real-time analytics.'
  },
  {
    icon: Award,
    title: 'Custom Study Plans',
    description: 'Structured study plans designed by mentors with weekly targets and reminders.'
  },
  {
    icon: Clock,
    title: 'Performance Tracking',
    description: 'Detailed performance reports, mock test scores, and personalized feedback.'
  }
];

export const TRACKS = [
  {
    code: 'AMC',
    name: 'Australian Medical Council',
    description:
      'Practise medicine in Australia. High-yield topics, recall-based discussions and adaptive mock tests for AMC Part 1.'
  },
  {
    code: 'PLAB',
    name: 'Professional & Linguistic Assessments Board',
    description:
      'Structured preparation for the UK pathway with a clear roadmap, quizzes and mentor support.'
  },
  {
    code: 'FMGE',
    name: 'Foreign Medical Graduate Examination',
    description:
      'Concept-based coaching, question banks and performance analytics to clear the FMGE with confidence.'
  }
];

export const STEPS = [
  {
    title: 'Enroll & get your portal',
    description: 'Pick a plan and unlock the student portal with lectures, notes and question banks.'
  },
  {
    title: 'Learn with experts',
    description:
      'Join 4 live classes a week, revisit the recordings, and follow a mentor-designed study plan.'
  },
  {
    title: 'Practise, measure, improve',
    description:
      'Take adaptive mock tests, see detailed analytics and get personalised feedback until exam day.'
  }
];

export const HERO_STATS = [
  { value: '500+', label: 'IMGs guided to success' },
  { value: '4', label: 'live classes every week' },
  { value: '3', label: 'exam pathways' },
  { value: '1:1', label: 'mentorship' }
];

export const FAQS: FaqItem[] = [
  {
    q: 'Which exams do you prepare me for?',
    a: 'DrLifeBoat offers preparation for the AMC, PLAB and FMGE pathways, with a curriculum built around high-yield topics for each.'
  },
  {
    q: 'How many live classes are there?',
    a: 'There are 4 expert-led live classes every week, focused on high-yield topics, recall-based discussions and live Q&A.'
  },
  {
    q: 'What study materials do I get?',
    a: 'Unlimited access to high-yield notes, recorded lectures, recall discussions, question banks and mock exams through the student portal.'
  },
  {
    q: 'Are there mock tests and performance reports?',
    a: 'Yes. AI-based adaptive mock tests, topic-wise quizzes and real-time analytics show exactly where you stand and what to revise next.'
  },
  {
    q: 'Will I get a personal study plan?',
    a: 'Mentors design structured study plans with weekly targets and reminders, and you receive personalised feedback along the way.'
  },
  {
    q: 'How do I enroll or ask a question first?',
    a: 'Choose a plan on the Pricing page to enroll. If you would like to talk first, call or WhatsApp us — contact details are on the Contact page.'
  }
];
