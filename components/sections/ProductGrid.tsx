/**
 * Grilla de productos de /tienda.
 *
 * Recibe los productos con su precio ya resuelto — no toca la red. Quien la
 * usa decide de dónde salen los precios (Shopify en el build, o el fallback
 * de config).
 */
import { ProductCard } from '@/components/commerce/ProductCard';
import { STORE_HEADLINES, type StoreProduct } from '@/lib/config';

export function ProductGrid({
  products,
}: {
  products: { product: StoreProduct; price: number }[];
}) {
  return (
    <section id="productos" className="bg-[#24262A] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* h2 — el h1 vive en StoreHero y el título de cada card es un h3;
            sin esto la página saltaba de h1 a h3 sin nada en el medio. */}
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-4xl">
          {STORE_HEADLINES.gridTitle}
        </h2>

        <div
          className={
            products.length === 1
              ? 'mx-auto mt-8 grid max-w-sm gap-4 sm:mt-12 sm:gap-5'
              : 'mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-3 md:gap-6'
          }
        >
          {products.map(({ product, price }) => (
            <ProductCard key={product.handle} product={product} price={price} />
          ))}
        </div>
      </div>
    </section>
  );
}
