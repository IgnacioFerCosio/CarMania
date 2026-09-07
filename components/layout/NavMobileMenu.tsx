'use client';

/**
 * Menú hamburguesa del navbar — abajo de xl (`xl:hidden`).
 *
 * Vive aparte del `Navbar` a propósito: el navbar es Server Component y sólo
 * este panel necesita estado. Mismo criterio que `CartButton`.
 *
 * El corte no es md sino xl porque el nav inline no entra antes: los links
 * miden ~490px y la columna izquierda de la grilla nunca pasa de 516px (el
 * logo va centrado con `1fr auto 1fr`). Abajo de eso se apretaban y "Cómo
 * funciona" partía en dos líneas.
 *
 * Cierra con Escape, tocando afuera, o al elegir una opción. Se despliega
 * debajo del header, que por eso tiene `relative`.
 */
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';
import type { NavLink } from './Navbar';

const PANEL_ID = 'nav-mobile-menu';

export function NavMobileMenu({
  links,
  storeHref,
  storeLabel,
}: {
  links: NavLink[];
  /** `null` en la propia tienda, donde el link no tendría a dónde ir. */
  storeHref: string | null;
  storeLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    // `pointerdown` y no `click`: cierra apenas se toca afuera, sin esperar a
    // que se complete el tap.
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={wrapRef} className="col-start-1 flex items-center xl:hidden">
      <button
        type="button"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        onClick={() => setOpen((o) => !o)}
        className="-ml-1.5 flex h-10 w-10 items-center justify-center rounded-lg text-ink-100 transition hover:bg-white/5 active:bg-white/10"
      >
        <Icon name={open ? 'x' : 'menu'} className="h-6 w-6" />
      </button>

      {open && (
        <nav
          id={PANEL_ID}
          className="absolute inset-x-0 top-full z-40 border-b border-ink-800/80 bg-[#24262A] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.85)]"
        >
          <ul className="mx-auto max-w-7xl divide-y divide-ink-800/70 px-3">
            {storeHref && (
              <li>
                <Link
                  href={storeHref}
                  onClick={close}
                  className="flex items-center gap-2.5 py-3.5 text-sm font-black uppercase italic tracking-wider text-white transition hover:text-accent"
                >
                  <Icon name="store" className="h-4 w-4 text-accent" />
                  {storeLabel}
                  <Icon name="arrow-right" className="ml-auto h-4 w-4 text-ink-400" />
                </Link>
              </li>
            )}

            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex items-center gap-2 py-3.5 text-sm font-bold uppercase tracking-wider text-ink-200 transition hover:text-white"
                >
                  {l.label}
                  {l.highlight && (
                    <span className="rounded bg-accent px-1 py-0.5 text-[9px] font-black italic text-white">
                      {l.badge ?? 'HOT'}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
