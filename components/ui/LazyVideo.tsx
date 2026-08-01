'use client';

/**
 * Video que recién se monta cuando está por entrar en pantalla.
 *
 * Existe porque `preload="none"` NO alcanza: si el `<video>` tiene `autoPlay`,
 * los navegadores lo descargan igual apenas parsean el HTML. Verificado en la
 * pestaña de red — los 3 videos de "Cómo funciona" (7,6 MB) se bajaban en la
 * primera carga aunque están muy por debajo del fold.
 *
 * El contenedor con aspect-ratio va afuera, así el espacio queda reservado
 * desde el primer render y esto no aporta CLS.
 */
import { useEffect, useRef, useState } from 'react';

type Props = {
  src: string;
  className?: string;
  /** Cuánto antes del viewport empezar a cargar. */
  rootMargin?: string;
};

export function LazyVideo({ src, className = '', rootMargin = '300px' }: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver (navegador viejo) mostramos el video igual:
    // preferimos gastar ancho de banda antes que dejar un hueco negro.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="h-full w-full">
      {visible && (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={className}
        />
      )}
    </div>
  );
}
