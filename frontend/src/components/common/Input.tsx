import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes
} from 'react';
import { cn } from '../../utils/cn';

const fieldClass =
  'w-full rounded-xl border bg-ink-900/80 px-4 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60';

interface FieldShellProps {
  id: string;
  label?: string;
  error?: string;
  helperText?: string;
  children: ReactNode;
}

const FieldShell = ({ id, label, error, helperText, children }: FieldShellProps) => (
  <div className="w-full">
    {label && (
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
    )}
    {children}
    {error ? (
      <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-400">
        {error}
      </p>
    ) : (
      helperText && <p className="mt-1.5 text-xs text-slate-500">{helperText}</p>
    )}
  </div>
);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  /** Optional element rendered inside the right edge (e.g. a show/hide button). */
  trailing?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, trailing, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <FieldShell id={inputId} label={label} error={error} helperText={helperText}>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              fieldClass,
              'h-11',
              trailing && 'pr-11',
              error ? 'border-red-500/70 focus:ring-red-500/30' : 'border-white/10',
              className
            )}
            {...props}
          />
          {trailing && <div className="absolute inset-y-0 right-2 flex items-center">{trailing}</div>}
        </div>
      </FieldShell>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <FieldShell id={inputId} label={label} error={error} helperText={helperText}>
        <textarea
          ref={ref}
          id={inputId}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            fieldClass,
            'min-h-[140px] resize-y py-3',
            error ? 'border-red-500/70 focus:ring-red-500/30' : 'border-white/10',
            className
          )}
          {...props}
        />
      </FieldShell>
    );
  }
);
Textarea.displayName = 'Textarea';
