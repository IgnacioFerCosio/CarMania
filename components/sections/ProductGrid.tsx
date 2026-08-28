/**
 * Grilla de productos de /tienda.
 *
 * Recibe los productos con su precio ya resuelto — no toca la red. Quien la
 * usa decide de dónde salen los precios (Shopify en el build, o el fallback
 * de config).
 */
import { ProductCard } from '@/components/commerce/ProductCard';
import type { StoreProduct } from '@/lib/config';

export function ProductGrid({
  products,
}: {
  products: { product: StoreProduct; price: number }[];
}) {
  return (
    <section id="productos" className="bg-[#24262A] py-14 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div
          className={
            products.length === 1
              ? 'mx-auto grid max-w-sm gap-4 sm:gap-5'
              : 'grid gap-4 sm:gap-5 md:grid-cols-3 md:gap-6'
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
