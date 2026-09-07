/**
 * BENEFITS SHOWCASE — imagen del producto al centro con las 6 cards de
 * beneficio "flotando" alrededor (sombra fuerte + leve rotación + overlap).
 *
 * El rojo (borde + chip) es el estado hover, no una marca fija en las
 * cards con `highlight`: se enciende la que el usuario esté mirando.
 *
 * Desktop: 3 cards a cada lado, montadas sobre la imagen.
 * Mobile:  imagen a todo el ancho y las 6 cards en una grilla 2x3.
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
  transition:transform .22s cubic-bezier(.2,.7,.2,1),box-shadow .22s,border-color .22s,background .22s}
.bshow__chip{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:#242424;color:#c9c9c9;margin-bottom:11px;transition:background .22s,color .22s}
.bshow__card h3{font-size:14px;font-weight:900;font-style:italic;text-transform:uppercase;letter-spacing:.01em;line-height:1.15;color:#f4f4f4}
.bshow__card p{margin-top:6px;font-size:12.5px;color:#8f8f8f;line-height:1.5}
.bshow__card:hover{transform:translateY(-6px) rotate(0deg);z-index:5;background:#1b1210;border-color:rgba(215,7,7,.5);
  box-shadow:0 26px 48px -14px rgba(0,0,0,.8),0 6px 14px rgba(0,0,0,.55)}
.bshow__card:hover .bshow__chip{background:#D70707;color:#fff}

@media (max-width:980px){
  /* Ficha técnica: la foto a todo el ancho y los 6 beneficios en un bloque
     2x3. El fan de cards que usa el desktop no se puede traer tal cual: ahí
     las dos columnas se montan SOBRE la imagen, y en una sola columna el
     mismo solape sólo hace que las cards se pisen entre ellas.
     Un display:contents en las columnas saca esos dos divs del árbol de cajas,
     así las 6 cards pasan a ser items directos de la grilla sin tocar el DOM. */
  .bshow{display:grid;grid-template-columns:1fr 1fr;gap:9px;align-items:stretch}
  .bshow__col{display:contents}
  .bshow__product{grid-column:1/-1;order:-1;margin-bottom:20px}
  .bshow__product::before{inset:-8% -12%}
  .bshow__product img{max-width:100%;border-radius:14px}
  .bshow__card{padding:13px 11px 14px}
  .bshow__chip{width:30px;height:30px;margin-bottom:9px}
  /* Sin descripción: a dos columnas no entra sin desbalancear las alturas. */
  .bshow__card p{display:none}
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
    <article className="bshow__card">
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
