import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from '../common/Reveal';
import { buttonVariants } from '../common/buttonVariants';
import { AUSTRALIA_BAND, } from '../../data/home';
import { AMC_STEPS } from '../../data/content';

const AustraliaBand = () => (
  <section className="section">
    <div className="container-custom">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-tint-cream via-tint-peach/70 to-tint-sky/60 p-7 md:p-12">
          <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/25 blur-3xl" />
          <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] grid-cols-1">
            <div>
              <h2 className="text-3xl font-extrabold text-ink-950 md:text-4xl">{AUSTRALIA_BAND.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-700 md:text-lg">{AUSTRALIA_BAND.text}</p>
              <Link to="/faq" className={buttonVariants({ variant: 'dark', size: 'lg', className: 'mt-7' })}>
                {AUSTRALIA_BAND.cta} <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <ol className="grid gap-2.5 sm:grid-cols-2 grid-cols-1">
              {AMC_STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-3 rounded-xl border border-white/70 bg-white/70 p-3.5 backdrop-blur">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink-950 text-xs font-bold text-white">{i + 1}</span>
                  <span className="text-sm font-medium leading-snug text-ink-950">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default AustraliaBand;
