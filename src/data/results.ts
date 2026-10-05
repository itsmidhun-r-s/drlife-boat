import cancerCareImage from '../../assets/blogs/our specialists/Cancer Care.png';
import cardiologyImage from '../../assets/blogs/our specialists/Cardiology.png';
import gastroenterologyImage from '../../assets/blogs/our specialists/Gastroenterology.png';
import neurologyImage from '../../assets/blogs/our specialists/Neurology.png';
import obstetricsGynecologyImage from '../../assets/blogs/our specialists/Obstetrics & Gynecology.png';
import orthopedicsTraumaImage from '../../assets/blogs/our specialists/Orthopedics & Trauma.png';

export interface Result {
  slug: string;
  name: string;
  /** College or city, when the original post shows one. */
  place?: string;
  mode: 'Online' | 'Offline';
  exam: string;
  session: string;
  /** Congratulation poster, stored as /public/images/results/<slug>.jpg */
  image: string;
}

const r = (
  slug: string,
  name: string,
  mode: 'Online' | 'Offline',
  session: string,
  place?: string
): Result => ({
  slug,
  name,
  place,
  mode,
  exam: 'AMC 1',
  session,
  image: `/images/results/${slug}.jpg`
});

export const RESULTS: Result[] = [
  r('pooja-vijay-singh', 'Dr. Pooja Vijay Singh', 'Offline', 'August 2026', 'Sree Gokulam Medical College'),
  r('allwyn-samuel', 'Dr. Allwyn Samuel', 'Offline', 'July 2026'),
  r('hridya-varghese', 'Dr. Hridya Varghese', 'Offline', 'July 2026'),
  r('sarang-s-m', 'Dr. Sarang S M', 'Offline', 'July 2026'),
  r('clitty-mathew', 'Dr. Clitty Mathew', 'Online', 'July 2026'),
  r('neha-jha', 'Dr. Neha Jha', 'Online', 'July 2026', 'Haryana'),
  r('adharva-gajanan-telhande', 'Dr. Adharva Gajanan Telhande', 'Online', 'July 2026', 'Mumbai'),
  r('anjana-shivan', 'Dr. Anjana Shivan', 'Online', 'July 2026'),
  r('akhila-chitteddi', 'Dr. Akhila Chitteddi', 'Online', 'July 2026', 'Hyderabad'),
  r('sneha-murugesan', 'Dr. Sneha Murugesan', 'Online', 'July 2026'),
  r('arunima-v', 'Dr. Arunima V', 'Online', 'July 2026')
];

export const findResult = (slug?: string) => RESULTS.find((x) => x.slug === slug);

export const resultMessage = (x: Result) =>
  `Congratulations to our incredible ${x.mode} AMC students on clearing the ${x.exam} ${x.session} Examination! Your dedication, consistency, and perseverance have paid off. We are proud to have been a part of your journey and wish you continued success in your medical career.`;

/** "Dr. Neha Jha" -> "NJ" */
export const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join('');

export const SPECIALITIES = [
  { name: 'Cardiology', image: cardiologyImage },
  { name: 'Cancer Care', image: cancerCareImage },
  { name: 'Gastroenterology', image: gastroenterologyImage },
  { name: 'Obstetrics & Gynecology', image: obstetricsGynecologyImage },
  { name: 'Neurology', image: neurologyImage },
  { name: 'Orthopedics & Trauma', image: orthopedicsTraumaImage }
];
