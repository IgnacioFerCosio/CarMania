/**
 * USE CASES — grid de 6 cards mostrando dónde usás el soporte.
 * Cada card tiene una foto lifestyle de fondo + label en la esquina inferior.
 *
 * SLOTS DE IMAGEN: cada item de USE_CASES tiene un campo `image`. Si la
 * imagen no existe en /public, el fallback es un gradiente con la inicial
 * del label. Cargá tus fotos en /public/use-cases/<slug>.jpg y listo.
 */
import Image from 'next/image';
import { USE_CASES, HEADLINES } from '@/lib/config';

export function UseCases() {
  return (
    <section className="bg-[#24262A] py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          {HEADLINES.useCases.split(' ').map((w, i) =>
            i === HEADLINES.useCases.split(' ').length - 1 ? (
              <span key={i} className="text-accent">
                {w}
              </span>
            ) : (
              <span key={i}>{w} </span>
            ),
          )}
        </h2>
      </div>

      {/* Full-bleed grid — sin max-w ni padding lateral */}
      <ul className="mt-8 grid grid-cols-3 gap-2 px-4 md:mt-10 md:px-6 lg:grid-cols-6">
        {USE_CASES.map((c) => (
          <li
            key={c.label}
            className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-ink-900"
          >
            <UseCaseImage src={c.image} label={c.label} />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            />

            <span className="absolute bottom-2.5 left-2.5 font-display text-[11px] font-black italic uppercase tracking-wider text-white sm:bottom-3 sm:left-3 sm:text-xs md:text-sm lg:text-base">
              Para <span className="text-accent">{c.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Helper: intenta cargar la imagen real; si no existe (404 en build), el
 * componente `Image` muestra un alt — pero como nosotros queremos un
 * fallback visual lindo, ponemos un placeholder con gradiente + inicial.
 * Cuando subas la foto, se reemplaza automáticamente.
 */
function UseCaseImage({ src, label }: { src: string; label: string }) {
  return (
    <>
      {/* Placeholder — visible mientras carga o si la imagen no existe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950 text-6xl font-black italic text-white/10"
      >
        {label[0]}
      </div>

      {/* Imagen real — se renderiza encima del placeholder cuando carga OK */}
      <Image
        src={src}
        alt={`Soporte usado para ${label}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
      />
    </>
  );
}
