/** Cierre "Dos mañanas posibles": las dos columnas, la foto tranquila y el último botón. */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';

export function ClosingBlock({
  closing,
  cta,
}: {
  closing: AdvertorialData['closing'];
  cta: AdvertorialData['cta'];
}) {
  return (
    <section className="bg-[#111214] pb-16 pt-4 sm:pb-24">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <h2 className="text-center font-display text-[28px] font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          {closing.title}
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {closing.columns.map((c) => {
            const con = c.tone === 'with';
            return (
              <div
                key={c.text}
                className={`rounded-2xl border p-5 sm:p-6 ${
                  con ? 'border-[#22C55E]/40 bg-[#22C55E]/[0.06]' : 'border-ink-700 bg-ink-900'
                }`}
              >
                <Icon
                  name={con ? 'check' : 'x'}
                  className={`h-6 w-6 ${con ? 'text-[#22C55E]' : 'text-ink-500'}`}
                />
                <p className={`mt-3 text-[17px] leading-[1.6] ${con ? 'text-white' : 'text-ink-300'}`}>
                  {c.text}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8">
          <MediaSlot slot={closing.media} sizes="(min-width: 896px) 896px, 100vw" />
        </div>

        <div className="mt-8 text-center">
          <CtaLink label={cta.label} href={cta.href} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
