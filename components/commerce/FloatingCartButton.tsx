'use client';

/**
 * Carrito flotante. Aparece cuando el navbar sale de pantalla, para que el
 * acceso al carrito nunca se corte.
 *
 * Va arriba a la derecha, justo debajo del banner de oferta (que está fijo y
 * ocupa los primeros 40 px): abajo a la derecha ya está el botón de WhatsApp,
 * y arriba se lee como que el carrito se despegó del header.
 */
import { useCart } from './CartProvider';
import { useScrolledPastNavbar } from '@/components/layout/useScrolledPastNavbar';
import { Icon } from '@/components/ui/Icon';

export function FloatingCartButton() {
  const { cart, openCart, open } = useCart();
  const scrolledPast = useScrolledPastNavbar();
  const count = cart?.totalQuantity ?? 0;

  // Mientras el drawer está abierto no tiene sentido ofrecer el botón.
  const show = scrolledPast && !open;

  return (
    <button
      type="button"
      onClick={openCart}
      aria-label={count > 0 ? `Abrir carrito (${count})` : 'Abrir carrito'}
      aria-hidden={!show}
      tabIndex={show ? 0 : -1}
      // Mismo escalonado de tamaños que el botón de WhatsApp, para que los dos
      // flotantes se lean como parte del mismo sistema.
      className={`fixed right-3 top-12 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-ink-700 bg-ink-900/95 text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] backdrop-blur transition-all duration-300 hover:border-ink-600 hover:bg-ink-800 sm:right-4 sm:top-14 sm:h-14 sm:w-14 md:right-6 md:h-16 md:w-16 ${
        show
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      <Icon name="cart" className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-black tabular-nums text-white ring-2 ring-ink-950">
          {count}
        </span>
      )}
    </button>
  );
}
