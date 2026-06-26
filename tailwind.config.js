/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-archivo)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Dark cinematic showroom palette
        void: '#030303',
        nearblack: '#08090b',
        graphite: '#121418',
        metal: '#1d2026',
        steel: '#747d8c',
        silver: '#b8c0cc',
        chrome: '#f3f4f6',
        // Light accents — read as reflections, not UI decoration
        spotlight: '#eaf2ff',
        champagne: '#e8d9b5',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        // Slow, expensive, deliberate
        cinematic: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'sweep': 'sweep 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'reveal': 'reveal 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow-pulse': 'glowPulse 6s ease-in-out infinite',
        'drift': 'drift 24s ease-in-out infinite',
      },
      keyframes: {
        // Light sweep that wipes across a masked headline
        sweep: {
          '0%': { backgroundPosition: '-120% 0' },
          '100%': { backgroundPosition: '120% 0' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(18px)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '0.85' },
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(-1.5%, 1%, 0) scale(1.03)' },
        },
      },
    },
  },
  plugins: [],
};
