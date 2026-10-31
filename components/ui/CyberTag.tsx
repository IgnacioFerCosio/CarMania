/**
 * CYBER TAG — la píldora morada del evento ("Semana Cyber · hasta el 4/11").
 *
 * Es de las piezas temporales del CyberMonday: se pinta sólo con
 * `CYBER.enabled` y comparte el morado del `CyberBanner` (tokens `cyber-*`).
 * Server component: no necesita estado, la fecha sale de la config.
 */
import { CYBER } from '@/lib/config';

export function CyberTag({ className = '' }: { className?: string }) {
  if (!CYBER.enabled) return null;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-cyber-400/50 bg-gradient-to-r from-cyber-800 via-cyber-600 to-cyber-800 px-3.5 py-1.5 font-display text-[11px] font-black italic uppercase tracking-widest text-white shadow-[0_0_18px_rgba(124,58,237,0.55)] sm:text-xs ${className}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M13.5 2 5 13.2h5.6L9.4 22 19 10.2h-5.7L13.5 2Z" />
      </svg>
      Semana Cyber
      <span aria-hidden="true" className="h-3 w-px bg-white/40" />
      <span className="text-cyber-300">{CYBER.untilLabel}</span>
    </span>
  );
}
