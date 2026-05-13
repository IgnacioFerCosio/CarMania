/**
 * WHATS IN BOX — sección split: imagen grande del producto a la izquierda,
 * descripción + listado de "qué incluye la caja" + CTA + testimonial chico
 * a la derecha.
 *
 * SLOT DE IMAGEN: hay un placeholder grande. Reemplazá el <ProductPhoto />
 * por <Image src="/box/producto.jpg" alt="..." fill className="object-contain" />
 * cuando tengas la foto del producto sobre fondo negro.
 */
import Image from 'next/image';
import { HEADLINES, WHATS_IN_BOX, REVIEWS } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';

const TESTIMONIAL = REVIEWS[2]; // segunda muestra de social proof, distinto de la del hero

export function WhatsInBox() {
  return (
    <section className="relative bg-ink-950 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-16">
          {/* Imagen — primero en mobile, izquierda en desktop */}
          <div className="order-1 md:order-1">
            <ProductPhoto />
          </div>

          {/* Texto */}
          <div className="order-2 md:order-2">
            <h2 className="heading-display text-2xl leading-tight sm:text-3xl md:text-5xl">
              {HEADLINES.whatsInBox.split(' ').map((w, i, arr) =>
                i === arr.length - 1 ? (
                  <span key={i} className="text-accent">
                    {w}
                  </span>
                ) : (
                  <span key={i}>{w} </span>
                ),
              )}
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-200 sm:mt-5 sm:text-base md:text-lg">
              <strong className="italic text-accent">Pensado para la vida real</strong>, no
              solo para el auto. {HEADLINES.whatsInBoxSub.replace('Pensado para la vida real, no solo para el auto. ', '')}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-ink-300 sm:mt-4">
              {HEADLINES.whatsInBoxNoTools}
            </p>

            {/* Qué viene en la caja */}
            <div className="mt-5 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 sm:mt-6 sm:p-5 md:p-6">
              <h3 className="font-display text-xs font-black italic uppercase tracking-wider text-accent sm:text-sm">
                ¿Qué incluye?
              </h3>
              <ul className="mt-3 grid gap-2 text-sm text-ink-200">
                {WHATS_IN_BOX.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#pricing"
              className="group mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-accent bg-transparent px-6 font-display text-sm font-black uppercase italic tracking-wider text-accent transition hover:bg-accent hover:text-white sm:w-auto sm:px-7"
            >
              Comprar ahora
              <Icon
                name="arrow-right"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </a>

            {/* Testimonio chico */}
            <div className="mt-7 flex max-w-md items-start gap-3 border-t border-ink-800 pt-5">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-ink-700 to-ink-900 ring-1 ring-inset ring-ink-700">
                <div className="flex h-full w-full items-center justify-center text-sm font-black italic text-white">
                  {TESTIMONIAL.name[0]}
                </div>
              </div>
              <div className="flex-1 text-sm">
                <Stars rating={TESTIMONIAL.stars} size={13} />
                <p className="mt-1 italic leading-snug text-ink-200">
                  &ldquo;{TESTIMONIAL.text}&rdquo;
                </p>
                <p className="mt-1.5 text-xs font-bold text-white">
                  {TESTIMONIAL.name}{' '}
                  <span className="font-normal text-ink-400">/ {TESTIMONIAL.location}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/what-includes/QueIncluye.png"
        alt="Soporte Magnético PRO™ — contenido de la caja"
        className="h-auto w-full rounded-3xl"
      />
    </div>
  );
}
