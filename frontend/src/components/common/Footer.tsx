import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react';
import { SITE } from '../../utils/site';
import Logo from './Logo';

const EXPLORE = [
  { label: 'Home', to: '/' },
  { label: 'Courses', to: '/courses' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Blogs', to: '/blogs' }
];

const COMPANY = [
  { label: 'About Us', to: '/about-us' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
  { label: 'Login', to: '/login' }
];

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: SITE.social.facebook },
  { label: 'Instagram', icon: Instagram, href: SITE.social.instagram },
  { label: 'YouTube', icon: Youtube, href: SITE.social.youtube }
].filter((s) => s.href);

const linkClass = 'text-sm text-slate-400 transition hover:text-primary';

const Footer = () => (
  <footer className="mt-24 border-t border-white/10 bg-ink-900/50">
    <div className="container-custom grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Logo />
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          Your trusted partner for AMC, PLAB &amp; FMGE exam preparation. Expert-led coaching,
          high-yield content, and adaptive AI-powered learning.
        </p>

        <ul className="mt-6 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <a href={`mailto:${SITE.email}`} className={linkClass}>
              {SITE.email}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <a href={SITE.phoneHref} className={linkClass}>
              {SITE.phone}
            </a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span className="text-slate-400">{SITE.address}</span>
          </li>
        </ul>
      </div>

      <nav aria-label="Explore" className="lg:col-span-2 lg:col-start-7">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Explore</h2>
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
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Company</h2>
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
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Follow</h2>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-primary hover:text-ink-950"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>

    <div className="border-t border-white/5">
      <div className="container-custom py-5 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} DrLifeBoat. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
