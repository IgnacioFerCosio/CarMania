/**
 * FOOTER — minimalista. Brand + links legales + contacto.
 * Los links legales por ahora apuntan a Shopify (común en headless) — si
 * tenés páginas legales propias, cambialos.
 */
// import Image from 'next/image'; // ← descomentar cuando uses el logo
import { BRAND, WHATSAPP } from '@/lib/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950 pb-24 pt-8 text-sm text-ink-400 sm:pb-10 sm:pt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 sm:gap-6 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          {/*
            ── LOGO ──────────────────────────────────────────────────────────
            Descomentar y borrar el wordmark de abajo cuando quieras activarlo:

            <Image
              src="/logo.png"
              alt={BRAND.name}
              width={140}
              height={36}
              className="h-8 w-auto"
            />
            ──────────────────────────────────────────────────────────────── */}
          <div className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">
            CAR<span className="text-accent">MANIA</span>
          </div>
          <p className="mt-1 text-[11px] text-ink-500 sm:text-xs">
            © {year} {BRAND.name}. Todos los derechos reservados.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:gap-x-5">
            <li>
              <a
                href="https://carmaniaoficial.com/policies/privacy-policy"
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                href="https://carmaniaoficial.com/policies/terms-of-service"
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Términos y condiciones
              </a>
            </li>
            <li>
              <a
                href="https://carmaniaoficial.com/policies/refund-policy"
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Devoluciones
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${WHATSAPP.number}`}
                className="hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Soporte WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="mx-auto mt-5 max-w-6xl px-4 text-center text-[11px] text-ink-500 sm:mt-6 md:px-6">
        Ecommerce con Shopify · Procesamos pagos con MercadoPago
      </div>
    </footer>
  );
}
