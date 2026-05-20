'use client';
/**
 * COUNTDOWN BANNER — franja roja fija en el tope de la página.
 * Cuenta regresiva de 8 horas desde la primera visita.
 * Al vencer, resetea automáticamente por otras 8 horas.
 * El deadline persiste en localStorage (clave: carmania_offer_deadline).
 */
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'carmania_offer_deadline';
const DURATION_MS = 8 * 60 * 60 * 1000; // 8 horas en ms

function getOrCreateDeadline(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const deadline = parseInt(stored, 10);
      if (!isNaN(deadline) && deadline > Date.now()) {
        return deadline;
      }
    }
    // Primera visita o deadline vencido — crear uno nuevo
    const newDeadline = Date.now() + DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(newDeadline));
    return newDeadline;
  } catch {
    // Navegación privada u otro error de acceso
    return Date.now() + DURATION_MS;
  }
}

type TimeLeft = { hh: string; mm: string; ss: string };

function calcTimeLeft(ms: number): TimeLeft {
  if (ms <= 0) return { hh: '00', mm: '00', ss: '00' };
  const total = Math.floor(ms / 1000);
  return {
    hh: String(Math.floor(total / 3600)).padStart(2, '0'),
    mm: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
    ss: String(total % 60).padStart(2, '0'),
  };
}

export function CountdownBanner() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    let deadline = getOrCreateDeadline();

    const tick = () => {
      const left = deadline - Date.now();
      if (left <= 0) {
        // Resetear a otro ciclo de 8 horas
        deadline = Date.now() + DURATION_MS;
        try {
          localStorage.setItem(STORAGE_KEY, String(deadline));
        } catch {}
        setTime(calcTimeLeft(DURATION_MS));
      } else {
        setTime(calcTimeLeft(left));
      }
    };

    tick(); // mostrar de inmediato, sin esperar 1 s
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Banner fijo — 40 px de alto (h-10) */}
      <div
        aria-label="Oferta por tiempo limitado"
        className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-center gap-2 bg-accent px-4 sm:gap-3"
      >
        {/* Label */}
        <span className="flex items-center gap-1.5 font-display text-[11px] font-black italic uppercase tracking-widest text-white sm:text-xs">
          <span aria-hidden="true">🔥</span>
          Oferta relámpago
        </span>

        {/* Separador */}
        <span aria-hidden="true" className="h-3.5 w-px bg-white/30" />

        {/* Countdown — tabular-nums para que los dígitos no se muevan */}
        <span className="flex items-center gap-1 font-display text-xs font-extrabold tabular-nums text-white sm:text-sm">
          {time ? (
            <>
              <span className="rounded bg-black/25 px-1.5 py-0.5 leading-none">{time.hh}</span>
              <span className="opacity-60">:</span>
              <span className="rounded bg-black/25 px-1.5 py-0.5 leading-none">{time.mm}</span>
              <span className="opacity-60">:</span>
              <span className="rounded bg-black/25 px-1.5 py-0.5 leading-none">{time.ss}</span>
            </>
          ) : (
            /* Placeholder durante hidratación para evitar layout shift */
            <span className="opacity-0">00:00:00</span>
          )}
        </span>

        {/* CTA discreto (solo desktop) */}
        <a
          href="#pricing"
          className="hidden shrink-0 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-white/30 sm:inline-block"
        >
          Ver oferta
        </a>
      </div>

      {/* Spacer en flujo normal — empuja el contenido de la página hacia abajo */}
      <div aria-hidden="true" className="h-10 w-full" />
    </>
  );
}
