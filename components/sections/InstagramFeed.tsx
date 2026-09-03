/**
 * INSTAGRAM — grilla curada de posts, al cierre de /tienda.
 *
 * Equivalente al "Join 50K+ car enthusiast by following @car.mount" de
 * CARMOUNT, que también es una grilla estática: 12 fotos subidas a mano, no
 * un feed en vivo.
 *
 * NO consume la API de Instagram. El porqué (CSP, token, ISR) está en el
 * bloque `INSTAGRAM` de lib/config.ts.
 *
 * SLOTS DE IMAGEN: cada post apunta a un archivo en /public/instagram/. El
 * que todavía no existe muestra el placeholder con el glifo, así la grilla
 * nunca queda rota mientras se cargan las fotos.
 */
import Image from 'next/image';
import { INSTAGRAM } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function InstagramFeed() {
  const { handle, url, count, leadBefore, leadAfter, leadPlain, posts } =
    INSTAGRAM;

  return (
    <section className="bg-[#24262A] py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center font-display text-sm font-black uppercase italic tracking-wide text-white sm:text-base md:text-lg">
          <Icon name="instagram" className="h-5 w-5 text-accent sm:h-6 sm:w-6" />
          {count ? (
            <>
              <span>{leadBefore}</span>
              <span className="text-accent">{count}</span>
              <span>{leadAfter}</span>
            </>
          ) : (
            <span>{leadPlain}</span>
          )}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
          >
            {handle}
          </a>
        </p>

        <ul className="mt-7 grid grid-cols-3 gap-1.5 sm:mt-9 sm:grid-cols-4 sm:gap-2 lg:grid-cols-6">
          {posts.map((p, i) => (
            <li key={p.image}>
              <a
                // Sin permalink todavía, el tile manda al perfil.
                href={p.href || url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={p.alt || `Ver publicación ${i + 1} en Instagram`}
                className="group relative block aspect-square overflow-hidden rounded-lg bg-ink-900"
              >
                {/* Placeholder — visible mientras carga o si la foto no existe */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950"
                >
                  <Icon name="instagram" className="h-7 w-7 text-white/10" />
                </span>

                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay de hover con el glifo, como en las grillas de IG */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition duration-300 group-hover:bg-black/45 group-hover:opacity-100"
                >
                  <Icon name="instagram" className="h-6 w-6 text-white" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
