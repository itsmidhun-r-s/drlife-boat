import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Reveal from '../common/Reveal';
import { buttonVariants } from '../common/buttonVariants';
import { ADAPTIVE_TEST as T } from '../../data/home';

/** Decorative preview of the test UI — layout only, no real questions. */
const TestPreview = () => (
  <div aria-hidden className="surface relative mx-auto w-full max-w-md p-5 shadow-lift">
    <div className="flex items-center justify-between text-xs font-semibold">
      <span className="text-fg">AMC Part 1 · Adaptive mock</span>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-fg/5 px-2.5 py-1 text-muted">
        <Clock className="h-3.5 w-3.5" /> 03:30:00
      </span>
    </div>
    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/10">
      <div className="h-full w-[6%] rounded-full bg-primary" />
    </div>
    <p className="mt-2 text-xs text-subtle">Question 1 of 150</p>

    <div className="mt-5 space-y-2.5">
      <div className="h-3 w-full rounded bg-fg/10" />
      <div className="h-3 w-11/12 rounded bg-fg/10" />
      <div className="h-3 w-2/3 rounded bg-fg/10" />
    </div>
    <div className="mt-5 space-y-2.5">
      {['A', 'B', 'C', 'D'].map((l, i) => (
        <div key={l} className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 ${i === 1 ? 'border-primary bg-primary/10' : 'border-line'}`}>
          <span className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${i === 1 ? 'bg-primary text-ink-950' : 'bg-fg/10 text-muted'}`}>{l}</span>
          <span className="h-2.5 flex-1 rounded bg-fg/10" />
        </div>
      ))}
    </div>
    <div className="mt-5 flex items-center justify-between rounded-xl bg-fg/5 px-3.5 py-2.5 text-xs">
      <span className="font-semibold text-fg">Difficulty adapts to you</span>
      <span className="flex items-end gap-0.5">
        {[3, 5, 4, 7, 9].map((h, i) => (
          <span key={i} style={{ height: h * 2 }} className="w-1.5 rounded-sm bg-primary" />
        ))}
      </span>
    </div>
  </div>
);

const AdaptiveTest = () => (
  <section className="theme-dark relative overflow-hidden bg-bg py-16 md:py-24">
    <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
    <div aria-hidden className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

    <div className="container-custom relative">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] grid-cols-1">
        <Reveal>
          <p className="eyebrow">{T.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl lg:text-[2.75rem]">
            {T.title} <span className="gradient-text">{T.highlight}</span>
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted">
            {T.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/contact?topic=demo" className={buttonVariants({ size: 'lg' })}>
              {T.cta} <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-semibold text-accent">
              100% free for enrolled students
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <TestPreview />
        </Reveal>
      </div>

      <div className="mt-16">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted">{T.subtitle}</p>
        <h3 className="mt-2 text-center text-2xl font-bold md:text-3xl">{T.featuresTitle}</h3>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
          {T.features.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={(i % 3) * 0.06}>
              <article className="surface surface-hover h-full p-6">
                <span className="icon-tile">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h4 className="mt-4 font-display text-base font-bold text-fg">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="font-display text-xl font-bold text-fg">{T.closing}</p>
          <p className="mt-2 text-muted">{T.closingSub}</p>
          <Link to="/contact?topic=demo" className={buttonVariants({ size: 'lg', className: 'mt-6' })}>
            {T.cta} <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default AdaptiveTest;
