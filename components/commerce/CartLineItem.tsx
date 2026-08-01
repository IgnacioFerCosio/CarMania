'use client';

/**
 * Una línea del carrito.
 *
 * SIN controles de cantidad, a propósito. Los 3 bundles son productos
 * separados: subir la cantidad de "Soporte Magnético PRO™" a 2 daría 2
 * unidades sueltas a $79.980 en vez del Pack x2 a $59.985. El único camino
 * para llevar más unidades es el UpsellBanner, que cambia de producto.
 */
import { formatARS } from '@/lib/shopify';
import type { CartLine } from '@/lib/cart';
import { Icon } from '@/components/ui/Icon';

type Props = {
  line: CartLine;
  highlighted: boolean;
  busy: boolean;
  onRemove: () => void;
  children?: React.ReactNode;
};

export function CartLineItem({ line, highlighted, busy, onRemove, children }: Props) {
  return (
    <li
      className={`rounded-2xl border p-3 transition-colors duration-500 sm:p-4 ${
        highlighted ? 'border-accent bg-accent/5' : 'border-ink-800 bg-ink-900'
      }`}
    >
      <div className="flex gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-950 ring-1 ring-inset ring-ink-800 sm:h-20 sm:w-20">
          {line.imageUrl && (
            /* <img> plano en vez de next/image: la URL ya viene redimensionada
               a 160px por el CDN de Shopify, y en Cloudflare `/_next/image` no
               optimiza — pasar por ahí sería un salto extra sin beneficio.
               `eager` porque son 1-3 miniaturas de ~35 KB y el drawer no puede
               abrirse con los recuadros vacíos. */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={line.imageUrl}
              alt={line.productTitle}
              width={160}
              height={160}
              loading="eager"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-[13px] font-semibold leading-tight text-white sm:text-sm">
              {line.quantity > 1 && (
                <span className="mr-1.5 inline-flex items-center rounded-md bg-accent px-1.5 py-0.5 align-middle font-display text-[11px] font-black tabular-nums text-white">
                  {line.quantity}×
                </span>
              )}
              {line.productTitle}
            </h3>
            <button
              type="button"
              onClick={onRemove}
              disabled={busy}
              aria-label={`Quitar ${line.productTitle}`}
              className="-mr-1 -mt-1 shrink-0 rounded-lg p-1.5 text-ink-500 transition hover:bg-ink-800 hover:text-ink-200 disabled:cursor-wait disabled:opacity-50"
            >
              <Icon name="trash" className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-auto flex items-baseline gap-2 pt-2">
            <span className="font-display text-lg font-black text-white sm:text-xl">
              {formatARS(line.lineTotal)}
            </span>
            {line.compareAtPrice && line.compareAtPrice > line.unitPrice && (
              <span className="text-xs text-ink-500 line-through">
                {formatARS(line.compareAtPrice * line.quantity)}
              </span>
            )}
          </div>
        </div>
      </div>

      {children}
    </li>
  );
}
