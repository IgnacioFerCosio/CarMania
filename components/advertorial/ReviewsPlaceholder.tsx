/**
 * Reseñas mientras no haya ninguna real: el título de `Reviews` y una caja
 * que lo dice. La página la muestra sólo en dev y en las previews; en
 * producción la sección no sale. Con reseñas cargadas se usa `Reviews`, como
 * en las otras landings.
 */
import type { AdvertorialData, LandingConfig } from '@/lib/landings/types';
import { BG, SECTION_Y } from './SectionHeading';

export function ReviewsPlaceholder({
  reviews,
  sectionCopy,
}: {
  reviews: AdvertorialData['reviews'];
  sectionCopy: LandingConfig['sectionCopy'];
}) {
  return (
    <section id="reviews" className={`${BG.gray} ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-display text-xl font-black italic uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
          {sectionCopy.reviewsTitle + ' '}
          <span className="text-accent">{sectionCopy.reviewsTitleAccent}</span>
        </h2>
        <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-ink-800 bg-ink-900/50 px-4 py-10 text-center font-display text-xs font-black uppercase italic tracking-widest text-accent sm:mt-10 sm:text-sm">
          {reviews.placeholder}
        </div>
      </div>
    </section>
  );
}
