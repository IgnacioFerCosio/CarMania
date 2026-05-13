/**
 * PRICING — bloque de conversión principal (rediseño con 3 bundles).
 *
 * 3 cards de oferta tipo "Buy 1 / Buy 2+1 / Buy 4+2". Como tu producto en
 * Shopify tiene 1 variante, los bundles funcionan por CANTIDAD — el botón
 * carga el carrito con quantity=1, 3 o 6 según corresponda. Para que el
 * "2+1 gratis" sea real, configurá en Shopify:
 *   Discounts → Buy X get Y → cuando cantidad ≥ 3, 1 gratis (y ≥ 6, 2 gratis)
 *
 * Mientras tanto, en pantalla mostramos el precio TOTAL del bundle
 * usando `priceMultiplier` (pagás 2, recibís 3 → priceMultiplier = 2).
 */
import Image from 'next/image';
import { formatARS } from '@/lib/shopify';
import {
  BRAND,
  BUNDLES,
  FALLBACK_PRICING,
  PAYMENTS,
  RETURNS,
  URGENCY,
} from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';
import { Countdown } from '@/components/commerce/Countdown';
import { BuyButton } from '@/components/commerce/BuyButton';

type Props = {
  variantId: string;
  productId: string;
  price: number; // ARS — precio unitario actual del producto en Shopify
  compareAtPrice: number | null;
};

