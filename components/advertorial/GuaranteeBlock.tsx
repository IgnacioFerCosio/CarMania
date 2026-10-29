/** La garantía, sola y en grande: "Vos no arriesgás nada." */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

export function GuaranteeBlock({ guarantee }: { guarantee: AdvertorialData['guarantee'] }) {
  return (
    <section id="garantia" className="bg-[#111214] py-14 sm:py-20">
      <div className="mx-auto flex max-w-[680px] flex-col items-center px-4 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#22C55E]/10 text-[#22C55E]">
          <Icon name="shield" className="h-8 w-8" />
        </span>
        <h2 className="mt-5 font-display text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
          {guarantee.title}
        </h2>
        <p className="mt-4 text-[18px] leading-[1.6] text-ink-300">{guarantee.body}</p>
      </div>
    </section>
  );
}
