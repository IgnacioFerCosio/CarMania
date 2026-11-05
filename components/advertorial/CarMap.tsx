/**
 * "Dónde está cada uno cuando lo necesitás": el habitáculo visto desde arriba
 * (frente hacia arriba, volante a la izquierda como en Argentina) con tres
 * puntos numerados:
 *   1. el llavero, en tu mano / colgado de la llave (rojo, con halo que late),
 *   2. el martillo, en la guantera, del otro lado del auto,
 *   3. el apoyacabezas, que en muchos autos nuevos no sale.
 * Una línea punteada con "LEJOS" une la mano con la guantera.
 *
 * Es un dibujo, no una foto: reemplaza a la imagen de la comparativa, que no
 * comparaba nada. Todo el texto sale de la config (`comparison.map`); el SVG
 * sólo lleva los números y la palabra de la distancia.
 *
 * Server Component, sin estado. El halo usa `motion-safe:` para respetar
 * `prefers-reduced-motion`.
 */
import type { AdvertorialData } from '@/lib/landings/types';

type MapData = AdvertorialData['comparison']['map'];

/** Marcador numerado. */
function Marker({
  x,
  y,
  n,
  ours = false,
}: {
  x: number;
  y: number;
  n: number;
  ours?: boolean;
}) {
  return (
    <g>
      {ours && (
        <>
          <circle cx={x} cy={y} r="38" fill="url(#ours-glow)" />
          <circle
            cx={x}
            cy={y}
            r="17"
            fill="none"
            stroke="#D70707"
            strokeWidth="2"
            className="motion-safe:animate-pulse-dot"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        </>
      )}
      <circle
        cx={x}
        cy={y}
        r="11"
        fill={ours ? '#D70707' : '#3A3A3A'}
        stroke={ours ? '#FFFFFF' : '#888888'}
        strokeWidth="1.5"
      />
      <text
        x={x}
        y={y + 4.2}
        textAnchor="middle"
        fontSize="12"
        fontWeight="900"
        fill="#FFFFFF"
        className="font-display"
      >
        {n}
      </text>
    </g>
  );
}

