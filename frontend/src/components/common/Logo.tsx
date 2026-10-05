import { Link } from 'react-router-dom';
import { LifeBuoy } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
  /** Hide the wordmark and show only the icon. */
  iconOnly?: boolean;
}

const Logo = ({ className, iconOnly }: LogoProps) => (
  <Link
    to="/"
    aria-label="DrLifeBoat home"
    className={cn('group inline-flex items-center gap-2.5', className)}
  >
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary-300 to-primary-600 text-ink-950 shadow-glow transition-transform group-hover:rotate-12">
      <LifeBuoy className="h-5 w-5" strokeWidth={2.4} />
    </span>
    {!iconOnly && (
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Dr<span className="text-primary">Life</span>Boat
      </span>
    )}
  </Link>
);

export default Logo;
