/**
 * HERO — versión rediseñada.
 *
 * Layout en desktop: 2 columnas.
 *   - IZQ: headline (bold italic uppercase con acento), descripción, CTA grande,
 *          línea de social proof con counter, métodos de pago, testimonial card.
 *   - DER: imagen/video grande del producto con badge en la esquina inferior.
 *
 * En mobile: stack vertical, imagen primero, después texto.
 *
 * SLOT DE IMAGEN: el div con id="hero-media" contiene el video del producto
 * (/public/hero/VideoPrincipal.mp4) con su poster webp. Es el elemento LCP
 * de la página — cualquier cambio acá se nota en Core Web Vitals.
 */
import { BRAND, HEADLINES } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { HeroTestimonialCarousel } from '@/components/ui/HeroTestimonialCarousel';

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ink-950">
      {/* Glow sutil de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-16 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-6 sm:pb-16 sm:pt-10 md:px-6 md:pb-24 md:pt-16">
        {/* Headline grande centrado arriba */}
        <h1 className="heading-display text-center text-[26px] leading-[1.05] sm:text-3xl sm:leading-[0.95] md:text-5xl lg:text-6xl">
          {HEADLINES.heroLine1}{' '}
          <span className="text-accent">{HEADLINES.heroLine2}</span>
        </h1>

        <div className="mt-7 grid items-start gap-7 sm:mt-10 sm:gap-10 md:mt-14 md:grid-cols-2 md:items-stretch md:gap-12">
          {/* Columna izquierda — copy + CTA + social proof */}
          <div className="order-2 md:order-1">
            <p className="max-w-xl text-[15px] leading-relaxed text-ink-200 sm:text-base md:text-lg">
              {HEADLINES.heroSub.split(/(MagSafe|GPS)/).map((chunk, i) =>
                chunk === 'MagSafe' || chunk === 'GPS' ? (
                  <span key={i} className="font-bold italic text-accent">
                    {chunk}
                  </span>
                ) : (
                  <span key={i}>{chunk}</span>
                ),
              )}
            </p>

            <div className="mt-6 sm:mt-7">
              <a
                href="#pricing"
                className="group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-display text-base font-black uppercase italic tracking-wider text-white shadow-[0_8px_24px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.55)] sm:w-auto sm:px-8 md:text-lg"
              >
                Comprar ahora
                <Icon
                  name="arrow-right"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Social proof inline */}
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-200 sm:text-sm">
              <span aria-hidden="true">🏆</span>
              <span>
                <strong className="font-black italic text-accent">
                  {BRAND.socialProofCount}
                </strong>{' '}
                {BRAND.socialProofLabel} en Argentina
              </span>
            </p>

            {/* Métodos de pago */}
            <PaymentBadges />

            {/* Testimonios rotativos */}
            <HeroTestimonialCarousel />
          </div>

          {/* Columna derecha — media slot grande */}
          <div className="order-1 md:order-2">
            <HeroMedia />
          </div>
        </div>
      </div>
    </section>
  );
}

// width/height = relación de aspecto real de cada SVG (viewBox). El tamaño
// pintado lo define el CSS (h-6/h-8 + w-auto), pero los atributos le dan al
// navegador el aspect-ratio para reservar el ancho antes de que cargue.
const PAYMENT_LOGOS = [
  { name: 'Visa', src: '/payments/visa.svg', lg: false, w: 1000, h: 325 },
  { name: 'Mastercard', src: '/payments/Mastercard-logo.svg', lg: false, w: 576, h: 512 },
  { name: 'Mercado Pago', src: '/payments/Mercado_Pago.svg', lg: true, w: 1049, h: 425 },
  { name: 'American Express', src: '/payments/american-express-stacked.svg', lg: false, w: 100, h: 28 },
  { name: 'Naranja X', src: '/payments/NaranjaX-logo.svg', lg: false, w: 200, h: 60 },
];

function PaymentBadges() {
  return (
    <ul className="mt-6 flex flex-wrap items-center gap-2">
      {PAYMENT_LOGOS.map((p) => (
        <li
          key={p.name}
          className="inline-flex h-12 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/50 px-3.5 transition-colors hover:border-ink-700"
        >
          <img
            src={p.src}
            alt={p.name}
            width={p.w}
            height={p.h}
            decoding="async"
            className={`${p.lg ? 'h-8' : 'h-6'} w-auto
    /* brightness(0) lo hace negro, invert(1) lo pasa a blanco puro */
    [filter:brightness(0)_invert(1)] 
    opacity-80 
    hover:opacity-100 transition-opacity`}
          />
        </li>
      ))}
    </ul>
  );
}


function HeroMedia() {
  return (
    <div
      id="hero-media"
      className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-inset ring-white/5 md:aspect-auto md:h-full"
    >
      {/* Video del producto — servido desde /public (mismo origen) para no
          pagar DNS + TLS de un CDN externo en el camino crítico del LCP.
          El `poster` (webp de 17 KB, primer frame) es lo que realmente pinta
          el LCP: aparece al instante mientras el mp4 todavía baja. */}
      <video
        src="/hero/VideoPrincipal.mp4"
        poster="/hero/VideoPrincipal-poster.webp"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        preload="metadata"
        width={720}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay sutil para que el badge sea legible sobre el video */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      {/* Badge en la esquina inferior derecha */}
      <div className="absolute bottom-4 right-4 max-w-[60%] text-right sm:bottom-5 sm:right-5">
        <span className="font-display text-2xl font-black italic uppercase leading-none text-white drop-shadow-lg sm:text-3xl md:text-5xl">
          NO SE
          <br />
          CAE MÁS
        </span>
      </div>
    </div>
  );
}
