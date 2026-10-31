'use client';
/**
 * CYBER BANNER — la franja fija de arriba durante el CyberMonday.
 *
 * Reemplaza al `CountdownBanner` de 8 h mientras `CYBER.enabled` esté en true
 * (ver config). A diferencia de aquél, la cuenta es REAL: va hasta una fecha
 * fija para todos los visitantes por igual, no se reinicia ni depende de
 * localStorage.
 *
 *  - antes de `startsAt`        → "Empieza en"
 *  - hasta `endsAt`             → "Termina en"
 *  - hasta `extensionEndsAt`    → "Extensión Cyber Week", con cuenta nueva
 *  - pasado todo                → no se pinta nada (ni el spacer)
 *
 * Los cambios de fase ocurren solos, en vivo, sin redeploy.
 *
 * Se renderiza en el build como un placeholder invisible del mismo ancho, así
 * al montar no se corre nada. Si el visitante entra con el evento ya
 * terminado, la franja se pliega al montar.
 *
 * El destello que cruza la barra cada pocos segundos es CSS puro (ver
 * `cyber-shine` en tailwind.config.ts) y se apaga con prefers-reduced-motion.
 */
import { useEffect, useState } from 'react';
import { CYBER } from '@/lib/config';
import { cyberTargetOf } from '@/lib/cyber';
import { useCyberPhase } from './useCyberPhase';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(total / 86400),
    h: Math.floor((total % 86400) / 3600),
    m: Math.floor((total % 3600) / 60),
    s: total % 60,
  };
}

/**
 * Logo del evento (propio, no el de la CACE). `<img>` plano y no next/image:
 * en Cloudflare `/_next/image` no optimiza y `/cyber` se sirve como estático.
 * 160 px de ancho alcanzan para `h-9` a 2x.
 */
function CyberMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/cyber/cyber-week-logo-sm.webp"
      alt={CYBER.name}
      width={160}
      height={118}
      decoding="async"
      className="h-9 w-auto shrink-0 animate-cyber-glow motion-reduce:animate-none"
    />
  );
}

function Box({ value, unit }: { value: string; unit: string }) {
  return (
    <span className="flex items-baseline gap-px rounded bg-cyber-950/60 px-1.5 py-0.5 leading-none ring-1 ring-inset ring-cyber-400/30">
      <span>{value}</span>
      <span className="text-[8px] font-bold uppercase text-cyber-300">{unit}</span>
    </span>
  );
}

/** Cuánto se queda cada vista cuando el banner alterna (sólo abajo de xl). */
const HOLD_COUNTDOWN_MS = 4200;
const HOLD_BENEFIT_MS = 2400;

export function CyberBanner() {
  const { phase, now } = useCyberPhase(true);

  // Abajo de xl no entran la cuenta y los beneficios a la vez: el banner
  // alterna entre la cuenta (slot 0) y cada beneficio (slots 1..n). Desde xl
  // se ven todos juntos y esto no se usa.
  const [slot, setSlot] = useState(0);
  const slots = CYBER.benefits.length + 1;
  useEffect(() => {
    const id = window.setTimeout(
      () => setSlot((n) => (n + 1) % slots),
      slot === 0 ? HOLD_COUNTDOWN_MS : HOLD_BENEFIT_MS,
    );
    return () => window.clearTimeout(id);
  }, [slot, slots]);

  if (phase === 'ended') return null;

  const t =
    phase === null || now === null
      ? { d: 0, h: 0, m: 0, s: 0 }
      : parts(cyberTargetOf(phase) - now);

  const extension = phase === 'extension';
  const label = phase === 'pre' ? 'Empieza en' : extension ? 'Extensión' : 'Termina en';

  return (
    <>
      {/* Mismo alto que el banner original (h-10): el resto del header no se
          entera del cambio. */}
      {/* Todo el banner es un link a las promos (en mobile no hay botón). */}
      <a
        href="#pricing"
        aria-label={`${extension ? CYBER.extensionName : CYBER.name}: ver las ofertas`}
        className="group fixed inset-x-0 top-0 z-50 flex h-10 cursor-pointer items-center justify-center gap-2 overflow-hidden border-b border-cyber-400/40 bg-gradient-to-r from-cyber-800 via-cyber-600 to-cyber-800 px-3 shadow-[0_0_18px_rgba(124,58,237,0.55)] sm:gap-3 sm:px-4"
      >
        {/* Destello cíclico: una franja de luz inclinada que cruza la barra. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/4 -skew-x-12 animate-cyber-shine bg-gradient-to-r from-transparent via-white/40 to-transparent motion-reduce:hidden"
        />

        <CyberMark />

        <span aria-hidden="true" className="h-3.5 w-px bg-white/30" />

        {/* Cuenta regresiva. Abajo de xl comparte lugar con los beneficios
            (grid de una celda: ambos ocupan el mismo sitio y el ancho lo
            define el más grande, así nada se corre al alternar). */}
        <span
          className={`relative grid place-items-center transition-opacity ${phase === null ? 'opacity-0' : 'opacity-100'}`}
        >
          <span
            className={`col-start-1 row-start-1 flex items-center gap-1.5 transition-opacity duration-300 xl:opacity-100 ${
              slot === 0 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span
              className={`text-[10px] font-bold uppercase tracking-wider text-cyber-300 ${
                extension ? 'inline' : 'hidden sm:inline'
              }`}
            >
              {label}
            </span>
            <span className="flex items-center gap-1 font-display text-xs font-extrabold tabular-nums text-white sm:text-sm">
              <Box value={pad(t.d)} unit="d" />
              <Box value={pad(t.h)} unit="h" />
              <Box value={pad(t.m)} unit="m" />
              <Box value={pad(t.s)} unit="s" />
            </span>
          </span>

          {/* Beneficios, de a uno (abajo de xl). */}
          {CYBER.benefits.map((text, i) => (
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
          {CYBER.benefits.map((text, i) => (
            <li key={text} className="flex items-center gap-3 whitespace-nowrap">
              {i > 0 && <span aria-hidden="true" className="text-cyber-300">•</span>}
              {text}
            </li>
          ))}
        </ul>

        <span className="relative hidden shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyber-700 transition group-hover:bg-cyber-300 md:inline-block">
          Ver oferta
        </span>
      </a>

      {/* Spacer en flujo normal — empuja el contenido de la página hacia abajo */}
      <div aria-hidden="true" className="h-10 w-full" />
    </>
  );
}
