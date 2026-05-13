/**
 * SUB PROMO BAR — banner secundario justo debajo del navbar.
 * Estilo: borde superior + inferior accent, texto en accent + italic uppercase.
 * Útil para reforzar la oferta principal o "stock limitado".
 */
import { PROMO_BARS } from '@/lib/config';

export function SubPromoBar() {
  if (!PROMO_BARS.sub.enabled) return null;

  return (
    <div className="relative border-y border-accent/40 bg-ink-950 py-2.5">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/5 to-transparent"
      />
      <p className="relative text-center text-[12px] font-black uppercase italic tracking-[0.18em] text-accent md:text-sm">
        {PROMO_BARS.sub.text}
      </p>
    </div>
  );
}
