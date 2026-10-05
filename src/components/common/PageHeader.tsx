interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  children?: React.ReactNode;
}

/** Shared banner for inner pages (Courses, Blogs, Contact, ...). */
const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => (
  <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-tint-cream/70 via-bg to-bg">
    <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-70" />
    <div className="container-custom relative py-12 md:py-20">
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <h1 className="max-w-3xl text-3xl font-extrabold min-[360px]:text-4xl md:text-5xl">{title}</h1>
      {description && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>}
      {children && <div className="mt-8">{children}</div>}
    </div>
  </section>
);

export default PageHeader;
