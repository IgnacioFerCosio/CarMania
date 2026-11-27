'use client';

/**
 * "¿Entra en tu portavasos?" debajo de la comparativa de /basurero: la duda
 * número uno de este producto, contestada con una animación. En loop, una
 * lata de gaseosa baja al portavasos y entra; sale, baja el Elegance PRO,
 * entra igual y se dibujan sus medidas. Debajo, tres datos para decidir.
 *
 * Es todo CSS (keyframes sobre un ciclo fijo): no re-renderiza nunca. El
 * IntersectionObserver sólo pausa las animaciones cuando la sección no se ve
 * (`--fc-state`; sin observer, corren siempre).
 * Con "reducir movimiento" se queda quieta en el final (producto puesto y
 * medidas a la vista). El dibujo respeta la proporción real: lata de 6,6 cm
 * y Elegance PRO de 6,5 × 14 cm, en un portavasos de ~7,5 cm.
 *
 * Va como sección propia con el fondo de la comparativa (gris de use cases)
 * y subida sobre su padding de abajo, como TimeRace en /trabavolante.
 */
import { useEffect, useRef } from 'react';
import type { FitCheck as FitCheckData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { CtaLink } from '@/components/advertorial/CtaLink';

/** Duración de un ciclo completo, en segundos. */
const CYCLE = 9;

// Escala del dibujo: 1 cm = 13,3 px. Centro del portavasos en x = 160.
const CX = 160;
const RIM = 200; // borde superior de la consola
const FLOOR = 280; // fondo del portavasos (donde apoya lo que entra)
const CAN = { w: 88, h: 162 }; // 6,6 × 12,2 cm
const OURS = { w: 86, h: 187 }; // 6,5 × 14 cm

export function FitCheck({ data }: { data: FitCheckData }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(
      ([e]) => el.style.setProperty('--fc-state', e.isIntersecting ? 'running' : 'paused'),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const i = data.title.indexOf(data.accent);
  const canTop = FLOOR - CAN.h;
  const oursTop = FLOOR - OURS.h;

  return (
    <section
      ref={ref}
      className="fc -mt-4 bg-[#24262A] px-4 pb-14 sm:-mt-6 sm:pb-20 md:-mt-10 md:px-6 md:pb-28"
    >
      <style>{KEYFRAMES}</style>
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          {data.eyebrow && <p className="eyebrow">{data.eyebrow}</p>}
          <h3 className="heading-display mt-2 text-xl leading-tight sm:text-2xl md:text-3xl">
            {i >= 0 ? (
              <>
                {data.title.slice(0, i)}
                <span className="text-accent">{data.accent}</span>
                {data.title.slice(i + data.accent.length)}
              </>
            ) : (
              data.title
            )}
          </h3>
        </div>

        <div className="mt-6 grid items-center gap-6 sm:mt-8 md:grid-cols-[1fr_1.1fr] md:gap-10">
          {/* La escena */}
          <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 p-4">
            {/* Lo que dice cada fase: lata, después el producto */}
            <div className="relative h-6 text-center text-sm font-semibold sm:text-base">
              <p className="fc-say-1 absolute inset-0 text-ink-200">{data.steps[0]}</p>
              <p className="fc-say-2 absolute inset-0 text-white">{data.steps[1]}</p>
            </div>

            <svg viewBox="0 0 320 300" className="mt-2 block h-auto w-full" role="img" aria-label={`${data.steps[0]} ${data.steps[1]}`}>
              <defs>
                <linearGradient id="fc-can" x1="0" x2="1">
                  <stop offset="0" stopColor="#6b7077" />
                  <stop offset=".35" stopColor="#c9cdd2" />
                  <stop offset=".6" stopColor="#8d9298" />
                  <stop offset="1" stopColor="#50545a" />
                </linearGradient>
                <linearGradient id="fc-ours" x1="0" x2="1">
                  <stop offset="0" stopColor="#0d0d0f" />
                  <stop offset=".3" stopColor="#2c2d31" />
                  <stop offset=".55" stopColor="#18191b" />
                  <stop offset="1" stopColor="#0a0a0b" />
                </linearGradient>
                <linearGradient id="fc-ring" x1="0" x2="1">
                  <stop offset="0" stopColor="#8e9298" />
                  <stop offset=".4" stopColor="#f1f2f4" />
                  <stop offset="1" stopColor="#7c8087" />
                </linearGradient>
                {/* Lo que baja al portavasos se ve sólo hasta su fondo */}
                <clipPath id="fc-clip">
                  <rect x="0" y="0" width="320" height={FLOOR} />
                </clipPath>
              </defs>

              {/* Consola con el portavasos en corte */}
              <rect x="0" y={RIM} width="320" height={300 - RIM} fill="#2a2c31" />
              <rect x="0" y={RIM} width="320" height="3" fill="#3a3d43" />
              <rect x={CX - 52} y={RIM} width="104" height={FLOOR - RIM + 4} rx="6" fill="#0c0d0f" />
              <rect x={CX - 52} y={FLOOR} width="104" height="4" fill="#191a1d" />

              <g clipPath="url(#fc-clip)">
                {/* La lata */}
                <g className="fc-can">
                  <rect x={CX - CAN.w / 2} y={canTop} width={CAN.w} height={CAN.h} rx="8" fill="url(#fc-can)" />
                  <rect x={CX - CAN.w / 2 + 4} y={canTop - 4} width={CAN.w - 8} height="8" rx="3" fill="#a9adb3" />
                  <rect x={CX - CAN.w / 2} y={canTop + 52} width={CAN.w} height="46" fill="#d70707" opacity=".85" />
                </g>

                {/* El Elegance PRO */}
                <g className="fc-ours">
                  <rect x={CX - OURS.w / 2} y={oursTop} width={OURS.w} height={OURS.h} rx="7" fill="url(#fc-ours)" />
                  <rect x={CX - OURS.w / 2 - 1} y={oursTop - 2} width={OURS.w + 2} height="9" rx="4" fill="url(#fc-ring)" />
                  <rect x={CX - OURS.w / 2 + 6} y={oursTop - 6} width={OURS.w - 12} height="6" rx="3" fill="#1d1e21" />
                </g>
              </g>

              {/* Labio delantero del portavasos, por encima de lo que entra */}
              <rect x={CX - 56} y={RIM - 2} width="8" height="6" rx="2" fill="#3a3d43" />
              <rect x={CX + 48} y={RIM - 2} width="8" height="6" rx="2" fill="#3a3d43" />

              {/* Medidas */}
              <g className="fc-dims" fill="#ffffff" stroke="#d70707" strokeWidth="2" fontFamily="inherit">
                <line x1={CX - OURS.w / 2} y1={oursTop - 18} x2={CX + OURS.w / 2} y2={oursTop - 18} />
                <line x1={CX - OURS.w / 2} y1={oursTop - 24} x2={CX - OURS.w / 2} y2={oursTop - 12} />
                <line x1={CX + OURS.w / 2} y1={oursTop - 24} x2={CX + OURS.w / 2} y2={oursTop - 12} />
                <text x={CX} y={oursTop - 26} textAnchor="middle" fontSize="15" fontWeight="800" stroke="none">
                  {data.diameter}
                </text>

                <line x1={CX + OURS.w / 2 + 22} y1={oursTop} x2={CX + OURS.w / 2 + 22} y2={FLOOR} />
                <line x1={CX + OURS.w / 2 + 16} y1={oursTop} x2={CX + OURS.w / 2 + 28} y2={oursTop} />
                <line x1={CX + OURS.w / 2 + 16} y1={FLOOR} x2={CX + OURS.w / 2 + 28} y2={FLOOR} />
                <text
                  x={CX + OURS.w / 2 + 34}
                  y={(oursTop + FLOOR) / 2 + 5}
                  fontSize="15"
                  fontWeight="800"
                  stroke="none"
                >
                  {data.height}
                </text>
              </g>

              {/* Tilde final */}
              <g className="fc-ok">
                <circle cx="52" cy="70" r="20" fill="#d70707" />
                <path d="M43 70l6 6 12-13" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
          </div>

          {/* Los datos */}
          <ul className="grid gap-3">
            {data.tips.map((tip) => (
              <li key={tip.title} className="flex gap-4 rounded-2xl border border-ink-800 bg-ink-900/70 p-4 sm:p-5">
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon name={tip.icon} className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-base font-black uppercase italic tracking-wide text-white sm:text-lg">
                    {tip.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-300 sm:text-[15px]">{tip.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <CtaLink label={data.cta.label} href={data.cta.href} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}

/*
 * Un ciclo de 9 s:
 *   0–9 %    baja la lata y entra          ("¿Entra una lata…?")
 *   9–36 %   la lata queda puesta
 *   36–44 %  la lata sube y se va
 *   44–53 %  baja el Elegance PRO y entra  ("Entonces entra…")
 *   53–92 %  queda puesto, aparecen las medidas y el tilde
 *   92–100 % se va, para volver a empezar
 * Sin animación (reducir movimiento), cada elemento queda en su estado final:
 * la lata oculta, el producto puesto, medidas y tilde visibles.
 */
const ANIM = `${CYCLE}s linear infinite var(--fc-state, running)`;
const KEYFRAMES = `
@keyframes fc-can {
  0% { transform: translateY(-190px); opacity: 0 }
  3% { opacity: 1 }
  9% { transform: translateY(0) }
  10.5% { transform: translateY(-4px) }
  12% { transform: translateY(0) }
  36% { transform: translateY(0); opacity: 1 }
  44% { transform: translateY(-190px); opacity: 0 }
  100% { transform: translateY(-190px); opacity: 0 }
}
@keyframes fc-ours {
  0%, 42% { transform: translateY(-210px); opacity: 0 }
  45% { opacity: 1 }
  53% { transform: translateY(0) }
  54.5% { transform: translateY(-4px) }
  56% { transform: translateY(0) }
  92% { transform: translateY(0); opacity: 1 }
  100% { transform: translateY(0); opacity: 0 }
}
@keyframes fc-dims { 0%, 57% { opacity: 0 } 62%, 90% { opacity: 1 } 95%, 100% { opacity: 0 } }
@keyframes fc-ok {
  0%, 60% { opacity: 0; transform: scale(.4) }
  64% { opacity: 1; transform: scale(1.12) }
  66%, 90% { opacity: 1; transform: scale(1) }
  95%, 100% { opacity: 0; transform: scale(1) }
}
@keyframes fc-say-1 { 0%, 38% { opacity: 1 } 42%, 100% { opacity: 0 } }
@keyframes fc-say-2 { 0%, 42% { opacity: 0 } 46%, 92% { opacity: 1 } 96%, 100% { opacity: 0 } }

.fc .fc-can { opacity: 0 }
.fc .fc-say-1 { opacity: 0 }
.fc .fc-ok { transform-box: fill-box; transform-origin: center }
@media (prefers-reduced-motion: no-preference) {
  .fc .fc-can { animation: fc-can ${ANIM} }
  .fc .fc-ours { animation: fc-ours ${ANIM} }
  .fc .fc-dims { animation: fc-dims ${ANIM} }
  .fc .fc-ok { animation: fc-ok ${ANIM} }
  .fc .fc-say-1 { animation: fc-say-1 ${ANIM} }
  .fc .fc-say-2 { animation: fc-say-2 ${ANIM} }
}
`;
