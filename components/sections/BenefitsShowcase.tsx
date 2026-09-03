/**
 * BENEFITS SHOWCASE — imagen del producto al centro con las 6 cards de
 * beneficio "flotando" alrededor (sombra fuerte + leve rotación + overlap).
 *
 * Desktop: 3 cards a cada lado, montadas sobre la imagen.
 * Mobile:  columna única, cards fanadas, imagen arriba.
 *
 * Alternativa al grid plano de `Benefits.tsx` — se usa en /parasol.
 * Necesita `config.benefitsImage`; el resto sale de `config.headlines` y
 * `config.benefits` como en `Benefits`.
 */
import { SOPORTE } from '@/lib/landings/soporte';
import type { Benefit, LandingConfig } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';

const CSS = `
.bshow{display:flex;flex-direction:column;align-items:center}
.bshow__col{display:flex;flex-direction:column;position:relative;z-index:2}
.bshow__product{position:relative;z-index:1;display:flex;align-items:center;justify-content:center}
.bshow__product::before{content:"";position:absolute;background:radial-gradient(closest-side,rgba(215,7,7,.2),transparent 72%)}
.bshow__product img{position:relative;width:100%;border-radius:16px;display:block}
.bshow__card{background:#151515;border:1px solid #2a2a2a;border-radius:14px;padding:16px 16px 15px;
  box-shadow:0 18px 34px -12px rgba(0,0,0,.75),0 4px 10px rgba(0,0,0,.5);
  transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s,border-color .22s}
.bshow__chip{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:#242424;color:#c9c9c9;margin-bottom:11px}
.bshow__card h3{font-size:14px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:.01em;line-height:1.15;color:#f4f4f4}
.bshow__card p{margin-top:6px;font-size:12.5px;color:#8f8f8f;line-height:1.5}
.bshow__card--hi{background:#1b1210;border-color:rgba(215,7,7,.5)}
.bshow__card--hi .bshow__chip{background:#D70707;color:#fff}
.bshow__card:hover{transform:translateY(-6px) rotate(0deg);z-index:5;border-color:#3a3a3a;
  box-shadow:0 26px 48px -14px rgba(0,0,0,.8),0 6px 14px rgba(0,0,0,.55)}

@media (max-width:980px){
  .bshow__product{order:-1;margin-bottom:18px}
  .bshow__product img{max-width:200px;margin:0 auto}
  .bshow__product::before{inset:-6% -8%}
  .bshow__col{align-items:center;width:100%}
  .bshow__col .bshow__card{width:min(400px,94%)}
  .bshow__col .bshow__card + .bshow__card{margin-top:-8px}
  .bshow__col .bshow__card:nth-child(odd){transform:rotate(-1.5deg)}
  .bshow__col .bshow__card:nth-child(even){transform:rotate(1.5deg)}
  .bshow__col--right{margin-top:-8px}
}
@media (min-width:981px){
  .bshow{flex-direction:row;justify-content:center;align-items:center}
  .bshow__col{gap:26px}
  .bshow__col--left{align-items:flex-end}
  .bshow__col--right{align-items:flex-start}
  .bshow__product{flex:0 0 340px}
  .bshow__product::before{inset:-12% -18%}
  .bshow__product img{max-width:340px}
  .bshow__card{width:290px}
  .bshow__col--left .bshow__card{margin-right:-46px}
  .bshow__col--right .bshow__card{margin-left:-46px}
  .bshow__col--left .bshow__card:nth-child(1){transform:rotate(-2deg) translateY(6px)}
  .bshow__col--left .bshow__card:nth-child(2){transform:rotate(1.5deg) translateX(-14px)}
  .bshow__col--left .bshow__card:nth-child(3){transform:rotate(-1deg) translateY(-4px)}
  .bshow__col--right .bshow__card:nth-child(1){transform:rotate(2deg) translateY(-10px)}
  .bshow__col--right .bshow__card:nth-child(2){transform:rotate(-1.5deg) translateX(14px)}
  .bshow__col--right .bshow__card:nth-child(3){transform:rotate(1deg) translateY(8px)}
  .bshow__col--right{margin-top:64px}
}
@media (prefers-reduced-motion:reduce){.bshow__card{transition:none}}
`;

function ShowcaseCard({ b }: { b: Benefit }) {
  return (
    <article className={`bshow__card${b.highlight ? ' bshow__card--hi' : ''}`}>
      <span className="bshow__chip">
        <Icon name={b.icon as never} className="h-[18px] w-[18px]" />
      </span>
      <h3>{b.title}</h3>
      <p>{b.desc}</p>
    </article>
  );
}

export function BenefitsShowcase({
  config = SOPORTE,
}: { config?: LandingConfig } = {}) {
  const { headlines, benefits, benefitsImage } = config;
  const left = benefits.slice(0, 3);
  const right = benefits.slice(3, 6);

  return (
    <section id="benefits" className="bg-ink-950 py-16 sm:py-20 md:py-28">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <p className="eyebrow">{headlines.benefitsEyebrow}</p>
          <h2 className="heading-display mt-2 text-2xl leading-tight sm:text-3xl md:text-5xl">
            {headlines.benefitsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-300 sm:text-base">
            {headlines.benefitsSub}
          </p>
        </div>

        <div className="bshow mt-12 sm:mt-16">
          <div className="bshow__col bshow__col--left">
            {left.map((b) => (
              <ShowcaseCard key={b.title} b={b} />
            ))}
          </div>

          {benefitsImage && (
            <div className="bshow__product">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={benefitsImage.src}
                alt={benefitsImage.alt}
                loading="lazy"
                decoding="async"
              />
            </div>
          )}

          <div className="bshow__col bshow__col--right">
            {right.map((b) => (
              <ShowcaseCard key={b.title} b={b} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
