/**
 * Encabezado de /tienda. Deliberadamente sobrio: sin video, sin countdown y
 * sin la presión de la landing de pauta. Quien llega acá está navegando la
 * marca, no cayendo de un anuncio.
 */
import { BRAND, STORE_HEADLINES } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';

export function StoreHero() {
  return (
    <section className="bg-[#24262A] pt-10 sm:pt-14 md:pt-20">
      <div className="mx-auto max-w-7xl px-4 text-center md:px-6">
        <p className="eyebrow">{STORE_HEADLINES.eyebrow}</p>
        <h1 className="heading-display mt-2 text-3xl leading-tight sm:text-4xl md:text-6xl">
          {STORE_HEADLINES.title}{' '}
          <span className="text-accent">{STORE_HEADLINES.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-300 md:text-base">
          {STORE_HEADLINES.sub}
        </p>

        {/* Prueba social agregada: los números, sin testimonios. Los reviews
            de config son del soporte y acá quedarían fuera de lugar. */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-300">
          <Stars rating={BRAND.averageRating} />
          <span>
            <strong className="text-white">{BRAND.averageRating}</strong> ·{' '}
            {BRAND.socialProofCount} {BRAND.socialProofLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
