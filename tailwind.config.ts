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
        // Primary dark colors
        forest: {
          950: '#0a1f14',
          900: '#1a3a2a',
          800: '#1f4a34',
          700: '#245a3e',
          600: '#2a6b49',
        },
        navy: {
          950: '#060d15',
          900: '#0d1b2a',
          800: '#112235',
          700: '#162b42',
          600: '#1c3550',
        },
        // Gold accent
        gold: {
          300: '#f0d060',
          400: '#e8c040',
          500: '#d4af37',
          600: '#b8942a',
          700: '#9c7a20',
        },
        // Card suit colors
        poker: {
          red: '#c0392b',
          black: '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/felt-texture.webp')",
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0d1b2a 0%, #1a3a2a 100%)',
        'card-shine': 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, transparent 50%, rgba(212,175,55,0.05) 100%)',
      },
      boxShadow: {
        'gold': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.2)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulseGold 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}

export default config
