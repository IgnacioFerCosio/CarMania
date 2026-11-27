/**
 * Card de una reseña. Sin `'use client'` a propósito: así la usan tanto
 * `Reviews` (Server Component, la lista completa) como `ReviewsExpandable`
 * (cliente, la lista con "Ver más") sin duplicar el markup.
 *
 * La foto del cliente va arriba sólo si la reseña la trae; sin foto, la card
 * es sólo texto (antes mostraba un placeholder "Foto cliente").
 */
import Image from 'next/image';
import type { Review } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';

export function ReviewCard({ review: r }: { review: Review }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
      {/* Sin foto del cliente, la tarjeta es sólo texto. */}
      {r.image && <ReviewImage image={r.image} />}

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
            {r.name}
          </span>
          {r.verified && (
            <span
              className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent/15 text-accent"
              title="Compra verificada"
            >
              <Icon name="check" className="h-3 w-3" />
            </span>
          )}
        </div>

        <div className="mt-1.5">
          <Stars rating={r.stars} size={13} />
        </div>

        <p className="mt-3 text-sm leading-relaxed text-ink-200 line-clamp-5">
          {r.text}
        </p>

        <div className="mt-3 flex items-center justify-between text-[11px] text-ink-400">
          <span>{r.location}</span>
          <span>{r.date}</span>
        </div>
      </div>
    </li>
  );
}

/** Foto del cliente (sólo si la reseña trae una). */
function ReviewImage({ image }: { image: string }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-ink-900">
      <Image
        src={image}
        alt="Foto de reseña"
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
      />
    </div>
  );
}
