/** El video del bombero voluntario. La página lo oculta en producción mientras sea placeholder. */
import type { AdvertorialData } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';

export function ExpertVideo({ expert }: { expert: AdvertorialData['expert'] }) {
  return (
    <section className="bg-[#111214] py-14 sm:py-20">
      <div className="mx-auto max-w-[680px] px-4 text-center">
        <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {expert.title}
        </h2>
        <div className="mx-auto mt-8 max-w-[320px]">
          <MediaSlot slot={expert.media} sizes="320px" />
        </div>
        <p className="mt-3 text-sm text-ink-400">{expert.caption}</p>
      </div>
    </section>
  );
}
