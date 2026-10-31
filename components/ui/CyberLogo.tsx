'use client';
/**
 * CYBER LOGO — el logo del evento fuera del banner (hero, packs, carrito).
 *
 * Se pinta mientras el Cyber esté activo; pasada la extensión se esconde solo
 * (ver `useCyberPhase`). En la extensión suma una etiqueta "Extensión" debajo.
 *
 * `size`: `md` (320 px, hero) o `sm` (160 px, packs y carrito). El alto lo
 * define quien lo usa con `className`; los width/height son sólo la relación
 * de aspecto para reservar el lugar.
 */
import { CYBER } from '@/lib/config';
import { useCyberPhase } from '@/components/layout/useCyberPhase';

const SIZES = {
  md: { src: '/cyber/cyber-week-logo-md.webp', width: 320, height: 236 },
  sm: { src: '/cyber/cyber-week-logo-sm.webp', width: 160, height: 118 },
} as const;

export function CyberLogo({
  size = 'sm',
  className = 'h-12',
  priority = false,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  /** Sobre el pliegue (hero): que cargue ya y no `lazy`. */
  priority?: boolean;
}) {
  const { phase, on } = useCyberPhase();
  if (!on) return null;

  const s = SIZES[size];
  return (
    <span className="relative inline-flex flex-col items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={s.src}
        alt={CYBER.name}
        width={s.width}
        height={s.height}
        decoding="async"
        loading={priority ? undefined : 'lazy'}
        className={`w-auto drop-shadow-[0_4px_14px_rgba(124,58,237,0.55)] ${className}`}
      />
      {phase === 'extension' && (
        <span className="-mt-1 rounded-full bg-white px-2 py-0.5 font-display text-[9px] font-black italic uppercase tracking-widest text-cyber-700 shadow-md">
          Extensión
        </span>
      )}
    </span>
  );
}
