import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { buttonVariants } from '../common/buttonVariants';
import Reveal from '../common/Reveal';
import { SITE } from '../../utils/site';

const CTA = () => (
  <section className="section pb-0">
    <div className="container-custom">
      <Reveal>
        <div className="theme-dark relative overflow-hidden rounded-3xl bg-bg px-6 py-14 text-center shadow-lift md:px-12 md:py-16">
          <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
          <div aria-hidden className="absolute -top-28 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl font-extrabold md:text-4xl">
              Let&apos;s level up your <span className="gradient-text">future, together</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted md:text-lg">
              Tell us where you are in your AMC / PLAB journey and our team will help you pick the right
              course. You can reach us anytime via{' '}
              <a href={`mailto:${SITE.email}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                {SITE.email}
              </a>
              .
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/contact" className={buttonVariants({ size: 'lg' })}>
                Enroll Now
              </Link>
              <a href={SITE.phoneHref} className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                <Phone className="h-5 w-5 text-accent" aria-hidden />
                Call Us Now
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                <MessageCircle className="h-5 w-5 text-success" aria-hidden />
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
