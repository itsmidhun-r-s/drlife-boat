interface AdminHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const AdminHeader = ({ title, description, actions }: AdminHeaderProps) => (
  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div className="min-w-0">
      <h1 className="text-2xl font-extrabold md:text-3xl">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-sm text-muted md:text-base">{description}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export default AdminHeader;
