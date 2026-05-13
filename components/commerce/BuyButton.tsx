'use client';

/**
 * Botón de compra principal. Es el único punto que llama a la Storefront
 * API mutation `cartCreate` y redirige al checkout nativo de Shopify.
 *
 * Tracking: dispara AddToCart al hacer click, e InitiateCheckout justo
 * antes de redirigir (cuando ya tenemos checkoutUrl confirmada).
 */

import { useState } from 'react';
import { createCheckout, formatARS } from '@/lib/shopify';
import { track } from '@/lib/tracking';
import { BRAND } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

type Props = {
  variantId: string;
  productId: string;
  price: number;
  quantity?: number;
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Oculta el texto secundario "Pagás $X con tarjeta..." (útil en sticky bar). */
  hideHelper?: boolean;
  /** Código de descuento de Shopify (opcional). Se aplica en cartCreate. */
  discountCode?: string;
  /** Total ya descontado a mostrar en el helper. Si no se pasa, usa price*quantity. */
  totalOverride?: number;
};

export function BuyButton({
  variantId,
  productId,
  price,
  quantity = 1,
  label = 'COMPRAR AHORA',
  className = '',
  size = 'lg',
  hideHelper = false,
  discountCode,
  totalOverride,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
  }[size];

  async function handleClick() {
    if (loading) return;
    if (!variantId) {
      setError('Producto no disponible. Recargá la página o escribinos por WhatsApp.');
      return;
    }
    setError(null);
    setLoading(true);

    const trackedValue = totalOverride ?? price * quantity;

    track.addToCart({
      content_ids: [productId],
      content_name: BRAND.tagline,
      value: trackedValue,
      num_items: quantity,
    });

    try {
      const url = await createCheckout(variantId, quantity, discountCode);
      track.initiateCheckout({
        content_ids: [productId],
        content_name: BRAND.tagline,
        value: trackedValue,
        num_items: quantity,
      });
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError('No pudimos abrir el checkout. Reintentá en un momento.');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent font-display font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_rgba(215,7,7,0.35)] transition-all hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.5)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait ${sizeClasses} ${className}`}
        aria-label={label}
      >
        <Icon name="cart" className="h-5 w-5" />
        <span>{loading ? 'Abriendo checkout...' : label}</span>
        {!loading && (
          <Icon
            name="arrow-right"
            className="h-5 w-5 transition-transform group-hover:translate-x-1"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
      </button>
      {error && (
        <p className="text-center text-sm text-accent-400" role="alert">
          {error}
        </p>
      )}
      {price > 0 && !hideHelper && (
        <p className="text-center text-xs text-ink-400">
          Pagás{' '}
          <span className="font-semibold text-ink-200">
            {formatARS(totalOverride ?? price * quantity)}
          </span>{' '}
          con tarjeta, débito o MercadoPago
        </p>
      )}
    </div>
  );
}
