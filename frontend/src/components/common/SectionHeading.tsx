import { cn } from '../../utils/cn';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}

const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'center',
  className
}: SectionHeadingProps) => (
  <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
    {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
    <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">{title}</h2>
    {description && <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>}
  </div>
);

export default SectionHeading;
