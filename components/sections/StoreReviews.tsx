/**
 * STORE REVIEWS — reseñas de la tienda, formato CARMOUNT.
 *
 * Cada card abre con un título corto en mayúsculas que resume la reseña,
 * después la cita y la firma con ciudad. Es distinto del bloque `Reviews` de
 * las landings, que muestra estrellas, fecha y badge de verificado por reseña.
 *
 * El contenido sale de `STORE_REVIEWS` en config.
 */
import { BRAND, STORE_REVIEWS, STORE_SECTIONS } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';

export function StoreReviews() {
  return (
    <section id="reviews" className="bg-[#24262A] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <p className="eyebrow">{STORE_SECTIONS.reviewsEyebrow}</p>
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {STORE_SECTIONS.reviewsTitle}
          </h2>

          <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-ink-700 bg-ink-950 px-4 py-2 text-xs text-ink-300 sm:text-sm">
            <Stars rating={BRAND.averageRating} />
            <span>
              <strong className="text-white">{BRAND.averageRating}/5</strong> ·{' '}
              {BRAND.socialProofCount} {BRAND.socialProofLabel}
            </span>
          </div>
        </div>

        <ul className="mt-10 grid gap-3.5 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {STORE_REVIEWS.map((r) => (
            <li
              key={r.title}
              className="flex flex-col rounded-2xl border border-ink-800 bg-ink-950 p-5 transition hover:border-ink-700 sm:p-6"
            >
              <h3 className="font-display text-sm font-black italic uppercase tracking-wide text-white sm:text-base">
                {r.title}
              </h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-300 sm:text-sm">
                “{r.text}”
              </p>
              <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                — <span className="text-accent">{r.name}</span>, {r.location} 🇦🇷
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
