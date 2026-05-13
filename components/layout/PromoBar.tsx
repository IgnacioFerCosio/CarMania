/**
 * PROMO BAR — banner finito arriba de todo, fondo negro.
 * Sirve para mensajes universales tipo "envío gratis" o "cuotas".
 * Si querés desactivarlo, cambiá PROMO_BARS.top.enabled a false en config.
 */
import { PROMO_BARS } from '@/lib/config';

export function PromoBar() {
  if (!PROMO_BARS.top.enabled) return null;

  return (
    <div className="bg-ink-950 py-2 text-center text-[11px] font-bold uppercase tracking-widest text-ink-200 md:text-xs">
      « {PROMO_BARS.top.text} »
    </div>
  );
}
