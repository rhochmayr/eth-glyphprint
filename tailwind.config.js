/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: {
          50: '#faf9f6',
          100: '#f5f3ee',
          200: '#ebe7df',
          300: '#ddd8cc',
        },
        ink: {
          50: '#e8e8e8',
          100: '#c4c4c4',
          200: '#8a8a8a',
          300: '#5a5a5a',
          400: '#3a3a3a',
          500: '#1a1a1a',
          600: '#111111',
          700: '#0a0a0a',
        },
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
      },
      borderWidth: {
        hairline: '0.5px',
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
  plugins: [],
};
