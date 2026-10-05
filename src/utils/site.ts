/** Single source of truth for brand + contact details. */
export const SITE = {
  name: 'DrLifeBoat',
  tagline: 'AMC | PLAB | FMGE Exam Preparation',
  description:
    'Expert AMC, PLAB & FMGE exam preparation. Live classes, AI-powered mock tests, and comprehensive study materials.',
  url: import.meta.env.VITE_APP_URL || 'http://localhost:3000',
  email: 'info@drlifeboat.com',
  supportEmail: 'support@drlifeboat.com',
  phone: '+91 93 44 288 749',
  phoneHref: 'tel:+919344288749',
  whatsapp: 'https://wa.me/919344288749',
  address:
    '3rd Floor, Devashree Plaza, Kilithattil Lane, Ulloor Junction, 695011, Trivandrum, Kerala.',
  // Fill these in with real profile URLs — empty ones are hidden in the footer.
  social: {
    facebook: '',
    instagram: '',
    youtube: ''
  }
} as const;
