import { Check, Laptop, MapPin } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';
import Reveal from '../common/Reveal';
import { WHAT_WE_DO } from '../../data/home';

const Points = ({ items }: { items: string[] }) => (
  <ul className="mt-4 space-y-2.5">
    {items.map((p) => (
      <li key={p} className="flex items-start gap-3 text-sm font-medium text-fg-soft">
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
        {p}
      </li>
    ))}
  </ul>
);

const WhatWeDo = () => {
  const { offline, online } = WHAT_WE_DO;
  return (
    <section className="section border-y border-line bg-surface-2">
      <div className="container-custom">
        <SectionHeading eyebrow="What we do" title={<>Two ways to <span className="gradient-text">prepare with us</span></>} />

        <div className="mt-12 grid gap-6 lg:grid-cols-2 grid-cols-1">
          <Reveal>
            <article className="surface flex h-full flex-col overflow-hidden">
              <div className="relative aspect-[16/8] overflow-hidden">
                <img src="/images/site/classroom.jpg" alt="Students learning in a classroom with a skeleton model" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden /> {offline.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold">{offline.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{offline.intro}</p>
                <Points items={offline.points} />
                <p className="mt-5 rounded-xl bg-primary/10 px-4 py-3 text-sm font-semibold text-fg">{offline.highlight}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{offline.body}</p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article className="surface flex h-full flex-col overflow-hidden">
              <div className="theme-dark relative aspect-[16/8] overflow-hidden bg-gradient-to-br from-ink-900 to-ink-700">
                <div aria-hidden className="bg-grid absolute inset-0 opacity-60" />
                <div aria-hidden className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-primary/30 blur-3xl" />
                <div aria-hidden className="absolute inset-x-6 bottom-0 top-14 grid grid-cols-5 gap-3">
                  <div className="col-span-3 rounded-t-xl border border-b-0 border-line bg-surface/90 p-3">
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-fg"><span className="h-2 w-2 animate-pulse rounded-full bg-danger" /> LIVE · Medicine recall session</div>
                    <div className="mt-3 grid aspect-video place-items-center rounded-lg bg-fg/10"><Laptop className="h-8 w-8 text-accent" strokeWidth={1.5} /></div>
                  </div>
                  <div className="col-span-2 space-y-3 pt-0.5">
                    <div className="rounded-xl border border-line bg-surface/90 p-3">
                      <p className="text-[11px] font-semibold text-fg">Question bank</p>
                      <div className="mt-2 h-1.5 rounded-full bg-fg/10"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
                    </div>
                    <div className="rounded-xl border border-line bg-surface/90 p-3">
                      <p className="text-[11px] font-semibold text-fg">Analytics</p>
                      <div className="mt-2 flex items-end gap-1">{[4, 7, 5, 9, 12].map((h, i) => <span key={i} style={{ height: h * 2 }} className="w-2 rounded-sm bg-primary" />)}</div>
                    </div>
                  </div>
                </div>
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-xs font-semibold text-fg shadow">
                  <Laptop className="h-3.5 w-3.5 text-accent" aria-hidden /> {online.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-7">
                <h3 className="text-xl font-bold">{online.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{online.intro}</p>
                <Points items={online.points} />
                <p className="mt-5 text-sm leading-relaxed text-muted">{online.body}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
