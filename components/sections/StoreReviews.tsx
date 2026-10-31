/**
 * STORE REVIEWS — reseñas de la tienda, formato CARMOUNT.
 *
 * Cada card abre con un título corto en mayúsculas que resume la reseña,
 * después la cita y la firma con ciudad. Es distinto del bloque `Reviews` de
 * las landings, que muestra estrellas, fecha y badge de verificado por reseña.
 *
 * Carrusel que mezcla las reseñas del soporte (reales, con foto) con fotos de
 * clientes del parasol, intercaladas.
 *
 * ⚠️ Del parasol van SÓLO las fotos, sin cita ni nombre: los textos de
 * `PARASOL_REVIEWS` son placeholders inventados (ver el aviso en
 * lib/landings/parasol.ts) y acá no se republican. Cuando haya textos reales,
 * sumalos como `kind: 'review'` en `items`.
 */
import { BRAND, STORE_SECTIONS } from '@/lib/config';
import { SOPORTE } from '@/lib/landings/soporte';
import { PARASOL } from '@/lib/landings/parasol';
import { Stars } from '@/components/ui/Stars';
import { StoreReviewCarousel, type StoreReviewItem } from './StoreReviewCarousel';

const SOPORTE_NAME = 'Soporte Magnético PRO™';
const PARASOL_NAME = 'Parasol PRO™';

/** Una del soporte, una del parasol, y así hasta agotar las dos listas. */
function buildItems(): StoreReviewItem[] {
  const soporte: StoreReviewItem[] = SOPORTE.reviews
    .filter((r) => r.image)
    .map((r) => ({
      kind: 'review',
      product: SOPORTE_NAME,
      image: r.image!,
      name: r.name,
      location: r.location,
      stars: r.stars,
      text: r.text,
      date: r.date,
    }));
  const parasol: StoreReviewItem[] = PARASOL.reviews
    .filter((r) => r.image)
    .slice(0, 6)
    .map((r) => ({
      kind: 'photo',
      product: PARASOL_NAME,
      image: r.image!,
      alt: 'El Parasol PRO™ puesto en el auto de un cliente',
    }));

  const out: StoreReviewItem[] = [];
  for (let i = 0; i < Math.max(soporte.length, parasol.length); i++) {
    if (soporte[i]) out.push(soporte[i]);
    if (parasol[i]) out.push(parasol[i]);
  }
  return out;
}

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

        <StoreReviewCarousel items={buildItems()} />
      </div>
    </section>
  );
}
