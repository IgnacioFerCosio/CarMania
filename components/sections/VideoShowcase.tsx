'use client';

/**
 * VIDEO SHOWCASE — carrusel de videos verticales del producto en acción.
 *
 * Se reproduce un video por vez (el primero a la vista). Cuando termina, la
 * fila se corre sola un lugar hacia la derecha y arranca el siguiente. Para
 * que el giro sea infinito, la lista se repite una vez al final: al llegar a
 * la copia del primero, la fila vuelve al original sin animación (se ven
 * iguales, así que el salto no se nota).
 *
 * Mobile: ~1 video y medio a la vista. Desktop: 3.
 *
 * Los videos recién reciben su `src` cuando la sección está por entrar en
 * pantalla, y sólo se reproducen mientras se ve. Tienen que estar en /public
 * (CSP `media-src 'self'`).
 *
 * Lleva `id="how"` porque ocupa el lugar de "Cómo funciona": así el link
 * del Navbar sigue llevando a esta altura de la página.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { VideoShowcaseData } from '@/lib/landings/types';

/** Duración del corrimiento entre videos, en ms. */
const SLIDE_MS = 600;

export function VideoShowcase({ data }: { data: VideoShowcaseData }) {
  const { eyebrow, title, accent, videos } = data;
  const n = videos.length;
  const items = [...videos, ...videos];

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const [load, setLoad] = useState(false); // cerca del viewport: ya hay src
  const [inView, setInView] = useState(false); // a la vista: se reproduce

  // Ancho de un corrimiento = ancho de una tarjeta + el gap de la fila.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setStep(first.getBoundingClientRect().width + gap);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setLoad(true);
      setInView(true);
      return;
    }
    const near = new IntersectionObserver(
      (e) => e.some((x) => x.isIntersecting) && setLoad(true),
      { rootMargin: '300px' },
    );
    const seen = new IntersectionObserver((e) => setInView(e.some((x) => x.isIntersecting)), {
      threshold: 0.25,
    });
    near.observe(el);
    seen.observe(el);
    return () => {
      near.disconnect();
      seen.disconnect();
    };
  }, []);

  // Sólo el video activo corre; el resto queda pausado en su primer cuadro.
  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      if (k === index && inView && load) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, inView, load]);

  const next = useCallback((k: number) => {
    setIndex((i) => (k === i ? i + 1 : i));
  }, []);

  // Llegó a la copia del primero: vuelve al original sin animación.
  const onTransitionEnd = () => {
    if (index < n) return;
    setAnimate(false);
    setIndex(index - n);
  };
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const i = title.indexOf(accent);
  const before = i >= 0 ? title.slice(0, i) : title;
  const after = i >= 0 ? title.slice(i + accent.length) : '';

  return (
    <section ref={sectionRef} id="how" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {before}
            {i >= 0 && <span className="text-accent">{accent}</span>}
            {after}
          </h2>
        </div>

        <div className="mt-8 overflow-hidden sm:mt-12">
          <ul
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className="flex gap-3 md:gap-6"
            style={{
              transform: `translateX(${-index * step}px)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.22,1,0.36,1)` : 'none',
            }}
          >
            {items.map((v, k) => (
              <li
                key={k}
                aria-hidden={k >= n || undefined}
                className="w-[68%] shrink-0 overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 sm:w-[44%] md:w-[calc((100%-3rem)/3)]"
              >
                <div className="relative aspect-[480/764] w-full overflow-hidden bg-ink-900">
                  <video
                    ref={(el) => {
                      videoRefs.current[k] = el;
                    }}
                    // #t=0.1: que el navegador muestre el primer cuadro en
                    // pausa (Safari si no deja el recuadro en negro).
                    src={load ? `${v.src}#t=0.1` : undefined}
                    muted
                    playsInline
                    preload="metadata"
                    onEnded={() => next(k)}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="px-4 py-3.5 font-display text-sm font-black uppercase italic tracking-wider text-white sm:text-base">
                  {v.label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
