/**
 * "Cómo funciona": 3 pasos con su "GIF" y, abajo, el despiece. No reusa
 * `HowItWorks` porque ese recibe rutas de video sueltas y no slots con
 * placeholder.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';

export function StepsGrid({ steps }: { steps: AdvertorialData['steps'] }) {
  return (
    <section id="how" className="bg-[#111214] py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center font-display text-[26px] font-extrabold tracking-tight text-white sm:text-4xl">
          {steps.title}
        </h2>

        <ol className="mt-8 grid gap-8 sm:mt-12 md:grid-cols-3 md:gap-6">
          {steps.items.map((s) => (
            <li key={s.n}>
              <MediaSlot slot={s.media} sizes="(min-width: 768px) 33vw, 100vw" />
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-display text-3xl font-black text-accent">{s.n}</span>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink-300">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
          <h3 className="mb-4 text-center font-display text-lg font-bold text-white sm:text-xl">
            {steps.exploded.title}
          </h3>
          <MediaSlot slot={steps.exploded.media} sizes="(min-width: 896px) 896px, 100vw" />
        </div>
      </div>
    </section>
  );
}
