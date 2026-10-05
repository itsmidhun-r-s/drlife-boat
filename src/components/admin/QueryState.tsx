import { AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

/** Friendly error block with a retry button, used by every admin list. */
const QueryError = ({ onRetry, loading }: { onRetry: () => void; loading?: boolean }) => (
  <div role="alert" className="surface flex flex-col items-center px-6 py-12 text-center">
    <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-danger/10 text-danger">
      <AlertCircle className="h-6 w-6" aria-hidden />
    </span>
    <h2 className="text-lg font-bold">We couldn&apos;t load this</h2>
    <p className="mt-1 max-w-sm text-sm text-muted">Check that the backend is running, then try again.</p>
    <Button className="mt-5" variant="secondary" onClick={onRetry} isLoading={loading}>
      Try again
    </Button>
  </div>
);

export default QueryError;
