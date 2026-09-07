/**
 * REVIEWS — rediseño con rating breakdown + grid de cards con foto.
 *
 * Header en dos columnas:
 *   Izquierda: "RESEÑAS" + rating promedio grande
 *   Derecha:   Barras de % por estrella (5/4/3/2/1)
 *
 * Cards: imagen del cliente, nombre + verified, stars y texto con clamp. El
 * markup de la card vive en `ReviewCard`, compartido con la variante que se
 * despliega.
 *
 * La grilla se puede reemplazar pasando `children` — es lo que hacen
 * /parasol y /soplador con `ReviewsExpandable`, que corta en 8 y suma un
 * "Ver más".
 *
 * Por qué un slot y no un prop `collapseAfter`: con el prop, este archivo
 * tenía que importar el componente cliente, y ese import mete la referencia
 * en el manifiesto de TODA ruta que renderice Reviews — `/` se llevaba ~1 kB
 * de JS por una rama que nunca toma. Con el slot, el import vive en la página
 * que lo usa y `/` no se entera.
 *
 * Cuando integres un sistema real de reviews (Loox / Judge.me / Stamped),
 * reemplazá REVIEWS por el fetch de su API manteniendo el mismo shape
 * y agregá `image: '/reviews/<n>.jpg'` por review.
 */
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { Stars } from '@/components/ui/Stars';
import { ReviewCard } from './ReviewCard';

export function Reviews({
  config = SOPORTE,
  children,
}: {
  config?: LandingConfig;
  /** Reemplaza la grilla por defecto. Ver `ReviewsExpandable`. */
  children?: React.ReactNode;
} = {}) {
  const { brand, reviews, ratingBreakdown, sectionCopy } = config;
  const { average, total, stars } = ratingBreakdown;
  const maxCount = Math.max(...stars.map((s) => s.count));

  return (
    <section id="reviews" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ── Header: title + rating breakdown ───────────────────────── */}
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          {/* Promedio */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="shrink-0 rounded-2xl border border-ink-800 bg-ink-950 px-4 py-3 text-center sm:px-5 sm:py-4">
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                {average.toFixed(2)}
              </div>
              <Stars rating={average} size={12} />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-black italic uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
                {sectionCopy.reviewsTitle + ' '}<span className="text-accent">{sectionCopy.reviewsTitleAccent}</span>
              </h2>
              <p className="mt-1 text-xs text-ink-400 sm:text-sm">
                Basado en {total} reseñas verificadas
              </p>
            </div>
          </div>

          {/* Barras por estrella */}
          <ul className="space-y-1.5">
            {stars.map((row) => {
              const pct = (row.count / maxCount) * 100;
              return (
                <li key={row.stars} className="flex items-center gap-2.5 text-xs sm:gap-3">
                  <span className="inline-flex w-14 shrink-0 items-center gap-0.5 sm:w-16">
                    <Stars rating={row.stars} size={11} />
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink-800">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-semibold text-ink-200 sm:w-10">
                    {row.count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Grid de reviews ────────────────────────────────────────── */}
        {children ?? (
          <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((r, i) => (
              <ReviewCard key={r.name + r.date} review={r} index={i} />
            ))}
          </ul>
        )}

        {/* Counter de total */}
        <p className="mt-8 text-center text-[13px] leading-relaxed text-ink-400 sm:mt-10 sm:text-sm">
          Sumate a los <span className="font-semibold text-white">{brand.socialProofCount}</span>{' '}
          {sectionCopy.reviewsFooter}
        </p>
      </div>
    </section>
  );
}