export function CarMap({ map }: { map: MapData }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-3xl bg-[radial-gradient(circle_at_50%_30%,#31343A,#15161A_78%)] p-3 ring-1 ring-inset ring-white/5 sm:p-4">
        <svg
          viewBox="0 0 360 460"
          role="img"
          aria-label={map.items.map((i) => `${i.n}. ${i.title}`).join('. ')}
          className="mx-auto block h-auto w-full max-w-[320px]"
        >
          <defs>
            <linearGradient id="car-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#25272B" />
              <stop offset="1" stopColor="#121316" />
            </linearGradient>
            <linearGradient id="car-seat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#34363B" />
              <stop offset="1" stopColor="#1E1F23" />
            </linearGradient>
            <radialGradient id="ours-glow">
              <stop offset="0" stopColor="#D70707" stopOpacity="0.55" />
              <stop offset="1" stopColor="#D70707" stopOpacity="0" />
            </radialGradient>
            <filter id="car-shadow" x="-20%" y="-10%" width="140%" height="130%">
              <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Ruedas y espejos, detrás de la carrocería */}
          {[78, 330].flatMap((y) =>
            [50, 296].map((x) => (
              <rect key={`${x}-${y}`} x={x} y={y} width="14" height="56" rx="5" fill="#070708" stroke="#2A2B2F" />
            )),
          )}
          <rect x="50" y="170" width="14" height="24" rx="7" fill="#1E1F23" stroke="#3A3B40" />
          <rect x="296" y="170" width="14" height="24" rx="7" fill="#1E1F23" stroke="#3A3B40" />

          {/* Carrocería */}
          <rect
            x="62"
            y="16"
            width="236"
            height="430"
            rx="88"
            fill="url(#car-body)"
            stroke="#3F4046"
            strokeWidth="2"
            filter="url(#car-shadow)"
          />
          <rect x="76" y="30" width="208" height="402" rx="74" fill="#FFFFFF" fillOpacity="0.025" />

          {/* Parabrisas y luneta */}
          <path d="M92 118 L268 118 L252 162 L108 162 Z" fill="#9FB4C8" fillOpacity="0.12" stroke="#4A4C52" />
          <path d="M104 418 L256 418 L244 434 L116 434 Z" fill="#9FB4C8" fillOpacity="0.1" stroke="#4A4C52" />

          {/* Tablero, volante y guantera */}
          <rect x="88" y="164" width="184" height="34" rx="12" fill="#1B1C20" stroke="#3A3B40" />
          <circle cx="132" cy="200" r="20" fill="none" stroke="#B5B5B5" strokeWidth="4" />
          <circle cx="132" cy="200" r="5" fill="#B5B5B5" />
          <rect x="200" y="170" width="60" height="22" rx="6" fill="#2A2B30" stroke="#5A5A5A" />
          <line x1="218" y1="181" x2="242" y2="181" stroke="#888888" strokeWidth="2" strokeLinecap="round" />

          {/* Asientos delanteros */}
          {[104, 200].map((x) => (
            <g key={x}>
              <rect x={x} y="226" width="56" height="46" rx="12" fill="url(#car-seat)" stroke="#3F4046" />
              <rect x={x} y="270" width="56" height="26" rx="10" fill="url(#car-seat)" stroke="#3F4046" />
              <rect x={x + 16} y="296" width="24" height="12" rx="6" fill="#3A3C42" stroke="#55575E" />
            </g>
          ))}

          {/* Asiento trasero */}
          <rect x="92" y="332" width="176" height="40" rx="12" fill="url(#car-seat)" stroke="#3F4046" />
          <rect x="92" y="372" width="176" height="26" rx="10" fill="url(#car-seat)" stroke="#3F4046" />
          {[118, 168, 218].map((x) => (
            <rect key={x} x={x} y="398" width="24" height="12" rx="6" fill="#3A3C42" stroke="#55575E" />
          ))}

          {/* Conductor: hombros, cabeza, brazos al volante y cinturón puesto */}
          <path d="M112 280 L118 216 M152 280 L146 216" stroke="#6B6D74" strokeWidth="7" strokeLinecap="round" fill="none" />
          <ellipse cx="132" cy="282" rx="25" ry="10" fill="#6B6D74" />
          <circle cx="132" cy="279" r="11" fill="#B5B5B5" />
          <circle cx="119" cy="216" r="5" fill="#B5B5B5" />
          <circle cx="145" cy="216" r="5" fill="#B5B5B5" />
          <line x1="112" y1="268" x2="154" y2="296" stroke="#8A8C93" strokeWidth="5" strokeLinecap="round" />

          {/* Distancia de la mano a la guantera */}
          <line x1="150" y1="240" x2="230" y2="181" stroke="#B5B5B5" strokeWidth="1.5" strokeDasharray="4 5" />
          <rect x="165" y="196" width="46" height="17" rx="8.5" fill="#0A0A0A" stroke="#5A5A5A" />
          <text
            x="188"
            y="208.2"
            textAnchor="middle"
            fontSize="9"
            fontWeight="900"
            letterSpacing="1.2"
            fill="#D8D8D8"
            className="font-display"
          >
            {map.distanceLabel}
          </text>

          {/* Marcadores: 3 apoyacabezas, 2 martillo, 1 llavero (arriba de todo) */}
          <Marker x={132} y={303} n={3} />
          <Marker x={230} y={181} n={2} />
          <Marker x={150} y={240} n={1} ours />
        </svg>
      </div>

      <ol className="mt-5 space-y-3">
        {map.items.map((it) => (
          <li key={it.n} className="flex items-start gap-3">
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-display text-xs font-black text-white ring-1 ring-inset ${
                it.tone === 'ours' ? 'bg-accent ring-white/70' : 'bg-ink-600 ring-ink-400'
              }`}
            >
              {it.n}
            </span>
            <p className="text-sm leading-snug text-ink-300 sm:text-[15px]">
              <strong className={it.tone === 'ours' ? 'text-white' : 'font-semibold text-ink-100'}>
                {it.title}.
              </strong>{' '}
              {it.desc}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
