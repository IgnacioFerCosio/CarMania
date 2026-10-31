'use client';
/**
 * Fase actual del Cyber, según el reloj del visitante. `null` hasta montar:
 * el HTML del build no sabe en qué fase va a abrirse, así que todo lo que
 * cuelga de esto se pinta como "evento activo" y se corrige al hidratar.
 *
 * `ticks` sólo hace falta para la cuenta regresiva; el resto de los usos lo
 * dejan en false y revisan la fase una vez por minuto.
 */
import { useEffect, useState } from 'react';
import { CYBER } from '@/lib/config';
import { cyberPhaseAt, type CyberPhase } from '@/lib/cyber';

export function useCyberPhase(ticks = false): { phase: CyberPhase | null; now: number | null; on: boolean } {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), ticks ? 1000 : 60_000);
    return () => window.clearInterval(id);
  }, [ticks]);

  const phase = now === null ? null : cyberPhaseAt(now);
  // `on`: hay que pintar el Cyber. Sin montar todavía cuenta como encendido.
  return { phase, now, on: CYBER.enabled && phase !== 'ended' };
}
