/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        arkova: {
          steel: '#82b8d0',
          'steel-light': '#a8d1e2',
          'steel-dark': '#3d8aad',
          deep: '#5496ba',
          ocean: '#2f7495',
          charcoal: '#303433',
          'charcoal-light': '#3a3f3e',
          ice: '#dbeaf1',
          frost: '#edf5f9',
          slate: '#4a4f4e',
          mist: '#f4f8fa',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 1s',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(130, 184, 208, 0.3)',
        'glow-md': '0 0 25px -5px rgba(130, 184, 208, 0.4)',
        'glow-lg': '0 0 40px -5px rgba(130, 184, 208, 0.5)',
        'card-rest': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
