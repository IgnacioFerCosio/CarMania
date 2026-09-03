/**
 * PITCH BLOCK — headline grande + párrafo de empatía, centrado.
 *
 * Bloque de argumentación pura: un dolor o una comparación contra la
 * alternativa mala, sin listas ni imagen. La palabra `accentWord` se pinta en
 * rojo dentro del headline.
 *
 * Se usa en la landing del parasol para "TU AUTO YA NO ES UN HORNO" y
 * "DEJÁ DE PELEAR CON EL PARASOL DE CARTÓN".
 */
import type { PitchBlockData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

export function PitchBlock({ data }: { data: PitchBlockData }) {
  const { eyebrow, headline, accentWord, body } = data;

  // Cortamos el headline en la palabra resaltada para colorear sólo esa parte
  // — mismo criterio que TechSpecs con `titleAccent`.
  const i = headline.indexOf(accentWord);
  const before = i >= 0 ? headline.slice(0, i) : headline;
  const after = i >= 0 ? headline.slice(i + accentWord.length) : '';

  return (
    <section className="bg-ink-950 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
        {eyebrow && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
            <Icon name="alert" className="h-4 w-4" />
            {eyebrow}
          </span>
        )}

        <h2 className="heading-display mt-3 text-2xl leading-tight sm:text-3xl md:text-5xl">
          {before}
          {i >= 0 && <span className="text-accent">{accentWord}</span>}
          {after}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:mt-5 sm:text-base md:text-lg">
          {body}
        </p>
      </div>
    </section>
  );
}
