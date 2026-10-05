interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

/** Shared banner for inner pages (Courses, Pricing, About, ...). */
const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => (
  <section className="relative overflow-hidden border-b border-white/5">
    <div aria-hidden className="bg-grid pointer-events-none absolute inset-0" />
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
    />
    <div className="container-custom relative py-14 md:py-20">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400">{description}</p>
      )}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
