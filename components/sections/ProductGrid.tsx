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
import Link from 'next/link';
import { ProductCard, ComingSoonCard } from '@/components/commerce/ProductCard';
import {
  STORE_COMING_SOON,
  STORE_HEADLINES,
  STORE_SECTIONS,
  type StoreProduct,
} from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function ProductGrid({
  products,
}: {
  products: { product: StoreProduct; price: number }[];
}) {
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

        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {products.map(({ product, price }) => (
            <ProductCard key={product.handle} product={product} price={price} />
          ))}
          {STORE_COMING_SOON.map((slot) => (
            <ComingSoonCard
              key={slot.id}
              specTag={slot.specTag}
              variantTag={slot.variantTag}
            />
          ))}
        </div>

        <div className="mt-9 flex justify-center sm:mt-12">
          <Link
            href={STORE_SECTIONS.gridCtaHref}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-700 bg-ink-950 px-8 py-4 font-display text-xs font-black uppercase italic tracking-wider text-white transition hover:border-accent hover:bg-accent sm:text-sm"
          >
            {STORE_SECTIONS.gridCtaLabel}
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
