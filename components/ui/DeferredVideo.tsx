'use client';

/**
 * Video de fondo que recién empieza a bajar cuando la página terminó de
 * cargar (`window.load`). Mientras tanto se ve el `poster`, que es lo que
 * cuenta como LCP y ya viene precargado desde la página.
 *
 * Existe porque con `autoPlay` el navegador baja el video entero apenas
 * parsea el HTML (`preload` no lo frena), y en 4G esos cientos de KB compiten
 * con el JS y las fuentes del primer render.
 */
import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  poster?: string;
  width: number;
  height: number;
  className?: string;
};

export function DeferredVideo({ src, poster, width, height, className = '' }: Props) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (document.readyState === 'complete') {
      setReady(true);
      return;
    }
    const onLoad = () => setReady(true);
    window.addEventListener('load', onLoad, { once: true });
    return () => window.removeEventListener('load', onLoad);
  }, []);

  useEffect(() => {
    // Algunos navegadores no arrancan solos un video al que se le pone el
    // `src` después del montaje, aunque tenga `autoPlay`.
    if (ready) ref.current?.play().catch(() => {});
  }, [ready]);

  return (
    <video
      ref={ref}
      src={ready ? src : undefined}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      width={width}
      height={height}
      className={className}
    />
  );
}
