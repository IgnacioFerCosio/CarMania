/**
 * STORE HERO — encabezado full-bleed de /tienda.
 *
 * Estructura tomada de la home de CARMOUNT: fondo a sangre, H1 gigante en dos
 * tonos con una barra accent debajo, subtítulo, CTA en píldora y la prueba
 * social con estrellas.
 *
 * SLOT DE IMAGEN: el fondo es un placeholder hecho con gradientes (glow rojo
 * + viñeta), no una foto. Cuando tengas la foto del interior del auto,
 * descomentá el <img> de abajo y dejá los gradientes como overlay: ya están
 * calibrados para que el texto siga legible encima.
 */
import { BRAND, STORE_HEADLINES, STORE_SECTIONS } from '@/lib/config';
import { Stars } from '@/components/ui/Stars';
import { Icon } from '@/components/ui/Icon';

export function StoreHero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950">
      {/* ── Fondo placeholder ─────────────────────────────────────────────
          Reemplazo: poné acá la foto y borrá el div de gradientes.
          <Image src="/tienda/hero.webp" alt="" fill priority
                 className="object-cover opacity-60" />
      */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* Base: degradé diagonal frío para que el rojo no se vea plano */}
        <div className="absolute inset-0 bg-[linear-gradient(160deg,#24262A_0%,#141517_45%,#0A0A0A_100%)]" />
        {/* Glow accent detrás del título */}
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[900px] max-w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(215,7,7,0.30),transparent_75%)] blur-2xl" />
        {/* Barrido de luz superior, como el reflejo de un parabrisas */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.06),transparent)]" />
        {/* Viñeta inferior para anclar el CTA */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,#0A0A0A_10%,transparent)]" />
      </div>

      <div className="mx-auto flex min-h-[62vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center sm:min-h-[68vh] sm:py-24 md:px-6 md:py-32">
        <p className="eyebrow">{STORE_HEADLINES.eyebrow}</p>

        <h1 className="heading-display mt-3 text-[clamp(2.4rem,10vw,6rem)] leading-[0.92]">
          {STORE_SECTIONS.heroTitle}{' '}
          <span className="relative inline-block text-accent">
            {STORE_SECTIONS.heroTitleAccent}
            {/* Subrayado accent, como el de CARMOUNT bajo "YOUR DRIVE" */}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-accent md:-bottom-2 md:h-[5px]"
            />
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

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-300 sm:text-sm">
          <Stars rating={BRAND.averageRating} />
          <span>
            <strong className="text-white">{BRAND.averageRating}</strong> ·{' '}
            {BRAND.socialProofCount} {BRAND.socialProofLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
