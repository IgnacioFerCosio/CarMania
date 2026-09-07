/**
 * PROMO BAR — banner finito arriba de todo, fondo negro.
 * Sirve para mensajes universales tipo "envío gratis" o "cuotas".
 * Si querés desactivarlo, cambiá PROMO_BARS.top.enabled a false en config.
 *
 * Dos modos:
 *  - sin props: un solo mensaje centrado (el de PROMO_BARS.top). Es lo que
 *    usan `/` y `/parasol`, y se resuelve entero en el servidor.
 *  - con `messages`: un beneficio a la vez, rotando en bucle. Lo delega en
 *    `PromoRotator`, que es el único pedazo que necesita estado.
 */
import { PROMO_BARS } from '@/lib/config';
import { PromoRotator } from './PromoRotator';

export function PromoBar({ messages }: { messages?: readonly string[] } = {}) {
  if (!PROMO_BARS.top.enabled) return null;

  if (!messages) {
    return (
      <div className="bg-ink-950 py-2 text-center text-[11px] font-bold uppercase tracking-widest text-ink-200 md:text-xs">
        « {PROMO_BARS.top.text} »
      </div>
    );
  }

  return <PromoRotator messages={messages} />;
}
