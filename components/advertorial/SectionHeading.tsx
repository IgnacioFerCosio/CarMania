/**
 * Encabezado de sección con el estilo de las otras landings: eyebrow en
 * accent + `heading-display` (negrita itálica en mayúsculas) con una parte en
 * rojo. Mismo corte por subcadena que `PitchBlock`.
 */
import type { SectionTitle } from '@/lib/landings/types';

/** Los dos fondos de las landings de marca: negro y el negro-gris. */
export const BG = {
  black: 'bg-ink-950',
  gray: 'bg-[#24262A]',
} as const;
export type Bg = keyof typeof BG;

/** Padding vertical de sección, igual que HowItWorks / FAQ / Reviews. */
export const SECTION_Y = 'py-14 sm:py-20 md:py-28';

export function SectionHeading({
  heading,
  align = 'center',
  className = '',
}: {
  heading: SectionTitle;
  align?: 'center' | 'left';
  className?: string;
}) {
  const { eyebrow, title, accent } = heading;
  const i = accent ? title.indexOf(accent) : -1;
  const before = i >= 0 ? title.slice(0, i) : title;
  const after = i >= 0 ? title.slice(i + accent.length) : '';

  return (
    <div className={`${align === 'center' ? 'text-center' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
        {before}
        {i >= 0 && <span className="text-accent">{accent}</span>}
        {after}
      </h2>
    </div>
  );
}
