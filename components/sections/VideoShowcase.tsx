/**
 * VIDEO SHOWCASE — videos verticales del producto en acción, uno al lado del
 * otro, con un rótulo corto debajo. Se reproducen solos, sin sonido y en
 * loop, y recién se montan cerca del viewport (`LazyVideo`).
 *
 * Mobile: fila con scroll horizontal y snap (un video y medio a la vista),
 * para no apilar tres videos altos. Desktop: grilla de 3.
 *
 * Lleva `id="how"` porque ocupa el lugar de "Cómo funciona": así el link
 * del Navbar sigue llevando a esta altura de la página.
 *
 * Los videos tienen que estar en /public (CSP `media-src 'self'`).
 */
import type { VideoShowcaseData } from '@/lib/landings/types';
import { LazyVideo } from '@/components/ui/LazyVideo';

export function VideoShowcase({ data }: { data: VideoShowcaseData }) {
  const { eyebrow, title, accent, videos } = data;
  const i = title.indexOf(accent);
  const before = i >= 0 ? title.slice(0, i) : title;
  const after = i >= 0 ? title.slice(i + accent.length) : '';

  return (
    <section id="how" className="bg-[#24262A] py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {before}
            {i >= 0 && <span className="text-accent">{accent}</span>}
            {after}
          </h2>
        </div>

        <ul className="-mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:mt-12 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {videos.map((v) => (
            <li
              key={v.src}
              className="w-[68%] shrink-0 snap-center overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 sm:w-[44%] md:w-auto"
            >
              <div className="relative aspect-[480/764] w-full overflow-hidden bg-ink-900">
                <LazyVideo src={v.src} className="h-full w-full object-cover" />
              </div>
              <p className="px-4 py-3.5 font-display text-sm font-black uppercase italic tracking-wider text-white sm:text-base">
                {v.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
