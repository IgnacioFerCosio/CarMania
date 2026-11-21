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
import { CYBER } from '@/lib/config';
import { useCyberPhase } from '@/components/layout/useCyberPhase';

/**
 * El logo del evento: el archivo de `CYBER.logo` o, mientras no exista, un
 * logo de texto en SVG con los colores del evento (escala con `className`
 * igual que una imagen). Lo usan este componente y el banner.
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
  // Dos renglones, el segundo en el color del evento. `textLength` fija el
  // ancho, así no depende de cuánto mida la fuente al cargar.
  const [first, ...rest] = CYBER.name.split(' ');
  return (
    <svg
      viewBox="0 0 170 110"
      width={170}
      height={110}
      role="img"
      aria-label={CYBER.name}
      className={`w-auto font-display ${className}`}
    >
      <rect x="3" y="3" width="164" height="104" rx="16" className="fill-black stroke-cyber-600" strokeWidth="4" />
      <text x="85" y="51" textAnchor="middle" textLength="132" lengthAdjust="spacingAndGlyphs" className="fill-white" fontSize="40" fontWeight="900" fontStyle="italic">
        {first}
      </text>
      <text x="85" y="92" textAnchor="middle" textLength="140" lengthAdjust="spacingAndGlyphs" className="fill-cyber-600" fontSize="40" fontWeight="900" fontStyle="italic">
        {rest.join(' ')}
      </text>
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
    <span className="relative inline-flex flex-col items-center">
      <EventMark priority={priority} className={`drop-shadow-[0_4px_14px_rgb(var(--cyber-glow)/0.55)] ${className}`} />
      {phase === 'extension' && (
        <span className="-mt-1 rounded-full bg-white px-2 py-0.5 font-display text-[9px] font-black italic uppercase tracking-widest text-black shadow-md">
          Extensión
        </span>
      )}
    </span>
  );
}
