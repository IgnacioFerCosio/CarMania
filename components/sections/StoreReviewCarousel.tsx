'use client';
/**
 * Carrusel de reseñas de /tienda: scroll horizontal con snap (se desliza con el
 * dedo en mobile) y flechas en desktop. Sin librerías: el movimiento lo hace el
 * navegador, las flechas sólo llaman a `scrollBy`.
 *
 * Las cards son de dos tipos:
 *  - `review`: reseña con foto, estrellas, texto, nombre y ciudad.
 *  - `photo`: sólo la foto del cliente con el producto, sin cita ni nombre.
 *
 * Las fotos van como `<img>` plano (no next/image): en Cloudflare
 * `/_next/image` no optimiza y las carpetas de reseñas se sirven estáticas.
 */
import { useRef } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';

export type StoreReviewItem =
  | {
      kind: 'review';
      product: string;
      image: string;
      name: string;
      location: string;
      stars: number;
      text: string;
      date: string;
    }
  | { kind: 'photo'; product: string; image: string; alt: string };

export function StoreReviewCarousel({ items }: { items: StoreReviewItem[] }) {
  const track = useRef<HTMLUListElement>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = (card?.getBoundingClientRect().width ?? 300) + 16;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }

  return (
    <div className="relative mt-10 sm:mt-14">
      <ul
        ref={track}
        aria-label="Reseñas de clientes"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((it, i) => (
          <li
            key={`${it.image}-${i}`}
            className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 sm:w-[44%] lg:w-[31%]"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={it.image}
                alt={it.kind === 'photo' ? it.alt : `Foto de ${it.name} con su ${it.product}`}
                width={640}
                height={480}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-2 top-2 rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-ink-200 backdrop-blur-sm sm:text-[10px]">
                {it.product}
              </span>
            </div>

            {it.kind === 'review' ? (
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <Stars rating={it.stars} size={13} />
                <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-200 line-clamp-5 sm:text-sm">
                  “{it.text}”
                </p>
                <p className="mt-4 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                  — <span className="text-accent">{it.name}</span>, {it.location} 🇦🇷
                </p>
              </div>
            ) : (
              <p className="p-4 text-[11px] font-bold uppercase tracking-wider text-ink-500 sm:p-5">
                Foto de un cliente · <span className="text-accent">{it.product}</span>
              </p>
            )}
          </li>
        ))}
      </ul>

      {/* Flechas: sólo desktop, en mobile se desliza con el dedo. */}
      <div className="mt-2 hidden items-center justify-center gap-3 md:flex">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Reseñas anteriores"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-950 text-white transition hover:border-accent hover:text-accent"
        >
          <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Reseñas siguientes"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-700 bg-ink-950 text-white transition hover:border-accent hover:text-accent"
        >
          <Icon name="arrow-right" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
