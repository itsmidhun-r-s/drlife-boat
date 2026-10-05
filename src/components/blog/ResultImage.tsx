import { useState } from 'react';
import { initials, type Result } from '../../data/results';
import { cn } from '../../utils/cn';

interface ResultImageProps {
  result: Result;
  /** 'cover' crops to fill the frame (cards); 'contain' shows the whole poster (detail page). */
  fit?: 'cover' | 'contain';
  className?: string;
}

/** Student poster. If the file is missing it falls back to the initials avatar instead of a broken icon. */
const ResultImage = ({ result, fit = 'cover', className }: ResultImageProps) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={cn('grid place-items-center bg-gradient-to-br from-primary-300 to-primary-600', className)} role="img" aria-label={result.name}>
        <span className="font-display text-5xl font-bold text-ink-950">{initials(result.name)}</span>
      </div>
    );
  }

  return (
    <img
      src={result.image}
      alt={`${result.name} — cleared ${result.exam} (${result.session})`}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={cn('bg-surface', fit === 'cover' ? 'object-cover' : 'object-contain', className)}
    />
  );
};

export default ResultImage;
