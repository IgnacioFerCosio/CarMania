'use client';

/**
 * Barra fija del celular. No reusa `StickyATC`, que trae countdown, el nombre
 * del soporte y sólo se ve en desktop: acá no hay contadores y el botón baja
 * a los packs en vez de agregar al carrito.
 *
 * Aparece cuando el hero (`#top`) sale de pantalla y se esconde mientras los
 * packs están a la vista (ahí ya están los botones de verdad).
 *
 * Con `IntersectionObserver` y no con un listener de scroll: no mide el layout
 * en cada evento. Oculta va con `invisible`: además de no verse, sale del
 * recorrido del teclado y de los lectores de pantalla.
 */
import { useEffect, useState } from 'react';
import { CtaLink } from './CtaLink';

export function StickyCTA({ label, href }: { label: string; href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const packs = document.getElementById(href.replace('#', ''));
    if (!hero || !packs) return;

    let heroVisible = true;
    let packsVisible = false;

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) heroVisible = e.isIntersecting;
        if (e.target === packs) packsVisible = e.isIntersecting;
      }
      setShow(!heroVisible && !packsVisible);
    });
    io.observe(hero);
    io.observe(packs);
    return () => io.disconnect();
  }, [href]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-800 bg-ink-950/95 px-3 pt-2.5 backdrop-blur transition-all duration-300 md:hidden ${
        show ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <CtaLink label={label} href={href} className="w-full" />
    </div>
  );
}
