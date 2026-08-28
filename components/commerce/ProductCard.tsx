/**
 * Card de producto de la grilla de /tienda.
 *
 * Es un link entero a la landing del producto, no un botón de compra: la
 * venta se argumenta en la landing, no acá.
 *
 * Server Component — no tiene estado ni handlers.
 */
import Image from 'next/image';
import Link from 'next/link';
import type { StoreProduct } from '@/lib/config';
import { formatARS } from '@/lib/shopify';

export function ProductCard({
  product,
  price,
}: {
  product: StoreProduct;
  price: number;
}) {
  return (
    <Link
      href={product.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 transition hover:border-ink-700"
    >
      {/* El contenedor cuadrado reserva el espacio antes de que cargue la
          imagen, así la grilla no salta (mismo patrón que HowItWorks). */}
      <div className="relative aspect-square w-full overflow-hidden bg-ink-900">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-contain transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-base font-black italic uppercase tracking-wider text-white">
          {product.title}
        </h3>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-300">
          {product.blurb}
        </p>
        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink-400">
            Desde
          </span>
          <span className="text-xl font-black text-white md:text-2xl">
            {formatARS(price)}
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-accent">
          Ver producto
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
