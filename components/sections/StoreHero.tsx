/**
 * STORE HERO — encabezado full-bleed de /tienda.
 *
 * Estructura tomada de la home de CARMOUNT: fondo a sangre, H1 gigante en dos
 * tonos con una barra accent debajo, subtítulo, CTA en píldora y la prueba
 * social con estrellas.
 *
 * El fondo es un video en loop (montaje de 4 planos, 7,5 s) sobre su propio
 * poster. Los gradientes quedaron como overlay encima, que es para lo que
 * estaban calibrados: sin ellos el texto blanco no se sostiene sobre el plano
 * del desierto, que es casi blanco.
 *
 * El video va detrás de un poster que SIEMPRE se pinta, así el hero nunca
 * arranca en negro; y con `motion-reduce:hidden` desaparece para quien pidió
 * menos movimiento, que se queda con la imagen fija.
 */
import { BRAND, STORE_SECTIONS } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';
import { Icon } from '@/components/ui/Icon';

export function StoreHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        // El poster como fondo del contenedor y no sólo como atributo del
        // <video>: así cubre también el caso de reduced-motion, donde el
        // <video> no se muestra.
        style={{ backgroundImage: "url('/tienda/hero/hero-poster.webp')" }}
      >
        <video
          className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          poster="/tienda/hero/hero-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src="/tienda/hero/hero.mp4" type="video/mp4" />
        </video>

        {/* Scrim: antes acá había un degradé opaco. Ahora tiene que dejar ver
            el video pero sostener el texto encima. */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(36,38,42,0.78)_0%,rgba(20,21,23,0.72)_45%,rgba(10,10,10,0.85)_100%)]" />
        {/* Glow accent detrás del título */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[900px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(215,7,7,0.30),transparent_75%)] blur-2xl" />
        {/* Barrido de luz superior, como el reflejo de un parabrisas */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]" />
        {/* Viñeta inferior para anclar el CTA */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,#0A0A0A_10%,transparent)]" />
      </div>

      <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[68vh] sm:py-24 md:px-6 md:py-32">
        <h1 className="heading-display text-[clamp(2rem,7.5vw,4.25rem)] leading-[0.95]">
          {STORE_SECTIONS.heroTitle}{' '}
          <span className="relative inline-block text-accent">
            {STORE_SECTIONS.heroTitleAccent}
            {/* Trazo de tiza: un SVG dibujado a mano alzada en vez de la barra
                recta. Va con `preserveAspectRatio="none"` para que se estire
                al ancho de la palabra sea cual sea, y con dos trazos de
                distinto grosor y opacidad — un solo trazo parejo vuelve a
                leerse como un subrayado. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 22"
              preserveAspectRatio="none"
              className="absolute -bottom-3 left-0 h-[0.32em] w-full overflow-visible text-accent md:-bottom-4"
            >
              <path
                d="M4 13.5c38-5.5 84-8 128-7.5 46 .5 92 3.5 164 9"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.95"
              />
              <path
                d="M12 18.5c46-4 96-5.5 142-5 40 .5 82 2.5 140 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-ink-300 sm:text-base md:mt-8">
          {STORE_SECTIONS.heroSub}
        </p>

        <a
          href="#productos"
          className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-9 font-display text-sm font-black uppercase italic tracking-wider text-white shadow-[0_10px_34px_-6px_rgba(215,7,7,0.65)] transition hover:bg-accent-600 hover:shadow-[0_14px_40px_-6px_rgba(215,7,7,0.8)] sm:text-base md:mt-10"
        >
          {STORE_SECTIONS.heroCta}
          <Icon name="arrow-right" className="h-4 w-4" />
        </a>

        {/* Sin número de promedio a propósito: 5 estrellas llenas y el conteo
            de clientes. Un "4.9" invita a buscar de dónde sale. */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-300 sm:text-sm">
          <Stars rating={5} />
          <span>
            <strong className="text-white">{BRAND.socialProofCount}</strong>{' '}
            {BRAND.socialProofLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
