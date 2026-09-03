'use client';

/**
 * BEFORE / AFTER — dos fotos del mismo encuadre apiladas, con un divisor
 * vertical que se arrastra para revelar una u otra.
 *
 * - `beforeSrc` es la capa de arriba, recortada desde la izquierda hasta el
 *   divisor. `afterSrc` es la capa de abajo, siempre completa.
 * - Arrastre con mouse y touch; flechas ← → / Home / End con el teclado.
 * - Si una foto todavía no existe, atrás queda un gradiente con la inicial.
 *
 * Se usa en la landing del parasol ("el mismo auto, con y sin parasol").
 */
import { useCallback, useRef, useState } from 'react';
import type { BeforeAfterData } from '@/lib/landings/types';

const STEP = 4; // % que mueve cada flecha

export function BeforeAfter({ data }: { data: BeforeAfterData }) {
  const {
    headline,
    accentWord,
    body,
    beforeSrc,
    beforeAlt,
    beforeLabel,
    afterSrc,
    afterAlt,
    afterLabel,
  } = data;

  const [pos, setPos] = useState(50); // % desde la izquierda
  const boxRef = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return;
    setFromClientX(e.clientX);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - STEP));
    else if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + STEP));
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
    else return;
    e.preventDefault();
  };

  // Corta el headline en la palabra resaltada — mismo criterio que PitchBlock.
  const i = headline.indexOf(accentWord);
  const head = i >= 0 ? headline.slice(0, i) : headline;
  const tail = i >= 0 ? headline.slice(i + accentWord.length) : '';

  return (
    <section className="bg-ink-950 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-4 text-center md:px-6">
        <h2 className="heading-display text-2xl leading-tight sm:text-3xl md:text-5xl">
          {head}
          {i >= 0 && <span className="text-accent">{accentWord}</span>}
          {tail}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
          {body}
        </p>

        <div
          ref={boxRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          className="relative mt-8 aspect-[16/10] w-full touch-none select-none overflow-hidden rounded-2xl ring-1 ring-inset ring-ink-800 sm:mt-10"
        >
          {/* AFTER — capa base, completa */}
          <BAImage src={afterSrc} alt={afterAlt} initial={afterLabel[0]} />

          {/* BEFORE — recortada desde la izquierda hasta el divisor */}
          <div
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <BAImage src={beforeSrc} alt={beforeAlt} initial={beforeLabel[0]} />
          </div>

          {/* Labels fijos en cada esquina inferior */}
          <span className="pointer-events-none absolute bottom-3 left-3 rounded-md bg-black/60 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wider text-white backdrop-blur sm:text-xs">
            {beforeLabel}
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-accent/80 px-2 py-1 font-display text-[10px] font-black uppercase tracking-wider text-white backdrop-blur sm:text-xs">
            {afterLabel}
          </span>

          {/* Divisor + manija */}
          <div
            className="absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90 shadow-[0_0_12px_rgba(0,0,0,0.55)]"
            style={{ left: `${pos}%` }}
          >
            <button
              type="button"
              role="slider"
              aria-label="Comparar sin y con parasol"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(pos)}
              onKeyDown={onKeyDown}
              className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-ink-950 shadow-lg ring-2 ring-white/40"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m9 6-5 6 5 6M15 6l5 6-5 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Una capa de imagen: gradiente + inicial de fondo (visible si la foto no
 * existe) y la foto encima con `object-cover`. `<img>` plano, no next/image:
 * en Cloudflare `/_next/image` no optimiza.
 */
function BAImage({
  src,
  alt,
  initial,
}: {
  src: string;
  alt: string;
  initial: string;
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950 text-7xl font-black italic text-white/5"
      >
        {initial}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </>
  );
}
