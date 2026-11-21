'use client';
/**
 * CYBER LOGO — el logo del evento fuera del banner (hero, packs, carrito).
 *
 * Se pinta mientras el Cyber esté activo; pasada la extensión se esconde solo
 * (ver `useCyberPhase`). En la extensión suma una etiqueta "Extensión" debajo.
 *
 * El alto lo define quien lo usa con `className`; los width/height son sólo la
 * relación de aspecto para reservar el lugar.
 */
import { useId } from 'react';
import { CYBER } from '@/lib/config';
import { EVENT_THEME } from '@/lib/event-theme';
import { useCyberPhase } from '@/components/layout/useCyberPhase';

/**
 * El logo del evento: el archivo de `CYBER.logo` si hay uno, o si no el
 * dibujado en SVG (`EventBadge`), que escala con `className` igual que una
 * imagen. Lo usan este componente y el banner.
 */
export function EventMark({
  className,
  priority = false,
}: {
  className: string;
  priority?: boolean;
}) {
  const logo = CYBER.logo;
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo.src}
        alt={CYBER.name}
        width={logo.width}
        height={logo.height}
        decoding="async"
        loading={priority ? undefined : 'lazy'}
        className={`w-auto ${className}`}
      />
    );
  }
  return <EventBadge className={className} />;
}

/**
 * Logo del evento dibujado en SVG (nítido a cualquier tamaño, sin archivo):
 * placa negra con marco dorado de esquinas cortadas, inclinada; el primer
 * renglón en dorado sobre negro y el segundo en negro sobre una franja dorada
 * que se sale del marco. Los dorados salen del tema del evento
 * (lib/event-theme.ts). `useId`: cada copia tiene sus propios degradados,
 * porque una copia oculta (display:none) no puede prestarle el suyo a otra.
 */
function EventBadge({ className }: { className: string }) {
  const id = useId().replace(/:/g, '');
  const metal = `bf-metal-${id}`;
  const metalText = `bf-text-${id}`;
  const [first, ...rest] = CYBER.name.split(' ');
  const T = EVENT_THEME;
  return (
    <svg
      viewBox="0 0 220 150"
      width={220}
      height={150}
      role="img"
      aria-label={CYBER.name}
      className={`w-auto font-display ${className}`}
    >
      <defs>
        <linearGradient id={metal} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={T[700]} />
          <stop offset="0.35" stopColor={T[300]} />
          <stop offset="0.6" stopColor={T[600]} />
          <stop offset="1" stopColor={T[700]} />
        </linearGradient>
        <linearGradient id={metalText} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={T[300]} />
          <stop offset="1" stopColor={T[600]} />
        </linearGradient>
      </defs>
      <g transform="rotate(-6 110 75)">
        {/* Trazos sueltos del marco, por fuera */}
        <path d="M22 14 L92 11" stroke={`url(#${metal})`} strokeWidth="4" strokeLinecap="square" />
        <path d="M128 141 L198 138" stroke={`url(#${metal})`} strokeWidth="4" strokeLinecap="square" />
        {/* Placa negra con esquinas cortadas y marco dorado */}
        <path
          d="M28 22 H196 L206 32 V112 L194 124 H26 L14 112 V36 Z"
          fill="#000"
          stroke={`url(#${metal})`}
          strokeWidth="5"
          strokeLinejoin="miter"
        />
        <text
          x="110"
          y="68"
          textAnchor="middle"
          textLength="160"
          lengthAdjust="spacingAndGlyphs"
          fill={`url(#${metalText})`}
          fontSize="46"
          fontWeight="900"
        >
          {first}
        </text>
        {/* Franja dorada del segundo renglón, más ancha que la placa */}
        <path d="M6 80 H214 L208 120 H0 Z" fill={`url(#${metal})`} />
        <text
          x="107"
          y="114"
          textAnchor="middle"
          textLength="168"
          lengthAdjust="spacingAndGlyphs"
          fill="#000"
          fontSize="40"
          fontWeight="900"
        >
          {rest.join(' ')}
        </text>
      </g>
    </svg>
  );
}

export function CyberLogo({
  className = 'h-12',
  priority = false,
}: {
  className?: string;
  /** Sobre el pliegue (hero): que cargue ya y no `lazy`. */
  priority?: boolean;
}) {
  const { phase, on } = useCyberPhase();
  if (!on) return null;

  return (
    // `hidden event:inline-flex`: antes de hidratar ya se oculta fuera de fecha.
    <span className="relative hidden flex-col items-center event:inline-flex">
      <EventMark priority={priority} className={`drop-shadow-[0_4px_14px_rgb(var(--cyber-glow)/0.55)] ${className}`} />
      {phase === 'extension' && (
        <span className="-mt-1 rounded-full bg-white px-2 py-0.5 font-display text-[9px] font-black italic uppercase tracking-widest text-black shadow-md">
          Extensión
        </span>
      )}
    </span>
  );
}
