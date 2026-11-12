import type { Review } from './types';

/**
 * Largo máximo de una reseña en el carrusel del hero: el de las del soporte
 * (~150 caracteres), que entran en tres líneas sin empujar el CTA.
 */
const HERO_REVIEW_MAX = 150;

/**
 * Reseñas para el carrusel del hero: sólo las de 5★ (si no hay ninguna,
 * todas) y cortadas en la última palabra entera con "…". La lista completa
 * sigue en la sección de reseñas. Una landing lo usa poniéndolo en
 * `heroReviews` de su config.
 */
export function pickHeroReviews(reviews: readonly Review[]): readonly Review[] {
  const cinco = reviews.filter((r) => r.stars === 5);
  return (cinco.length ? cinco : reviews).map((r) => {
    if (r.text.length <= HERO_REVIEW_MAX) return r;
    const corte = r.text.slice(0, HERO_REVIEW_MAX);
    const fin = corte.lastIndexOf(' ');
    const texto = corte.slice(0, fin > 0 ? fin : HERO_REVIEW_MAX).replace(/[\s,.;:]+$/, '');
    return { ...r, text: `${texto}…` };
  });
}
