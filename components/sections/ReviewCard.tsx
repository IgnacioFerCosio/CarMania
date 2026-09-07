/**
 * Card de una reseña. Sin `'use client'` a propósito: así la usan tanto
 * `Reviews` (Server Component, la lista completa) como `ReviewsExpandable`
 * (cliente, la lista con "Ver más") sin duplicar el markup.
 *
 * `index` sólo elige la variante de gradiente del placeholder, para que las
 * cards sin foto no se vean todas iguales.
 */
import Image from 'next/image';
import type { Review } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';

export function ReviewCard({ review: r, index }: { review: Review; index: number }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950">
      <ReviewImage initial={r.name[0]} index={index} image={r.image} />

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

/**
 * Imagen de la review. Si no hay foto, gradiente con la inicial y una píldora
 * "Foto cliente", para que se note que falta en vez de quedar un hueco.
 */
function ReviewImage({
  initial,
  index,
  image,
}: {
  initial: string;
  index: number;
  image?: string;
}) {
  const variants = [
    'from-ink-700 via-ink-800 to-ink-950',
    'from-ink-800 via-ink-900 to-black',
    'from-ink-900 via-ink-800 to-ink-950',
    'from-ink-800 via-black to-ink-900',
  ];
  const bg = variants[index % variants.length];

  return (
    <div className={`relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br ${bg}`}>
      {image ? (
        <Image
          src={image}
          alt="Foto de reseña"
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(215,7,7,0.15),transparent_60%)]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-7xl font-black italic text-white/10">
              {initial}
            </span>
          </div>
          <div className="absolute left-3 top-3 rounded-md border border-white/15 bg-black/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-200 backdrop-blur">
            Foto cliente
          </div>
        </>
      )}
    </div>
  );
}
