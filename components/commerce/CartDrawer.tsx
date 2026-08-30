'use client';

/**
 * Drawer del carrito — slide-over desde la derecha.
 *
 * El checkout sigue siendo 100 % de Shopify: el CTA final manda a
 * `cart.checkoutUrl`. Acá no se cobra ni se calcula nada por nuestra cuenta;
 * todos los números salen del objeto cart que devuelve la Storefront API.
 */
import { useEffect, useRef } from 'react';
import { formatARS } from '@/lib/shopify';
import { nextTierOf, tierOf } from '@/lib/tiers';
import { PAYMENTS, RETURNS, SHIPPING } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { useCart } from './CartProvider';
import { CartLineItem } from './CartLineItem';
import { UpsellBanner } from './UpsellBanner';

export function CartDrawer({
  ctaHref = '#pricing',
}: {
  /**
   * A dónde manda "Ver las ofertas" del estado de carrito vacío — mismo
   * patrón que el `ctaHref` de `Navbar`, para que el drawer no tenga que
   * adivinar en qué página está mirando el DOM (antes: `getElementById`
   * probando `#pricing` y después `#productos` a ciegas).
   */
  ctaHref?: string;
} = {}) {
  const {
    cart,
    tiers,
    open,
    busy,
    error,
    highlightedLineId,
    closeCart,
    upgradeLine,
    removeLine,
    checkout,
  } = useCart();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape para cerrar + focus trap básico mientras está abierto.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeCart();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeCart]);

  const isEmpty = !cart || cart.lines.length === 0;

  /**
   * Cierra el drawer y baja hasta `ctaHref`. Va por JS en vez de dejar el
   * salto de ancla al navegador porque mientras el drawer está abierto el
   * body tiene el scroll bloqueado: hay que esperar a que React lo libere.
   */
  function goToPricing(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    closeCart();
    setTimeout(() => {
      // Sin `behavior`: hereda el `scroll-behavior: smooth` que globals.css ya
      // define en <html>, en vez de forzarlo desde acá.
      const targetId = ctaHref.replace(/^#/, '');
      document.getElementById(targetId)?.scrollIntoView({ block: 'start' });
    }, 60);
  }

  // Suma de los precios de lista (compareAtPrice) de todo lo que hay en el
  // carrito. Es el "precio normal" contra el que se mide el ahorro, el mismo
  // criterio que usan las tarjetas de #pricing.
  const compareTotal =
    cart?.lines.reduce(
      (acc, l) => acc + (l.compareAtPrice ?? l.unitPrice) * l.quantity,
      0,
    ) ?? 0;

  // Un solo número para el cliente. Como sale de restar contra `cart.total`,
  // ya incluye cualquier descuento que Shopify aplique por su cuenta (códigos
  // automáticos), no sólo la diferencia contra el precio de lista.
  const savings = cart ? Math.max(0, compareTotal - cart.total) : 0;

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        aria-hidden={!open}
        className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l border-ink-800 bg-ink-950 shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-800 px-4 py-4 sm:px-5">
          <h2 className="font-display text-lg font-black italic uppercase tracking-wider text-white">
            Tu carrito
            {cart && cart.totalQuantity > 0 && (
              <span className="ml-2 text-sm font-bold not-italic text-ink-400">
                {cart.totalQuantity}
              </span>
            )}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="rounded-lg p-2 text-ink-400 transition hover:bg-ink-800 hover:text-white"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {/* Cuerpo */}
        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
          {error && (
            <p
              role="alert"
              className="mb-3 flex items-start gap-2 rounded-xl border border-accent/50 bg-accent/10 p-3 text-[13px] text-accent-400"
            >
              <Icon name="alert" className="mt-0.5 h-4 w-4 shrink-0" />
              {error}
            </p>
          )}

          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 py-12 text-center">
              <Icon name="cart" className="h-10 w-10 text-ink-700" />
              <p className="text-sm text-ink-400">Todavía no agregaste nada.</p>
              <a
                href={ctaHref}
                onClick={goToPricing}
                className="mt-1 text-sm font-bold uppercase tracking-wider text-accent transition hover:text-accent-400"
              >
                Ver las ofertas
              </a>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.lines.map((line) => {
                const current = tierOf(tiers, line.merchandiseId);
                const next = current
                  ? nextTierOf(tiers, line.merchandiseId)
                  : null;

                return (
                  <CartLineItem
                    key={line.id}
                    line={line}
                    highlighted={highlightedLineId === line.id}
                    busy={busy}
                    onRemove={() => removeLine(line.id)}
                  >
                    {current && next && (
                      <UpsellBanner
                        current={current}
                        next={next}
                        quantity={line.quantity}
                        busy={busy}
                        onUpgrade={() => upgradeLine(line.id, next.variantId)}
                      />
                    )}
                  </CartLineItem>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer con totales */}
        {!isEmpty && (
          <div className="border-t border-ink-800 bg-ink-950 px-4 py-4 sm:px-5">
            <dl className="space-y-1.5 text-sm">
              <div className="flex items-baseline justify-between text-ink-300">
                <dt>{savings > 0 ? 'Precio normal' : 'Subtotal'}</dt>
                <dd className="tabular-nums">
                  {formatARS(savings > 0 ? compareTotal : cart.subtotal)}
                </dd>
              </div>

              {SHIPPING.freeNationwide && (
                <div className="flex items-baseline justify-between text-ink-300">
                  <dt>Envío</dt>
                  <dd className="font-semibold uppercase tracking-wider text-emerald-400">
                    Gratis
                  </dd>
                </div>
              )}

              {savings > 0 && (
                <div className="flex items-baseline justify-between font-semibold text-accent">
                  <dt>Descuentos</dt>
                  <dd className="tabular-nums">−{formatARS(savings)}</dd>
                </div>
              )}

              <div className="flex items-baseline justify-between border-t border-ink-800 pt-2.5">
                <dt className="font-display text-base font-black italic uppercase tracking-wider text-white">
                  Total
                </dt>
                <dd className="font-display text-2xl font-black tabular-nums text-white">
                  {formatARS(cart.total)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-accent font-display text-base font-black uppercase italic tracking-wider text-white shadow-[0_8px_24px_rgba(215,7,7,0.35)] transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-70"
            >
              <Icon name="lock" className="h-4 w-4" />
              Finalizar compra
              <Icon name="arrow-right" className="h-5 w-5" />
            </button>

            <p className="mt-3 flex items-center justify-center gap-x-3 text-center text-[11px] uppercase tracking-wider text-ink-500">
              <span>Devolución {RETURNS.days} días</span>
              <span aria-hidden="true">·</span>
              <span>Pago seguro con {PAYMENTS.provider}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
}
