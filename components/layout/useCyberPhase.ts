'use client';
/**
 * Fase actual del Cyber, según el reloj del visitante.
 *
 * `phase` es `null` hasta hidratar: el HTML del build no sabe en qué fase va a
 * abrirse, así que todo lo que cuelga de esto se pinta como "evento activo" y
 * se corrige al montar (`useSyncExternalStore` con `getServerSnapshot` en null
 * hace exactamente eso, sin warning de hidratación).
 *
 * Todos los que la usan (logos, píldoras, carrito) comparten UN solo timer, y
 * el snapshot es un string: React sólo vuelve a renderizar cuando la fase
 * CAMBIA, no en cada chequeo.
 *
 * `now` sólo existe con `ticks` (la cuenta regresiva del banner): es el único
 * consumidor que necesita un render por segundo.
 */
import { useEffect, useState, useSyncExternalStore } from 'react';
import { CYBER } from '@/lib/config';
import { effectivePhaseAt, isEventPhase, type CyberPhase } from '@/lib/cyber';

const CHECK_EVERY_MS = 15_000;

const listeners = new Set<() => void>();
let timer: number | undefined;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (timer === undefined) {
    timer = window.setInterval(() => listeners.forEach((l) => l()), CHECK_EVERY_MS);
  }
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && timer !== undefined) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}

const getSnapshot = (): CyberPhase | null => effectivePhaseAt(Date.now());
const getServerSnapshot = (): CyberPhase | null => null;

export function useCyberPhase(ticks = false): {
  phase: CyberPhase | null;
  now: number | null;
  on: boolean;
} {
  const phase = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    if (!ticks) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [ticks]);

  // Una pestaña que queda abierta cuando arranca o cierra el evento cambia
  // sola: el atributo de <html> que lee el CSS (`event:`) sigue a la fase.
  useEffect(() => {
    if (!CYBER.enabled || phase === null) return;
    document.documentElement.setAttribute('data-event', isEventPhase(phase) ? 'on' : 'off');
  }, [phase]);

  // `on`: hay que pintar el evento. Sin hidratar todavía cuenta como
  // encendido; si no corresponde, el CSS (`event:`) ya lo tiene oculto.
  return {
    phase,
    now: ticks ? now : null,
    on: CYBER.enabled && (phase === null || isEventPhase(phase)),
  };
}
