/**
 * QUALITY GUARANTEED — rediseño con 3 cards grandes + sello circular.
 *
 * Mismo patrón visual que la sección de garantía de Clutch-X: título
 * grande con palabra resaltada en accent, 3 cards con badge circular
 * tipo "sello" arriba, descripción abajo. Debajo, bloque "Certificado por"
 * con los logos / nombres de certificaciones.
 */
import { QUALITY_BADGES, CERTIFICATIONS } from '@/lib/config';

export function TrustBlock() {
  return (
    <section className="bg-ink-900 py-14 sm:py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="heading-display text-2xl leading-tight sm:text-3xl md:text-5xl lg:text-6xl">
            CALIDAD <span className="text-accent">GARANTIZADA</span>
          </h2>
        </div>

        {/* 3 cards */}
        <ul className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3 md:gap-8">
          {QUALITY_BADGES.map((q) => (
            <li
              key={q.title}
              className="rounded-2xl border border-ink-800 bg-ink-950 p-5 text-center sm:rounded-3xl sm:p-7 md:p-9"
            >
              <QualitySeal main={q.badge} sub={q.badgeSub} />
              <h3 className="mt-4 font-display text-sm font-black italic uppercase tracking-wider text-white sm:mt-5 sm:text-base md:text-lg">
                {q.title}
              </h3>
              <p className="mt-2.5 text-[13px] leading-relaxed text-ink-300 sm:mt-3 sm:text-sm">
                {q.desc}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Sello circular tipo "rubber stamp" — placeholder sin imagen.
 * Cuando tengas los SVG/PNG reales de tus sellos (ej. /trust/30days.svg,
 * /trust/1year.svg), reemplazá el `<div>` por <Image src=... />.
 */
function QualitySeal({ main, sub }: { main: string; sub: string }) {
  return (
    <div className="relative mx-auto h-24 w-24 md:h-28 md:w-28">
      {/* Anillo exterior con texto curvo */}
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id="seal-outer"
            d="M60,60 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
            fill="none"
          />
        </defs>
        <circle
          cx="60"
          cy="60"
          r="56"
          fill="none"
          stroke="#D70707"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.5"
        />
        <circle
          cx="60"
          cy="60"
          r="48"
          fill="none"
          stroke="#D70707"
          strokeWidth="0.8"
          opacity="0.7"
        />
        <text fill="#D70707" fontSize="7" fontWeight="700" letterSpacing="2">
          <textPath href="#seal-outer" startOffset="0%">
            ★ CALIDAD GARANTIZADA · CARMANIA · CALIDAD GARANTIZADA · CARMANIA
          </textPath>
        </text>
      </svg>
      {/* Núcleo central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-3xl font-black italic leading-none text-white md:text-4xl">
          {main}
        </span>
        <span className="mt-0.5 font-display text-[9px] font-bold uppercase tracking-wider text-accent md:text-[10px]">
          {sub}
        </span>
      </div>
    </div>
  );
}
