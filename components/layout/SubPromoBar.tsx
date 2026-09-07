/**
 * SUB PROMO BAR — banner secundario justo debajo del navbar.
 *
 * Queda pegado arriba al scrollear (`sticky top-0`). Hoy sólo se usa en
 * /tienda, que no monta el `CountdownBanner`; si alguna vez se usa en una
 * landing hay que compensar los 40px de esa franja fija con `top-10`.
 *
 * Ojo con `overflow` en los ancestros: `html`/`body` usan `overflow-x: clip`
 * y no `hidden` justamente para no romper este sticky (ver globals.css).
 *
 * Si `href` está, la barra entera es un link: en /tienda baja a los productos.
 * Sin `href` es un div, como en las landings.
 *
 * El neón va HACIA AFUERA — la luz se derrama sobre lo que está arriba y
 * abajo, como un cartel encendido, no como un resplandor interno. Son
 * `box-shadow` de color sin desplazamiento y con blur creciente, más dos
 * líneas finas en los bordes que hacen de tubo. `box-shadow` no fuerza
 * rasterizado en cada frame de scroll, a diferencia de `filter: blur`, que
 * importa porque la barra es sticky.
 *
 * Sin estado hover a propósito.
 */
import { PROMO_BARS } from '@/lib/config';

/** Halo hacia afuera + un toque de luz interna pegada a los bordes. */
const GLOW =
  'shadow-[0_0_14px_rgba(215,7,7,0.55),0_0_34px_rgba(215,7,7,0.4),0_0_70px_rgba(215,7,7,0.28),inset_0_1px_0_rgba(215,7,7,0.55),inset_0_-1px_0_rgba(215,7,7,0.55)]';

export function SubPromoBar({ href }: { href?: string } = {}) {
  if (!PROMO_BARS.sub.enabled) return null;

  // z-30: sobre el contenido de la página — si no, la sección siguiente tapa
  // el derrame de luz de abajo. Por debajo del navbar (40), del banner fijo
  // (50) y del drawer del carrito (60/61).
  const shell = `relative z-30 block border-y border-accent/70 bg-[#0B0405] py-2.5 ${GLOW}`;

  const inner = (
    <span className="neon-pulse block text-center text-[12px] font-black uppercase italic tracking-[0.18em] text-accent [text-shadow:0_0_10px_rgba(215,7,7,0.85)] md:text-sm">
      {PROMO_BARS.sub.text}
    </span>
  );

  if (!href) {
    return <div className={`${shell} sticky top-0`}>{inner}</div>;
  }

  return (
    <a href={href} className={`${shell} sticky top-0`}>
      {inner}
    </a>
  );
}
