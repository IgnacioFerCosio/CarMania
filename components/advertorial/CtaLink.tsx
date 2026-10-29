/**
 * El botón de la nota: "Quiero el mío + vidrio de prueba →". Es un link que
 * baja a los packs, no un botón de compra; los únicos que agregan al carrito
 * son los de `Pricing`. Es el único rojo lleno de la página.
 */
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
      className={`inline-flex min-h-[52px] items-center justify-center rounded-xl bg-accent px-6 text-center font-display text-base font-bold text-white shadow-[0_8px_24px_rgba(215,7,7,0.35)] transition hover:bg-accent-600 active:scale-[0.98] sm:text-lg ${className}`}
    >
      {label}
    </a>
  );
}
