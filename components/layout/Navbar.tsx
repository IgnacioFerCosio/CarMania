/**
 * Navbar — versión rediseñada con logo centrado, nav links a la izquierda
 * y CTA + ícono a la derecha. Sticky.
 *
 * En mobile: solo logo + CTA. Los links se ocultan.
 */
// import Image from 'next/image'; // ← descomentar cuando uses el logo
import Link from 'next/link';
import { BRAND } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

const LINKS = [
  { href: '#how', label: 'Cómo funciona' },
  { href: '#pricing', label: 'Oferta', highlight: true },
  { href: '#reviews', label: 'Reseñas' },
  { href: '#trust', label: 'Garantías' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-800/80 bg-[#24262A] backdrop-blur supports-[backdrop-filter]:bg-[#24262A]">
      <div className="mx-auto grid h-12 max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 sm:gap-4 sm:px-4 md:h-16 md:px-6">
        {/* Links a la izquierda (desktop) */}
        <nav className="hidden items-center gap-5 text-xs font-bold uppercase tracking-wider text-ink-200 md:flex">
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
          className="flex items-center justify-center"
          aria-label={`${BRAND.name} inicio`}
        >
          {/*
            ── LOGO ──────────────────────────────────────────────────────────
            Cuando quieras activar la imagen, descomentar el bloque de abajo
            y comentar el wordmark de texto.

            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={170}
              height={42}
              priority
              className="h-8 w-auto md:h-10"
            />
            ──────────────────────────────────────────────────────────────── */}
          <span className="font-display text-lg font-black italic tracking-tight text-white sm:text-xl md:text-2xl">
            CAR<span className="text-accent">MANIA</span>
          </span>
        </Link>

        {/* CTA + icon a la derecha */}
        <div className="flex items-center justify-end gap-3">
          <a
            href="#pricing"
            className="hidden h-10 items-center justify-center gap-1.5 rounded-full bg-accent px-5 text-xs font-black uppercase italic tracking-wider text-white shadow-[0_4px_14px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 md:inline-flex"
          >
            Aprovechá
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </a>
          <a
            href="#pricing"
            className="inline-flex h-9 shrink-0 items-center rounded-full bg-accent px-3.5 text-[11px] font-black uppercase italic tracking-wider text-white shadow-[0_4px_12px_rgba(215,7,7,0.35)] sm:px-4 md:hidden"
          >
            Comprar
          </a>
        </div>
      </div>
    </header>
  );
}
