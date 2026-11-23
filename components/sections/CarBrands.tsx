/**
 * CAR BRANDS — strip horizontal de marcas de autos compatibles.
 * Loop infinito tipo marquee que SE MUEVE A LA DERECHA (reverse) y se pausa
 * en hover. La lista se duplica para que el loop sea seamless.
 *
 * SLOTS DE LOGO: cada item de CAR_BRANDS tiene un campo `logo`. Si está como
 * `null`, mostramos el nombre en texto monocromo. Apenas le pongas la ruta
 * del SVG (ej. '/brands/toyota.svg'), automáticamente reemplaza al texto.
 */
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';

export function CarBrands({ config = SOPORTE }: { config?: LandingConfig } = {}) {
  const { carBrands } = config;
  const { carBrandsTitle, carBrandsTitleAccent } = config.sectionCopy;

  return (
    <section className="bg-ink-950 py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          {`${carBrandsTitle} ${carBrandsTitleAccent}`
            .split(new RegExp(`(${carBrandsTitleAccent})`))
            .map((chunk, i) =>
              chunk === carBrandsTitleAccent ? (
                <span key={i} className="text-accent">
                  {chunk}
                </span>
              ) : (
                <span key={i}>{chunk}</span>
              ),
            )}
        </h2>
      </div>

      <div className="mt-7 overflow-hidden sm:mt-10 md:mt-12">
        {/* Dos copias idénticas de la lista. La animación arranca en -50%
            (la segunda copia ya ocupa todo el ancho) y vuelve a 0, donde la
            primera queda en el mismo lugar: el salto no se ve. El espacio
            entre marcas va como `pr` de cada copia y no como `gap` del track,
            para que la mitad exacta del track sea una copia entera. */}
        {/* 48 s y no los 30 s de `.marquee-track`: con 19 marcas la tira es
            ~1,6 veces más larga y a 30 s pasaba demasiado rápido. */}
        <div className="marquee-track flex [animation-duration:48s]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="flex shrink-0 items-center gap-7 pr-7 sm:gap-12 sm:pr-12 md:gap-16 md:pr-16"
            >
              {carBrands.map((b) => (
                <BrandItem
                  key={b.name}
                  name={b.name}
                  logo={b.logo}
                  w={b.w}
                  h={b.h}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Item del marquee. Si la marca tiene `logo` (SVG/PNG en /public/brands/),
 * lo renderiza con el mismo filtro monocromático que los métodos de pago.
 * Si no, fallback al nombre en texto — útil mientras se cargan los assets.
 */
function BrandItem({
  name,
  logo,
  w,
  h,
}: {
  name: string;
  logo: string | null;
  w: number;
  h: number;
}) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        width={w}
        height={h}
        // Sin `loading="lazy"`: el track tiene overflow oculto y el lazy
        // pedía cada logo recién al entrar en pantalla, así que la tira
        // arrancaba vacía y se iba llenando desde la izquierda.
        // `fetchPriority="low"` hace dos cosas: no le compiten al hero y React
        // no les mete un <link rel="preload"> en el <head> (lo hace con toda
        // <img> que no sea lazy, salvo las de prioridad baja).
        fetchPriority="low"
        decoding="async"
        className="h-7 w-auto shrink-0 opacity-60 [filter:brightness(0)_invert(1)] transition hover:opacity-100 sm:h-9 md:h-10"
      />
    );
  }
  return (
    <span className="shrink-0 font-display text-xl font-black italic uppercase tracking-wider text-ink-400 transition-colors hover:text-ink-100 sm:text-2xl md:text-3xl">
      {name}
    </span>
  );
}
