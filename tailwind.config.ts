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
        ink: '#0E0E0E',
        paper: '#F2F0EC',
        signal: '#B3060F',
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
        scrawl: ['var(--font-scrawl)', 'cursive'],
        poster: ['var(--font-poster)', 'Impact', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      letterSpacing: {
        mega: '0.35em',
      },
    },
  },
  plugins: [],
}

export default config
