'use client';
/**
 * CYBER BANNER — la franja fija de arriba durante el CyberMonday.
 *
 * Reemplaza al `CountdownBanner` de 8 h mientras `CYBER.enabled` esté en true
 * (ver config). A diferencia de aquél, la cuenta es REAL: va hasta
 * `CYBER.endsAt` para todos los visitantes por igual, no se reinicia ni
 * depende de localStorage.
 *
 *  - antes de `startsAt` → "Empieza en"
 *  - entre `startsAt` y `endsAt` → "Termina en"
 *  - pasado `endsAt` → no se pinta nada (ni el spacer), no vuelve el viejo
 *
 * Se renderiza en el build como un placeholder invisible del mismo ancho, así
 * al montar no se corre nada. Si el visitante entra con el evento ya
 * terminado, la franja se pliega al montar.
 */
import { useEffect, useState } from 'react';
import { CYBER } from '@/lib/config';

const STARTS = Date.parse(CYBER.startsAt);
const ENDS = Date.parse(CYBER.endsAt);

type Phase = 'pre' | 'live' | 'ended';

function phaseAt(now: number): Phase {
  if (now < STARTS) return 'pre';
  if (now <= ENDS) return 'live';
  return 'ended';
}

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
 * 160 px de ancho alcanzan para `h-9` a 2x; el de 720 es para el resto de las
 * piezas del Cyber.
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
      className="h-9 w-auto shrink-0 drop-shadow-[0_0_8px_rgba(196,181,253,0.55)]"
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

export function CyberBanner() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const phase = now === null ? null : phaseAt(now);
  if (phase === 'ended') return null;

  const target = phase === 'pre' ? STARTS : ENDS;
  const t = now === null ? { d: 0, h: 0, m: 0, s: 0 } : parts(target - now);

  return (
    <>
      {/* Mismo alto que el banner original (h-10): el resto del header no se
          entera del cambio. */}
      <div
        aria-label={`${CYBER.name} ${CYBER.untilLabel}`}
        className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-center gap-2 border-b border-cyber-400/40 bg-gradient-to-r from-cyber-800 via-cyber-600 to-cyber-800 px-3 shadow-[0_0_18px_rgba(124,58,237,0.55)] sm:gap-3 sm:px-4"
      >
        <CyberMark />

        <span aria-hidden="true" className="h-3.5 w-px bg-white/30" />

        <span
          className={`flex items-center gap-1.5 transition-opacity ${phase === null ? 'opacity-0' : 'opacity-100'}`}
        >
          <span className="hidden text-[10px] font-bold uppercase tracking-wider text-cyber-300 sm:inline">
            {phase === 'pre' ? 'Empieza en' : 'Termina en'}
          </span>
          <span className="flex items-center gap-1 font-display text-xs font-extrabold tabular-nums text-white sm:text-sm">
            <Box value={pad(t.d)} unit="d" />
            <Box value={pad(t.h)} unit="h" />
            <Box value={pad(t.m)} unit="m" />
            <Box value={pad(t.s)} unit="s" />
          </span>
        </span>

        <a
          href="#pricing"
          className="hidden shrink-0 rounded-full bg-white px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cyber-700 transition hover:bg-cyber-300 md:inline-block"
        >
          Ver oferta
        </a>
      </div>

      {/* Spacer en flujo normal — empuja el contenido de la página hacia abajo */}
      <div aria-hidden="true" className="h-10 w-full" />
    </>
  );
}
