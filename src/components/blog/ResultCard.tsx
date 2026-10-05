import { Link } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';
import { resultMessage, type Result } from '../../data/results';
import { cn } from '../../utils/cn';
import ResultImage from './ResultImage';

const ResultCard = ({ result, className }: { result: Result; className?: string }) => (
  <Link
    to={`/blogs/${result.slug}`}
    className={cn(
      'surface group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-primary/40',
      className
    )}
  >
    <div className="relative aspect-[10/11] overflow-hidden bg-surface">
      <ResultImage
        result={result}
        className="h-full w-full transition duration-500 group-hover:scale-105"
      />
    </div>

    <div className="flex flex-1 flex-col p-5">
      <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-accent">
        <PartyPopper className="h-3.5 w-3.5" /> Congratulations!
      </p>
      <h3 className="mt-1 text-lg font-semibold text-fg">{result.name}</h3>
      {result.place && <p className="text-sm text-subtle">{result.place}</p>}
      <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
        <span className="rounded-full bg-primary/15 px-2.5 py-1 text-accent">
          {result.exam} · {result.session}
        </span>
        <span className="rounded-full bg-fg/5 px-2.5 py-1 text-fg-soft">{result.mode}</span>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{resultMessage(result)}</p>
    </div>
  </Link>
);

export default ResultCard;
