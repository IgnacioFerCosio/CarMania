/** El video del bombero voluntario. La página lo oculta en producción mientras sea placeholder. */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function ExpertVideo({
  expert,
  bg = 'black',
}: {
  expert: AdvertorialData['expert'];
  bg?: Bg;
}) {
  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading heading={expert} />
        <div className="mx-auto mt-8 max-w-[320px] sm:mt-12">
          <MediaSlot slot={expert.media} sizes="320px" />
        </div>
        <p className="mt-4 text-center text-[11px] font-semibold uppercase tracking-widest text-ink-400">
          {expert.caption}
        </p>
      </div>
    </section>
  );
}
