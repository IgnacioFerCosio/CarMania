'use client';

/**
 * `true` cuando el navbar ya salió de pantalla por scroll.
 *
 * Lo usa `FloatingCartButton` para aparecer justo cuando el carrito del navbar
 * deja de estar a la vista, de modo que el acceso al carrito nunca se corte.
 *
 * Va con un listener de scroll y no con IntersectionObserver a propósito: el
 * observer entrega sus callbacks por el pipeline de rendering, que se frena en
 * pestañas que no compositan — el listener es determinístico.
 */
import { useEffect, useState } from 'react';

/** Alto del banner de oferta, que está fijo y tapa los primeros 40 px. */
const FIXED_BANNER_HEIGHT = 40;

export function useScrolledPastNavbar(): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    function check() {
      const el = document.getElementById('site-navbar');
      if (!el) return;
      // El navbar está en flujo normal, así que su offsetTop es estable.
      const bottom = el.offsetTop + el.offsetHeight;
      setPast(window.scrollY > bottom - FIXED_BANNER_HEIGHT);
    }

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);

  return past;
}
