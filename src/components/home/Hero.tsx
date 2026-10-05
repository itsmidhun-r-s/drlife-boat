import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, CalendarCheck, Phone, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { buttonVariants } from '../common/buttonVariants';
import { HERO_PROOF, HOME_HERO } from '../../data/home';
import { SITE } from '../../utils/site';

const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-24 h-[34rem] w-[34rem] rounded-full bg-primary/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-tint-sky/70 blur-3xl" />

      <div className="container-custom relative grid items-center gap-14 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:pb-24 lg:pt-20 grid-cols-1">
        <div className="animate-fade-in">
          <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-fg-soft shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            AMC · PLAB · FMGE preparation
          </p>

          <h1 className="mt-6 text-[1.9rem] font-extrabold min-[360px]:text-[2.5rem] sm:text-5xl lg:text-[3.6rem]">
            {HOME_HERO.title} – <span className="gradient-text">{HOME_HERO.highlight}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-soft md:text-xl">{HOME_HERO.lead}</p>
          <p className="mt-3 max-w-xl border-l-2 border-primary pl-4 text-base italic text-muted">
            “{HOME_HERO.quote}”
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/courses" className={buttonVariants({ size: 'lg' })}>
              {HOME_HERO.cta}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href={SITE.phoneHref} className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
              <Phone className="h-4 w-4 text-accent" aria-hidden />
              Talk to an expert
            </a>
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-line pt-7 min-[380px]:grid-cols-3 min-[380px]:gap-6 sm:mt-12 sm:pt-8">
            {HERO_PROOF.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3 min-[380px]:block">
                <dt className="shrink-0 font-display text-3xl font-extrabold text-fg">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mx-auto w-full max-w-[26rem] lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[12rem] rounded-b-3xl border border-line bg-gradient-to-b from-tint-sky to-tint-cream shadow-lift">
            <img
              src="/images/site/doctor.jpg"
              alt="Smiling doctor with a stethoscope"
              width={626}
              height={626}
              className="h-full w-full object-cover object-[50%_20%]"
            />
          </div>

          <div className="surface absolute -left-2 bottom-10 hidden min-[420px]:flex items-center gap-3 p-3.5 pr-5 sm:-left-8">
            <span className="icon-tile h-10 w-10">
              <CalendarCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-fg">4 live classes / week</p>
              <p className="text-xs text-muted">Expert-led, recall-based</p>
            </div>
          </div>

          <div className="surface absolute -right-2 top-14 hidden min-[420px]:flex items-center gap-3 p-3.5 pr-5 sm:-right-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success">
              <BadgeCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="text-sm font-bold text-fg">Free AI mock tests</p>
              <p className="text-xs text-muted">For all our students</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
