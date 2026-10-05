import type { LucideIcon } from 'lucide-react';
import { Globe2, Home, Stethoscope, Wallet } from 'lucide-react';

export interface FaqItem {
  q: string;
  a: string;
}

export const FAQ_HERO = {
  title: 'AMC Exam Preparation Course',
  subtitle: 'Become a Registered Doctor in Australia.',
  text: 'Clear the Australian Medical Council (AMC) Exam on your first attempt with the best AMC coaching online. Our program comes with online classes and recorded lectures, extensive study materials, and AI-driven mock tests, making it the perfect AMC Exam Preparation Course for international doctors aiming to migrate to and practice in Australia. Enrol in our proven program today and pass the AMC Exam Australia with confidence and ease.',
  note: 'The Australian Medical Council test is a mandatory certification to prove your competence and expertise as a doctor and get registered with the AMC and the AHPRA (Australian Health Practitioner Regulation Agency).',
  points: [
    '100+ hours of live and recorded AMC video tutorials',
    'Live classes + recorded sessions, study handouts, mock tests, Final AMC exam grand test',
    'Exclusive tips on approaching the AMC MCQ exam for overseas doctors',
    'One-on-one feedback sessions with the AMC trainer',
    'Extended AMC course trainer access',
    'Adaptive AI-driven AMC exam mock tests'
  ]
};

export const WHY_TAKE_AMC: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Globe2,
    title: 'Global Demand, Local Opportunities',
    text: 'Australia is experiencing a growing demand for skilled talent, creating vast opportunities for international medical professionals across urban and regional areas.'
  },
  {
    icon: Home,
    title: 'Smooth Pathway to VISA & Residency',
    text: 'Successfully passing the AMC exams opens doors to work and permanent residency (PR) visa options, helping you build a long-term future in Australia.'
  },
  {
    icon: Stethoscope,
    title: 'Endless Career Possibilities',
    text: 'Working in Australia offers excellent pay, work-life balance, and the chance to be part of a world-class healthcare system.'
  },
  {
    icon: Wallet,
    title: 'Accessible Exam Options',
    text: 'The AMC exam can be taken in many countries around the world, making it convenient and accessible — you can begin your journey right from your home country.'
  }
];

export const WHY_TAKE_AMC_TAGLINE =
  'Enjoy a rewarding career, world-class healthcare system, and a balanced lifestyle — all while making a meaningful impact.';

export const ABOUT_COURSE = {
  paragraphs: [
    'The AMC Exam Preparation Course is for aspiring medical professionals who want to acquire the essential knowledge and skills required to excel in the Australian Medical Council exam.',
    'This course provides a rigorous and systematic approach to preparing for the Australian Medical Council exam. Our experienced AMC instructors have curated a well-structured curriculum to ensure a thorough understanding of the exam content and foster critical thinking skills.',
    'This course covers all the essential subjects and topics tested in the Australian Medical Council exam, including clinical skills, clinical reasoning, medical knowledge, and communication skills.',
    'Students are equipped with effective strategies to tackle exam questions, including multiple-choice questions (MCQs), clinical scenarios, and oral examinations.',
    'The AMC preparation course by dr.lifeboat will help with the smooth visa application and hassle-free migration of candidates.',
    'Personalized feedback and guidance from experienced instructors ensure that students can identify and focus on areas needing improvement, optimizing their preparation and chances of success.'
  ],
  whoFor: [
    'International medical graduates (IMGs) who aspire to practice, pursue post-graduation, migrate, and settle in Australia.',
    'Candidates seeking to take the Australian Medical Council examination with thorough preparation.',
    'International medical graduates attempting the Australian Medical Council exam for the first time.'
  ]
};

export const ABOUT_EXAM = {
  intro: [
    'The Australian Medical Council (AMC) Examination is a mandatory assessment for international medical graduates (IMGs) who wish to practice medicine in Australia. Successfully passing this exam is a key step toward gaining medical registration and building a healthcare career in Australia.',
    'The AMC Exam evaluates the medical knowledge, clinical reasoning, and communication skills of IMGs to ensure they meet the standards expected of Australian medical practitioners.'
  ],
  parts: [
    {
      title: 'AMC Part 1 – MCQ Examination',
      text: 'This is a computer-based multiple-choice exam that tests your theoretical knowledge across various medical disciplines. It is administered by Pearson VUE and can be taken from your home country or at authorized test centres worldwide.'
    },
    {
      title: 'AMC Part 2 – Clinical Examination',
      text: 'This practical exam assesses your clinical and communication skills through structured clinical scenarios. It must be taken in person at an AMC-approved test centre in Australia.'
    }
  ],
  outro:
    'Once both parts of the AMC Examination are successfully completed, candidates become eligible to apply for registration with the Australian Medical Council (AMC) and the Australian Health Practitioner Regulation Agency (AHPRA). This paves the way for applying for a work visa or permanent residency (PR) in Australia, opening up numerous professional and personal opportunities.'
};

