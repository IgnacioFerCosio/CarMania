/**
 * Bloque de relato (escenario, mito): título de marca, párrafos cortos y una
 * media en el medio del texto. Ancho de lectura de PitchBlock (max-w-3xl).
 */
import type { MediaSlot as Slot, SectionTitle } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

export function StoryBlock({
  heading,
  paragraphs,
  media,
  mediaAfter = paragraphs.length,
  closing,
  narrowMedia = false,
  bg = 'black',
}: {
  heading: SectionTitle;
  paragraphs: readonly string[];
  media: Slot;
  /** Después de cuántos párrafos va la media (por defecto, al final). */
  mediaAfter?: number;
  closing?: string;
  /** Media vertical: se angosta para no ocupar toda la pantalla. */
  narrowMedia?: boolean;
  bg?: Bg;
}) {
  const p = (t: string) => (
    <p key={t} className="mt-4 text-[15px] leading-relaxed text-ink-300 sm:text-base md:text-lg">
      {t}
    </p>
  );

  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <SectionHeading heading={heading} />
        <div className="mx-auto mt-6 max-w-2xl sm:mt-8">
          {paragraphs.slice(0, mediaAfter).map(p)}
          <div className={`my-8 ${narrowMedia ? 'mx-auto max-w-[280px] sm:max-w-sm' : ''}`}>
            <MediaSlot slot={media} sizes="(min-width: 768px) 672px, 100vw" />
          </div>
          {paragraphs.slice(mediaAfter).map(p)}
          {closing && (
            <p className="mt-6 font-display text-lg font-black uppercase italic leading-snug tracking-wide text-white sm:text-xl">
              {closing}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
