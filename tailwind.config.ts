import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // PrivJob Design System Colors
        'pj-page-bg': '#F8F8F8',
        'pj-card-bg': '#FFFFFF',
        'pj-border': '#E8E8E8',
        'pj-border-subtle': '#E0E0E0',
        'pj-text-primary': '#111111',
        'pj-text-secondary': '#707070',
        'pj-text-muted': '#A0A0A0',
        'pj-text-inverse': '#FFFFFF',
        'pj-action-blue': '#0064FF',
        'pj-chip-yellow': '#FFBA0A',
        'pj-chip-green': '#00CB88',
        'pj-chip-purple': '#5B43AB',
        'pj-focus-blue': '#0064FF',
        'pj-error': '#DC2626',
        'pj-success': '#059669',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'pj-xs': ['12px', { lineHeight: '1.2' }],
        'pj-sm': ['13px', { lineHeight: '1.35' }],
        'pj-md': ['14px', { lineHeight: '1.5' }],
        'pj-lg': ['16px', { lineHeight: '1.5' }],
        'pj-xl': ['20px', { lineHeight: '1.35' }],
        'pj-2xl': ['24px', { lineHeight: '1.2' }],
      },
      borderRadius: {
        'pj-card': '16px',
        'pj-row': '12px',
        'pj-button': '12px',
        'pj-chip': '10px',
      },
      boxShadow: {
        'pj-card': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'pj-row-hover': '0 6px 18px rgba(0, 0, 0, 0.06)',
        'pj-button': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'pj-focus': '0 0 0 2px #0064FF',
      },
      spacing: {
        'pj-brand-gap': '16px',
        'pj-card-gap': '16px',
        'pj-filter-gap': '12px',
        'pj-gutter': '24px',
        'pj-gutter-lg': '32px',
      },
      animation: {
        'pj-hover': 'pj-hover 120ms ease-out',
        'pj-active': 'pj-active 80ms ease-out',
      },
      keyframes: {
        'pj-hover': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-2px)' },
        },
        'pj-active': {
          '0%': { transform: 'translateY(-2px)' },
          '100%': { transform: 'translateY(1px)' },
        },
      },
      backgroundImage: {
        'pj-gradient-warm-magenta': 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 25%, #FFB6C1 50%, #DDA0DD 75%, #DA70D6 100%)',
        'pj-gradient-focus-ring': 'linear-gradient(135deg, #FF6B6B 0%, #DA70D6 100%)',
      },
    },
  },
  plugins: [],
  prefix: 'pj-',
}
export default config
