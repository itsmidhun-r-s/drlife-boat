import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, CheckCircle2, Mail } from 'lucide-react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/common/SectionHeading';
import FaqAccordion from '../components/common/FaqAccordion';
import Reveal from '../components/common/Reveal';
import { buttonVariants } from '../components/common/buttonVariants';
import HowItWorks from '../components/home/HowItWorks';
import WhyAustralia from '../components/home/WhyAustralia';
import CTA from '../components/home/CTA';
import {
  ABOUT_COURSE,
  ABOUT_EXAM,
  ELIGIBILITY,
  EXAM_FORMAT,
  FAQS,
  FAQ_HERO,
  FAQ_SECTIONS,
  PROCEDURE,
  WHY_TAKE_AMC,
  WHY_TAKE_AMC_TAGLINE
} from '../data/faq';
import { SITE } from '../utils/site';
import { cn } from '../utils/cn';

type Fact = { label: string; value: string };

const FactList = ({ title, facts, text }: { title: string; facts: Fact[]; text: string }) => (
  <article className="surface h-full p-7">
    <h3 className="text-xl font-bold">{title}</h3>
    <dl className="mt-5 space-y-3">
      {facts.map((f) => (
        <div key={f.label} className="flex gap-3 text-sm">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <div>
            <dt className="inline font-semibold text-fg">{f.label}: </dt>
            <dd className="inline text-muted">{f.value}</dd>
          </div>
        </div>
      ))}
    </dl>
    <p className="mt-5 text-sm leading-relaxed text-muted">{text}</p>
  </article>
);

const FAQ = () => {
  const [active, setActive] = useState(FAQ_SECTIONS[0].id);

  // Highlight the section currently in view in the sticky nav
  useEffect(() => {
    const els = FAQ_SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -55% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="FAQs – AMC Exam Preparation"
        description="Everything about the AMC exam for international medical graduates: eligibility, procedure, exam format and FAQs."
      />

      {/* Overview */}
      <section id="overview" className="relative overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="container-custom relative grid gap-10 py-14 md:py-20 lg:grid-cols-[1.1fr_0.9fr] grid-cols-1">
          <div>
            <p className="eyebrow mb-3">{FAQ_HERO.subtitle}</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{FAQ_HERO.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">{FAQ_HERO.text}</p>
            <p className="mt-4 text-sm leading-relaxed text-subtle">{FAQ_HERO.note}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/courses?filter=AMC" className={buttonVariants({ size: 'lg' })}>
                View AMC courses
              </Link>
              <Link to="/contact" className={buttonVariants({ variant: 'secondary', size: 'lg' })}>
                Enroll Now
              </Link>
            </div>
          </div>
          <ul className="surface space-y-3.5 p-7">
            {FAQ_HERO.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm text-fg-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Sticky in-page nav */}
      <nav aria-label="On this page" className="sticky top-[68px] z-30 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="container-custom flex gap-1 overflow-x-auto py-2.5">
          {FAQ_SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn(
                'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                active === s.id ? 'bg-primary text-ink-950' : 'text-muted hover:text-fg'
              )}
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <WhyAustralia />

      {/* Why take AMC */}
      <section id="why-amc" className="border-y border-line bg-surface-2 section">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Why AMC"
            title={
              <>
                Why should you take the <span className="gradient-text">AMC Exam</span>?
              </>
            }
            description="The Australian Medical Council (AMC) Exam is a crucial step for international medical graduates who aspire to migrate, settle, and practise medicine in Australia."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 grid-cols-1">
            {WHY_TAKE_AMC.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.07}>
                <div className="surface flex h-full gap-5 p-6">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-2xl text-center font-display text-sm font-semibold uppercase tracking-wide text-accent">
            {WHY_TAKE_AMC_TAGLINE}
          </p>
        </div>
      </section>

      {/* About the course */}
      <section id="course" className="section">
        <div className="container-custom grid gap-10 lg:grid-cols-2 grid-cols-1">
          <div>
            <SectionHeading align="left" eyebrow="About the course" title={<>About <span className="gradient-text">The Course</span></>} />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {ABOUT_COURSE.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="surface h-fit p-7 md:p-8">
            <h3 className="text-2xl font-bold">
              Who is the course <span className="gradient-text">for?</span>
            </h3>
            <ul className="mt-5 space-y-4">
              {ABOUT_COURSE.whoFor.map((w) => (
                <li key={w} className="flex gap-3 text-fg-soft">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-accent" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About the exam */}
      <section id="exam" className="border-y border-line bg-surface-2 section">
        <div className="container-custom">
          <SectionHeading eyebrow="About the exam" title={<>About the <span className="gradient-text">AMC Examination</span></>} />
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-center leading-relaxed text-muted">
            {ABOUT_EXAM.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <p className="mt-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The assessment process is divided into two parts
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 grid-cols-1">
            {ABOUT_EXAM.parts.map((p, i) => (
              <article key={p.title} className="surface p-7">
                <span className="font-display text-4xl font-extrabold text-accent/80">0{i + 1}</span>
                <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-relaxed text-muted">{ABOUT_EXAM.outro}</p>
        </div>
      </section>

      {/* Eligibility */}
      <section id="eligibility" className="section">
        <div className="container-custom grid gap-10 lg:grid-cols-2 grid-cols-1">
          <div>
            <SectionHeading align="left" eyebrow="Eligibility" title={<>AMC Exam <span className="gradient-text">Eligibility Criteria</span></>} />
            <div className="mt-6 space-y-4 leading-relaxed text-muted">
              {ELIGIBILITY.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="surface h-fit p-7 md:p-8">
            <p className="font-semibold text-fg">{ELIGIBILITY.criteriaIntro}</p>
            <ul className="mt-5 space-y-4">
              {ELIGIBILITY.criteria.map((c) => (
                <li key={c} className="flex gap-3 text-fg-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">{ELIGIBILITY.outro}</p>
          </div>
        </div>
      </section>

      {/* Procedure */}
      <section id="procedure" className="border-y border-line bg-surface-2 section">
        <div className="container-custom">
          <SectionHeading eyebrow="Procedure" title={<>Procedure for <span className="gradient-text">AMC Exam</span></>} description={PROCEDURE.intro} />
          <h3 className="mt-14 text-center text-xl font-bold">{PROCEDURE.pathwaysTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-relaxed text-muted">{PROCEDURE.pathwaysText}</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 grid-cols-1">
            {PROCEDURE.pathways.map((p) => (
              <article key={p.title} className="surface p-6">
                <h4 className="font-display text-lg font-semibold text-fg">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-semibold uppercase tracking-wide text-accent">{PROCEDURE.after}</p>
        </div>
      </section>

      <HowItWorks />

      {/* Exam format */}
      <section id="format" className="border-y border-line bg-surface-2 section">
        <div className="container-custom">
          <SectionHeading eyebrow="Exam format" title={<>Exam <span className="gradient-text">Format</span></>} description={EXAM_FORMAT.intro} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2 grid-cols-1">
            <FactList {...EXAM_FORMAT.part1} />
            <FactList {...EXAM_FORMAT.part2} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="section">
        <div className="container-custom max-w-3xl">
          <SectionHeading
            eyebrow="FAQ"
            title={<>Frequently Asked <span className="gradient-text">Questions</span></>}
          />
          <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted">
            <Mail className="h-4 w-4 text-accent" />
            Still have questions? Contact our team via
            <a href={`mailto:${SITE.supportEmail}`} className="font-medium text-accent hover:underline">
              {SITE.supportEmail}
            </a>
          </p>
          <div className="mt-10">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
};

export default FAQ;
