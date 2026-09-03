'use client';

/**
 * INSTAGRAM — una sola fila de fotos que avanza sola de a una pantalla.
 *
 * NO consume la API de Instagram: es una grilla curada. El porqué (CSP,
 * token, ISR) está en el bloque `INSTAGRAM` de lib/config.ts. CARMOUNT hace
 * exactamente lo mismo — sus 12 fotos también son estáticas.
 *
 * Cómo funciona el loop, porque tiene una vuelta de tuerca:
 *  - Cada tile ocupa exactamente 1/6 del ancho del riel (1/3 en mobile, 1/4
 *    en sm). Sin `gap`: el aire entre fotos es padding de cada tile. Así
 *    `clientWidth` es SIEMPRE un número exacto de tiles y `scrollBy` avanza
 *    justo una pantalla en cualquier breakpoint, sin cuentas ni matchMedia.
 *  - La lista va DUPLICADA. Cuando terminó de pasar la primera copia,
 *    volvemos el scroll al principio sin animación: lo que se ve en ese
 *    momento es idéntico, así que el salto es invisible y el movimiento
 *    siempre va hacia la derecha.
 *
 * Se frena con el mouse encima, con el foco adentro y con la pestaña en
 * segundo plano. Con `prefers-reduced-motion` no se mueve solo: el riel
 * scrollea a mano (o con las flechas) igual.
 */

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { INSTAGRAM } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

/** Cada cuánto avanza una pantalla. */
const SLIDE_MS = 4000;
/** Margen para dar por terminado el scroll suave antes de rebobinar. */
const SETTLE_MS = 800;

export function InstagramFeed() {
  const { handle, url, count, leadBefore, leadAfter, leadPlain, posts } =
    INSTAGRAM;
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rewind: number | undefined;

    // Se consulta el estado en cada tick en vez de llevarlo en un ref con
    // onMouseEnter/onMouseLeave: un flag puede quedarse trabado en `true` si
    // el puntero sale de la página sin disparar el leave, y el carrusel no
    // vuelve a arrancar nunca. Esto no se puede desincronizar.
    const tick = () => {
      if (document.hidden) return;
      if (el.matches(':hover')) return;
      if (el.contains(document.activeElement)) return;
      el.scrollBy({ left: el.clientWidth, behavior: 'smooth' });
      rewind = window.setTimeout(() => {
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half - 2) el.scrollLeft -= half;
      }, SETTLE_MS);
    };

    const id = window.setInterval(tick, SLIDE_MS);
    return () => {
      window.clearInterval(id);
      if (rewind) window.clearTimeout(rewind);
    };
  }, []);

  // Duplicamos para que el rebobinado no se note (ver comentario de arriba).
  const items = [...posts, ...posts];

  return (
    <section className="bg-[#24262A] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-display text-sm font-black uppercase italic tracking-wide text-white sm:text-base md:text-lg">
          <Icon name="instagram" className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
          {count ? (
            <>
              <span>{leadBefore}</span>
              <span className="text-accent">{count}</span>
              <span>{leadAfter}</span>
            </>
          ) : (
            <span>{leadPlain}</span>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            {handle}
          </a>
        </p>
      </div>

      {/* El riel NO puede tener padding propio: `scrollBy(clientWidth)` avanza
          el ancho del viewport del contenedor, y con padding ese ancho deja de
          ser un múltiplo exacto del tile (se desalinea y el rebobinado salta).
          Los márgenes los pone este wrapper. El `-mx` compensa el padding
          interno de los tiles para que las fotos queden al ras del contenedor
          — es margen, no padding, así que no toca el clientWidth del riel. */}
      <div className="mx-auto mt-7 max-w-7xl px-4 sm:mt-9 md:px-6">
        <div
          ref={trackRef}
          role="region"
          aria-label={`Fotos de ${handle} en Instagram`}
          tabIndex={0}
          className="-mx-1 flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-1.5 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((p, i) => {
            // La segunda copia existe sólo para el loop: fuera del tab order y
            // del árbol de accesibilidad, para no repetir 12 links.
            const clone = i >= posts.length;
            return (
              <div
                key={`${p.image}-${i}`}
                className="w-1/3 shrink-0 grow-0 snap-start px-1 sm:w-1/4 sm:px-1.5 lg:w-1/6"
                {...(clone ? { 'aria-hidden': true } : {})}
              >
                <a
                  // Sin permalink todavía, el tile manda al perfil.
                  href={p.href || url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={clone ? -1 : undefined}
                  aria-label={p.alt || `Ver publicación ${i + 1} en Instagram`}
                  className="group relative block aspect-square overflow-hidden rounded-lg bg-ink-900"
                >
                  {/* Placeholder — mientras carga o si la foto no existe */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950"
                  >
                    <Icon name="instagram" className="h-7 w-7 text-white/10" />
                  </span>

                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay de hover con el glifo, como en las grillas de IG */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/45 group-hover:opacity-100"
                  >
                    <Icon name="instagram" className="h-6 w-6 text-white" />
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
