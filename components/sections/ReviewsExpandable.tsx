'use client';

/**
 * Grilla de reseñas que arranca cortada y se despliega con "Ver más".
 *
 * Vive aparte de `Reviews` a propósito: la sección es Server Component y sólo
 * esto necesita estado. Se usa únicamente cuando la landing pasa
 * `collapseAfter`; sin ese prop, `Reviews` renderiza la lista entera sin
 * mandar una línea de JS (es lo que hace `/`).
 *
 * Las reseñas ocultas NO están en el DOM: con `line-clamp` y fotos por card,
 * dejarlas montadas y taparlas con CSS cargaría las imágenes igual.
 */
import { useState } from 'react';
import type { Review } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { ReviewCard } from './ReviewCard';

export function ReviewsExpandable({
  reviews,
  collapseAfter,
}: {
  reviews: readonly Review[];
  collapseAfter: number;
}) {
  const [open, setOpen] = useState(false);
  const shown = open ? reviews : reviews.slice(0, collapseAfter);
  const restantes = reviews.length - collapseAfter;

  return (
    <>
      <ul
        id="reviews-grid"
        className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4"
      >
        {shown.map((r, i) => (
          <ReviewCard key={r.name + r.date} review={r} index={i} />
        ))}
      </ul>

      <div className="mt-7 flex justify-center sm:mt-9">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="reviews-grid"
          className="inline-flex items-center gap-2 rounded-full border border-ink-700 bg-ink-950 px-7 py-3.5 font-display text-xs font-black uppercase italic tracking-wider text-white transition hover:border-accent hover:text-accent sm:text-sm"
        >
          {open ? 'Ver menos' : `Ver las ${restantes} restantes`}
          <Icon
            name="chevron-down"
            className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>
      </div>
    </>
  );
}
