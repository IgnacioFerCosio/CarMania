/**
 * Las dos versiones de un pedazo de página: la del evento (CYBER) y la de
 * siempre. Con `CYBER.enabled` van las dos al HTML y el CSS muestra una sola
 * según `data-event` en <html> (lo pone el script del <head> con las fechas
 * del evento, ver `lib/cyber.ts`). Así el evento prende y apaga solo, sin
 * redeploy. Con el evento apagado en config sólo va la de siempre.
 *
 * `display: contents`: los wrappers no generan caja, así que no cambian el
 * layout (ni un `sticky` o `fixed` de adentro).
 */
import type { ReactNode } from 'react';
import { CYBER } from '@/lib/config';

export function EventSwitch({ on, off }: { on: ReactNode; off: ReactNode }) {
  if (!CYBER.enabled) return <>{off}</>;
  return (
    <>
      <div className="hidden event:contents">{on}</div>
      <div className="contents event:hidden">{off}</div>
    </>
  );
}
