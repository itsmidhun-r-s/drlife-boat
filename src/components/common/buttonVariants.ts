import { cva } from 'class-variance-authority';

/** One button language for the whole app. Works on <button>, <Link> and <a>. */
export const buttonVariants = cva(
  'inline-flex select-none items-center justify-center gap-2 max-w-full rounded-xl text-center leading-snug font-semibold transition-all duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // dark ink on brand orange: 8:1 contrast
        primary:
          'bg-primary text-ink-950 shadow-[inset_0_1px_0_rgba(255,255,255,.35),0_8px_20px_-8px_rgba(255,148,0,.65)] hover:-translate-y-0.5 hover:bg-primary-400 active:bg-primary-600',
        dark: 'bg-fg text-bg shadow-sm hover:-translate-y-0.5 hover:bg-fg/90',
        secondary: 'border border-line bg-surface text-fg shadow-sm hover:border-fg/30 hover:bg-surface-2',
        outline: 'border border-fg/25 text-fg hover:border-fg hover:bg-fg hover:text-bg',
        ghost: 'text-fg-soft hover:bg-fg/5 hover:text-fg',
        danger: 'bg-danger text-white shadow-sm hover:bg-danger/90'
      },
      size: {
        sm: 'min-h-9 px-3.5 py-1.5 text-sm',
        md: 'min-h-11 px-5 py-2 text-sm',
        lg: 'min-h-12 px-5 py-2.5 text-base sm:px-7'
      },
      fullWidth: { true: 'w-full' }
    },
    defaultVariants: { variant: 'primary', size: 'md' }
  }
);
