/**
 * "Medidas y especificaciones": la misma sección que `TechSpecs` del soporte
 * (foto técnica con las cotas arriba y las medidas en chips abajo: tarjetas en
 * desktop, píldoras en mobile). La foto es un `MediaSlot` (RV-26).
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { SECTION_Y, SectionHeading } from './SectionHeading';

export function SpecsBlock({ specs }: { specs: AdvertorialData['specs'] }) {
  const { description, media, dimensions } = specs;

  return (
    <section id="specs" className={`bg-ink-900 ${SECTION_Y}`}>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <SectionHeading heading={specs} />
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
            {description}
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-14 md:mt-16">
          <div className="mx-auto w-full max-w-2xl">
            <MediaSlot slot={media} sizes="(min-width: 768px) 672px, 100vw" />
          </div>

          {/* Desktop: tarjetas */}
          <ul className="mt-8 hidden grid-cols-4 gap-4 md:grid">
            {dimensions.map((d) => (
              <li
                key={d.label}
                className="rounded-2xl border border-ink-800 bg-ink-950 p-4 text-center"
              >
                <div className="font-display text-xl font-extrabold text-white md:text-2xl">
                  {d.value}
                </div>
                {d.sub && <div className="mt-0.5 text-[10px] text-ink-400">{d.sub}</div>}
                <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
                  {d.label}
                </div>
              </li>
            ))}
          </ul>

          {/* Mobile: píldoras */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:hidden">
            {dimensions.map((d) => (
              <li
                key={d.label}
                className="rounded-full border border-ink-800 bg-ink-950 px-3 py-1.5 text-[11px] text-ink-200"
              >
                <span className="font-bold text-white">{d.value}</span>
                <span className="ml-1 text-ink-400">· {d.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
