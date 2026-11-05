'use client';

/**
 * "Sabés que funciona antes de necesitarlo" + "¿Qué incluye?": la estructura
 * de `WhatsInBox` (media a la izquierda, texto y lista a la derecha) con un
 * visor que muestra una pieza a la vez.
 *
 * Una sola fuente de verdad (`includes.pieces`) alimenta las tres formas de
 * navegar: flechas, puntos y la lista de "¿Qué incluye?" (cada ítem lleva a su
 * pieza). Debajo del visor va el nombre y la explicación de la pieza activa,
 * así en el celular no hay que bajar a la lista para saber qué se está
 * viendo. El orden de las piezas es el del array en la config.
 *
 * Es 'use client' sólo por el estado de la pieza activa. Se renderiza una
 * sola pieza a la vez: el video de la prueba arranca cuando se lo elige
 * (LazyVideo) y las otras no cargan nada.
 *
 * En el celular el orden es título → visor → lista; en desktop, visor a la
 * izquierda y título + lista a la derecha (mismo grid que WhatsInBox).
 */
import { useRef, useState } from 'react';
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function IncludesShowcase({
  includes,
  cta,
  bg = 'gray',
}: {
  includes: AdvertorialData['includes'];
  cta: AdvertorialData['cta'];
  bg?: Bg;
}) {
  const { pieces, items } = includes;
  const [index, setIndex] = useState(0);
  const viewerRef = useRef<HTMLDivElement>(null);
  const total = pieces.length;
  const active = pieces[index];
  const go = (next: number) => setIndex(((next % total) + total) % total);

  /**
   * Desde la lista: en el celular el visor queda arriba de la lista y, al
   * tocar un ítem, la pieza cambiaría fuera de pantalla. Si el visor no se ve
   * entero, lo traemos al centro.
   */
  function pick(i: number) {
    setIndex(i);
    const el = viewerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < 0 || r.bottom > window.innerHeight) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid gap-8 sm:gap-10 md:grid-cols-2 md:content-center md:gap-x-16 md:gap-y-8">
          {/* Título */}
          <div className="md:col-start-2 md:row-start-1 md:self-end">
            <SectionHeading heading={includes} align="left" />
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200 sm:mt-5 sm:text-base md:text-lg">
              {includes.body}
            </p>
          </div>

          {/* Visor */}
          <div ref={viewerRef} className="md:col-start-1 md:row-span-2 md:row-start-1">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-inset ring-white/5">
              {/* `key`: al cambiar de pieza se desmonta la anterior, así un
                  video no sigue corriendo atrás de la nueva. */}
              <MediaSlot
                key={active.id}
                slot={active.media}
                fill
                sizes="(min-width: 768px) 560px, 100vw"
              />

              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Pieza anterior"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 sm:left-3"
              >
                <Icon name="chevron-down" className="h-5 w-5 rotate-90" />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Pieza siguiente"
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80 sm:right-3"
              >
                <Icon name="chevron-down" className="h-5 w-5 -rotate-90" />
              </button>
            </div>

            {/* Qué es lo que se está viendo */}
            <div className="mt-4 sm:mt-5" aria-live="polite">
              <h3 className="font-display text-base font-black italic uppercase tracking-wider text-white sm:text-lg">
                <span className="text-accent">{String(index + 1).padStart(2, '0')}.</span>{' '}
                {active.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-300 sm:text-base">{active.desc}</p>
            </div>

            <div className="mt-2 flex items-center">
              {pieces.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ver: ${p.title}`}
                  aria-current={i === index}
                  className="group flex items-center px-1.5 py-2"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === index ? 'w-4 bg-accent' : 'w-1.5 bg-ink-600 group-hover:bg-ink-400'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ¿Qué incluye? */}
          <div className="md:col-start-2 md:row-start-2 md:self-start">
            <div className="rounded-2xl border border-ink-800 bg-ink-900/50 p-4 sm:p-5 md:p-6">
              <h3 className="font-display text-xs font-black italic uppercase tracking-wider text-accent sm:text-sm">
                {includes.listTitle}
              </h3>
              <ul className="mt-3 grid gap-1 text-sm">
                {items.map((item) => {
                  const target = pieces.findIndex((p) => p.id === item.piece);
                  const isActive = target === index;
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        onClick={() => target >= 0 && pick(target)}
                        className={`flex w-full items-start gap-2 rounded-lg px-2 py-2 text-left transition ${
                          isActive
                            ? 'bg-accent/10 text-white ring-1 ring-inset ring-accent/40'
                            : 'text-ink-200 hover:bg-ink-800/60'
                        }`}
                      >
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <CtaLink label={cta.label} href={cta.href} className="mt-6 w-full sm:w-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}
