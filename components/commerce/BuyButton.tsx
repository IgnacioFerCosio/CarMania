'use client';

/**
 * Botón de compra. Ya NO crea el checkout: agrega el bundle al carrito y abre
 * el drawer. El `cartCreate` y el redirect a Shopify ahora viven en
 * `CartProvider` / `CartDrawer`.
 *
 * Cada uno de los 3 botones (Llevá 1 / 2 / 3) manda SU propio variantId —
 * son productos distintos en Shopify, no cantidades del mismo.
 *
 * El tracking de AddToCart lo dispara el provider, que es el único que sabe
 * si la línea se agregó de verdad.
 */

import { formatARS } from '@/lib/shopify';
import { Icon } from '@/components/ui/Icon';
import { useCart } from './CartProvider';

type Props = {
  variantId: string;
  price: number;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Oculta el texto secundario "Pagás $X con tarjeta..." (útil en sticky bar). */
  hideHelper?: boolean;
  /** Total ya descontado a mostrar en el helper. Si no se pasa, usa price. */
  totalOverride?: number;
};

export function BuyButton({
  variantId,
  price,
  label = 'COMPRAR AHORA',
  className = '',
  size = 'lg',
  hideHelper = false,
  totalOverride,
}: Props) {
  const { addTier, busy } = useCart();

  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  }[size];

  const unavailable = !variantId;

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        onClick={() => addTier(variantId)}
        disabled={busy || unavailable}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent font-display font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(215,7,7,0.35)] transition-all hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.5)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 ${sizeClasses} ${className}`}
        aria-label={label}
      >
        <Icon name="cart" className="h-5 w-5" />
        <span>{label}</span>
        <Icon
          name="arrow-right"
          className="h-5 w-5 transition-transform group-hover:translate-x-1"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      </button>

      {unavailable && (
        <p className="text-center text-sm text-accent-400" role="alert">
          Producto no disponible. Recargá la página o escribinos por WhatsApp.
        </p>
      )}

      {price > 0 && !hideHelper && (
        <p className="text-center text-xs text-ink-400">
          Pagás{' '}
          <span className="font-semibold text-ink-200">
            {formatARS(totalOverride ?? price)}
          </span>{' '}
          con tarjeta, débito o MercadoPago
        </p>
      )}
    </div>
  );
}
