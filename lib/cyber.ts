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

const DAY_MS = 24 * 60 * 60 * 1000;
/** Argentina es UTC−3 todo el año (sin horario de verano): su medianoche es 03:00 UTC. */
const ART_OFFSET_MS = 3 * 60 * 60 * 1000;

/** La próxima medianoche argentina. A las 00:00:00 exactas devuelve la del día siguiente. */
export function nextMidnightART(now: number): number {
  return (Math.floor((now - ART_OFFSET_MS) / DAY_MS) + 1) * DAY_MS + ART_OFFSET_MS;
}

/**
 * A qué hora vence la cuenta que se muestra.
 *
 * Antes del evento cuenta hasta que empieza. Una vez en marcha (y en la
 * extensión) la cuenta es SIEMPRE de hasta 24 h: vence a la medianoche de
 * Argentina y se reinicia sola cada día, hasta que se apague a mano
 * (`CYBER.enabled = false`) o pase `extensionEndsAt`.
 */
export function cyberTargetOf(phase: Exclude<CyberPhase, 'ended'>, now: number): number {
  if (phase === 'pre') return CYBER_STARTS;
  return nextMidnightART(now);
}
