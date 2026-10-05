import { ShieldCheck } from 'lucide-react';
import SEO from '../components/common/SEO';
import EmptyState from '../components/common/EmptyState';

const AdminDashboard = () => (
  <div className="mx-auto max-w-5xl">
    <SEO title="Admin" />
    <p className="eyebrow">Admin</p>
    <h1 className="mt-2 text-3xl font-bold">Admin dashboard</h1>
    <div className="mt-8">
      <EmptyState
        icon={ShieldCheck}
        title="Admin tools coming soon"
        description="Course, user and subscription management will appear here."
      />
    </div>
  </div>
);

export default AdminDashboard;
