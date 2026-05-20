/**
 * HOW IT WORKS — 3 cards con video real arriba + número + título + desc abajo.
 * Los videos se reproducen solos, sin sonido y en loop (igual que el hero).
 * Sin texto flotando encima del video.
 */
import { HEADLINES, STEPS_V2 } from '@/lib/config';

// Rutas de los videos de /public/how-to-use/
const STEP_VIDEOS = [
  '/how-to-use/InstalaLaBase.mp4',
  '/how-to-use/ajustaAngulo.mp4',
  '/how-to-use/colocaTuCelu.mp4',
];

export function HowItWorks() {
  return (
    <section id="how" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center">
          <p className="eyebrow">{HEADLINES.howItWorksLabel}</p>
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {HEADLINES.howItWorksTitle}
          </h2>
        </div>

        <ol className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {STEPS_V2.map((s, i) => (
            <li
              key={s.n}
              className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-950"
            >
              {/* Video sin ningún texto encima */}
              <div className="relative aspect-video w-full overflow-hidden bg-ink-900 sm:aspect-[6/5]">
                <video
                  src={STEP_VIDEOS[i]}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
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
