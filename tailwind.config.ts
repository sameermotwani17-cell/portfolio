import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        paper: '#f5f5f2',
        // legacy aliases still used by carried-over components
        background: '#050505',
        primary: '#f97316',
        secondary: '#3b82f6',
        muted: '#6b7280',
        // scene palettes
        ember: {
          DEFAULT: '#f97316',
          deep: '#c2410c',
          glow: '#fbbf24',
        },
        dusk: {
          DEFAULT: '#8b93c9',
          deep: '#101528',
          navy: '#0a0f1e',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        stencil: ['var(--font-stencil)', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        mega: '0.35em',
      },
    },
  },
  plugins: [],
}

export default config
