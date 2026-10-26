/**
 * Guía de instalación post-compra — la página del QR de la caja.
 *
 * Plantilla: no tiene copy propio, todo sale de `config` (ver
 * `InstallGuideConfig` y `lib/landings/instalacion/`). Una sola columna,
 * pensada para 375 px; en desktop sólo se centra.
 *
 * Más imagen que texto: el video completo arriba, las imágenes del carrusel
 * enteras (object-contain) y, debajo de cada una, una línea corta por paso —
 * a 375 px el texto que traen las imágenes queda ilegible.
 *
 * Server Component a propósito: lo único interactivo es el desplegable de
 * "Si algo no funciona", y va con <details> nativo, sin JS.
 *
 * Carga: el video es lo único que baja de entrada (con poster, para que haya
 * algo apenas abre). Las imágenes van con loading="lazy".
 */
import { INSTAGRAM, WHATSAPP } from '@/lib/config';
import type { InstallGuideConfig, InstallImage } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

export function InstallGuide({ config }: { config: InstallGuideConfig }) {
  const { box, steps, ring, troubleshooting, help, outro } = config;
  const whatsappUrl = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(help.whatsappPrefilled)}`;

  return (
    <main className="mx-auto max-w-2xl px-4 pb-12 pt-6 sm:pt-10 md:px-6 md:pt-12">
      {/* 1. Título corto + video completo, a sangre en mobile */}
      <header className="text-center">
        <p className="eyebrow">{config.eyebrow}</p>
        <h1 className="heading-display mt-1.5 text-[34px] leading-none sm:text-5xl">
          <Accented text={config.title} accent={config.titleAccent} />
        </h1>
      </header>

      <div className="-mx-4 mt-5 aspect-square overflow-hidden bg-ink-900 sm:mx-0 sm:mt-7 sm:rounded-2xl sm:border sm:border-ink-800">
        {/* Con `controls`: el cliente puede querer pausar o volver a un paso. */}
        <video
          src={config.video.src}
          poster={config.video.poster}
          width={720}
          height={720}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="auto"
          className="h-full w-full object-cover"
        />
      </div>

      {/* 2. Qué trae la caja */}
      <Section title={box.title}>
        <ul className="grid grid-cols-3 gap-2 sm:gap-3">
          {box.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center rounded-2xl border border-ink-800 bg-ink-900/60 px-2 py-4 text-center"
            >
              <span className="font-display text-3xl font-black italic leading-none text-accent">
                {item.qty}
              </span>
              <span className="mt-2 text-[13px] font-semibold leading-tight text-white">{item.name}</span>
              {item.note && <span className="mt-1 text-[11px] leading-tight text-ink-400">{item.note}</span>}
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Paso a paso */}
      <Section title={steps.title}>
        <Figure image={steps.image} />
        <NumberedList items={steps.items} />
      </Section>

      {/* 4. El aro */}
      {ring && (
        <Section title={ring.title}>
          <p className="-mt-1 mb-4 text-[15px] leading-snug text-ink-300">{ring.lead}</p>
          <Figure image={ring.image} />

          <div className="mt-4 flex items-center gap-3 rounded-2xl border-2 border-accent bg-accent/10 p-4">
            <Icon name="alert" className="h-7 w-7 shrink-0 text-accent" />
            <div>
              <p className="font-display text-base font-black uppercase italic leading-tight text-white">
                {ring.rule.title}
              </p>
              <p className="mt-0.5 text-sm text-ink-200">{ring.rule.desc}</p>
            </div>
          </div>

          <div className="mt-6">
            <Figure image={ring.stepsImage} />
            <NumberedList items={ring.steps} />
          </div>

          <ul className="mt-4 space-y-2">
            {ring.notes.map((n) => (
              <li key={n.text} className="flex gap-3 rounded-xl bg-ink-900/60 px-4 py-3">
                <Icon name={n.icon} className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm leading-snug text-ink-200">{n.text}</span>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* 5. Si algo no funciona */}
      <Section title={troubleshooting.title}>
        <div className="divide-y divide-ink-800 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60">
          {troubleshooting.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 transition hover:bg-ink-900 [&::-webkit-details-marker]:hidden">
                <span className="text-base font-semibold leading-snug text-white">{item.q}</span>
                <Icon
                  name="chevron-down"
                  className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                />
              </summary>
              <ul className="space-y-2 px-4 pb-4">
                {item.a.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm leading-relaxed text-ink-300">
                    <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {line}
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Section>

      {/* 6. Cierre: WhatsApp + Instagram, y a la tienda */}
      <section className="mt-10 text-center md:mt-14">
        <h2 className="heading-display text-2xl md:text-3xl">{help.title}</h2>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-5 text-[15px] font-black uppercase italic tracking-wide text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition hover:bg-[#20bd5a] sm:text-base"
        >
          <Icon name="whatsapp" className="h-6 w-6 shrink-0" />
          {help.whatsappLabel}
        </a>
        <p className="mt-4 text-sm text-ink-400">
          {help.instagramLead}{' '}
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-white underline-offset-4 hover:underline"
          >
            <Icon name="instagram" className="h-4 w-4" />
            {INSTAGRAM.handle}
          </a>
        </p>

        <a
          href={outro.href}
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-4 text-sm font-black uppercase italic text-white shadow-[0_4px_14px_rgba(215,7,7,0.4)] transition hover:bg-accent-600 sm:text-base sm:tracking-wide"
        >
          <Icon name="store" className="hidden h-5 w-5 shrink-0 sm:block" />
          {outro.label}
          <Icon name="arrow-right" className="h-4 w-4 shrink-0" />
        </a>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 md:mt-14">
      <h2 className="heading-display mb-4 text-2xl md:text-3xl">{title}</h2>
      {children}
    </section>
  );
}

/** Imagen entera, a todo el ancho de la columna. */
function Figure({ image }: { image: InstallImage }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- en Cloudflare `/_next/image` no optimiza
    <img
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
      className="h-auto w-full rounded-2xl bg-ink-900 object-contain"
    />
  );
}

function NumberedList({ items }: { items: readonly string[] }) {
  return (
    <ol className="mt-3 space-y-2">
      {items.map((text, i) => (
        <li key={text} className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent font-display text-sm font-black italic text-white">
            {i + 1}
          </span>
          <span className="text-[15px] leading-snug text-ink-200">{text}</span>
        </li>
      ))}
    </ol>
  );
}

/** Pinta en accent la primera aparición de `accent` dentro de `text`. */
function Accented({ text, accent }: { text: string; accent: string }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="accent-italic whitespace-nowrap">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}
