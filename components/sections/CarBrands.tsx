/**
 * CAR BRANDS — strip horizontal de marcas de autos compatibles.
 * Loop infinito tipo marquee que SE MUEVE A LA DERECHA (reverse) y se pausa
 * en hover. La lista se duplica para que el loop sea seamless.
 *
 * SLOTS DE LOGO: cada item de CAR_BRANDS tiene un campo `logo`. Si está como
 * `null`, mostramos el nombre en texto monocromo. Apenas le pongas la ruta
 * del SVG (ej. '/brands/toyota.svg'), automáticamente reemplaza al texto.
 */
import { CAR_BRANDS, HEADLINES } from '@/lib/config';

export function CarBrands() {
  // Duplicamos la lista para que el marquee loopee sin "salto"
  const items = [...CAR_BRANDS, ...CAR_BRANDS];

  return (
    <section className="bg-ink-950 py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          {HEADLINES.carCompat.split(/(cualquier auto)/).map((chunk, i) =>
            chunk === 'cualquier auto' ? (
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
        <div className="marquee-track flex items-center gap-7 sm:gap-12 md:gap-16">
          {items.map((b, i) => (
            <BrandItem key={`${b.name}-${i}`} name={b.name} logo={b.logo} />
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
function BrandItem({ name, logo }: { name: string; logo: string | null }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
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
