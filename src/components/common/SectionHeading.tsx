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
    {eyebrow && <p className={cn('eyebrow mb-3', align === 'center' && 'eyebrow-center')}>{eyebrow}</p>}
    <h2 className="text-[1.6rem] font-extrabold min-[360px]:text-3xl md:text-[2.5rem]">{title}</h2>
    {description && <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{description}</p>}
  </div>
);

export default SectionHeading;
