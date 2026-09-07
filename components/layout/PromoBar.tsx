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

  // Dos mitades idénticas: el track viaja -50% → 0, así el loop no salta
  // (mismo patrón que CarBrands).
  //
  // Cada mitad va con `min-w-[100vw]`: con 3 mensajes cortos el track medía
  // menos que la pantalla, así que arrancaba a -50% y dejaba media barra
  // VACÍA hasta que el marquee traía los mensajes. Forzando cada mitad al
  // ancho del viewport, siempre hay contenido a la vista desde el primer
  // frame. En mobile, si los mensajes no entran, la mitad crece sola y el
  // marquee sigue funcionando como antes.
  return (
    <div className="overflow-hidden bg-ink-950 py-2">
      <div className="marquee-track flex text-[11px] font-bold uppercase tracking-widest text-ink-200 md:text-xs">
        {[0, 1].map((half) => (
          <div
            key={half}
            // La segunda mitad es puro relleno visual: fuera del árbol de
            // accesibilidad para no leer los mensajes dos veces.
            {...(half === 1 ? { 'aria-hidden': true } : {})}
            className="flex min-w-[100vw] shrink-0 items-center justify-around gap-10 px-5 sm:gap-14"
          >
            {messages.map((m) => (
              <span key={m} className="shrink-0 whitespace-nowrap">
                « {m} »
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
