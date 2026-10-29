'use client';

/**
 * Barra fija del celular. No reusa `StickyATC`, que trae countdown, el nombre
 * del soporte y sólo se ve en desktop: acá no hay contadores y el botón baja
 * a los packs en vez de agregar al carrito.
 *
 * Aparece cuando el hero sale de pantalla y se esconde mientras los packs
 * están a la vista (ahí ya están los botones de verdad).
 */
import { useEffect, useState } from 'react';
import { CtaLink } from './CtaLink';

export function StickyCTA({ label, href }: { label: string; href: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const packs = document.getElementById(href.replace('#', ''));

    function evaluate() {
      const pastHero = hero ? hero.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      let packsVisible = false;
      if (packs) {
        const r = packs.getBoundingClientRect();
        packsVisible = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(pastHero && !packsVisible);
    }

    window.addEventListener('scroll', evaluate, { passive: true });
    window.addEventListener('resize', evaluate);
    evaluate();
    return () => {
      window.removeEventListener('scroll', evaluate);
      window.removeEventListener('resize', evaluate);
    };
  }, [href]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-800 bg-[#111214]/95 px-3 pt-2.5 backdrop-blur transition-all duration-300 md:hidden ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'calc(0.625rem + env(safe-area-inset-bottom))' }}
    >
      <CtaLink label={label} href={href} className="w-full" />
    </div>
  );
}
