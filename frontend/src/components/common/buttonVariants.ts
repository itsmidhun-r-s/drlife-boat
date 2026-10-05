import { cva } from 'class-variance-authority';

/** Reusable styles — also use on <Link> / <a> so every CTA looks identical. */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // dark text on orange: ~9:1 contrast (white on orange was only ~2:1)
        primary: 'bg-primary text-ink-950 shadow-glow hover:-translate-y-0.5 hover:bg-primary-400',
        secondary: 'border border-white/10 bg-white/10 text-white hover:bg-white/15',
        outline: 'border border-primary/60 text-primary hover:bg-primary hover:text-ink-950',
        ghost: 'text-slate-300 hover:bg-white/5 hover:text-white',
        danger: 'bg-red-500 text-white hover:bg-red-600'
      },
      size: {
        sm: 'h-9 px-3.5 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-12 px-7 text-base'
      },
      fullWidth: { true: 'w-full' }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);
