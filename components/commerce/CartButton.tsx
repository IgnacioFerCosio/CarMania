'use client';

/**
 * Botón de carrito para el navbar, con contador de unidades.
 * El contador solo aparece cuando hay algo — así no ocupa lugar de más
 * mientras el carrito está vacío.
 */
import { useCart } from './CartProvider';
import { Icon } from '@/components/ui/Icon';

export function CartButton({ className = '' }: { className?: string }) {
  // `count` y no `cart.totalQuantity`: mientras el carrito se rehidrata contra
  // Shopify vale el número guardado, así el badge no parpadea en 0 en cada
  // cambio de página (ver CartProvider).
  const { count, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count > 0 ? `Abrir carrito (${count})` : 'Abrir carrito'}
      className={`relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-200 transition hover:bg-ink-800 hover:text-white ${className}`}
    >
      <Icon name="cart" className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-black tabular-nums text-white">
          {count}
        </span>
      )}
    </button>
  );
}
