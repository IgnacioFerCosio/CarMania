/**
 * PROMO BAR — banner finito arriba de todo, fondo negro.
 * Sirve para mensajes universales tipo "envío gratis" o "cuotas".
 * Si querés desactivarlo, cambiá PROMO_BARS.top.enabled a false en config.
 *
 * Dos modos:
 *  - sin props: un solo mensaje centrado (el de PROMO_BARS.top). Es lo que
 *    usan `/` y `/parasol`.
 *  - con `messages`: marquee infinito que rota entre varios mensajes, como
 *    la barra de anuncios de /tienda.
 */
import { PROMO_BARS } from '@/lib/config';

export function PromoBar({ messages }: { messages?: readonly string[] } = {}) {
  if (!PROMO_BARS.top.enabled) return null;

  if (!messages) {
    return (
      <div className="bg-ink-950 py-2 text-center text-[11px] font-bold uppercase tracking-widest text-ink-200 md:text-xs">
        « {PROMO_BARS.top.text} »
      </div>
    );
  }

  // Duplicamos la lista para que el loop no tenga "salto" (mismo patrón que
  // CarBrands: el track viaja 50% y vuelve a 0).
  const items = [...messages, ...messages];

  return (
    <div className="overflow-hidden bg-ink-950 py-2">
      <div className="marquee-track flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest text-ink-200 sm:gap-14 md:text-xs">
        {items.map((m, i) => (
          <span key={`${m}-${i}`} className="shrink-0 whitespace-nowrap">
            « {m} »
          </span>
        ))}
      </div>
    </div>
  );
}
