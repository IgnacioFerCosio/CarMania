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
import { CYBER, PAYMENT_LOGOS } from '@/lib/config';
import { CyberEyebrow } from '@/components/ui/CyberEyebrow';
import { SOPORTE } from '@/lib/landings/soporte';
import type { LandingConfig } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { HeroTestimonialCarousel } from '@/components/ui/HeroTestimonialCarousel';

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlight(text: string, terms: string[]) {
  if (terms.length === 0) return [text];
  const re = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'g');
  return text.split(re);
}

export function Hero({
  config = SOPORTE,
  media,
}: {
  config?: LandingConfig;
  /**
   * Reemplaza el video/imagen de `heroMedia` adentro del mismo marco (con su
   * badge). Lo usa /llavero-rescate para mostrar su `MediaSlot`.
   */
  media?: React.ReactNode;
} = {}) {
  const { headlines, heroMedia, heroSubHighlights } = config;

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
        {/* Cyber: "CYBER CARMANIA" sobre el título (se esconde solo pasado el evento) */}
        {CYBER.enabled && <CyberEyebrow />}

        {/* Headline grande centrado arriba */}
        <h1 className="heading-display text-center text-[26px] leading-[1.05] sm:text-3xl sm:leading-[0.95] md:text-5xl lg:text-6xl">
          {headlines.heroLine1}{' '}
          <span className="text-accent">{headlines.heroLine2}</span>
        </h1>

        <div className="mt-7 grid items-start gap-7 sm:mt-10 sm:gap-10 md:mt-14 md:grid-cols-2 md:items-stretch md:gap-12">
          {/* Columna izquierda — copy + CTA + social proof */}
          <div className="order-2 md:order-1">
            <p className="max-w-xl text-[15px] leading-relaxed text-ink-200 sm:text-base md:text-lg">
              {highlight(headlines.heroSub, [...heroSubHighlights]).map((chunk, i) =>
                heroSubHighlights.includes(chunk) ? (
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
                className={`group inline-flex h-14 w-full items-center justify-center gap-2 rounded-full px-6 font-display text-base font-black uppercase italic tracking-wider text-white transition sm:w-auto sm:px-8 md:text-lg ${
                  CYBER.enabled
                    ? 'bg-gradient-to-r from-cyber-700 to-cyber-500 shadow-[0_8px_24px_rgba(124,58,237,0.5)] hover:from-cyber-600 hover:to-cyber-400 hover:shadow-[0_10px_30px_rgba(124,58,237,0.65)]'
                    : 'bg-accent shadow-[0_8px_24px_rgba(215,7,7,0.4)] hover:bg-accent-600 hover:shadow-[0_10px_30px_rgba(215,7,7,0.55)]'
                }`}
              >
                {CYBER.enabled ? 'Aprovechá el Cyber' : 'Comprar ahora'}
                <Icon
                  name="arrow-right"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                />
              </a>
            </div>

            {/* Social proof inline. Es de la marca, no del producto: todas las
                landings muestran los clientes de CARMANIA (los del soporte),
                no el `brand.socialProofCount` de su propia config. */}
            <p className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-200 sm:text-sm">
              <span aria-hidden="true">🏆</span>
              <span>
                <strong className="font-black italic text-accent">
                  {SOPORTE.brand.socialProofCount}
                </strong>{' '}
                {SOPORTE.brand.socialProofLabel} en Argentina
              </span>
            </p>

            {/* Métodos de pago */}
            <PaymentBadges />

            {/* Testimonios rotativos.
                HeroTestimonialCarousel es 'use client': pasarle una prop la
                serializa en el payload RSC. Para el soporte las reseñas son
                las del default del componente, así que omitimos la prop y el
                HTML prerenderizado de / queda idéntico byte a byte. */}
            {/* Sin reseñas (producto nuevo) no hay carrusel: no se inventan. */}
            {config.reviews.length > 0 && (
              <HeroTestimonialCarousel
                {...(config.reviews === SOPORTE.reviews ? {} : { reviews: config.reviews })}
              />
            )}
          </div>

          {/* Columna derecha — media slot grande */}
          <div className="order-1 md:order-2">
            <HeroMedia media={heroMedia} override={media} />
          </div>
        </div>
      </div>
    </section>
  );
}

// width/height = relación de aspecto real de cada SVG (viewBox). El tamaño
// pintado lo define el CSS (h-6/h-8 + w-auto), pero los atributos le dan al
// navegador el aspect-ratio para reservar el ancho antes de que cargue.
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
            // aspect-ratio explícito: con `w-auto` el ancho se resuelve recién
            // cuando carga el SVG y el h1 de arriba se movía (CLS 0,05–0,08,
            // el mayor de la página). brightness(0) lo hace negro, invert(1)
            // lo pasa a blanco puro.
            style={{ aspectRatio: `${p.w} / ${p.h}` }}
            className={`${p.lg ? 'h-8' : 'h-6'} w-auto [filter:brightness(0)_invert(1)] opacity-80 transition-opacity hover:opacity-100`}
          />
        </li>
      ))}
    </ul>
  );
}


function HeroMedia({
  media,
  override,
}: {
  media: LandingConfig['heroMedia'];
  override?: React.ReactNode;
}) {
  return (
    <div
      id="hero-media"
      className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-950 ring-1 ring-inset ring-white/5 md:aspect-auto md:h-full"
    >
      {override ? (
        override
      ) : media.kind === 'image' ? (
        // <img> plano (no next/image): en Cloudflare `/_next/image` no optimiza
        // — pasar por ahí sería un salto extra en el camino del LCP y además
        // desalinearía el `ReactDOM.preload()` de la página (que apunta al
        // archivo real). `fetchPriority="high"` porque es el LCP.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={media.src}
          alt=""
          width={media.width}
          height={media.height}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <video
          src={media.src}
          poster={media.poster}
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          preload="metadata"
          width={media.width}
          height={media.height}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
      />

      <div className="absolute bottom-4 right-4 max-w-[60%] text-right sm:bottom-5 sm:right-5">
        <span className="font-display text-2xl font-black italic uppercase leading-none text-white drop-shadow-lg sm:text-3xl md:text-5xl">
          {media.badgeLine1}
          <br />
          {media.badgeLine2}
        </span>
      </div>
    </div>
  );
}
