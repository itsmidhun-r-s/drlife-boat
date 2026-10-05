import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => (
  <div className="surface mx-auto flex max-w-xl flex-col items-center px-6 py-14 text-center">
    <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-primary/10 text-accent">
      <Icon className="h-7 w-7" />
    </span>
    <h2 className="text-xl font-semibold">{title}</h2>
    {description && <p className="mt-2 max-w-md text-sm text-muted">{description}</p>}
    {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
  </div>
);

export default EmptyState;
