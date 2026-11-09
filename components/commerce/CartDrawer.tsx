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
import { CYBER, PAYMENT_LOGOS, PAYMENTS, RETURNS, SHIPPING } from '@/lib/config';
import { CROSS_SELL_LABEL } from '@/lib/landings';
import { Icon } from '@/components/ui/Icon';
import { CyberLogo } from '@/components/ui/CyberLogo';
import { useCyberPhase } from '@/components/layout/useCyberPhase';
import { useCart } from './CartProvider';
import { CartLineItem } from './CartLineItem';
import { UpsellBanner } from './UpsellBanner';
import { CrossSellCard } from './CrossSellCard';

/**
 * Cómo se dibuja cada logo en el carrito (chips de igual tamaño, 5 por fila).
 * Los de config (Hero, /tienda, packs) son versiones en blanco; acá van en sus
 * colores sobre chips blancos, así que Mastercard y Mercado Pago usan sus
 * archivos a color. Mercado Pago va más grande (`wide`: sin padding y un poco
 * ampliado) porque su trazo es fino y claro.
 */
const CART_LOGO_LOOK: Record<
  string,
  { bg?: string; src?: string; w?: number; h?: number; img?: string; wide?: boolean }
> = {
  Mastercard: { src: '/payments/Mastercard-color.svg', w: 152, h: 94, img: 'h-6' },
  'Mercado Pago': { src: '/payments/Mercado_Pago.svg', w: 1049, h: 425, img: 'h-8', wide: true },
  Visa: { img: 'h-4' },
  'American Express': { img: 'h-6' },
  'Naranja X': { img: 'h-4' },
};

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
    crossSell,
    open,
    busy,
    error,
    highlightedLineId,
    closeCart,
    addTier,
    upgradeLine,
    removeLine,
    checkout,
  } = useCart();

  // Cyber: el carrito se viste de morado y el combo se llama "Combo Cyber".
  // Pasada la extensión vuelve solo a como era.
  const { on: cyber } = useCyberPhase();
  const comboLabel = cyber ? 'Combo Cyber: Soporte + Parasol' : CROSS_SELL_LABEL;

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

  // El combo es del par, no de un producto: va en la franja de arriba y en
  // su propia fila del pie, nunca pegado a una línea. Shopify elige a cuál
  // se lo aplica (en x1 + x1, siempre a la misma), así que en una línea
  // parecería que el descuento es sólo de ese producto. Las líneas muestran
  // su precio sin el combo.
  const comboTotal =
    cart?.lines.reduce((acc, l) => acc + l.comboDiscount, 0) ?? 0;
  const otherSavings = Math.max(0, savings - comboTotal);

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
        className={`fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l ${cyber ? 'border-cyber-500/50' : 'border-ink-800'} bg-ink-950 shadow-2xl transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'pointer-events-none translate-x-full'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between border-b px-4 py-4 sm:px-5 ${
            cyber
              ? 'border-cyber-500/40 bg-gradient-to-r from-cyber-950 via-cyber-800/60 to-cyber-950'
              : 'border-ink-800'
          }`}
        >
          <h2 className="flex items-center gap-2 font-display text-lg font-black italic uppercase tracking-wider text-white">
            {CYBER.enabled && <CyberLogo className="-my-2 h-11" />}
            <span>Tu carrito</span>
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
            <>
              {comboTotal > 0 && (
                <p
                  className={`mb-3 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 ${
                    cyber
                      ? 'border-cyber-500/60 bg-cyber-600/15'
                      : 'border-emerald-500/40 bg-emerald-500/10'
                  }`}
                >
                  <Icon
                    name="check"
                    className={`h-5 w-5 shrink-0 ${cyber ? 'text-cyber-300' : 'text-emerald-400'}`}
                  />
                  <span className="leading-tight">
                    <span
                      className={`block font-display text-[13px] font-black uppercase italic tracking-wider ${
                        cyber ? 'text-cyber-300' : 'text-emerald-400'
                      }`}
                    >
                      {comboLabel}
                    </span>
                    <span className="block text-[12px] text-ink-300">
                      Aplicado: −{formatARS(comboTotal)} en el total
                    </span>
                  </span>
                </p>
              )}

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

              {crossSell && (
                <CrossSellCard
                  offer={crossSell}
                  busy={busy}
                  cyber={cyber}
                  onAdd={() => addTier(crossSell.variantId)}
                />
              )}
            </>
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

              {otherSavings > 0 && (
                <div
                  className={`flex items-baseline justify-between font-semibold ${cyber ? 'text-cyber-300' : 'text-accent'}`}
                >
                  <dt>Descuentos</dt>
                  <dd className="tabular-nums">−{formatARS(otherSavings)}</dd>
                </div>
              )}

              {comboTotal > 0 && (
                <div
                  className={`flex items-baseline justify-between font-semibold ${
                    cyber ? 'text-cyber-300' : 'text-emerald-400'
                  }`}
                >
                  <dt>{comboLabel}</dt>
                  <dd className="tabular-nums">−{formatARS(comboTotal)}</dd>
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

            {/* Cuotas sin interés, como en el checkout: sobre el total del carrito. */}
            {PAYMENTS.installments > 1 && cart.total > 0 && (
              <p className="mt-1.5 text-right text-xs text-ink-400">
                o {PAYMENTS.installments} {PAYMENTS.installmentsLabel} de{' '}
                <span className="font-bold tabular-nums text-white">
                  {formatARS(Math.round(cart.total / PAYMENTS.installments))}
                </span>
              </p>
            )}

            {/* Medios de pago: los mismos logos de /tienda, en chips claros para
                que se vean en sus colores sobre el fondo oscuro. */}
            <ul className="mt-3 grid grid-cols-5 gap-1.5">
              {PAYMENT_LOGOS.map((p) => {
                const look = CART_LOGO_LOOK[p.name];
                return (
                  <li
                    key={p.name}
                    className={`flex h-9 items-center justify-center overflow-hidden rounded-md ${look?.wide ? 'px-0' : 'px-1.5'} ${look?.bg ?? 'bg-white'}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={look?.src ?? p.src}
                      alt={p.name}
                      width={look?.w ?? p.w}
                      height={look?.h ?? p.h}
                      loading="lazy"
                      decoding="async"
                      className={`w-auto max-w-full object-contain ${look?.img ?? 'h-5'} ${look?.wide ? 'scale-110' : ''}`}
                    />
                  </li>
                );
              })}
            </ul>

            <button
              type="button"
              onClick={checkout}
              disabled={busy}
              className={`mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl font-display text-base font-black uppercase italic tracking-wider text-white transition disabled:cursor-wait disabled:opacity-70 ${
                cyber
                  ? 'bg-gradient-to-r from-cyber-700 to-cyber-500 shadow-[0_8px_24px_rgba(124,58,237,0.5)] hover:from-cyber-600 hover:to-cyber-400'
                  : 'bg-accent shadow-[0_8px_24px_rgba(215,7,7,0.35)] hover:bg-accent-600'
              }`}
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
