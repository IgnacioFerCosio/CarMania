'use client';

/**
 * Countdown timer para urgencia. Inicia en `hours` desde el momento en
 * que el componente monta (persistido por sesión en localStorage para que
 * el usuario no resetee el timer recargando).
 *
 * Cuando llega a 0, queda en 00:00:00 — la idea no es que el botón
 * desaparezca, solo crear urgencia visual.
 */

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'carmania:countdown:expires';

function getExpiry(hours: number): number {
  if (typeof window === 'undefined') return Date.now() + hours * 3600 * 1000;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const t = parseInt(stored, 10);
    // Si el valor guardado todavía no expiró, usalo. Si ya expiró, reiniciá.
    if (!Number.isNaN(t) && t > Date.now()) return t;
  }
  const t = Date.now() + hours * 3600 * 1000;
  localStorage.setItem(STORAGE_KEY, String(t));
  return t;
}

function formatPart(n: number) {
  return n.toString().padStart(2, '0');
}

export function Countdown({ hours = 24, compact = false }: { hours?: number; compact?: boolean }) {
  const [expiry, setExpiry] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    setExpiry(getExpiry(hours));
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [hours]);

  if (expiry === null) {
    return (
      <div className={compact ? 'h-6 w-32 animate-pulse rounded bg-ink-800' : 'h-12 w-full animate-pulse rounded bg-ink-800'} />
    );
  }

  const diff = Math.max(0, expiry - now);
  const totalSeconds = Math.floor(diff / 1000);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (compact) {
    return (
      <span className="inline-flex items-center gap-1 font-mono text-sm font-semibold tabular-nums text-white">
        <span className="rounded bg-ink-800 px-1.5 py-0.5">{formatPart(h)}</span>
        <span>:</span>
        <span className="rounded bg-ink-800 px-1.5 py-0.5">{formatPart(m)}</span>
        <span>:</span>
        <span className="rounded bg-ink-800 px-1.5 py-0.5">{formatPart(s)}</span>
      </span>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 font-mono">
      <TimeBlock label="hs" value={formatPart(h)} />
      <span className="font-display text-2xl font-bold text-accent">:</span>
      <TimeBlock label="min" value={formatPart(m)} />
      <span className="font-display text-2xl font-bold text-accent">:</span>
      <TimeBlock label="seg" value={formatPart(s)} />
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="rounded-lg bg-ink-950 px-3 py-2 font-display text-2xl font-extrabold tabular-nums text-white shadow-inner ring-1 ring-inset ring-ink-700 md:text-3xl md:px-4 md:py-3">
        {value}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-wider text-ink-400">{label}</span>
    </div>
  );
}
