/**
 * Fases del Cyber — pura, sin React. La usan el banner, el logo y el carrito.
 * Las fechas salen de `CYBER` en config; ver ahí la explicación de cada fase.
 */
import { CYBER } from './config';

export type CyberPhase = 'pre' | 'live' | 'extension' | 'ended';

export const CYBER_STARTS = Date.parse(CYBER.startsAt);
export const CYBER_ENDS = Date.parse(CYBER.endsAt);
export const CYBER_EXTENSION_ENDS = Date.parse(CYBER.extensionEndsAt);

export function cyberPhaseAt(now: number): CyberPhase {
  if (now < CYBER_STARTS) return 'pre';
  if (now <= CYBER_ENDS) return 'live';
  if (now <= CYBER_EXTENSION_ENDS) return 'extension';
  return 'ended';
}

/** A qué hora vence la cuenta que se muestra en cada fase. */
export function cyberTargetOf(phase: Exclude<CyberPhase, 'ended'>): number {
  if (phase === 'pre') return CYBER_STARTS;
  if (phase === 'live') return CYBER_ENDS;
  return CYBER_EXTENSION_ENDS;
}
