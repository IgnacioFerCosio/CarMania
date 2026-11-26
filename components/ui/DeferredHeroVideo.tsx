'use client';

/**
 * Video del hero, montado DESPUÉS de que la página termina de cargar.
 *
 * El LCP del hero es su poster. Antes iba como `poster` del <video>, y el
 * navegador recién lo pintaba cuando el elemento de video estaba listo (el
 * video además competía por la red con el resto de la página). Ahora el
 * poster es un <img> común con prioridad alta (lo dibuja `Hero`) y este
 * componente agrega el <video> encima cuando el navegador queda libre: arranca
 * transparente y aparece recién cuando empieza a reproducir, así no hay
 * cuadro negro entre el poster y el primer frame.
 *
 * No toca nada del tracking: los píxeles cargan igual que antes.
 */
import { useEffect, useState } from 'react';

export function DeferredHeroVideo({
  src,
  poster,
  width,
  height,
}: {
  src: string;
  poster?: string;
  width: number;
  height: number;
}) {
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const mount = () => {
      // requestIdleCallback no existe en Safari: con un timeout corto alcanza.
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(() => setMounted(true), { timeout: 1500 });
      } else {
        timer = window.setTimeout(() => setMounted(true), 200);
      }
    };
    if (document.readyState === 'complete') mount();
    else window.addEventListener('load', mount, { once: true });
    return () => {
      window.removeEventListener('load', mount);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;
  return (
    <video
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      width={width}
      height={height}
      onPlaying={() => setPlaying(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
        playing ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
