/**
 * Un lugar de la página para una foto, un "GIF" o un video (ver `MediaSlot`
 * en lib/landings/types.ts).
 *
 * Con `pending: true` dibuja una caja con el mismo marco que las fotos del
 * resto del sitio y adentro qué va ahí: ID, qué tiene que mostrar,
 * especificación y ruta. Se ve igual en producción a propósito: la landing
 * está oculta con `comingSoon`, y así nunca se publica con un hueco invisible.
 *
 * Con el archivo ya subido: `next/image` para fotos, `LazyVideo` (muted,
 * loop) para videos y "GIF", y un `<video controls>` para el que tiene audio.
 * `eager` es sólo para el hero (RV-01): carga sin esperar al scroll.
 *
 * `fill`: ocupa el contenedor del padre (que define la proporción) en vez de
 * reservar la suya. Lo usan el hero y las cards de pasos, que copian el marco
 * de las otras landings.
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

/**
 * Maqueta local, SÓLO en `npm run dev`: si en `public/mock/<id>.*` hay un
 * archivo (p. ej. `public/mock/RV-04.mp4`), se dibuja encima del placeholder
 * para ver cómo queda la página. La carpeta está en .gitignore: nunca llega al
 * repo, a las previews ni a producción. Lo que vaya ahí es referencia, no el
 * asset final (ese sigue siendo `slot.src` con `pending: false`).
 *
 * Sin JS ni `fs`: si el archivo no existe, el `<video>` queda transparente y
 * el fondo no pinta nada, así que se sigue viendo el placeholder de abajo.
 */
function LocalMock({ slot }: { slot: Slot }) {
  const base = `/mock/${slot.id}`;
  return (
    <>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: ['webp', 'jpg', 'jpeg', 'png'].map((e) => `url(${base}.${e})`).join(', '),
        }}
      />
      {slot.kind !== 'image' && (
        <video
          src={`${base}.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );
}

export function MediaSlot({
  slot,
  eager = false,
  fill = false,
  sizes = '(min-width: 768px) 50vw, 100vw',
  className = '',
}: {
  slot: Slot;
  eager?: boolean;
  fill?: boolean;
  sizes?: string;
  className?: string;
}) {
  // Mismo marco que las fotos de las otras landings (BeforeAfter, HeroMedia).
  const box = fill
    ? `absolute inset-0 overflow-hidden ${className}`
    : `relative w-full overflow-hidden rounded-2xl bg-ink-900 ring-1 ring-inset ring-white/5 ${ASPECT[slot.aspect]} ${className}`;

  if (slot.pending) {
    const kind = KIND[slot.kind];
    return (
      <div
        role="img"
        aria-label={`Pendiente ${slot.id}: ${slot.brief}`}
        className={`${box} flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_38%,#31343A,#191B1F_78%)] p-4 text-center sm:gap-3 sm:p-6`}
      >
        <span className="inline-flex items-center gap-1.5 font-display text-[10px] font-black uppercase italic tracking-widest text-accent sm:text-[11px]">
          <Icon name={kind.icon} className="h-4 w-4" />
          Pendiente · {slot.id} · {kind.label}
        </span>
        <p className="max-w-md text-sm font-semibold leading-snug text-white sm:text-base">
          {slot.brief}
        </p>
        <p className="max-w-md text-[10px] leading-snug text-ink-400 sm:text-xs">
          {slot.spec}
          <br />
          <code className="break-all">{slot.src}</code>
        </p>
        {process.env.NODE_ENV === 'development' && <LocalMock slot={slot} />}
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
