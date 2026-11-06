'use client';
/**
 * CYBER EYEBROW — el "CYBER CARMANIA" que va sobre el título del hero.
 *
 * Es el diferencial de marca del evento, en texto (el logo grande quedó para
 * el banner, los packs y el carrito). Se esconde solo pasada la extensión y
 * en la extensión dice "Extensión Cyber".
 */
import { CYBER } from '@/lib/config';
import { useCyberPhase } from '@/components/layout/useCyberPhase';

export function CyberEyebrow() {
  const { phase, on } = useCyberPhase();
  if (!on) return null;

  return (
    <p className="mb-3 flex items-center justify-center gap-3 sm:mb-4" aria-label={`${CYBER.name} CARMANIA`}>
      <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-transparent to-cyber-400 sm:w-14" />
      <span className="flex items-center gap-1.5 font-display text-[12px] font-black italic uppercase tracking-[0.28em] text-transparent [text-shadow:none] sm:text-sm">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-cyber-300 drop-shadow-[0_0_6px_rgba(167,139,250,0.9)]" fill="currentColor">
          <path d="M13.5 2 5 13.2h5.6L9.4 22 19 10.2h-5.7L13.5 2Z" />
        </svg>
        <span className="bg-gradient-to-r from-cyber-300 via-white to-cyber-400 bg-clip-text drop-shadow-[0_0_10px_rgba(139,92,246,0.85)]">
          {phase === 'extension' ? 'Extensión Cyber' : 'Cyber Carmania'}
        </span>
      </span>
      <span aria-hidden="true" className="h-px w-8 bg-gradient-to-l from-transparent to-cyber-400 sm:w-14" />
    </p>
  );
}
