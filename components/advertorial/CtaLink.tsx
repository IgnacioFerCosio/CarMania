/**
 * El botón de la nota: "Comprar ahora", el mismo del hero del soporte. Es un link que
 * baja a #pricing, no un botón de compra; los únicos que agregan al carrito
 * son los de `Pricing`. Mismo botón píldora que el hero y BackToPricingCTA.
 */
import { Icon } from '@/components/ui/Icon';

export function CtaLink({
  label,
  href,
  className = '',
}: {
  label: string;
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-6 text-center font-display text-base font-black uppercase italic tracking-wider text-white shadow-[0_8px_24px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.55)] sm:px-8 md:text-lg ${className}`}
    >
      {label}
      <Icon
        name="arrow-right"
        className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1"
      />
    </a>
  );
}
