import { Loader2 } from 'lucide-react';

/** Suspense fallback shown while a lazy-loaded route chunk downloads. */
const PageLoader = () => (
  <div className="grid min-h-[50vh] place-items-center" role="status" aria-label="Loading">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

export default PageLoader;
