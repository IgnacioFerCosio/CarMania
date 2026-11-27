/**
 * USE CASES — grid de 6 cards mostrando dónde / para qué se usa el producto.
 * Cada card tiene una foto lifestyle de fondo + label en la esquina inferior.
 *
 * SLOTS DE IMAGEN: cada item de `config.useCases` tiene un campo `image`. Si la
 * imagen no existe en /public, el fallback es un gradiente con la inicial del
 * label. Cargá las fotos y se reemplazan solas.
 *
 * El prefijo del label ("Para AUTO" en el soporte, sin prefijo en el parasol)
 * sale de `config.sectionCopy.useCasesPrefix`. Sin prefijo, el label se parte
 * como el título: primera palabra blanca, última en accent.
 *
 * TAMAÑO UNIVERSAL: el rótulo tiene el mismo tamaño en TODAS las landings
 * (antes se achicaba hasta que entrara el más largo en un renglón, y en las
 * de rótulos largos quedaba ilegible en el celular). Ocupa hasta 2 renglones
 * de `USE_CASE_LINE` caracteres; el test de config hace cumplir ese largo.
 */
import Image from 'next/image';
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { USE_CASE_LINE } from '@/lib/landings/useCaseLabel';

/** Palabras en blanco + última palabra en accent (rojo). */
function accentLastWord(text: string) {
  const w = text.split(' ');
  return w.map((word, i) =>
    i === w.length - 1 ? (
      <span key={i} className="text-accent">
        {word}
      </span>
    ) : (
      <span key={i}>{word} </span>
    ),
  );
}

export function UseCases({
  config = SOPORTE,
  media,
}: {
  config?: LandingConfig;
  /**
   * Reemplaza la foto de cada tarjeta (en el orden de `config.useCases`). Lo
   * usa /llavero-rescate para mostrar placeholders y maquetas locales.
   */
  media?: readonly React.ReactNode[];
} = {}) {
  const { useCases } = config;
  const { useCasesTitle, useCasesPrefix } = config.sectionCopy;
  // 'Para ' en el soporte, '' en el parasol — un solo text node, sin marcador.
  const labelPrefix = useCasesPrefix ? `${useCasesPrefix} ` : '';

  return (
    <section className="bg-[#24262A] py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          {accentLastWord(useCasesTitle)}
        </h2>
      </div>

      {/* Full-bleed grid — sin max-w ni padding lateral */}
      <ul className="mt-8 grid grid-cols-3 gap-2 px-4 md:mt-10 md:px-6 lg:grid-cols-6">
        {useCases.map((c, i) => (
          <li
            key={c.label}
            className="group relative aspect-[2/3] overflow-hidden rounded-xl bg-ink-900 [container-type:inline-size]"
          >
            {media ? media[i] : <UseCaseImage src={c.image} label={c.label} alt={c.alt} />}

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent"
            />

            {/* Mismo tamaño en todas las landings: el de diseño (--fs), salvo
                que un renglón de USE_CASE_LINE caracteres no entre en el ancho
                de la tarjeta (100cqw menos los márgenes, --pad), en celulares
                muy angostos. 0,69 em = ancho medio de una mayúscula de la
                display, medido en el navegador. Hasta 2 renglones. */}
            <span
              className="absolute inset-x-2 bottom-2.5 font-display font-black uppercase italic leading-[1.05] tracking-wide text-white [--fs:14px] [--pad:1rem] sm:inset-x-3 sm:bottom-3 sm:[--fs:15px] sm:[--pad:1.5rem] md:[--fs:16px] lg:[--fs:17px]"
              style={
                {
                  fontSize: `min(var(--fs), calc((100cqw - var(--pad)) / ${USE_CASE_LINE * 0.69}))`,
                } as React.CSSProperties
              }
            >
              {labelPrefix ? (
                <>
                  {labelPrefix}
                  <span className="text-accent">{c.label}</span>
                </>
              ) : (
                accentLastWord(c.label)
              )}
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
function UseCaseImage({
  src,
  label,
  alt,
}: {
  src: string;
  label: string;
  alt: string;
}) {
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
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
      />
    </>
  );
}
