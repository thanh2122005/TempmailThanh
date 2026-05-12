import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          950: '#05060f',
          900: '#0b1020',
          800: '#131a2b',
          700: '#1e293b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glass: '0 10px 40px -12px rgba(15, 23, 42, 0.6)',
        glow: '0 0 40px -10px rgba(99, 102, 241, 0.55)',
      },
    },
  },
  plugins: [],
};

export default config;
