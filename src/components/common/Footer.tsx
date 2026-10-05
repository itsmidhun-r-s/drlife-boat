import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { SITE } from '../../utils/site';
import Logo from './Logo';

const EXPLORE = [
  { label: 'Home', to: '/' },
  { label: 'Benefits', to: '/#why' },
  { label: 'Our Courses', to: '/courses' },
  { label: 'Our Testimonials', to: '/blogs' },
  { label: 'Our FAQ', to: '/faq' }
];

const COMPANY = [
  { label: 'Company', to: '/about-us' },
  { label: 'Achievements', to: '/blogs' },
  { label: 'Our Goals', to: '/about-us#vision' },
  { label: 'Contact', to: '/contact' },
  { label: 'Student Login', to: '/login' }
];

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: SITE.social.facebook },
  { label: 'Instagram', icon: Instagram, href: SITE.social.instagram },
  { label: 'YouTube', icon: Youtube, href: SITE.social.youtube }
].filter((s) => s.href);

const linkClass = 'text-sm text-muted transition hover:text-accent';

const Footer = () => (
  <footer className="theme-dark mt-16 bg-bg">
    <div className="container-custom grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12 grid-cols-1">
      <div className="lg:col-span-5">
        <Logo />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
          Your trusted partner in your AMC/PLAB journey. Expert-led coaching, high-yield content, and AI-driven adaptive tests for international medical graduates.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              {SITE.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <a href={SITE.phoneHref} className={linkClass}>
              {SITE.phone}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <span className="text-muted">{SITE.address}</span>
          </li>
        </ul>
      </div>

      <nav aria-label="Home links" className="lg:col-span-2 lg:col-start-7">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg">Home</h2>
        <ul className="space-y-2.5">
          {EXPLORE.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Company" className="lg:col-span-2">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg">About Us</h2>
        <ul className="space-y-2.5">
          {COMPANY.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className={linkClass}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {SOCIALS.length > 0 && (
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-fg">Social Profiles</h2>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-fg/5 text-fg-soft transition hover:bg-primary hover:text-ink-950"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="border-t border-line">
      <div className="container-custom flex flex-col items-center justify-between gap-2 py-5 text-sm text-subtle sm:flex-row">
        <p>&copy; {new Date().getFullYear()} DrLifeBoat. All rights reserved.</p>
        <Link to="/admin" className="inline-flex min-h-9 items-center rounded-md px-2 hover:text-fg">
          Admin login
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
