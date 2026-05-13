/**
 * SURFACES — strip horizontal full-width de superficies compatibles.
 * "Un soporte, cualquier superficie" — 6 fotos lifestyle (vidrio, cuero,
 * metal, plástico, madera, piedra) con el label en el centro abajo.
 *
 * Va debajo de Pricing, con el fondo gris (#24262A) que separa secciones.
 * Las imágenes viven en /public/surfaces/.
 */
import Image from 'next/image';
import { SURFACES } from '@/lib/config';

export function Surfaces() {
  return (
    <section className="bg-[#24262A] py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          Un soporte. <span className="text-accent">Cualquier superficie.</span>
        </h2>
      </div>

      {/* Full-bleed grid */}
      <ul className="mt-8 grid grid-cols-3 gap-2 px-4 md:mt-10 md:px-6 lg:grid-cols-6">
        {SURFACES.map((s) => (
          <li
            key={s.label}
            className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-ink-900"
          >
            <Image
              src={s.image}
              alt={`Soporte adherido a ${s.label.toLowerCase()}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            />
            <span className="absolute inset-x-0 bottom-2.5 text-center font-display text-[11px] font-black italic uppercase tracking-wider text-accent sm:bottom-3 sm:text-xs md:bottom-4 md:text-sm lg:text-base">
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
