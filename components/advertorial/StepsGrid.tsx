/**
 * "Cómo funciona": las mismas 3 cards que `HowItWorks` (media arriba,
 * "01. TÍTULO" + descripción abajo) y, debajo, el despiece. No reusa
 * `HowItWorks` porque ese recibe rutas de video sueltas y no slots con
 * placeholder.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function StepsGrid({
  steps,
  bg = 'black',
}: {
  steps: AdvertorialData['steps'];
  bg?: Bg;
}) {
  return (
    <section id="how" className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <SectionHeading heading={steps} />

        <ol className="mt-8 grid gap-4 sm:mt-12 sm:gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
          {steps.items.map((s) => (
            <li
              key={s.n}
              className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900"
            >
              <div className="relative aspect-video w-full overflow-hidden bg-ink-900 sm:aspect-[6/5]">
                <MediaSlot slot={s.media} fill sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
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

        <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <h3 className="mb-5 text-center font-display text-base font-black italic uppercase tracking-wider text-white sm:text-lg">
            {steps.exploded.title}
          </h3>
          <MediaSlot slot={steps.exploded.media} sizes="(min-width: 896px) 896px, 100vw" />
        </div>
      </div>
    </section>
  );
}
