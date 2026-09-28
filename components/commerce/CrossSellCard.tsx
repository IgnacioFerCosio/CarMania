'use client';

/**
 * Venta cruzada dentro del drawer: "Completá tu auto".
 *
 * Va DEBAJO de la lista y no adentro de una línea, a propósito: el
 * UpsellBanner de cada línea es "más de lo mismo" (subir de pack) y esta card
 * es "otro producto". Si los dos compitieran en el mismo lugar se leerían
 * como dos ofertas iguales y el cliente no elegiría ninguna.
 *
 * Promete cuánto SUBE EL TOTAL ("sumalo por $X"), igual que el UpsellBanner,
 * y no el precio con el que queda la línea: el descuento lo aplica Shopify y
 * puede ponerlo en la línea del otro producto (ver `CROSS_SELLS`). El total,
 * en cambio, baja siempre lo mismo.
 */
import { formatARS } from '@/lib/shopify';
import type { ResolvedCrossSell } from '@/lib/crossSell';
import { Icon } from '@/components/ui/Icon';

type Props = {
  offer: ResolvedCrossSell;
  busy: boolean;
  onAdd: () => void;
};

export function CrossSellCard({ offer, busy, onAdd }: Props) {
  const pct = Math.round((offer.discountAmount / offer.price) * 100);

  return (
    <section aria-label="Completá tu auto" className="mt-5">
      <p className="mb-2 font-display text-[12px] font-black uppercase italic tracking-wider text-ink-400">
        Completá tu auto
      </p>

      <div className="flex gap-3 rounded-2xl border border-dashed border-ink-700 bg-ink-900/60 p-3 sm:p-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-ink-950 ring-1 ring-inset ring-ink-800 sm:h-20 sm:w-20">
          {/* <img> plano por lo mismo que en CartLineItem: en Cloudflare
              `/_next/image` no optimiza. `lazy`: la card sólo existe con algo
              en el carrito, no compite con nada de la carga inicial. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={offer.image}
            alt={offer.name}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute left-1 top-1 rounded-md bg-accent px-1 py-0.5 font-display text-[10px] font-black leading-none text-white">
            −{pct}%
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="text-[13px] font-semibold leading-tight text-white sm:text-sm">
            {offer.name}
          </h3>
          <p className="mt-0.5 text-[12px] leading-snug text-ink-400">{offer.pitch}</p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-2">
            <div className="leading-tight">
              <span className="block text-[11px] text-ink-400">Sumalo por solo</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-lg font-black text-accent sm:text-xl">
                  {formatARS(offer.offerPrice)}
                </span>
                <span className="text-xs text-ink-500 line-through">
                  {formatARS(offer.price)}
                </span>
              </div>
              <span className="block text-[11px] text-ink-400">
                Combo: {formatARS(offer.discountAmount)} menos llevando los dos
              </span>
            </div>

            <button
              type="button"
              onClick={onAdd}
              disabled={busy}
              aria-label={`Agregar ${offer.name} por ${formatARS(offer.offerPrice)}`}
              className="flex h-9 shrink-0 items-center gap-1 rounded-full bg-accent px-3 font-display text-[12px] font-black uppercase italic tracking-wider text-white transition hover:bg-accent-600 disabled:cursor-wait disabled:opacity-60"
            >
              <Icon name="plus" className="h-4 w-4" />
              Sumar
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
