/**
 * Reseñas mientras no haya ninguna real: una caja que lo dice. La página la
 * muestra sólo en dev y en las previews; en producción la sección no sale.
 * Con reseñas cargadas se usa `Reviews`, como en las otras landings.
 */
import type { AdvertorialData } from '@/lib/landings/types';

export function ReviewsPlaceholder({ reviews }: { reviews: AdvertorialData['reviews'] }) {
  return (
    <section id="reviews" className="bg-white py-12 text-ink-900 sm:py-16">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-ink-950 sm:text-3xl">
          {reviews.title}
        </h2>
        <div className="mt-6 rounded-2xl border-2 border-dashed border-ink-300 bg-[#F2F2F0] px-4 py-10 text-center text-sm font-bold uppercase tracking-wider text-accent">
          {reviews.placeholder}
        </div>
      </div>
    </section>
  );
}
