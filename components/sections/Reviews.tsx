/**
 * REVIEWS — rediseño con rating breakdown + grid de cards con foto.
 *
 * Header en dos columnas:
 *   Izquierda: "RESEÑAS" + rating promedio grande
 *   Derecha:   Barras de % por estrella (5/4/3/2/1)
 *
 * Cards: imagen del cliente (placeholder), nombre + verified, stars, texto
 * con clamp + link "...Ver más".
 *
 * Cuando integres un sistema real de reviews (Loox / Judge.me / Stamped),
 * reemplazá REVIEWS por el fetch de su API manteniendo el mismo shape
 * y agregá `image: '/reviews/<n>.jpg'` por review.
 */
import Image from 'next/image';
import { BRAND, REVIEWS, RATING_BREAKDOWN } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';

export function Reviews() {
  const { average, total, stars } = RATING_BREAKDOWN;
  const maxCount = Math.max(...stars.map((s) => s.count));

  return (
    <section id="reviews" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* ── Header: title + rating breakdown ───────────────────────── */}
        <div className="grid items-center gap-6 sm:gap-8 md:grid-cols-[auto_1fr] md:gap-12">
          {/* Promedio */}
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="shrink-0 rounded-2xl border border-ink-800 bg-ink-950 px-4 py-3 text-center sm:px-5 sm:py-4">
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
                {average.toFixed(2)}
              </div>
              <Stars rating={average} size={12} />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-xl font-black italic uppercase tracking-wider text-white sm:text-2xl md:text-3xl">
                Reseñas de <span className="text-accent">clientes</span>
              </h2>
              <p className="mt-1 text-xs text-ink-400 sm:text-sm">
                Basado en {total} reseñas verificadas
              </p>
            </div>
          </div>

          {/* Barras por estrella */}
          <ul className="space-y-1.5">
            {stars.map((row) => {
              const pct = (row.count / maxCount) * 100;
              return (
                <li key={row.stars} className="flex items-center gap-2.5 text-xs sm:gap-3">
                  <span className="inline-flex w-14 shrink-0 items-center gap-0.5 sm:w-16">
                    <Stars rating={row.stars} size={11} />
                  </span>
                  <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-ink-800">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-accent"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right font-semibold text-ink-200 sm:w-10">
                    {row.count}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ── Grid de reviews ────────────────────────────────────────── */}
        <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <li
              key={r.name + r.date}
              className="flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950"
            >
              <ReviewImage initial={r.name[0]} index={i} image={'image' in r ? (r as { image: string }).image : undefined} />

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
          ))}
        </ul>

        {/* Counter de total */}
        <p className="mt-8 text-center text-[13px] leading-relaxed text-ink-400 sm:mt-10 sm:text-sm">
          Sumate a los <span className="font-semibold text-white">{BRAND.socialProofCount}</span>{' '}
          clientes que ya manejan tranquilos con CARMANIA.
        </p>
      </div>
    </section>
  );
}

/**
 * Imagen de la review — placeholder gradiente con inicial. Cuando tengas
 * fotos reales que mandan los clientes (o de Loox / Judge.me), reemplazá
 * el div por <Image src={r.image} ... fill className="object-cover" />.
 */
function ReviewImage({ initial, index, image }: { initial: string; index: number; image?: string }) {
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
          alt={`Foto de reseña`}
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
