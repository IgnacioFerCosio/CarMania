'use client';

/**
 * STICKY ADD-TO-CART BAR — aparece al scrollear más allá del hero y SE OCULTA
 * a partir de la sección de pricing en adelante (incluyendo todo lo que está
 * debajo: surfaces, specs, reseñas, FAQ, footer).
 *
 * Lógica: el sticky se muestra mientras el TOP de #pricing siga por debajo
 * del viewport. Apenas asoma — y desde ahí en adelante — queda oculto.
 */
import { useEffect, useState } from 'react';
import { formatARS } from '@/lib/shopify';
import { Countdown } from './Countdown';
import { BuyButton } from './BuyButton';
import { URGENCY } from '@/lib/config';

type Props = {
  variantId: string;
  productId: string;
  price: number;
  compareAtPrice: number | null;
};

export function StickyATC({ variantId, productId, price, compareAtPrice }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const pricingEl = document.getElementById('pricing');

    function evaluate() {
      const scrolledEnough = window.scrollY > 600;
      // Si no encontramos pricing, comportamiento original (solo el threshold de scroll).
      if (!pricingEl) {
        setShow(scrolledEnough);
        return;
      }
      // beforePricing = el borde superior de pricing aún no entró en pantalla.
      // En cuanto entra (y para todo el resto del scroll hacia abajo), se oculta.
      const pricingTop = pricingEl.getBoundingClientRect().top;
      const beforePricing = pricingTop > window.innerHeight;
      setShow(scrolledEnough && beforePricing);
    }

    window.addEventListener('scroll', evaluate, { passive: true });
    window.addEventListener('resize', evaluate);
    evaluate();

    return () => {
      window.removeEventListener('scroll', evaluate);
      window.removeEventListener('resize', evaluate);
    };
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-ink-800 bg-ink-950/95 backdrop-blur transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto flex max-w-5xl items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 md:gap-5 md:py-4">
        {/* Precio compact (solo desktop) */}
        <div className="hidden flex-col text-xs leading-tight md:flex">
          <span className="text-ink-400">Soporte Magnético PRO™</span>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-white">
              {formatARS(price)}
            </span>
            {compareAtPrice && (
              <span className="text-xs text-ink-500 line-through">
                {formatARS(compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Countdown — más chico en mobile */}
        <div className="flex shrink-0 items-center gap-2 md:flex-none">
          <span className="hidden text-[11px] uppercase tracking-wider text-ink-400 md:block">
            termina en
          </span>
          <Countdown hours={URGENCY.countdownHours} compact />
        </div>

        {/* CTA ocupa el resto en mobile */}
        <div className="flex-1 md:flex-none md:min-w-[260px]">
          <BuyButton
            variantId={variantId}
            productId={productId}
            price={price}
            quantity={1}
            label="Comprar"
            size="md"
            className="w-full"
            hideHelper
          />
        </div>
      </div>
    </div>
  );
}
