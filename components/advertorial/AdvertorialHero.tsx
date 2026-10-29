/**
 * Hero de la nota. En el celular la media va arriba y achicada, y los
 * beneficios pasan abajo del botón: así el botón entra sin scrollear a 375 px.
 * En desktop, dos columnas con los beneficios antes del botón.
 *
 * La línea de prueba social sólo aparece con una cifra real cargada.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { Stars } from '@/components/ui/Stars';
import { MediaSlot } from './MediaSlot';
import { CtaLink } from './CtaLink';

export function AdvertorialHero({
  hero,
  cta,
  socialProofCount,
  rating,
}: {
  hero: AdvertorialData['hero'];
  cta: AdvertorialData['cta'];
  socialProofCount: string;
  rating: number;
}) {
  return (
    <section id="hero" className="bg-[#111214] pb-12 pt-5 sm:pt-10 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-5 px-4 md:grid-cols-2 md:gap-12 md:px-6">
        <div className="mx-auto w-full max-w-[220px] sm:max-w-xs md:order-2 md:max-w-[440px]">
          <MediaSlot slot={hero.media} eager sizes="(min-width: 768px) 50vw, 220px" />
        </div>

        <div className="flex flex-col text-center md:order-1 md:text-left">
          {socialProofCount && (
            <div className="mb-3 inline-flex items-center justify-center gap-2 text-sm text-ink-300 md:justify-start">
              {rating > 0 && <Stars rating={rating} size={14} />}
              <span>
                <strong className="text-white">{socialProofCount}</strong> {hero.socialProofSuffix}
              </span>
            </div>
          )}

          <h1 className="font-display text-[28px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl">
            {hero.title}
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-300 sm:text-lg md:mt-5">
            {hero.sub}
          </p>

          <ul className="order-last mt-6 space-y-2.5 text-left text-[15px] text-ink-100 md:order-none md:text-base">
            {hero.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 md:mt-8">
            <CtaLink label={cta.label} href={cta.href} className="w-full md:w-auto" />
            <p className="mt-2.5 text-xs text-ink-400">{hero.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
