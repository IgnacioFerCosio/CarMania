import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { EVENT_THEME as EV } from './lib/event-theme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // CARMANIA brand palette — accent red over a black/white scale.
        accent: {
          DEFAULT: '#D70707',
          50: '#FEE5E5',
          100: '#FCC5C5',
          400: '#F03939',
          500: '#D70707',
          600: '#B00606',
          700: '#7E0404',
        },
        // Color del evento de compra activo (CYBER en lib/config.ts). La escala
        // sale de lib/event-theme.ts: hoy Black Friday (dorado). `on` es el
        // texto que va encima del color; `band`/`band-mid`, el banner fijo.
        cyber: {
          300: EV[300],
          400: EV[400],
          500: EV[500],
          600: EV[600],
          700: EV[700],
          800: EV[800],
          950: EV[950],
          on: EV.on,
          band: EV.band,
          'band-mid': EV.bandMid,
        },
        ink: {
          950: '#0A0A0A',
          900: '#111111',
          800: '#1A1A1A',
          700: '#262626',
          600: '#3A3A3A',
          500: '#5A5A5A',
          400: '#888888',
          300: '#B5B5B5',
          200: '#D8D8D8',
          100: '#EEEEEE',
          50: '#F7F7F7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(0.85)' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        // Barrido de 0 a 1,4 s y descanso el resto del ciclo.
        'cyber-shine': {
          '0%': { transform: 'translateX(-150%) skewX(-12deg)' },
          '28%, 100%': { transform: 'translateX(520%) skewX(-12deg)' },
        },
        // Sólo `transform`: corre en el compositor, sin repintar (animar
        // `filter` en una barra fija gasta batería en mobile).
        'cyber-glow': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        // Banner del Cyber: destello que cruza la barra cada ~5 s y un brillo
        // que respira en el logo. Ver CyberBanner.
        'cyber-shine': 'cyber-shine 5s ease-in-out infinite',
        'cyber-glow': 'cyber-glow 2.4s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 1.2s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
        'marquee': 'marquee 30s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
      },
    },
  },
  plugins: [
    // Sombras y halos del evento: `shadow-[0_0_14px_rgb(var(--cyber-glow)/0.5)]`.
    plugin(({ addBase }) => {
      addBase({ ':root': { '--cyber-glow': EV.glow, '--cyber-glow-soft': EV.glowSoft } });
    }),
  ],
};

export default config;
