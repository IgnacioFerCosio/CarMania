/**
 * PROMO BAR — banner finito arriba de todo, fondo negro.
 * Sirve para mensajes universales tipo "envío gratis" o "cuotas".
 * Si querés desactivarlo, cambiá PROMO_BARS.top.enabled a false en config.
 *
 * Dos modos:
 *  - sin props: no pinta nada. Las landings (`/`, `/parasol`…) llevan los
 *    beneficios dentro del banner de arriba (`CountdownBanner`, ver
 *    PROMO_BARS.benefits), así que el montaje queda por compatibilidad.
 *  - con `messages`: un beneficio a la vez, rotando en bucle. Lo usa /tienda
 *    y lo delega en `PromoRotator`, que es el único pedazo que necesita estado.
 */
import { PROMO_BARS } from '@/lib/config';
import { PromoRotator } from './PromoRotator';

export function PromoBar({ messages }: { messages?: readonly string[] } = {}) {
  if (!PROMO_BARS.top.enabled) return null;
  if (!messages) return null;

  return <PromoRotator messages={messages} />;
}
