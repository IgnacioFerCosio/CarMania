/**
 * BACK-TO-PRICING CTA — bloque corto debajo del FAQ que devuelve al usuario
 * al bloque de compra. Ya recorrió toda la landing; este es el "última
 * oportunidad" sin saturar con otro pricing entero.
 */
import { Icon } from '@/components/ui/Icon';
import { BRAND, RETURNS, PAYMENTS } from '@/lib/config';

export function BackToPricingCTA() {
  return (
    <section className="bg-ink-950 py-12 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        <h2 className="heading-display text-2xl leading-tight sm:text-3xl md:text-4xl">
          ¿Listo para tener tu <span className="text-accent">CARMANIA</span>?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-[14px] text-ink-300 sm:mt-4 sm:text-sm md:text-base">
          {BRAND.socialProofCount} {BRAND.socialProofLabel} ya lo eligieron.
          Sumate con {PAYMENTS.installments} cuotas sin interés y {RETURNS.days} días
          para devolverlo si no te convence.
        </p>

        <a
          href="#pricing"
          className="group mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-display text-base font-black uppercase italic tracking-wider text-white shadow-[0_8px_24px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.55)] sm:mt-8 sm:w-auto sm:px-8 md:text-lg"
        >
          Aprovechá la oferta
          <Icon
            name="arrow-right"
            className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:rotate-[-90deg]"
          />
        </a>

        <p className="mt-4 text-[11px] font-semibold uppercase tracking-widest text-ink-400 sm:mt-5">
          Stock limitado · Envío a todo el país
        </p>
      </div>
    </section>
  );
}
