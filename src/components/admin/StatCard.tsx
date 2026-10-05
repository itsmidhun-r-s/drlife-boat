import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
  hint?: string;
}

const StatCard = ({ icon: Icon, label, value, hint }: StatCardProps) => (
  <div className="surface p-5">
    <div className="flex items-center gap-3">
      <span className="icon-tile">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <p className="text-sm font-medium text-muted">{label}</p>
    </div>
    <p className="mt-4 font-display text-3xl font-extrabold text-fg">{value}</p>
    {hint && <p className="mt-1 text-xs text-subtle">{hint}</p>}
  </div>
);

export default StatCard;
