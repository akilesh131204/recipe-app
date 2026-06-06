/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50:  '#fefdf8',
          100: '#fdf9ed',
          200: '#f9f0d3',
          300: '#f3e4b0',
          400: '#ebd282',
          500: '#e0bc55',
        },
        forest: {
          50:  '#f0f7f0',
          100: '#dceddc',
          200: '#b8dab9',
          300: '#88be8a',
          400: '#579b59',
          500: '#3a7d3c',
          600: '#2c6330',
          700: '#254f28',
          800: '#1e3f21',
          900: '#18321a',
        },
        terra: {
          50:  '#fef5f0',
          100: '#fde8dc',
          200: '#fac9b0',
          300: '#f5a07a',
          400: '#ee6f3d',
          500: '#e04e18',
          600: '#c03c10',
          700: '#9e2f0e',
          800: '#7e2510',
          900: '#672010',
        },
        charcoal: {
          50:  '#f5f5f4',
          100: '#e8e6e3',
          200: '#d1cdc8',
          300: '#b2aba3',
          400: '#8f857a',
          500: '#736960',
          600: '#5f5650',
          700: '#4e4640',
          800: '#423b36',
          900: '#1a1612',
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'shimmer': 'shimmer 1.5s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-subtle': 'bounceSlight 2s ease-in-out infinite',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceSlight: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(26,22,18,0.08), 0 1px 2px rgba(26,22,18,0.04)',
        'card-hover': '0 8px 24px rgba(26,22,18,0.12), 0 2px 6px rgba(26,22,18,0.06)',
        'modal': '0 24px 64px rgba(26,22,18,0.2), 0 8px 24px rgba(26,22,18,0.1)',
        'nav': '0 1px 0 rgba(26,22,18,0.08)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
