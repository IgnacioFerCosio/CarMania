'use client';

/**
 * Banner de upsell dentro del drawer.
 *
 * El precio del salto NUNCA está hardcodeado: sale de restar los dos precios
 * reales que devuelve Shopify. Si mañana cambia un precio en el admin, este
 * copy se actualiza solo.
 *
 * No se renderiza cuando la línea ya está en el tier más alto de
 * UPSELL_CHAIN (hoy Pack x6) — lo decide `nextTierOf` por posición, así que
 * si la cadena crece o se acorta esto no necesita tocarse.
 */
import { formatARS } from '@/lib/shopify';
import { upsellDelta, upsellExtraUnits, type ResolvedTier } from '@/lib/tiers';
import { Icon } from '@/components/ui/Icon';

type Props = {
  current: ResolvedTier;
  next: ResolvedTier;
  /** Cantidad de la línea: el salto se aplica a TODA la línea, no a un pack. */
  quantity: number;
  busy: boolean;
  onUpgrade: () => void;
};

export function UpsellBanner({ current, next, quantity, busy, onUpgrade }: Props) {
  const unitDelta = upsellDelta(current, next);
  // Sin delta positivo el banner no tiene nada que ofrecer.
  if (unitDelta === null) return null;

  // Con cantidad > 1 el swap sube los N packs de una, así que el precio y las
  // unidades del copy se multiplican. Si no, el banner prometería $15.005 y
  // el carrito cobraría el doble.
  const delta = unitDelta * quantity;
  const extra = upsellExtraUnits(current, next) * quantity;
  const unitWord = extra === 1 ? 'unidad' : 'unidades';

  return (
    <button
      type="button"
      onClick={onUpgrade}
      disabled={busy}
      className="group mt-3 flex w-full items-center gap-3 rounded-xl border border-accent/60 bg-accent/10 p-3 text-left transition hover:border-accent hover:bg-accent/20 disabled:cursor-wait disabled:opacity-60"
    >
      <span className="flex-1">
        <span className="block text-[13px] font-semibold leading-tight text-white">
          Sumá {extra === 1 ? 'una' : extra} {unitWord} más
        </span>
        <span className="mt-0.5 block font-display text-[13px] font-black italic text-accent">
          por solo {formatARS(delta)}
        </span>
        <span className="mt-1 block text-[11px] leading-tight text-ink-400">
          Pasás a {quantity > 1 ? `${quantity}× ` : ''}
          {next.unitsLabel}
        </span>
      </span>

      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-white transition group-hover:scale-110"
      >
        <Icon name="plus" className="h-4 w-4" />
      </span>
    </button>
  );
}
