/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        /* ---- Semantic tokens (values live in globals.css; swapped by .theme-dark) ---- */
        bg: token('bg'),
        surface: token('surface'),
        'surface-2': token('surface-2'),
        fg: token('fg'),
        'fg-soft': token('fg-soft'),
        muted: token('muted'),
        subtle: token('subtle'),
        line: token('line'),
        accent: token('accent'),
        success: token('success'),
        warning: token('warning'),
        danger: token('danger'),
        /* Soft tints taken from the WordPress site's section backgrounds */
        tint: {
          sky: '#DAEDF1',
          cream: '#FBF2E4',
          peach: '#F7E9E0',
          lilac: '#E8DDF5'
        },
        /* ---- Fixed brand colours ---- */
        primary: {
          50: '#fff8eb',
          100: '#ffeccc',
          200: '#ffd799',
          300: '#ffbd5c',
          400: '#ffa626',
          500: '#ff9400',
          600: '#e07b00',
          700: '#b85e02',
          800: '#944a09',
          900: '#783e0b',
          DEFAULT: '#ff9400'
        },
        ink: {
          50: '#f3f6fb',
          100: '#e3e9f4',
          200: '#c6d2e8',
          300: '#9db0d0',
          400: '#7388ae',
          500: '#52668c',
          600: '#3a4d73',
          700: '#25365a',
          800: '#17233f',
          900: '#0f1830',
          950: '#0b1020'
        }
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans Variable"', '"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(16,24,40,.04), 0 12px 32px -16px rgba(16,24,40,.16)',
        lift: '0 2px 4px rgba(16,24,40,.05), 0 24px 48px -20px rgba(16,24,40,.28)',
        glow: '0 10px 30px -10px rgba(255,148,0,.55)'
      },
      borderRadius: { xl: '0.875rem', '2xl': '1.25rem' },
      keyframes: {
        'fade-in': { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        // keeps the -50%/-50% centring while fading in (a plain fade-in would overwrite the transform)
        'modal-in': {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.98)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' }
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } }
      },
      animation: {
        'fade-in': 'fade-in 0.35s ease-out both',
        marquee: 'marquee 45s linear infinite',
        'modal-in': 'modal-in 0.2s ease-out both',
        'accordion-down': 'accordion-down 0.22s ease-out',
        'accordion-up': 'accordion-up 0.18s ease-out'
      }
    }
  },
  plugins: []
};
