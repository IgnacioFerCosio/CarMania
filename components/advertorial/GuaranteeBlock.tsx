/**
 * La garantía: "Vos no arriesgás nada." Fondo y card de `TrustBlock`, con el
 * sello circular de la marca. Lleva `id="trust"` porque es a donde apunta el
 * link "Garantías" del Navbar.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { SECTION_Y, SectionHeading } from './SectionHeading';

export function GuaranteeBlock({ guarantee }: { guarantee: AdvertorialData['guarantee'] }) {
  return (
    <section id="trust" className={`bg-ink-900 ${SECTION_Y}`}>
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <div className="rounded-2xl border border-ink-800 bg-ink-950 p-6 text-center sm:rounded-3xl sm:p-10">
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent text-accent shadow-[0_0_30px_rgba(215,7,7,0.35)]">
            <Icon name="shield" className="h-9 w-9" />
          </span>
          <SectionHeading heading={guarantee} className="mt-5" />
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-300 sm:text-base md:text-lg">
            {guarantee.body}
          </p>
        </div>
      </div>
    </section>
  );
}
