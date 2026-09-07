/**
 * SUB PROMO BAR — banner secundario justo debajo del navbar.
 *
 * Queda pegado arriba al scrollear (`sticky top-0`). Hoy sólo se usa en
 * /tienda, que no monta el `CountdownBanner`; si alguna vez se usa en una
 * landing hay que compensar los 40px de esa franja fija con `top-10`.
 *
 * Si `href` está, la barra entera es un link: en /tienda baja a los productos.
 * Sin `href` es un div, como en las landings.
 *
 * El neón está hecho con `text-shadow` en capas + un halo detrás en el borde,
 * no con `filter: blur`, que fuerza al navegador a rasterizar la barra entera
 * en cada frame de scroll. El pulso se apaga con `prefers-reduced-motion`.
 */
import { PROMO_BARS } from '@/lib/config';

const NEON =
  '[text-shadow:0_0_6px_rgba(215,7,7,0.9),0_0_18px_rgba(215,7,7,0.55),0_0_38px_rgba(215,7,7,0.35)]';

export function SubPromoBar({ href }: { href?: string } = {}) {
  if (!PROMO_BARS.sub.enabled) return null;

  const shell =
    'group relative block border-y border-accent/50 bg-ink-950 py-2.5 shadow-[inset_0_0_24px_-6px_rgba(215,7,7,0.45)]';

  const inner = (
    <>
      {/* Halo interno: el resplandor que "moja" el fondo alrededor del texto */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(215,7,7,0.22),transparent_70%)]"
      />
      <span
        className={`neon-pulse relative block text-center text-[12px] font-black uppercase italic tracking-[0.18em] text-white md:text-sm ${NEON}`}
      >
        {PROMO_BARS.sub.text}
      </span>
    </>
  );

  // z-30: por encima del contenido de la página, por debajo del navbar (40),
  // del banner fijo (50) y del drawer del carrito (60/61).
  if (!href) {
    return <div className={`${shell} sticky top-0 z-30`}>{inner}</div>;
  }

  return (
    <a
      href={href}
      className={`${shell} sticky top-0 z-30 transition-colors hover:border-accent hover:bg-[#160707]`}
    >
      {inner}
    </a>
  );
}
