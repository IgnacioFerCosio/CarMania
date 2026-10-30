/** "El test de 3 segundos": el video del vidrio de prueba es el centro de la página. */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function ProofBlock({
  proof,
  cta,
  bg = 'gray',
}: {
  proof: AdvertorialData['proof'];
  cta: AdvertorialData['cta'];
  bg?: Bg;
}) {
  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading heading={proof} />
        <p className="mx-auto mt-4 max-w-2xl text-center text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
          {proof.body}
        </p>

        <div className="mt-8 grid items-end gap-4 sm:mt-12 md:grid-cols-[2fr_1fr] md:gap-6">
          <MediaSlot slot={proof.media} sizes="(min-width: 768px) 720px, 100vw" />
          <div className="mx-auto w-full max-w-[260px] md:max-w-none">
            <MediaSlot slot={proof.secondary} sizes="(min-width: 768px) 360px, 260px" />
          </div>
        </div>

        <div className="mt-8 text-center sm:mt-12">
          <CtaLink label={cta.label} href={cta.href} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}
