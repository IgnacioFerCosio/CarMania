/**
 * Grilla de productos de /tienda.
 *
 * Recibe los productos con su precio ya resuelto — no toca la red. Quien la
 * usa decide de dónde salen los precios (Shopify en el build, o el fallback
 * de config).
 *
 * Grilla de 4 como la de CARMOUNT. En producción muestra SÓLO lo que se
 * vende: sin cards "Próximamente" (un producto anunciado antes de tiempo es
 * una idea servida para que la copien). En dev y en las previews
 * (`showsDrafts`) muestra también los `comingSoon`, como
 * links: es el acceso rápido para abrir y editar cada landing. Los `hidden`
 * (pausados) no aparecen en ningún lado.
 */
import { ProductCard } from '@/components/commerce/ProductCard';
import {
  PAYMENT_LOGOS,
  STORE_HEADLINES,
  STORE_SECTIONS,
  showsDrafts,
  type StoreProduct,
} from '@/lib/config';

export function ProductGrid({
  products,
}: {
  // El precio llega igual (lo resuelve la página) pero la card ya no lo
  // muestra; se deja en el tipo para no tocar el fetch de /tienda.
  products: { product: StoreProduct; price: number; cyberPct?: number }[];
}) {
  const drafts = showsDrafts();
  const visible = products.filter(
    ({ product }) => !product.hidden && (drafts || !product.comingSoon),
  );
  // En desktop cada card mide lo mismo que en una grilla de 4: con menos
  // cards la grilla se angosta a ese ancho y queda centrada (N/4 del ancho
  // menos los gap-5 de 20px que sobran). En mobile y tablet siguen 2 columnas.
  const n = visible.length;
  const cols =
    n >= 4
      ? 'lg:grid-cols-4'
      : n === 3
        ? 'lg:mx-auto lg:max-w-[calc(75%-5px)] lg:grid-cols-3'
        : 'lg:mx-auto lg:max-w-[calc(50%-10px)] lg:grid-cols-2';

  return (
    <section id="productos" className="bg-[#24262A] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <p className="eyebrow">{STORE_SECTIONS.gridEyebrow}</p>
          {/* h2 — el h1 vive en StoreHero y el título de cada card es un h3;
              sin esto la página saltaba de h1 a h3 sin nada en el medio. */}
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {`${STORE_HEADLINES.gridTitle} `}
            <span className="text-accent">{STORE_SECTIONS.gridTitleAccent}</span>
          </h2>
        </div>

        <div
          className={`mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 ${cols}`}
        >
          {visible.map(({ product, cyberPct }) => (
            <ProductCard key={product.handle} product={product} cyberPct={cyberPct} />
          ))}
        </div>

        {/* Medios de pago. Antes acá iba un CTA al más vendido, pero cada
            card ya linkea a su landing: el segundo botón repetía destino.
            Cerrar con los logos responde la pregunta que queda abierta
            después de elegir producto — "¿cómo pago?". */}
        <div className="mt-10 sm:mt-14">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-ink-500 sm:text-[11px]">
            {STORE_SECTIONS.paymentsLabel}
          </p>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PAYMENT_LOGOS.map((p) => (
              <li
                key={p.name}
                className="inline-flex h-11 items-center justify-center rounded-lg border border-ink-800 bg-ink-950/60 px-3.5 transition-colors hover:border-ink-700"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.src}
                  alt={p.name}
                  width={p.w}
                  height={p.h}
                  loading="lazy"
                  decoding="async"
                  className={`${p.lg ? 'h-7' : 'h-5'} w-auto opacity-75 [filter:brightness(0)_invert(1)]`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
