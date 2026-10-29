/** "El test de 3 segundos": el video del vidrio de prueba es el centro de la página. */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';

export function ProofBlock({
  proof,
  cta,
}: {
  proof: AdvertorialData['proof'];
  cta: AdvertorialData['cta'];
}) {
  return (
    <section className="bg-[#111214] py-14 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            {proof.title}
          </h2>
          <p className="mt-4 text-[17px] leading-[1.6] text-ink-300 sm:text-lg">{proof.body}</p>
        </div>

        <div className="mt-8 grid items-end gap-4 sm:mt-10 md:grid-cols-[2fr_1fr] md:gap-6">
          <MediaSlot slot={proof.media} sizes="(min-width: 768px) 640px, 100vw" />
          <div className="mx-auto w-full max-w-[240px] md:max-w-none">
            <MediaSlot slot={proof.secondary} sizes="(min-width: 768px) 320px, 240px" />
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-10">
          <CtaLink label={cta.label} href={cta.href} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