export const ELIGIBILITY = {
  paragraphs: [
    'Before applying for the AMC Examination, candidates must undergo an eligibility verification process conducted by the Australian Medical Council (AMC). This initial step ensures that applicants meet the necessary educational qualifications and professional standards to sit for the exam.',
    'During this process, the AMC evaluates key aspects such as academic credentials, registration history, and professional qualifications. While clinical work experience is not mandatory, it may strengthen your overall application.'
  ],
  criteriaIntro: 'The eligibility criteria for the AMC exams is mentioned below:',
  criteria: [
    "Hold a Bachelor's degree in Medicine (MBBS, MD, MS or equivalent) from a recognized medical college or university.",
    'Possess a degree from an institution listed in the World Directory of Medical Schools (WDoMS).'
  ],
  outro:
    'Once eligibility is confirmed, candidates can proceed with the AMC examination process, which includes the AMC Part 1 (MCQ) and AMC Part 2 (Clinical) assessments.'
};

export const PROCEDURE = {
  intro:
    'To become a registered medical practitioner in Australia, international medical graduates must complete a series of steps defined by the Australian Medical Council (AMC) and the Medical Board of Australia. This process begins with selecting the appropriate registration pathway and culminates in obtaining medical registration.',
  pathwaysTitle: 'Choose Your Registration Pathway',
  pathwaysText:
    'The first step is selecting the correct registration pathway based on your qualifications, training, and professional experience. The Medical Board of Australia offers the following pathways:',
  pathways: [
    {
      title: 'Standard Pathway',
      text: 'For IMGs who have completed their medical degree outside Australia and are seeking general registration via the AMC examinations (AMC Part 1 and AMC Clinical Exam).'
    },
    {
      title: 'Competent Authority Pathway',
      text: 'For candidates who have completed medical training and licensure in a country recognized by the Medical Board (e.g., UK, USA, Canada, New Zealand, or Ireland).'
    },
    {
      title: 'Specialist Pathway',
      text: 'For specialists who are internationally trained and wish to be recognized as a specialist in Australia.'
    },
    {
      title: 'Short-Term Training in a Medical Specialty Pathway',
      text: 'For IMGs undertaking supervised, short-term specialist training (typically up to 24 months).'
    }
  ],
  after:
    'After selecting the appropriate pathway, candidates must proceed with the eligibility verification.',
  stepsTitle: 'Steps to Becoming a Registered Doctor in Australia via the AMC Pathway',
  stepsIntro:
    'International Medical Graduates (IMGs) seeking to practice medicine in Australia must follow a structured pathway guided by the Australian Medical Council (AMC) and the Medical Board of Australia. Below is a step-by-step breakdown of the complete AMC process:'
};

export const EXAM_FORMAT = {
  intro:
    'The Australian Medical Council (AMC) Examination is designed to assess the medical knowledge, clinical reasoning, and communication skills of International Medical Graduates (IMGs) aspiring to practice medicine in Australia. It is conducted in two parts:',
  part1: {
    title: 'Part 1: AMC MCQ Examination',
    facts: [
      { label: 'Duration', value: '3.5 hours' },
      { label: 'Format', value: '150 Multiple Choice Questions (MCQs)' },
      { label: 'Scoring', value: 'The exam is scored on a scale of 0 to 500' },
      { label: 'Passing Score', value: '250' },
      { label: 'Negative Marking', value: 'No negative marking is applied' }
    ],
    text: 'The MCQ exam evaluates a candidate’s core medical knowledge across disciplines including general medicine, surgery, paediatrics, psychiatry, obstetrics, and gynaecology. This test can be taken online through designated Pearson VUE testing centers worldwide.'
  },
  part2: {
    title: 'Part 2: AMC Clinical Examination',
    facts: [
      {
        label: 'Structure',
        value: '16 Objective Structured Clinical Examination (OSCE) stations, 4 rest stations, 2 unscored pilot stations'
      },
      {
        label: 'Timing per station',
        value: '10 minutes total: 2 minutes for reading time, 8 minutes for assessment'
      },
      { label: 'Passing Requirement', value: 'Pass at least 9 of the 16 scored OSCE stations' },
      { label: 'Format', value: 'Can be taken online or in-person' },
      { label: 'Attempt Limit', value: 'No restriction on the number of attempts' }
    ],
    text: 'The AMC Clinical Exam assesses a candidate’s practical clinical skills, patient interaction, and diagnostic abilities. It simulates real-life medical scenarios and is an essential requirement for progressing toward registration with the Medical Board of Australia.'
  }
};

/** The WordPress page lists the first three questions; the answers come from its Exam Format section. */
export const FAQS: FaqItem[] = [
  { q: 'What is the duration of the AMC – MCQ Examination?', a: 'The AMC MCQ Examination lasts 3.5 hours.' },
  {
    q: 'Is there a negative marking in the AMC – MCQ Examination?',
    a: 'No. There is no negative marking in the AMC MCQ Examination.'
  },
  {
    q: 'How many questions will be asked in the AMC – MCQ Examination?',
    a: 'The exam has 150 multiple choice questions (MCQs).'
  },
  {
    q: 'What is the passing score for the AMC MCQ Examination?',
    a: 'The exam is scored on a scale of 0 to 500, and the passing score is 250.'
  },
  {
    q: 'What does the AMC Clinical Examination involve?',
    a: 'It has 16 OSCE stations, plus 4 rest stations and 2 unscored pilot stations. You need to pass at least 9 of the 16 scored stations, and there is no restriction on the number of attempts.'
  }
];

export const FAQ_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'why-amc', label: 'Why AMC' },
  { id: 'course', label: 'The course' },
  { id: 'exam', label: 'The exam' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'procedure', label: 'Procedure' },
  { id: 'format', label: 'Exam format' },
  { id: 'faqs', label: 'FAQs' }
];
