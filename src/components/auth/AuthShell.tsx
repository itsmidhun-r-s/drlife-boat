import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Logo from '../common/Logo';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const PERKS = [
  '4 expert-led live classes every week',
  'AI-based adaptive mock tests',
  'Mentor-designed study plans'
];

/** Split-screen layout shared by Login and Register. */
const AuthShell = ({ title, subtitle, children, footer }: AuthShellProps) => (
  <div className="grid min-h-screen lg:grid-cols-2 grid-cols-1">
    <aside className="theme-dark relative hidden overflow-hidden bg-bg lg:block">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -left-20 top-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
      />
      <div className="relative flex h-full flex-col justify-between p-12">
        <Logo />
        <div>
          <h2 className="max-w-md text-4xl font-bold leading-tight">
            Your path to <span className="gradient-text">AMC, PLAB &amp; FMGE</span> success starts
            here.
          </h2>
          <ul className="mt-8 space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-fg-soft">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-subtle">&copy; {new Date().getFullYear()} DrLifeBoat</p>
      </div>
    </aside>

    <main className="flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <Logo className="mb-8 lg:hidden" />
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-muted">{footer}</p>
        <p className="mt-8 text-center text-xs text-subtle">
          <Link to="/" className="hover:text-muted">
            &larr; Back to website
          </Link>
        </p>
      </div>
    </main>
  </div>
);

export default AuthShell;
