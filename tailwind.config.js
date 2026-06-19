/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Lora', 'Georgia', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        // Globally bumping up font sizes (e.g. xs becomes default sm, sm becomes base)
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'sm': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'base': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],    // 20px
        'xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }],  // 30px
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],    // 36px
        '4xl': ['3rem', { lineHeight: '1' }],            // 48px
      },
      colors: {
        navy: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d7fe',
          300: '#a5bcfc',
          400: '#8198f8',
          500: '#6070f1',
          600: '#4d4de4',
          700: '#3f3cc9',
          800: '#3535a2',
          900: '#1a1a6e',
          950: '#0f0f3d',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        crimson: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
        'gold': '0 4px 20px rgba(245, 158, 11, 0.3)',
        'card': '0 1px 3px rgba(0,0,0,0.05), 0 20px 40px rgba(0,0,0,0.08)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.05), 0 30px 60px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
