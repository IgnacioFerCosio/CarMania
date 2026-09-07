/**
 * HOW IT WORKS — 3 cards con video real arriba + número + título + desc abajo.
 * Los videos se reproducen solos, sin sonido y en loop (igual que el hero).
 * Sin texto flotando encima del video.
 */
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { LazyVideo } from '@/components/ui/LazyVideo';

// Los videos de cada paso viven en /public/how-to-use/ y se sirven desde el
// mismo origen (`s.video` en config). Ojo: la CSP de `_headers` tiene
// `media-src 'self'`, así que apuntar esto a un CDN externo hace que los
// videos no carguen en producción.

export function HowItWorks({ config = SOPORTE }: { config?: LandingConfig } = {}) {
  const { headlines, steps } = config;

  return (
    <section id="how" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <p className="eyebrow">{headlines.howItWorksLabel}</p>
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {headlines.howItWorksTitle}
          </h2>
        </div>

        <ol className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {steps.map((s) => (
            <li
              key={s.n}
              className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950"
            >
              {/* Video sin ningún texto encima. El aspect-ratio del contenedor
                  reserva el espacio aunque el video todavía no se haya montado. */}
              <div className="relative aspect-video w-full overflow-hidden bg-ink-900 sm:aspect-[6/5]">
                <LazyVideo
                  src={s.video}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Texto debajo */}
              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="font-display text-base font-black italic uppercase tracking-wider">
                  <span className="text-accent">{String(s.n).padStart(2, '0')}.</span>{' '}
                  <span className="text-white">{s.title}</span>
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-300 sm:mt-3 md:text-base">
                  {s.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
