import { cn } from '../../utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  /** Shown instead of the table when there are no rows. */
  empty?: React.ReactNode;
}

/**
 * A real table on tablets/desktops and a stack of cards on phones (no sideways scrolling).
 * The first column becomes the card title; the other columns become label/value rows.
 */
function DataTable<T>({ columns, rows, rowKey, loading, empty }: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="space-y-3" role="status" aria-label="Loading">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-16" />
        ))}
      </div>
    );
  }
  if (!rows.length) return <>{empty}</>;

  const [first, ...rest] = columns;

  return (
    <>
      {/* tablet / desktop */}
      <div className="surface hidden overflow-hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-surface-2 text-xs uppercase tracking-wide text-muted">
              <tr>
                {columns.map((c) => (
                  <th key={c.key} scope="col" className={cn('whitespace-nowrap px-4 py-3 font-semibold', c.className)}>
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((row) => (
                <tr key={rowKey(row)} className="transition-colors hover:bg-fg/[0.03]">
                  {columns.map((c) => (
                    <td key={c.key} className={cn('px-4 py-3 align-middle text-fg-soft', c.className)}>
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* phones */}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li key={rowKey(row)} className="surface p-4">
            <div className="font-semibold text-fg">{first.cell(row)}</div>
            <dl className="mt-3 space-y-2.5 text-sm">
              {rest.map((c) => (
                <div key={c.key} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                  <dt className="shrink-0 text-xs font-semibold uppercase tracking-wide text-muted">{c.header}</dt>
                  <dd className="min-w-0 text-right text-fg-soft [&_.whitespace-nowrap]:whitespace-normal">{c.cell(row)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export default DataTable;
