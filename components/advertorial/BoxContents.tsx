/**
 * "Qué viene en la caja": foto + lista. No reusa `WhatsInBox`, que pide
 * carrusel y una reseña, y acá no hay ninguna de las dos.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';

export function BoxContents({ box }: { box: AdvertorialData['box'] }) {
  return (
    <section className="bg-white py-12 text-ink-900 sm:py-16 md:py-20">
      <div className="mx-auto grid max-w-4xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12">
        <MediaSlot slot={box.media} tone="light" sizes="(min-width: 768px) 420px, 100vw" />
        <div>
          <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-ink-950 sm:text-3xl">
            {box.title}
          </h2>
          <ul className="mt-5 space-y-3">
            {box.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[18px] leading-snug text-ink-800">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#16A34A]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
