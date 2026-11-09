'use client';
/**
 * COUNTDOWN BANNER — franja roja fija en el tope de la página.
 * Un solo banner: oferta especial (cuenta regresiva de 8 horas desde la
 * primera visita) + los beneficios de `PROMO_BARS.benefits` (envío, cuotas…).
 * Mismo formato que tuvo el del Cyber, en los colores de la marca.
 * Al vencer, resetea automáticamente por otras 8 horas.
 * El deadline persiste en localStorage (clave: carmania_offer_deadline).
 */
import { useState, useEffect } from 'react';
import { CYBER, PROMO_BARS } from '@/lib/config';
import { CyberBanner } from './CyberBanner';

const STORAGE_KEY = 'carmania_offer_deadline';
const DURATION_MS = 8 * 60 * 60 * 1000; // 8 horas en ms

function getOrCreateDeadline(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const deadline = parseInt(stored, 10);
      const remaining = deadline - Date.now();
      // Válido solo si no venció Y no supera la duración máxima actual
      if (!isNaN(deadline) && remaining > 0 && remaining <= DURATION_MS) {
        return deadline;
      }
    }
    // Primera visita, deadline vencido o de un ciclo anterior más largo — crear uno nuevo
    const newDeadline = Date.now() + DURATION_MS;
    localStorage.setItem(STORAGE_KEY, String(newDeadline));
    return newDeadline;
  } catch {
    // Navegación privada u otro error de acceso
    return Date.now() + DURATION_MS;
  }
}

type TimeLeft = { h: string; m: string; s: string };

function calcTimeLeft(ms: number): TimeLeft {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    h: String(Math.floor(total / 3600)).padStart(2, '0'),
    m: String(Math.floor((total % 3600) / 60)).padStart(2, '0'),
    s: String(total % 60).padStart(2, '0'),
  };
}

function Box({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="flex items-baseline gap-px rounded bg-black/25 px-1.5 py-0.5 leading-none ring-1 ring-inset ring-white/20">
      <span>{value}</span>
      <span className="text-[8px] font-bold uppercase text-white/70">{unit}</span>
    </span>
  );
}

/** Cuánto se queda cada vista cuando el banner alterna (sólo abajo de xl). */
const HOLD_COUNTDOWN_MS = 4200;
const HOLD_BENEFIT_MS = 2400;

/**
 * Durante el CyberMonday (`CYBER.enabled`) la franja es el `CyberBanner`, con
 * cuenta real. Apagando el flag en config vuelve esta, sin tocar las páginas.
 */
export function CountdownBanner() {
  return CYBER.enabled ? <CyberBanner /> : <OfferBanner />;
}

function OfferBanner() {
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

  // Abajo de xl no entran la cuenta y los beneficios a la vez: el banner
  // alterna entre la cuenta (slot 0) y cada beneficio (slots 1..n). Desde xl
  // se ven todos juntos y esto no se usa.
  const benefits = PROMO_BARS.benefits;
  const [slot, setSlot] = useState(0);
  const slots = benefits.length + 1;
  useEffect(() => {
    const id = window.setTimeout(
      () => setSlot((n) => (n + 1) % slots),
      slot === 0 ? HOLD_COUNTDOWN_MS : HOLD_BENEFIT_MS,
    );
    return () => window.clearTimeout(id);
  }, [slot, slots]);

  const t = time ?? { h: '00', m: '00', s: '00' };

  return (
    <>
      {/* Banner fijo — 40 px de alto (h-10). Es el único elemento del header
          que queda pegado arriba; el navbar scrollea con la página y, cuando
          se va, el acceso al carrito lo cubre `FloatingCartButton`. Todo el
          banner es un link a las promos (en mobile no hay botón). */}
      <a
        href="#pricing"
        aria-label="Oferta especial: ver las ofertas"
        className="group fixed inset-x-0 top-0 z-50 flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden bg-accent px-3 shadow-[0_0_18px_rgba(215,7,7,0.55)] sm:gap-3 sm:px-4"
      >
        {/* Destello cíclico: una franja de luz inclinada que cruza la barra
            (CSS puro, se apaga con prefers-reduced-motion). */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 animate-cyber-shine bg-gradient-to-r from-transparent via-white/40 to-transparent motion-reduce:hidden"
        />

        {/* Cuenta regresiva. Abajo de xl comparte lugar con los beneficios
            (grid de una celda: ambos ocupan el mismo sitio y el ancho lo
            define el más grande, así nada se corre al alternar). Sin tiempo
            todavía (build / antes de hidratar) va invisible con el mismo
            ancho, así montar no corre nada. */}
        <span
          className={`relative grid place-items-center transition-opacity ${time ? 'opacity-100' : 'opacity-0'}`}
        >
          <span
            className={`col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-300 xl:opacity-100 ${
              slot === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex items-center gap-1.5 font-display text-[11px] font-black italic uppercase tracking-widest text-white sm:text-xs">
              {/* Punto "en vivo": reemplaza al emoji, que cambia según el
                  sistema. El aro se apaga con prefers-reduced-motion. */}
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              Oferta especial
            </span>
            <span className="flex items-center gap-1 font-display text-xs font-extrabold tabular-nums text-white sm:text-sm">
              <Box value={t.h} unit="h" />
              <Box value={t.m} unit="m" />
              <Box value={t.s} unit="s" />
            </span>
          </span>

          {/* Beneficios, de a uno (abajo de xl). */}
          {benefits.map((text, i) => (
            <span
              key={text}
              aria-hidden={slot !== i + 1}
              className={`col-start-1 row-start-1 max-w-[190px] text-center font-display text-[10px] font-black uppercase italic leading-[1.1] tracking-wider text-white transition-opacity duration-300 sm:max-w-none sm:whitespace-nowrap sm:text-xs xl:hidden ${
                slot === i + 1 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {text}
            </span>
          ))}
        </span>

        {/* Beneficios, todos juntos (desde xl). */}
        <span aria-hidden="true" className="hidden h-3.5 w-px bg-white/30 xl:block" />
        <ul className="relative hidden items-center gap-x-3 font-display text-[11px] font-black uppercase italic tracking-wider text-white xl:flex">
          {benefits.map((text, i) => (
            <li key={text} className="flex items-center gap-3 whitespace-nowrap">
              {i > 0 && (
                <span aria-hidden="true" className="text-white/60">
                  •
                </span>
              )}
              {text}
            </li>
          ))}
        </ul>

        <span className="relative hidden shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-accent transition group-hover:bg-white/90 md:inline-block">
          Ver oferta
        </span>
      </a>

      {/* Spacer en flujo normal — empuja el contenido de la página hacia abajo */}
      <div aria-hidden="true" className="h-10 w-full" />
    </>
  );
}