export function Pricing({ variantId, productId, price, compareAtPrice }: Props) {
  const unitPrice = price || FALLBACK_PRICING.price;
  const compare = compareAtPrice ?? FALLBACK_PRICING.compareAtPrice;

  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-ink-950 py-14 sm:py-20 md:py-28"
    >
      {/* Línea acento superior */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* ── Header — rating + título + sub pills ───────────────────── */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2">
            <Stars rating={BRAND.averageRating} size={18} />
            <span className="text-sm font-semibold text-accent">
              {BRAND.averageRating}/5 · {BRAND.socialProofCount} {BRAND.socialProofLabel}
            </span>
          </div>

          <h2 className="heading-display mt-3 text-2xl leading-tight sm:mt-4 sm:text-3xl md:text-5xl lg:text-6xl">
            Probá tu CARMANIA <span className="text-accent">30 días gratis</span>
          </h2>

          <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11px] font-semibold uppercase tracking-wider text-ink-300 sm:mt-6 sm:gap-x-6 sm:text-xs md:text-sm">
            <li className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
              Compra sin riesgo
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
              Devolución 30 días
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Icon name="check" className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" />
              Garantía 1 año
            </li>
          </ul>
        </div>

        {/* ── Stock + Countdown ──────────────────────────────────────── */}
        {/* <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-accent/30 bg-ink-900 p-5 md:flex-row md:justify-between md:p-6">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-white">
              {URGENCY.stockLabel}
            </span>
            <span className="text-sm text-ink-400">— últimas unidades</span>
          </div>
          <div className="flex flex-col items-center gap-1 md:items-end">
            <span className="text-[11px] uppercase tracking-widest text-ink-400">
              Esta oferta termina en
            </span>
            <Countdown hours={URGENCY.countdownHours} />
          </div>
        </div> */}

        {/* ── Grid de bundles ────────────────────────────────────────── */}
        <ul className="mt-8 grid gap-5 sm:mt-10 sm:gap-6 md:mt-12 md:grid-cols-3">
          {BUNDLES.map((b, idx) => {
            const bundleTotal = unitPrice * b.priceMultiplier;
            const bundleCompare = compare * b.quantity;
            const savings = bundleCompare - bundleTotal;
            const installment = Math.round(bundleTotal / PAYMENTS.installments);

            // Orden en mobile: MÁS ELEGIDO (double) → MEJOR PRECIO (triple) → 1 UNIDAD (single).
            // En desktop volvemos al orden source (single → double → triple).
            const mobileOrder =
              b.id === 'double' ? 'order-1' :
              b.id === 'triple' ? 'order-2' :
                                  'order-3';

            return (
              <li
                key={b.id}
                className={`${mobileOrder} relative flex flex-col rounded-2xl border bg-ink-900 p-5 sm:rounded-3xl sm:p-6 md:order-none md:p-7 ${
                  b.recommended
                    ? 'border-accent shadow-[0_30px_80px_-20px_rgba(215,7,7,0.45)] ring-2 ring-accent/30 md:scale-[1.03]'
                    : 'border-ink-800'
                }`}
              >
                {/* Badge superior */}
                {b.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-4 py-1 font-display text-[11px] font-black italic uppercase tracking-wider shadow-lg ${
                        b.recommended
                          ? 'bg-accent text-white'
                          : 'bg-white text-ink-950'
                      }`}
                    >
                      <Icon
                        name={b.recommended ? 'fire' : 'star'}
                        className="h-3 w-3"
                      />
                      {b.badge}
                    </span>
                  </div>
                )}

                {/* Título + subtitle */}
                <div className="text-center">
                  <h3 className="font-display text-lg font-black italic uppercase tracking-wider text-white sm:text-xl md:text-2xl">
                    {b.label}
                  </h3>
                  <p className="mt-1 text-[11px] uppercase tracking-wider text-accent sm:text-xs md:text-sm">
                    {b.subtitle}
                  </p>
                </div>

                {/* Foto del producto */}
                <BundleImage index={idx + 1} accent={b.recommended} />

                {/* Precios */}
                <div className="mt-2 text-center">
                  <div className="text-[11px] uppercase tracking-wider text-ink-400 sm:text-xs">
                    Precio normal:{' '}
                    <span className="line-through">{formatARS(bundleCompare)}</span>
                  </div>
                  <div className="mt-2 flex items-baseline justify-center gap-2">
                    <span className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                      {formatARS(bundleTotal)}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] font-bold text-accent sm:text-xs">
                    Te ahorrás {formatARS(savings)}
                  </div>
                </div>

                {/* Cuotas */}
                <div className="mt-4 rounded-xl bg-ink-950 px-3 py-2.5 text-center ring-1 ring-inset ring-ink-800 sm:px-4 sm:py-3">
                  <div className="text-[11px] uppercase tracking-wider text-ink-400">
                    o pagá en
                  </div>
                  <div className="mt-0.5 font-display text-[15px] font-bold text-white sm:text-base">
                    {PAYMENTS.installments} cuotas de {formatARS(installment)}
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
                    sin interés
                  </div>
                </div>

                {/* Bonus + qty visible */}
                <ul className="mt-4 space-y-2 text-[13px] sm:mt-5 sm:text-sm">
                  <li className="flex items-start gap-2 text-ink-200">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span className="font-semibold text-white">{b.unitsLabel}</span>
                  </li>
                  <li className="flex items-start gap-2 text-ink-200">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{b.bonus}</span>
                  </li>
                  
                    <li className="flex items-start gap-2 text-ink-200">
                      <Icon name="truck" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>Envío gratis incluido</span>
                    </li>
                  
                </ul>

                {/* CTA */}
                <div className="mt-5 sm:mt-6">
                  <BuyButton
                    variantId={variantId}
                    productId={productId}
                    price={unitPrice}
                    quantity={b.quantity}
                    discountCode={b.discountCode}
                    totalOverride={bundleTotal}
                    label={b.recommended ? 'Lo quiero — oferta' : 'Comprar'}
                    size="lg"
                    className="w-full"
                    hideHelper
                  />
                </div>

                {/* Trust bottom */}
                <div className="mt-4 flex items-center justify-center gap-x-4 gap-y-1 border-t border-ink-800 pt-3 text-center text-[10px] uppercase tracking-wider text-ink-400 sm:mt-5 sm:flex-col sm:gap-1 sm:pt-4 sm:text-[11px]">
                  <span>Devolución {RETURNS.days} días</span>
                  <span className="hidden sm:inline">Garantía 1 año</span>
                  <span className="inline sm:hidden">· Garantía 1 año</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ── Métodos de pago ────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-ink-400">
            Pagás con tarjeta, débito o MercadoPago
          </span>
          <div className="grid w-full grid-cols-5 gap-2">
            {[
              { name: 'Visa',             src: '/payments/visa.svg',                     lg: false },
              { name: 'Mastercard',       src: '/payments/Mastercard-logo.svg',          lg: false },
              { name: 'Mercado Pago',     src: '/payments/Mercado_Pago.svg',             lg: true  },
              { name: 'American Express', src: '/payments/american-express-stacked.svg', lg: false },
              { name: 'Naranja X',        src: '/payments/NaranjaX-logo.svg',            lg: false },
            ].map((m) => (
              <span
                key={m.name}
                className="flex h-9 items-center justify-center rounded-lg border border-ink-800 bg-ink-900"
              >
                <img
                  src={m.src}
                  alt={m.name}
                  className={`${m.lg ? 'h-7' : 'h-5'} w-auto [filter:brightness(0)_invert(54%)]`}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BundleImage({ index, accent }: { index: number; accent: boolean }) {
  return (
    <div
      className={`relative my-5 aspect-square w-full overflow-hidden rounded-2xl bg-ink-950 ${
        accent ? 'ring-1 ring-inset ring-accent/30' : 'ring-1 ring-inset ring-ink-800'
      }`}
    >
      <Image
        src={`/bundles/BundleX${index}.png`}
        alt={`Bundle opción ${index}`}
        fill
        className="object-cover"
        sizes="(min-width: 768px) 33vw, 100vw"
      />
    </div>
  );
}
