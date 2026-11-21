/**
 * Fases del evento (CYBER en config) — pura, sin React. La usan el banner,
 * los logos, el carrito y el script del <head> que prende/apaga el evento.
 *
 * El evento se ve SÓLO entre `startsAt` y el cierre (`extensionEndsAt`, o
 * `endsAt` si no hay extensión), según el reloj del visitante. Fuera de ahí
 * la página es la de siempre, sin redeploy: el HTML trae las dos versiones y
 * el atributo `data-event` de <html> elige cuál se ve (ver `eventGateScript`).
 */
import { CYBER, showsDrafts } from './config';

export type CyberPhase = 'pre' | 'live' | 'extension' | 'ended';

export const CYBER_STARTS = Date.parse(CYBER.startsAt);
export const CYBER_ENDS = Date.parse(CYBER.endsAt);
/** Sin extensión, el cierre es `endsAt`. */
export const CYBER_EXTENSION_ENDS = CYBER.extensionEndsAt ? Date.parse(CYBER.extensionEndsAt) : CYBER_ENDS;

export function cyberPhaseAt(now: number): CyberPhase {
  if (now < CYBER_STARTS) return 'pre';
  if (now <= CYBER_ENDS) return 'live';
  if (now <= CYBER_EXTENSION_ENDS) return 'extension';
  return 'ended';
}

/** ¿Se ve el evento en esta fase? Antes de empezar y después de cerrar, no. */
export function isEventPhase(phase: CyberPhase): boolean {
  return phase === 'live' || phase === 'extension';
}

/** ¿Se ve el evento en este momento? (con el interruptor `CYBER.enabled`). */
export function eventOnAt(now: number): boolean {
  return CYBER.enabled && isEventPhase(cyberPhaseAt(now));
}

const DAY_MS = 24 * 60 * 60 * 1000;
/** Argentina es UTC−3 todo el año (sin horario de verano): su medianoche es 03:00 UTC. */
const ART_OFFSET_MS = 3 * 60 * 60 * 1000;

/** La próxima medianoche argentina. A las 00:00:00 exactas devuelve la del día siguiente. */
export function nextMidnightART(now: number): number {
  return (Math.floor((now - ART_OFFSET_MS) / DAY_MS) + 1) * DAY_MS + ART_OFFSET_MS;
}

/**
 * A qué hora vence la cuenta que se muestra. Con el evento visible es SIEMPRE
 * la próxima medianoche argentina: la cuenta es de hasta 24 h y se reinicia
 * sola cada día. (`pre` no se muestra: el banner aparece recién al empezar.)
 */
export function cyberTargetOf(phase: Exclude<CyberPhase, 'ended'>, now: number): number {
  if (phase === 'pre') return CYBER_STARTS;
  return nextMidnightART(now);
}

/**
 * Sólo en dev y en las previews: con `CYBER.previewOn` el evento se ve
 * siempre; `?evento=on` / `?evento=off` lo fuerza en la pestaña
 * (sessionStorage) y `?evento=clear` vuelve al default. En producción no
 * existe: el build no incluye este código en el script del <head>.
 */
export const EVENT_OVERRIDE_KEY = 'carmania_evento';

export function eventOverride(): 'on' | 'off' | null {
  if (!showsDrafts() || typeof window === 'undefined') return null;
  try {
    const v = window.sessionStorage.getItem(EVENT_OVERRIDE_KEY);
    if (v === 'on' || v === 'off') return v;
  } catch {
    // sin sessionStorage: sigue con el default de abajo
  }
  return CYBER.previewOn ? 'on' : null;
}

/** La fase que se usa para pintar: la real, o la forzada en dev. */
export function effectivePhaseAt(now: number): CyberPhase {
  const phase = cyberPhaseAt(now);
  const forced = eventOverride();
  if (forced === 'off') return 'ended';
  if (forced === 'on' && !isEventPhase(phase)) return 'live';
  return phase;
}

/**
 * Script inline del <head>: corre antes de pintar y pone `data-event="on"`
 * u `"off"` en <html>. Todo lo del evento cuelga de eso con la variante
 * `event:` de Tailwind, así nadie ve un parpadeo de la otra versión.
 * Sin JS (o con `CYBER.enabled = false`) no hay atributo y se ve la página
 * normal. Las fechas salen de las mismas constantes que usa todo lo demás.
 */
export function eventGateScript(): string | null {
  if (!CYBER.enabled) return null;
  const override = showsDrafts()
    ? `var f=null;try{var q=new URLSearchParams(location.search).get('evento');` +
      `if(q==='on'||q==='off')sessionStorage.setItem('${EVENT_OVERRIDE_KEY}',q);` +
      `if(q==='clear')sessionStorage.removeItem('${EVENT_OVERRIDE_KEY}');` +
      `f=sessionStorage.getItem('${EVENT_OVERRIDE_KEY}');}catch(e){}` +
      `f=f||${CYBER.previewOn ? "'on'" : 'null'};if(f==='on')on=true;if(f==='off')on=false;`
    : '';
  return (
    `(function(){var n=Date.now(),on=n>=${CYBER_STARTS}&&n<=${CYBER_EXTENSION_ENDS};` +
    override +
    `document.documentElement.setAttribute('data-event',on?'on':'off');})();`
  );
}
