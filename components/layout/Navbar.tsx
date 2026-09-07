/**
 * Navbar — logo centrado, nav links a la izquierda, CTA + carrito a la derecha.
 *
 * Abajo de xl los links no entran (ver NavMobileMenu), así que van adentro
 * del menú hamburguesa, a la izquierda; queda logo centrado + CTA + carrito.
 *
 * El link a la tienda va primero en las dos variantes. En `/tienda` se pasa
 * `storeHref={null}` porque ahí no tendría a dónde ir.
 *
 * Scrollea con la página (no queda fijo). Cuando se va de pantalla, el acceso
 * al carrito lo toma `FloatingCartButton`, que se guía por el id de acá.
 */
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { CartButton } from '@/components/commerce/CartButton';
import { NavMobileMenu } from './NavMobileMenu';

export type NavLink = {
  href: string;
  label: string;
  highlight?: boolean;
  /** Texto de la píldora al lado del link. Sólo se muestra con `highlight`. */
  badge?: string;
};

// Links de la landing del soporte. Son el default para no tener que
// pasarlos desde `app/page.tsx`, que ya los usaba implícitamente.
const LANDING_LINKS: NavLink[] = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Reseñas' },
  { href: '#trust', label: 'Garantías' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar({
  links = LANDING_LINKS,
  homeHref = '#top',
  ctaHref = '#pricing',
  ctaLabel = 'Aprovechá',
  storeHref = '/tienda',
  storeLabel = 'Tienda',
}: {
  links?: NavLink[];
  homeHref?: string;
  ctaHref?: string;
  ctaLabel?: string;
  /** `null` para ocultarlo — lo usa `/tienda`, que ya es el destino. */
  storeHref?: string | null;
  storeLabel?: string;
} = {}) {
  return (
    <header
      id="site-navbar"
      // `relative` es el ancla del panel del menú mobile, que se posiciona
      // con `top-full` contra este header. El `z-40` es para que ese panel se
      // pinte sobre las secciones que vienen después: sin stacking context
      // propio, el header queda atrás por orden del DOM y el panel desaparece
      // bajo el hero. Escala del proyecto: drawer 60/61, banner 50, flotantes
      // 40/30.
      className="relative z-40 border-b border-ink-800/80 bg-[#24262A] backdrop-blur supports-[backdrop-filter]:bg-[#24262A]"
    >
      <div className="mx-auto grid h-12 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:gap-4 sm:px-4 md:h-16 md:px-6">
        {/* Hamburguesa (abajo de xl) */}
        <NavMobileMenu links={links} storeHref={storeHref} storeLabel={storeLabel} />

        {/* Links a la izquierda (desktop).
            Las 3 columnas van con col-start explícito: abajo de xl este <nav>
            es display:none y sale de la grilla, así que sin esto el logo se
            correría a la columna 1 y quedaría descentrado. */}
        <nav className="col-start-1 hidden items-center gap-4 whitespace-nowrap text-xs font-bold uppercase tracking-wider text-ink-200 xl:flex">
          {storeHref && (
            <Link
              href={storeHref}
              className="group relative inline-flex items-center gap-1 transition hover:text-white"
            >
              {storeLabel}
            </Link>
          )}

          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative inline-flex items-center gap-1 transition hover:text-white"
            >
              {l.label}
              {l.highlight && (
                <span className="rounded bg-accent px-1 py-0.5 text-[9px] font-black italic text-white">
                  {l.badge ?? 'HOT'}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logo centrado */}
        <Link
          href={homeHref}
          className="col-start-2 flex items-center justify-center"
          aria-label={`${BRAND.name} inicio`}
        >
          {/* logo.webp = 459x120, 25 KB. El .png original pesa 201 KB y, como
              en Cloudflare `/_next/image` no optimiza, se servía entero —
              precargado por `priority`, compitiendo con el LCP. */}
          <Image
            src="/logo.webp"
            alt={BRAND.name}
            width={459}
            height={120}
            priority
            className="h-8 w-auto md:h-10"
          />
        </Link>

        {/* CTA (solo desktop) + carrito */}
        <div className="col-start-3 flex items-center justify-end gap-2 sm:gap-3">
          <a
            href={ctaHref}
            className="hidden h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-xs font-black uppercase italic tracking-wider text-white shadow-[0_4px_14px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 md:inline-flex"
          >
            {ctaLabel}
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
