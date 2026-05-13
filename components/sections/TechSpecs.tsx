/**
 * TECH SPECS — "Nano-tech que funciona".
 * Sección técnica con foto del producto al centro y callouts de medidas
 * alrededor. Mismo patrón visual que la web de Clutch-X: descripción arriba
 * + producto grande + cotas con líneas guía a los costados.
 *
 * Cuando tengas el render técnico real (PNG con fondo transparente),
 * reemplazá <TechImage /> por <Image src="/specs/producto-tech.png" ... />.
 */
import Image from 'next/image';
import { TECH_SPECS } from '@/lib/config';

export function TechSpecs() {
  const { eyebrow, title, titleAccent, description, dimensions } = TECH_SPECS;

  // Cortamos el title en la palabra resaltada para colorear sólo esa parte.
  const titleParts = title.split(titleAccent);
  const left = titleParts[0]?.trim();
  const right = titleParts[1]?.trim();

  return (
    <section className="bg-ink-950 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="heading-display mt-3 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {left}{' '}
            <span className="text-accent">{titleAccent}</span>
            {right && <> {right}</>}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
            {description}
          </p>
        </div>

        {/* Render técnico + cotas */}
        <div className="relative mx-auto mt-10 max-w-3xl sm:mt-14 md:mt-20">
          <TechImage />

          {/* Callouts de medidas — overlay en desktop, lista normal en mobile */}
          <div className="mt-8 hidden md:block">
            <DimensionCallouts dimensions={dimensions} />
          </div>

          {/* Versión mobile: chips inline */}
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2 md:hidden">
            {dimensions.map((d) => (
              <li
                key={d.label}
                className="rounded-full border border-ink-800 bg-ink-900 px-3 py-1.5 text-[11px] text-ink-200"
              >
                <span className="font-bold text-white">{d.value}</span>
                <span className="ml-1 text-ink-400">· {d.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/**
 * Imagen técnica real del producto con las medidas.
 * Archivo: /public/medidas/medidas.png
 */
function TechImage() {
  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <Image
        src="/medidas/medidas.png"
        alt="Dimensiones del Soporte Magnético PRO™"
        width={800}
        height={600}
        className="h-auto w-full rounded-2xl"
        sizes="(min-width: 768px) 672px, 100vw"
      />
    </div>
  );
}

/**
 * Callouts laterales en desktop — 4 chips alrededor del producto.
 */
function DimensionCallouts({
  dimensions,
}: {
  dimensions: readonly { label: string; value: string; sub?: string }[];
}) {
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {dimensions.map((d) => (
        <li
          key={d.label}
          className="rounded-2xl border border-ink-800 bg-ink-900 p-4 text-center"
        >
          <div className="font-display text-xl font-extrabold text-white md:text-2xl">
            {d.value}
          </div>
          {d.sub && (
            <div className="mt-0.5 text-[10px] text-ink-400">{d.sub}</div>
          )}
          <div className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-accent">
            {d.label}
          </div>
        </li>
      ))}
    </ul>
  );
}
