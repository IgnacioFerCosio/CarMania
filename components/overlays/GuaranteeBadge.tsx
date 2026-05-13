'use client';

/**
 * Insignia circular flotante "Garantía 30 días" — patrón clásico de ecommerce.
 * Aparece pegada al borde derecho del viewport durante el scroll del hero,
 * y se oculta cuando llegás cerca del pricing (porque ahí ya hay un CTA
 * principal y compite menos información en pantalla).
 *
 * Variante: si querés que sea siempre visible, sacá el efecto de ocultar.
 */
import { useEffect, useState } from 'react';
import { RETURNS } from '@/lib/config';

export function GuaranteeBadge() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pricingEl = document.getElementById('pricing');
    if (!pricingEl) return;
    const obs = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.05 },
    );
    obs.observe(pricingEl);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`pointer-events-none fixed right-2 top-24 z-20 hidden transition-all duration-500 md:block ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'
      }`}
    >
      <div className="relative h-24 w-24 md:h-28 md:w-28">
        {/* Anillo exterior con texto circular */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full animate-spin-slow text-white"
          aria-hidden="true"
        >
          <defs>
            <path
              id="badge-circle"
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
            />
          </defs>
          <text
            fontSize="9"
            fontWeight="900"
            fill="currentColor"
            letterSpacing="2"
          >
            <textPath href="#badge-circle" startOffset="0">
              GARANTÍA · {RETURNS.days} DÍAS · DEVOLUCIÓN · SIN PREGUNTAS ·
            </textPath>
          </text>
        </svg>
        {/* Núcleo del sello */}
        <div className="absolute inset-3 flex flex-col items-center justify-center rounded-full border border-white/15 bg-ink-950 text-center shadow-2xl">
          <span className="text-[9px] font-bold uppercase tracking-wider text-ink-300">
            Garantía
          </span>
          <span className="font-display text-3xl font-black italic leading-none text-white">
            {RETURNS.days}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent">
            días
          </span>
        </div>
      </div>
    </div>
  );
}
