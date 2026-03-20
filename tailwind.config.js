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
          frost: '#e2eaef',
          slate: '#4a4f4e',
          mist: '#e9eef2',
        },
        cyber: {
          bg: '#0a0f14',
          'bg-light': '#0f1a22',
          'bg-card': '#0d1820',
          cyan: '#00d4ff',
          'cyan-dim': '#00a3cc',
          'cyan-glow': 'rgba(0, 212, 255, 0.15)',
          'cyan-border': 'rgba(0, 212, 255, 0.25)',
          'cyan-muted': 'rgba(0, 212, 255, 0.08)',
          teal: '#00e5c8',
          grid: 'rgba(0, 212, 255, 0.04)',
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
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.15), inset 0 0 20px rgba(0, 212, 255, 0.05)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.25), inset 0 0 30px rgba(0, 212, 255, 0.08)' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(0, 212, 255, 0.2)' },
          '50%': { borderColor: 'rgba(0, 212, 255, 0.5)' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 7s ease-in-out infinite 1s',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'border-glow': 'border-glow 2s ease-in-out infinite',
        'scan-line': 'scan-line 8s linear infinite',
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(0, 212, 255, 0.3)',
        'glow-md': '0 0 25px -5px rgba(0, 212, 255, 0.4)',
        'glow-lg': '0 0 40px -5px rgba(0, 212, 255, 0.5)',
        'glow-xl': '0 0 60px -10px rgba(0, 212, 255, 0.6)',
        'neon': '0 0 10px rgba(0, 212, 255, 0.3), 0 0 30px rgba(0, 212, 255, 0.1)',
        'neon-strong': '0 0 10px rgba(0, 212, 255, 0.5), 0 0 40px rgba(0, 212, 255, 0.2), 0 0 80px rgba(0, 212, 255, 0.1)',
        'card-rest': '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
