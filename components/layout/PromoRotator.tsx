'use client';

/**
 * Rotador de la barra de anuncios de /tienda: muestra UN beneficio a la vez y
 * va cambiando en bucle con un cruce de opacidad.
 *
 * Vive aparte de `PromoBar` a propósito: la barra es Server Component y `/` y
 * `/parasol` la usan en su modo de mensaje único. Si el estado viviera ahí,
 * esas dos páginas se llevarían el JS sin necesitarlo.
 *
 * Los mensajes están TODOS en el DOM: la lista `sr-only` es la que leen los
 * lectores de pantalla (si no, sólo escucharían el que quedó al montar), y el
 * párrafo que rota va `aria-hidden`. Sin `aria-live`: es publicidad de fondo,
 * no algo que deba interrumpir la lectura.
 *
 * Con `prefers-reduced-motion` no rota: se queda en el primero.
 */
import { useEffect, useState } from 'react';

/** Cuánto queda cada mensaje en pantalla, ya contando el cruce. */
const HOLD_MS = 3200;
/** Duración del fundido. Tiene que coincidir con la clase `duration-*`. */
const FADE_MS = 400;

export function PromoRotator({ messages }: { messages: readonly string[] }) {
  const [i, setI] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (messages.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let fade: number | undefined;
    const cycle = window.setInterval(() => {
      setShown(false);
      // Cambiamos el texto recién con la línea ya invisible, así no se ve el
      // salto de un mensaje al otro.
      fade = window.setTimeout(() => {
        setI((p) => (p + 1) % messages.length);
        setShown(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(cycle);
      if (fade) window.clearTimeout(fade);
    };
  }, [messages.length]);

  return (
    <div className="bg-ink-950 py-2">
      <ul className="sr-only">
        {messages.map((m) => (
          <li key={m}>{m}</li>
        ))}
      </ul>
      <p
        aria-hidden="true"
        className={`text-center text-[11px] font-bold uppercase tracking-widest text-ink-200 transition-opacity duration-[400ms] md:text-xs ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        « {messages[i]} »
      </p>
    </div>
  );
}
