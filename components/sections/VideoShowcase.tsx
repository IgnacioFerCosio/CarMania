'use client';

/**
 * VIDEO SHOWCASE — videos verticales del producto en acción.
 *
 * Desktop (md+): los 3 en grilla, todos reproduciéndose a la vez en loop,
 * sin moverse (ya se ven enteros).
 *
 * Mobile: carrusel centrado que arranca en el video del medio, con un margen
 * de los vecinos a cada lado. Se reproduce sólo el del centro; cuando termina,
 * la fila se corre sola al siguiente. También se navega con las flechas.
 * Es infinito: la lista se repite 3 veces y, cuando el centro cae en la
 * primera o la tercera copia, la fila salta a la misma posición de la copia
 * del medio sin animación (se ven iguales, así que el salto no se nota).
 *
 * Los videos recién reciben su `src` cuando la sección está por entrar en
 * pantalla, y sólo se reproducen mientras se ve. Tienen que estar en /public
 * (CSP `media-src 'self'`).
 *
 * Lleva `id="how"` porque ocupa el lugar de "Cómo funciona": así el link
 * del Navbar sigue llevando a esta altura de la página.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { VideoShowcaseData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

/** Duración del corrimiento entre videos, en ms. */
const SLIDE_MS = 600;

export function VideoShowcase({ data }: { data: VideoShowcaseData }) {
  const { eyebrow, title, accent, videos } = data;
  const n = videos.length;
  // Tres copias: [0..n) | [n..2n) | [2n..3n). En desktop sólo se ve la del medio.
  const items = [...videos, ...videos, ...videos];
  const start = n + Math.floor(n / 2); // el video del medio, en la copia del medio

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  // Mobile: tarjetas que ya pidieron su video. Se suman el centro y sus dos
  // vecinos a medida que se navega, y no se sacan (no se vuelve a bajar nada).
  const seen = useRef<Set<number>>(new Set());

  const [index, setIndex] = useState(start);
  const [animate, setAnimate] = useState(true);
  const [geo, setGeo] = useState({ step: 0, card: 0, view: 0 });
  const [desktop, setDesktop] = useState(false);
  const [load, setLoad] = useState(false); // cerca del viewport: ya hay src
  const [inView, setInView] = useState(false); // a la vista: se reproduce

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Medidas para centrar: ancho de la tarjeta, del corrimiento y de la ventana.
  useLayoutEffect(() => {
    const track = trackRef.current;
    const view = viewportRef.current;
    if (!track || !view) return;
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      if (!first) return;
      const card = first.getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      setGeo({ step: card + gap, card, view: view.getBoundingClientRect().width });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(view);
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

  // Desktop: corren los 3 de la copia del medio. Mobile: sólo el del centro.
  useEffect(() => {
    videoRefs.current.forEach((v, k) => {
      if (!v) return;
      const middleCopy = k >= n && k < 2 * n;
      const playing = inView && load && (desktop ? middleCopy : k === index);
      if (playing) {
        if (!desktop) v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [index, inView, load, desktop, n]);

  const go = (to: number) => {
    setAnimate(true);
    setIndex(to);
  };

  // El centro cayó en una copia de los costados: vuelve a la del medio sin animación.
  const onTransitionEnd = () => {
    if (index >= n && index < 2 * n) return;
    setAnimate(false);
    setIndex(index < n ? index + n : index - n);
  };
  useEffect(() => {
    if (animate) return;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(id);
  }, [animate]);

  const offset = (geo.view - geo.card) / 2 - index * geo.step;

  if (load && !desktop) [index - 1, index, index + 1].forEach((k) => seen.current.add(k));
  // Desktop: sólo la copia del medio (las otras están ocultas).
  // Mobile: sólo el centro y sus vecinos, que son los que se ven.
  const hasSrc = (k: number) =>
    load && (desktop ? k >= n && k < 2 * n : seen.current.has(k));

  const t = title.indexOf(accent);
  const before = t >= 0 ? title.slice(0, t) : title;
  const after = t >= 0 ? title.slice(t + accent.length) : '';

  return (
    <section ref={sectionRef} id="how" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl md:px-6">
        <div className="px-4 text-center md:px-0">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {before}
            {t >= 0 && <span className="text-accent">{accent}</span>}
            {after}
          </h2>
        </div>

        <div ref={viewportRef} className="relative mt-8 overflow-hidden sm:mt-12 md:overflow-visible">
          <ul
            ref={trackRef}
            onTransitionEnd={onTransitionEnd}
            className="flex gap-3 md:grid md:grid-cols-3 md:gap-6"
            style={
              desktop
                ? undefined
                : {
                    transform: `translateX(${offset}px)`,
                    transition: animate
                      ? `transform ${SLIDE_MS}ms cubic-bezier(0.22,1,0.36,1)`
                      : 'none',
                  }
            }
          >
            {items.map((v, k) => {
              const middleCopy = k >= n && k < 2 * n;
              return (
                <li
                  key={k}
                  aria-hidden={!middleCopy || undefined}
                  className={`w-[78%] shrink-0 overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 sm:w-[46%] md:w-auto ${
                    middleCopy ? '' : 'md:hidden'
                  }`}
                >
                  <div className="relative aspect-[480/764] w-full overflow-hidden bg-ink-900">
                    <video
                      ref={(el) => {
                        videoRefs.current[k] = el;
                      }}
                      // #t=0.1: que el navegador muestre el primer cuadro en
                      // pausa (Safari si no deja el recuadro en negro).
                      src={hasSrc(k) ? `${v.src}#t=0.1` : undefined}
                      muted
                      playsInline
                      loop={desktop}
                      preload="metadata"
                      onEnded={() => {
                        if (!desktop && k === index) go(index + 1);
                      }}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="px-4 py-3.5 font-display text-sm font-black uppercase italic tracking-wider text-white sm:text-base">
                    {v.label}
                  </p>
                </li>
              );
            })}
          </ul>

          {/* Flechas: sólo en el carrusel del celular. */}
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Video anterior"
            className="absolute left-2 top-[42%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-950/80 text-white backdrop-blur transition hover:border-accent hover:bg-ink-900 md:hidden"
          >
            <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Video siguiente"
            className="absolute right-2 top-[42%] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink-700 bg-ink-950/80 text-white backdrop-blur transition hover:border-accent hover:bg-ink-900 md:hidden"
          >
            <Icon name="arrow-right" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
