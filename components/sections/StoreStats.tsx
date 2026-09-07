'use client';

/**
 * STORE STATS — banda de 3 números, debajo de las reseñas.
 *
 * Equivalente al "500000+ HAPPY CUSTOMERS / 1000000+ PCS SOLD / 50+ COUNTRIES"
 * de CARMOUNT. Los números suben desde 0 cuando la sección entra en pantalla.
 *
 * El servidor pinta el valor FINAL, no un 0: así el número real está en el
 * HTML para quien no ejecute JS y no hay salto de hidratación. Recién después
 * de montar se baja a 0 y arranca la cuenta, y sólo si la sección todavía no
 * se vio. Con `prefers-reduced-motion` no anima: se queda en el final.
 *
 * Ver el aviso sobre `STORE_STATS` en lib/config.ts para el origen de cada
 * cifra — la de unidades es una estimación, no un dato medido.
 */
import { useEffect, useRef, useState } from 'react';
import { STORE_STATS } from '@/lib/config';

const DURATION_MS = 1400;

/** "3.500" → 3500. Los valores vienen con separador de miles es-AR. */
function toNumber(value: string) {
  return Number(value.replace(/\./g, ''));
}

function useCountUp(target: number, start: boolean) {
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / DURATION_MS);
      // easeOutCubic: arranca rápido y frena sobre el final, que es donde el
      // número importa.
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setN(0);
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start]);

  return n;
}

function Stat({
  value,
  suffix,
  label,
  start,
}: {
  value: string;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const n = useCountUp(toNumber(value), start);
  return (
    <li className="px-4 py-6 text-center">
      <p className="font-display text-3xl font-black italic leading-none text-white tabular-nums sm:text-4xl md:text-6xl">
        {n.toLocaleString('es-AR')}
        {suffix && <span className="text-accent">{suffix}</span>}
      </p>
      <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300 sm:text-xs">
        {label}
      </p>
    </li>
  );
}

export function StoreStats() {
  const ref = useRef<HTMLElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setStart(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Una sola vez: una banda que se reinicia en cada scroll marea.
        if (entries.some((e) => e.isIntersecting)) {
          setStart(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="border-y border-ink-800 bg-ink-950 py-12 sm:py-16 md:py-20"
    >
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-6 md:px-6">
        {STORE_STATS.map((s) => (
          <Stat
            key={s.label}
            value={s.value}
            suffix={s.suffix}
            label={s.label}
            start={start}
          />
        ))}
      </ul>
    </section>
  );
}
