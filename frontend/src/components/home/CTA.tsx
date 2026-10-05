import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { buttonVariants } from '../common/buttonVariants';
import Reveal from '../common/Reveal';
import { SITE } from '../../utils/site';

const CTA = () => (
  <section className="py-16">
    <div className="container-custom">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 px-6 py-14 text-center md:px-12">
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Ready to clear your <span className="gradient-text">exam?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Join the growing community of successful AMC / PLAB candidates who trust DrLifeBoat
              for an efficient, smart, and focused approach to exam preparation.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/pricing" className={buttonVariants({ size: 'lg' })}>
                Enroll Now
              </Link>
              <a href={SITE.phoneHref} className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                <Phone className="h-5 w-5" />
                Call Us Now
              </a>
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: 'secondary', size: 'lg' })}
              >
                <MessageCircle className="h-5 w-5 text-green-400" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default CTA;
