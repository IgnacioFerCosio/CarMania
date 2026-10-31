/**
 * Grilla de productos de /tienda.
 *
 * Recibe los productos con su precio ya resuelto — no toca la red. Quien la
 * usa decide de dónde salen los precios (Shopify en el build, o el fallback
 * de config).
 *
 * Grilla de 4 como la de CARMOUNT: los productos reales primero y, detrás,
 * los slots de `STORE_COMING_SOON` para completar la fila. Cuando el catálogo
 * llegue a 4 productos, vaciá ese array en config y los slots desaparecen.
 */
import { ProductCard, ComingSoonCard } from '@/components/commerce/ProductCard';
import {
  CYBER,
  PAYMENT_LOGOS,
  STORE_COMING_SOON,
  STORE_HEADLINES,
  STORE_SECTIONS,
  type StoreProduct,
} from '@/lib/config';

export function ProductGrid({
  products,
}: {
  // El precio llega igual (lo resuelve la página) pero la card ya no lo
  // muestra; se deja en el tipo para no tocar el fetch de /tienda.
  products: { product: StoreProduct; price: number; cyberPct?: number }[];
}) {
  const cyberTrim = CYBER.enabled;
  // En el Cyber la grilla muestra sólo lo que se vende: lo que tiene
  // `comingSoon` queda afuera también en dev (donde `isPublished` lo abre).
  const visible = cyberTrim ? products.filter(({ product }) => !product.comingSoon) : products;
  const slots = cyberTrim ? [] : STORE_COMING_SOON;

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

        {/* Durante el Cyber se esconden las cards "Próximamente" (producto sin
            publicar y slot vacío): en un evento de compra son espacio muerto.
            Con menos de 4 cards la grilla se angosta y queda centrada. */}
        <div
          className={`mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 ${
            cyberTrim && visible.length < 4
              ? 'mx-auto max-w-3xl'
              : 'lg:grid-cols-4'
          }`}
        >
          {visible.map(({ product, cyberPct }) => (
            <ProductCard key={product.handle} product={product} cyberPct={cyberPct} />
          ))}
          {slots.map((slot) => (
            <ComingSoonCard
              key={slot.id}
              specTag={slot.specTag}
              badge={slot.badge}
            />
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
