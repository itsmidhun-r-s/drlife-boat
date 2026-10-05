/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand orange — 500 is the exact brand colour (#ff9400)
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
        // Deep navy "ink" scale used for the dark UI
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
          900: '#0d1630',
          950: '#060a17'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 8px 30px -8px rgba(255, 148, 0, 0.55)',
        card: '0 20px 50px -24px rgba(0, 0, 0, 0.7)'
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        float: 'float 6s ease-in-out infinite',
        'accordion-down': 'accordion-down 0.25s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: []
};
