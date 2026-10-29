/**
 * Un lugar de la página para una foto, un "GIF" o un video (ver `MediaSlot`
 * en lib/landings/types.ts).
 *
 * Con `pending: true` dibuja una caja punteada que dice qué va ahí: ID,
 * qué tiene que mostrar, especificación y ruta. Se ve igual en producción a
 * propósito: la landing está oculta con `comingSoon`, y así nunca se publica
 * con un hueco invisible.
 *
 * Con el archivo ya subido: `next/image` para fotos, `LazyVideo` (muted,
 * loop) para videos y "GIF", y un `<video controls>` para el que tiene audio.
 * `eager` es sólo para el hero (RV-01): carga sin esperar al scroll.
 */
import Image from 'next/image';
import type { MediaSlot as Slot } from '@/lib/landings/types';
import { Icon, type IconName } from '@/components/ui/Icon';
import { LazyVideo } from '@/components/ui/LazyVideo';

const ASPECT: Record<Slot['aspect'], string> = {
  '1:1': 'aspect-square',
  '4:5': 'aspect-[4/5]',
  '9:16': 'aspect-[9/16]',
  '16:9': 'aspect-video',
  '3:2': 'aspect-[3/2]',
};

const KIND: Record<Slot['kind'], { icon: IconName; label: string }> = {
  image: { icon: 'camera', label: 'FOTO' },
  video: { icon: 'video', label: 'VIDEO' },
  gif: { icon: 'play', label: 'GIF (MP4)' },
};

export function MediaSlot({
  slot,
  tone = 'dark',
  eager = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  className = '',
}: {
  slot: Slot;
  /** Fondo de la sección: define los colores del placeholder. */
  tone?: 'dark' | 'light';
  eager?: boolean;
  sizes?: string;
  className?: string;
}) {
  const box = `relative w-full overflow-hidden rounded-2xl ${ASPECT[slot.aspect]} ${className}`;

  if (slot.pending) {
    const kind = KIND[slot.kind];
    const dark = tone === 'dark';
    return (
      <div
        role="img"
        aria-label={`Pendiente ${slot.id}: ${slot.brief}`}
        className={`${box} flex flex-col items-center justify-center gap-2 border-2 border-dashed p-4 text-center sm:gap-3 sm:p-6 ${
          dark
            ? 'border-ink-600 bg-[#1A1B1F] text-ink-200'
            : 'border-ink-300 bg-[#F2F2F0] text-ink-700'
        }`}
      >
        <span
          className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest sm:text-[11px] ${
            dark ? 'text-accent-400' : 'text-accent'
          }`}
        >
          <Icon name={kind.icon} className="h-4 w-4" />
          PENDIENTE · {slot.id} · {kind.label}
        </span>
        <p
          className={`max-w-md text-sm font-semibold leading-snug sm:text-base md:text-lg ${
            dark ? 'text-white' : 'text-ink-900'
          }`}
        >
          {slot.brief}
        </p>
        <p className={`max-w-md text-[10px] leading-snug sm:text-xs ${dark ? 'text-ink-400' : 'text-ink-500'}`}>
          {slot.spec}
          <br />
          <code className="break-all">{slot.src}</code>
        </p>
      </div>
    );
  }

  if (slot.kind === 'image') {
    return (
      <div className={box}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={eager}
          className="object-cover"
        />
      </div>
    );
  }

  if (slot.withAudio) {
    return (
      <div className={`${box} bg-black`}>
        <video
          src={slot.src}
          poster={slot.poster}
          controls
          playsInline
          preload="none"
          aria-label={slot.alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${box} bg-black`} aria-label={slot.alt} role="img">
      {eager ? (
        <video
          src={slot.src}
          poster={slot.poster}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
        />
      ) : (
        <LazyVideo src={slot.src} className="h-full w-full object-cover" />
      )}
    </div>
  );
}
