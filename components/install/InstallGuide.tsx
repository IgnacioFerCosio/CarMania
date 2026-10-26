/**
 * Guía de instalación post-compra — la página del QR de la caja.
 *
 * Plantilla: no tiene copy propio, todo sale de `config` (ver
 * `InstallGuideConfig` y `lib/landings/instalacion/`). Una sola columna,
 * pensada para 375 px; en desktop sólo se centra.
 *
 * Server Component a propósito: lo único interactivo es el desplegable de
 * "Si algo no funciona", y va con <details> nativo, sin JS.
 *
 * Carga: el video principal es el único que baja de entrada (con poster,
 * para que haya algo apenas abre). Los clips de los pasos van con LazyVideo
 * y las imágenes con loading="lazy".
 */
import Link from 'next/link';
import { INSTAGRAM, WHATSAPP } from '@/lib/config';
import type { InstallGuideConfig } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { LazyVideo } from '@/components/ui/LazyVideo';

export function InstallGuide({ config }: { config: InstallGuideConfig }) {
  const { box, ring, steps, tip, troubleshooting, help, crossSell } = config;
  const whatsappUrl = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(help.whatsappPrefilled)}`;

  return (
    <main className="mx-auto max-w-2xl px-4 pb-12 pt-7 sm:pt-10 md:px-6 md:pt-14">
      {/* 1. Título + video principal */}
      <header className="text-center">
        <p className="eyebrow">{config.eyebrow}</p>
        <h1 className="heading-display mt-2 text-[28px] leading-[1.05] sm:text-4xl md:text-5xl">
          <Accented text={config.title} accent={config.titleAccent} />
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-300 md:text-base">
          {config.intro}
        </p>
      </header>

      <div className="mt-6 aspect-square w-full overflow-hidden rounded-2xl border border-ink-800 bg-ink-900 md:mt-8">
        {/* Con `controls`, a diferencia de los clips: acá el cliente puede
            querer pausar o volver atrás para ver un paso. */}
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
        <ul className="divide-y divide-ink-800 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60">
          {box.items.map((item) => (
            <li key={item.name} className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/15 font-display text-sm font-black italic text-accent">
                {item.qty}×
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold leading-tight text-white">{item.name}</p>
                {item.note && <p className="mt-0.5 text-[13px] text-ink-400">{item.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. ¿Necesitás el aro? */}
      {ring && (
        <Section title={ring.title}>
          <div className="grid gap-3 sm:grid-cols-2">
            {ring.cases.map((c) => (
              <div
                key={c.who}
                className={`rounded-2xl border p-4 ${
                  c.tone === 'ok' ? 'border-ink-800 bg-ink-900/60' : 'border-accent/40 bg-accent/[0.07]'
                }`}
              >
                <p className="text-[13px] font-semibold uppercase tracking-wider text-ink-400">{c.who}</p>
                <p className="mt-1.5 flex items-center gap-2 font-display text-lg font-black uppercase italic text-white">
                  <Icon
                    name={c.tone === 'ok' ? 'check' : 'alert'}
                    className={`h-5 w-5 shrink-0 ${c.tone === 'ok' ? 'text-emerald-400' : 'text-accent'}`}
                  />
                  {c.verdict}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-300">{c.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* 4. Pasos */}
      <Section title={steps.title}>
        <ol className="space-y-4">
          {steps.items.map((s, i) => (
            <li key={s.title} className="overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60">
              {/* El aspect-ratio reserva el lugar antes de que monte el video. */}
              <div className="relative aspect-video w-full overflow-hidden bg-ink-900">
                {s.video ? (
                  <LazyVideo src={s.video} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(215,7,7,0.18),transparent_65%)]">
                    {s.icon && <Icon name={s.icon} className="h-14 w-14 text-accent" />}
                  </div>
                )}
              </div>
              <div className="flex gap-3 p-4">
                <span className="font-display text-2xl font-black italic leading-none text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-black uppercase italic tracking-wide text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-300">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        {tip && (
          <div className="mt-4 flex gap-3 rounded-2xl border-2 border-accent bg-accent/10 p-4">
            <Icon name="rotate-left" className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
            <div>
              <p className="font-display text-base font-black uppercase italic text-white">{tip.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-ink-200">{tip.desc}</p>
            </div>
          </div>
        )}
      </Section>

      {/* 5. Si algo no funciona */}
      <Section title={troubleshooting.title}>
        <div className="divide-y divide-ink-800 overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/60">
          {troubleshooting.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3.5 transition hover:bg-ink-900 [&::-webkit-details-marker]:hidden">
                <span className="text-[15px] font-semibold leading-snug text-white">{item.q}</span>
                <Icon
                  name="chevron-down"
                  className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-180"
                />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-ink-300">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      {/* 6. Cierre: WhatsApp + Instagram */}
      <section className="mt-10 text-center md:mt-14">
        <h2 className="heading-display text-xl sm:text-2xl md:text-3xl">{help.title}</h2>
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
      </section>

      {/* 7. Venta cruzada, discreta */}
      {crossSell && (
        <Link
          href={crossSell.href}
          className="mt-10 flex items-center gap-3 rounded-2xl border border-dashed border-ink-700 bg-ink-900/40 p-3 transition hover:border-ink-500 md:mt-14"
        >
          {/* <img> plano: en Cloudflare `/_next/image` no optimiza. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={crossSell.image}
            alt={crossSell.name}
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 shrink-0 rounded-xl bg-ink-950 object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-ink-500">{crossSell.eyebrow}</p>
            <p className="text-sm font-semibold text-white">{crossSell.name}</p>
            <p className="text-[13px] leading-snug text-ink-400">{crossSell.pitch}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs font-bold uppercase tracking-wider text-ink-300">
            {crossSell.cta}
            <Icon name="arrow-right" className="h-3.5 w-3.5" />
          </span>
        </Link>
      )}
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10 md:mt-14">
      <h2 className="heading-display mb-4 text-xl sm:text-2xl md:text-3xl">{title}</h2>
      {children}
    </section>
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
