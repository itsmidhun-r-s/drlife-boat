import { cn } from '../../utils/cn';

export type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'info';

const TONES: Record<Tone, string> = {
  success: 'bg-green-100 text-green-800',
  warning: 'bg-amber-100 text-amber-900',
  danger: 'bg-red-100 text-red-800',
  neutral: 'bg-fg/5 text-fg-soft',
  info: 'bg-sky-100 text-sky-900'
};

const StatusBadge = ({ tone = 'neutral', children }: { tone?: Tone; children: React.ReactNode }) => (
  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', TONES[tone])}>
    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
    {children}
  </span>
);

export default StatusBadge;
