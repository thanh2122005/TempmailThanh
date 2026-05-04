import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          950: '#0b1020',
          900: '#131a2b',
          800: '#1e293b'
        },
      },
    },
  },
  plugins: [],
};

export default config;
