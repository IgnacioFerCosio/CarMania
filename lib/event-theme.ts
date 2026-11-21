/**
 * Colores del evento de compra activo (el bloque `CYBER` de lib/config.ts).
 *
 * Los lee `tailwind.config.ts` para armar la escala `cyber-*` (el nombre quedó
 * del primer evento; hoy quiere decir "color del evento") y las variables
 * `--cyber-glow` / `--cyber-glow-soft` de las sombras. Por eso este archivo no
 * importa nada: Tailwind lo carga fuera de Next, sin el alias `@/`.
 *
 * Cambiar de evento = cambiar `EVENT_THEME_ID`. Los colores salen del manual de
 * marca (página "Eventos"). Cada tema define, además de la escala:
 *  - `on`: el color del texto SOBRE el color del evento (botones, píldoras).
 *    El manual prohíbe blanco sobre amarillo/dorado: en Black Friday es negro.
 *  - `band` / `bandMid`: los bordes y el centro del degradé del banner fijo.
 *  - `glow` / `glowSoft`: RGB separado por espacios, para `rgb(var(--x) / a)`.
 */
type EventTheme = {
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  950: string;
  on: string;
  band: string;
  bandMid: string;
  glow: string;
  glowSoft: string;
};

export const EVENT_THEMES = {
  /** Cyber Monday: violeta #7C3AED sobre #121214, texto blanco. */
  cyber: {
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    950: '#1E0A3C',
    on: '#FFFFFF',
    band: '#5B21B6',
    bandMid: '#7C3AED',
    glow: '124 58 237',
    glowSoft: '167 139 250',
  },
  /** Black Friday: negro #000000, blanco y dorado #C9A227. Texto negro sobre dorado. */
  blackFriday: {
    300: '#E9D28A',
    400: '#DDBE55',
    500: '#D4AF37',
    600: '#C9A227',
    700: '#A8851C',
    800: '#5C4A10',
    950: '#0D0B04',
    on: '#000000',
    band: '#000000',
    bandMid: '#17130A',
    glow: '201 162 39',
    glowSoft: '233 210 138',
  },
} as const satisfies Record<string, EventTheme>;

export type EventThemeId = keyof typeof EVENT_THEMES;

export const EVENT_THEME_ID: EventThemeId = 'blackFriday';
export const EVENT_THEME: EventTheme = EVENT_THEMES[EVENT_THEME_ID];
