/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forge: {
          50: '#fff8f0',
          100: '#ffeedc',
          200: '#ffd9b8',
          300: '#ffbb85',
          400: '#ff924e',
          500: '#ff7020',
          600: '#f05210',
          700: '#c83b0a',
          800: '#9e300f',
          900: '#7e2a10',
          950: '#441205',
        },
        dark: {
          bg: '#0a0d14',
          surface: '#111622',
          card: '#161d2e',
          border: '#232d45',
          muted: '#8e9bb3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
