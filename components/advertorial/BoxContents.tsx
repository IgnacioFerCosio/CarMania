/**
 * "Qué viene en la caja": foto + lista en card, como la caja de `WhatsInBox`.
 * No reusa `WhatsInBox`, que pide carrusel y una reseña, y acá no hay
 * ninguna de las dos.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function BoxContents({
  box,
  bg = 'gray',
}: {
  box: AdvertorialData['box'];
  bg?: Bg;
}) {
  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 md:px-6">
        <MediaSlot slot={box.media} sizes="(min-width: 768px) 560px, 100vw" />
        <div>
          <SectionHeading heading={box} align="left" />
          <ul className="mt-6 space-y-3 rounded-2xl border border-ink-800 bg-ink-900/50 p-4 sm:p-5 md:p-6">
            {box.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink-200 sm:text-base">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
