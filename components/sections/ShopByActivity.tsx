/**
 * SHOP BY ACTIVITY — carrusel horizontal de "para qué momento".
 *
 * Equivalente al "SHOP BY ACTIVITY" de CARMOUNT: tiles verticales con foto
 * lifestyle, el label abajo y loop infinito. Cada tile linkea a la landing del
 * producto que resuelve ese caso.
 *
 * El track se pausa en hover para que se pueda clickear un tile sin
 * perseguirlo. La lista va duplicada para que el loop no salte (mismo patrón
 * que CarBrands).
 *
 * SLOTS DE IMAGEN: si una foto de `STORE_ACTIVITIES` no existe, queda el
 * placeholder con gradiente + la inicial del label.
 */
import Image from 'next/image';
import Link from 'next/link';
import { STORE_ACTIVITIES, STORE_SECTIONS } from '@/lib/config';

export function ShopByActivity() {
  const items = [...STORE_ACTIVITIES, ...STORE_ACTIVITIES];

  return (
    <section className="bg-ink-950 py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 className="heading-display text-center text-2xl leading-tight sm:text-3xl md:text-5xl">
          {`${STORE_SECTIONS.activityTitle} `}
          <span className="text-accent">{STORE_SECTIONS.activityTitleAccent}</span>
        </h2>
      </div>

      <div className="mt-8 overflow-hidden sm:mt-11 md:mt-14">
        <ul className="marquee-track flex items-stretch gap-3 hover:[animation-play-state:paused] sm:gap-4">
          {items.map((a, i) => (
            <li
              key={`${a.label}-${i}`}
              className="w-[42vw] shrink-0 sm:w-[26vw] lg:w-[15vw]"
            >
              <Link
                href={a.href}
                tabIndex={i < STORE_ACTIVITIES.length ? undefined : -1}
                aria-hidden={i < STORE_ACTIVITIES.length ? undefined : true}
                className="group relative block aspect-[3/4] overflow-hidden rounded-xl bg-ink-900"
              >
                {/* Placeholder — visible mientras carga o si la foto no existe */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-ink-700 via-ink-800 to-ink-950 text-6xl font-black italic text-white/10"
                >
                  {a.label[0]}
                </span>

                <Image
                  src={a.image}
                  alt={a.label}
                  fill
                  sizes="(min-width: 1024px) 15vw, (min-width: 640px) 26vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/35 to-transparent"
                />

                <span className="absolute bottom-3 left-3 font-display text-xs font-black italic uppercase tracking-wider text-white sm:text-sm md:text-base">
                  Para <span className="text-accent">{a.label}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
