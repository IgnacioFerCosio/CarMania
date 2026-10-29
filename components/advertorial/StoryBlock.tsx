/**
 * Bloque de nota sobre fondo blanco: título, párrafos cortos de 18 px y una
 * media en el medio del texto. Tiene que leerse como un artículo, no como
 * una landing: ancho máximo de 680 px y nada de decoración.
 */
import type { MediaSlot as Slot } from '@/lib/landings/types';
import { MediaSlot } from './MediaSlot';

export function StoryBlock({
  id,
  title,
  paragraphs,
  media,
  mediaAfter = paragraphs.length,
  closing,
  narrowMedia = false,
}: {
  id?: string;
  title: string;
  paragraphs: readonly string[];
  media: Slot;
  /** Después de cuántos párrafos va la media (por defecto, al final). */
  mediaAfter?: number;
  closing?: string;
  /** Media vertical: se angosta para no ocupar toda la pantalla. */
  narrowMedia?: boolean;
}) {
  const p = (t: string) => (
    <p key={t} className="mt-5 text-[18px] leading-[1.6] text-ink-800">
      {t}
    </p>
  );

  return (
    <section id={id} className="bg-white py-12 text-ink-900 sm:py-16 md:py-20">
      <article className="mx-auto max-w-[680px] px-4">
        <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-ink-950 sm:text-3xl md:text-4xl">
          {title}
        </h2>
        {paragraphs.slice(0, mediaAfter).map(p)}
        <div className={`my-8 ${narrowMedia ? 'mx-auto max-w-[260px] sm:max-w-sm' : ''}`}>
          <MediaSlot slot={media} tone="light" sizes="(min-width: 680px) 680px, 100vw" />
        </div>
        {paragraphs.slice(mediaAfter).map(p)}
        {closing && (
          <p className="mt-6 text-[18px] font-bold leading-[1.6] text-ink-950">{closing}</p>
        )}
      </article>
    </section>
  );
}
