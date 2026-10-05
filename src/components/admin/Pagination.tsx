import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../common/Button';

interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onChange: (page: number) => void;
}

const Pagination = ({ page, limit, total, onChange }: PaginationProps) => {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (total <= limit) return total ? <p className="mt-4 text-sm text-muted">{total} total</p> : null;
  const from = (page - 1) * limit + 1;
  const to = Math.min(total, page * limit);

  return (
    <nav aria-label="Pagination" className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted">
        Showing {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={() => onChange(page - 1)} disabled={page <= 1} aria-label="Previous page">
          <ChevronLeft className="h-4 w-4" aria-hidden /> Prev
        </Button>
        <span className="px-1 text-sm text-fg-soft">
          {page} / {pages}
        </span>
        <Button variant="secondary" size="sm" onClick={() => onChange(page + 1)} disabled={page >= pages} aria-label="Next page">
          Next <ChevronRight className="h-4 w-4" aria-hidden />
        </Button>
      </div>
    </nav>
  );
};

export default Pagination;
