import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import logoImage from '../../../assets/logo.png';

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
  <Link
    to="/"
    aria-label="DrLifeBoat home"
    className={cn('group inline-flex min-w-0 items-center', className)}
  >
    <img
      src={logoImage}
      alt="DrLifeBoat"
      className="h-11 w-28 object-contain transition-transform group-hover:scale-[1.03]"
    />
  </Link>
);

export default Logo;
