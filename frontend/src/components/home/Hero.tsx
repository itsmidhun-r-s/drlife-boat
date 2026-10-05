import { Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CheckCircle2, Phone, Sparkles, Video } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { buttonVariants } from '../common/buttonVariants';
import { HERO_STATS } from '../../data/content';
import { SITE } from '../../utils/site';

/** Decorative product preview — sample content, not real student data. */
const PlanPreview = () => (
  <div className="surface relative p-5 sm:p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-slate-500">Sample study plan</p>
        <p className="font-display text-lg font-semibold text-white">This week</p>
      </div>
      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
        Preview
      </span>
    </div>

    <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-primary-300 to-primary-600" />
    </div>

    <ul className="mt-5 space-y-3">
      {[
        { icon: CheckCircle2, text: 'Recall discussion: high-yield topics', done: true },
        { icon: Sparkles, text: 'AI adaptive mock test', done: true },
        { icon: Video, text: 'Live class & Q&A session', done: false },
        { icon: CalendarCheck, text: 'Mentor feedback review', done: false }
      ].map(({ icon: Icon, text, done }) => (
        <li
          key={text}
          className="flex items-center gap-3 rounded-xl border border-white/5 bg-ink-950/60 px-3.5 py-3 text-sm"
        >
          <Icon className={done ? 'h-4 w-4 text-green-400' : 'h-4 w-4 text-primary'} />
          <span className={done ? 'text-slate-400 line-through' : 'text-slate-200'}>{text}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Hero = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="container-custom relative grid items-center gap-12 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-24">
        <div className="animate-fade-in">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            AMC · PLAB · FMGE
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Learn smarter.
            <br />
            <span className="gradient-text">Clear your exam</span> faster.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
            Expert-led classes, AI-powered adaptive mock tests and a structured curriculum — built
            to guide international medical graduates from first lecture to exam day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link to="/courses" className={buttonVariants({ size: 'lg' })}>
              Explore Courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
              View Pricing
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-2 px-2 text-sm font-medium text-slate-400 transition hover:text-white"
            >
              <Phone className="h-4 w-4 text-primary" />
              Talk to an expert
            </a>
          </div>

          <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-3xl font-bold text-white">{s.value}</dt>
                <dd className="mt-1 text-xs leading-snug text-slate-500">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className={reduce ? '' : 'animate-float'}>
            <PlanPreview />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
