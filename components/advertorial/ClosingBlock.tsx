/**
 * Cierre "Dos mañanas posibles": las dos columnas, la foto tranquila y el
 * último botón. Hace de `BackToPricingCTA` de esta landing (mismo fondo,
 * mismo botón).
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';
import { BG, SECTION_Y, SectionHeading } from './SectionHeading';

export function ClosingBlock({
  closing,
  cta,
}: {
  closing: AdvertorialData['closing'];
  cta: AdvertorialData['cta'];
}) {
  return (
    <section className={`relative overflow-hidden ${BG.black} ${SECTION_Y}`}>
      {/* El mismo glow rojo del hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading heading={closing} />

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {closing.columns.map((c) => {
            const con = c.tone === 'with';
            return (
              <div
                key={c.text}
                className={`rounded-2xl border p-5 sm:p-7 ${
                  con
                    ? 'border-accent bg-ink-900 shadow-[0_30px_80px_-20px_rgba(215,7,7,0.45)] ring-2 ring-accent/30'
                    : 'border-ink-800 bg-ink-900/50'
                }`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    con ? 'bg-accent text-white' : 'bg-ink-800 text-ink-400'
                  }`}
                >
                  <Icon name={con ? 'check' : 'x'} className="h-5 w-5" />
                </span>
                <p className={`mt-4 text-[15px] leading-relaxed sm:text-base md:text-lg ${con ? 'text-white' : 'text-ink-400'}`}>
                  {c.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12">
          <MediaSlot slot={closing.media} sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <CtaLink label={cta.label} href={cta.href} className="w-full sm:w-auto" />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-ink-400 sm:mt-5">
            Envío gratis a todo el país · 3 cuotas sin interés
          </p>
        </div>
      </div>
    </section>
  );
}
