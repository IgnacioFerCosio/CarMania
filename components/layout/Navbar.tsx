/**
 * Navbar — logo centrado, nav links a la izquierda, CTA + carrito a la derecha.
 *
 * En mobile: solo logo centrado + carrito. Los links y el CTA se ocultan.
 *
 * Scrollea con la página (no queda fijo). Cuando se va de pantalla, el acceso
 * al carrito lo toma `FloatingCartButton`, que se guía por el id de acá.
 */
import Image from 'next/image';
import Link from 'next/link';
import { BRAND } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { CartButton } from '@/components/commerce/CartButton';

const LINKS = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Reseñas' },
  { href: '#trust', label: 'Garantías' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  return (
    <header
      id="site-navbar"
      className="border-b border-ink-800/80 bg-[#24262A] backdrop-blur supports-[backdrop-filter]:bg-[#24262A]"
    >
      <div className="mx-auto grid h-12 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:gap-4 sm:px-4 md:h-16 md:px-6">
        {/* Links a la izquierda (desktop).
            Las 3 columnas van con col-start explícito: en mobile este <nav>
            es display:none y sale de la grilla, así que sin esto el logo se
            correría a la columna 1 y quedaría descentrado. */}
        <nav className="col-start-1 hidden items-center gap-5 text-xs font-bold uppercase tracking-wider text-ink-200 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative inline-flex items-center gap-1 transition hover:text-white"
            >
              {l.label}
              {l.highlight && (
                <span className="rounded bg-accent px-1 py-0.5 text-[9px] font-black italic text-white">
                  HOT
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Logo centrado */}
        <Link
          href="#top"
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
            href="#pricing"
            className="hidden h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-xs font-black uppercase italic tracking-wider text-white shadow-[0_4px_14px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 md:inline-flex"
          >
            Aprovechá
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </a>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
