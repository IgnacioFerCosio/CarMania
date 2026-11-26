'use client';

/**
 * Escenas animadas de "¿Cómo funciona?" en /inflador, una por paso (la misma
 * idea que TimeRace del trabavolante: dibujos simples en SVG, en loop):
 *
 *   hose → la manguera sale de ARRIBA del inflador y se enrosca en la válvula
 *   mode → elegís el modo: auto 32, moto 36, bici 50 y pelota 9 PSI
 *   auto → infla, la pantalla sube y se corta solo al llegar
 *
 * Todo se anima con CSS (sin re-renders de React): cada "cuadro" es un grupo
 * que se prende en su tramo del ciclo. Sólo corre mientras se ve
 * (IntersectionObserver pausa las animaciones) y, con "reducir movimiento",
 * queda quieto en el último cuadro.
 */
import { useEffect, useRef } from 'react';

const RED = '#D70707';
const RUBBER = '#16171A';
const RIM = '#3A3F46';
const STEEL = '#A7ADB5';
const BODY = '#0E0F11';
const INK = '#8A9099';

/* ── Animación por tramos ─────────────────────────────────────────────── */

/** Keyframes: visible sólo entre `a`% y `b`% del ciclo. */
function vis(name: string, a: number, b: number) {
  const pre = a > 0 ? `0%,${(a - 0.01).toFixed(2)}%{opacity:0}` : '';
  const post = b < 100 ? `${(b + 0.01).toFixed(2)}%,100%{opacity:0}` : '';
  return `@keyframes ${name}{${pre}${a}%,${b}%{opacity:1}${post}}`;
}

/** Estilo de un cuadro: `still` = el que queda a la vista sin animación. */
function frame(name: string, dur: number, still = false): React.CSSProperties {
  return { opacity: still ? 1 : 0, animation: `${name} ${dur}s linear infinite` };
}

const HOSE_DUR = 5;
const MODE_DUR = 8;
const AUTO_DUR = 6.5;

/** Pantalla del paso 3: lo que marca a lo largo del ciclo (en %). */
const AUTO_READINGS: [number, number, string][] = [
  [0, 14, '22'],
  [14, 28, '25'],
  [28, 42, '28'],
  [42, 56, '30'],
  [56, 100, '32'],
];

/** Modos del paso 2, en el orden del inflador. */
const MODES = [
  { kind: 'car', label: 'AUTO', psi: '32' },
  { kind: 'moto', label: 'MOTO', psi: '36' },
  { kind: 'bike', label: 'BICI', psi: '50' },
  { kind: 'ball', label: 'PELOTA', psi: '9' },
] as const;
type ModeKind = (typeof MODES)[number]['kind'];

const KEYFRAMES = [
  // Paso 1
  vis('inf-h-hint', 0, 30),
  vis('inf-h-screw', 52, 80),
  vis('inf-h-ok', 80, 100),
  `@keyframes inf-h-draw{0%,8%{stroke-dashoffset:1}40%,100%{stroke-dashoffset:0}}`,
  `@keyframes inf-h-nut{0%,8%{opacity:0}12%,100%{opacity:1}}`,
  `@keyframes inf-h-ring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.6);opacity:0}}`,
  `@keyframes inf-spin{to{transform:rotate(360deg)}}`,
  // Paso 2
  ...MODES.map((_, i) => vis(`inf-m-${i}`, i * 25, i * 25 + 25)),
  `@keyframes inf-tap{0%,100%{transform:translate(0,0)}6%{transform:translate(-4px,-6px)}10%{transform:translate(0,0)}}`,
  `@keyframes inf-press{0%,100%{transform:scale(1)}6%{transform:scale(.88)}12%{transform:scale(1)}}`,
  // Paso 3
  ...AUTO_READINGS.map(([a, b], i) => vis(`inf-a-${i}`, a, b)),
  vis('inf-a-run', 0, 56),
  vis('inf-a-done', 56, 100),
  `@keyframes inf-flow{to{stroke-dashoffset:-24}}`,
  `@keyframes inf-buzz{0%,100%{transform:translate(0,0)}25%{transform:translate(.6px,-.4px)}75%{transform:translate(-.6px,.4px)}}`,
  `@keyframes inf-pop{0%,55%{transform:scale(.3);opacity:0}62%{transform:scale(1.12);opacity:1}66%,100%{transform:scale(1);opacity:1}}`,
  `@keyframes inf-bar{0%{transform:scaleX(.15)}56%,100%{transform:scaleX(1)}}`,
  `.inf-scene[data-run="0"] *{animation-play-state:paused!important}`,
  `@media (prefers-reduced-motion:reduce){.inf-scene *{animation:none!important}}`,
].join('\n');

/* ── Piezas ────────────────────────────────────────────────────────────── */

/** Ícono de modo, en una caja de 24×24. */
function ModeIcon({ kind, color = '#fff', width = 2 }: { kind: ModeKind; color?: string; width?: number }) {
  const p = { stroke: color, strokeWidth: width, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (kind) {
    case 'car':
      return (
        <g {...p}>
          <path d="M2.5 16 V12.5 L5 8.5 Q6 7 8 7 H15.5 Q17.5 7 18.6 8.6 L21.5 12.5 V16 Z" />
          <path d="M6 11.5 H18" />
          <circle cx="7" cy="16.5" r="2.2" fill={BODY} />
          <circle cx="17" cy="16.5" r="2.2" fill={BODY} />
        </g>
      );
    case 'moto':
      // Con el cuerpo relleno (tanque y asiento), para que no se confunda con la bici.
      return (
        <g {...p}>
          <circle cx="5" cy="16.5" r="3.4" strokeWidth={width * 1.3} />
          <circle cx="19" cy="16.5" r="3.4" strokeWidth={width * 1.3} />
          <path d="M7.5 11.5 L10 8.8 H14.5 L16.5 11 L13.5 13.5 H9.5 Z" fill={color} />
          <path d="M5 16.5 L8 11.5 M16.5 11 L19 16.5 M14.5 8.8 L16.2 6.5 H18.2" />
        </g>
      );
    case 'bike':
      return (
        <g {...p}>
          <circle cx="5" cy="16" r="4" />
          <circle cx="19" cy="16" r="4" />
          <path d="M5 16 L9.5 9 H16 L19 16 M9.5 9 L12.5 16 L16 9 M8 7 H11.5 M16 9 L15 6.5 H17.5" />
        </g>
      );
    case 'ball':
      // Pentágono negro al centro y medio pentágono en cada borde.
      return (
        <g {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8.3 L15.5 10.8 L14.2 14.9 H9.8 L8.5 10.8 Z" fill={color} />
          <path d="M12 8.3 V4.6 M15.5 10.8 L18.9 9.6 M14.2 14.9 L16.4 17.8 M9.8 14.9 L7.6 17.8 M8.5 10.8 L5.1 9.6" />
          <path d="M9.6 3.4 L12 4.6 L14.4 3.4 M20.3 7.6 L18.9 9.6 L20.9 12 M17.8 19.6 L16.4 17.8 L13.5 18.6 M10.5 18.6 L7.6 17.8 L6.2 19.6 M3.1 12 L5.1 9.6 L3.7 7.6" />
        </g>
      );
  }
}

/**
 * El inflador de frente, 60×92 (proporción real 8,9 × 13,6 cm). Arriba, la
 * salida de aire y la luz LED cuadrada; `screen` es lo que va en la pantalla.
 */
function Inflator({ screen, led = false, press }: { screen: React.ReactNode; led?: boolean; press?: React.CSSProperties }) {
  return (
    <g>
      {/* Salida de aire (rosca metálica) y luz LED, arriba */}
      <rect x="25" y="-7" width="10" height="9" rx="1.5" fill={STEEL} />
      <path d="M25 -4.5 h10 M25 -2 h10" stroke="#6B717A" strokeWidth="1" />
      <rect x="41" y="-3.5" width="7" height="5" rx="1" fill={led ? '#F4F7FF' : '#2B2F35'} />
      {led && <rect x="37" y="-9" width="15" height="13" rx="4" fill="#F4F7FF" opacity="0.18" />}
      {/* Cuerpo */}
      <rect x="0" y="0" width="60" height="92" rx="12" fill={BODY} stroke="#2B2F35" strokeWidth="1.5" />
      <path d="M8 4 H52 Q56 4 56 8 V30 Q30 22 4 34 V8 Q4 4 8 4 Z" fill="#fff" opacity="0.05" />
      {/* Pantalla */}
      <rect x="7" y="9" width="46" height="42" rx="5" fill="#050506" />
      {screen}
      {/* Botón con aro rojo */}
      <g style={press ? { transformBox: 'fill-box', transformOrigin: 'center', ...press } : undefined}>
        <circle cx="30" cy="68" r="11.5" fill="#111214" stroke={RED} strokeWidth="2.6" />
        <circle cx="30" cy="68" r="6.5" fill="#1C1E22" />
      </g>
      {/* Rejilla */}
      <path d="M18 87 H42" stroke="#2B2F35" strokeWidth="2" strokeDasharray="2 2" />
    </g>
  );
}

/** Fila de íconos de modo en la pantalla, con uno prendido. */
function ScreenModes({ lit }: { lit: number }) {
  return (
    <g>
      {MODES.map((m, i) => (
        <g key={m.kind} transform={`translate(${10.5 + i * 10.2} 39) scale(0.36)`}>
          <ModeIcon kind={m.kind} color={i === lit ? '#fff' : '#3A3F46'} width={2.6} />
        </g>
      ))}
    </g>
  );
}

/** Número grande de la pantalla. */
function Digits({ v }: { v: string }) {
  return (
    <g>
      <text x="27" y="32" textAnchor="middle" fill="#fff" fontSize="21" fontWeight="800" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">
        {v}
      </text>
      <text x="46" y="20" textAnchor="middle" fill="#fff" fontSize="5.5" fontWeight="700" fontFamily="system-ui, sans-serif">
        PSI
      </text>
    </g>
  );
}

/** Rueda de auto vista de costado, con la válvula a las 8. */
function Tire() {
  return (
    <g>
      <circle cx="300" cy="150" r="104" fill={RUBBER} />
      <circle cx="300" cy="150" r="104" fill="none" stroke="#24262A" strokeWidth="3" strokeDasharray="6 9" />
      <circle cx="300" cy="150" r="64" fill={RIM} />
      <circle cx="300" cy="150" r="64" fill="none" stroke="#565C64" strokeWidth="3" />
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d="M300 150 L300 94" stroke="#2B2F35" strokeWidth="11" strokeLinecap="round" transform={`rotate(${a} 300 150)`} />
      ))}
      <circle cx="300" cy="150" r="14" fill="#2B2F35" />
      {/* Válvula */}
      <path d="M252 166 L238 176" stroke={STEEL} strokeWidth="7" strokeLinecap="round" />
    </g>
  );
}

const HOSE = 'M103 74 C 103 26, 165 18, 198 62 S 226 168, 238 176';

/* ── Escenas ───────────────────────────────────────────────────────────── */

function HoseScene() {
  return (
    <g>
      <Tire />
      <g transform="translate(70 84) scale(1.1)">
        <Inflator screen={<><Digits v="0" /><ScreenModes lit={0} /></>} />
      </g>
      {/* La manguera sale de arriba y baja hasta la válvula */}
      <path d={HOSE} stroke="#2E3137" strokeWidth="7.5" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} style={{ animation: `inf-h-draw ${HOSE_DUR}s ease-out infinite` }} />
      <path d={HOSE} stroke="#50555E" strokeWidth="2" fill="none" strokeLinecap="round" pathLength={1} strokeDasharray={1} style={{ animation: `inf-h-draw ${HOSE_DUR}s ease-out infinite` }} />
      {/* Tuerca en la salida de arriba */}
      <rect x="97" y="67" width="12" height="9" rx="2" fill={STEEL} style={{ animation: `inf-h-nut ${HOSE_DUR}s linear infinite` }} />

      {/* 1) "La manguera va arriba" */}
      <g style={frame('inf-h-hint', HOSE_DUR)}>
        <circle cx="103" cy="72" r="12" fill="none" stroke={RED} strokeWidth="2.5" style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'inf-h-ring 1.1s ease-out infinite' }} />
        <path d="M64 34 L94 64" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <rect x="8" y="12" width="98" height="22" rx="11" fill={RED} />
        <text x="57" y="27" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif">
          SALE DE ARRIBA
        </text>
      </g>

      {/* 2) Enroscando en la válvula */}
      <g style={frame('inf-h-screw', HOSE_DUR)}>
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'inf-spin 0.9s linear infinite' }}>
          <path d="M224 160 a 18 18 0 1 1 6 28" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M226 190 l4 -4 l-6 -3" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <rect x="138" y="196" width="156" height="20" rx="10" fill="#fff" />
        <text x="216" y="210" textAnchor="middle" fill={BODY} fontSize="10" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif">
          ENROSCÁ EN LA VÁLVULA
        </text>
      </g>

      {/* 3) Listo */}
      <g style={frame('inf-h-ok', HOSE_DUR, true)}>
        <circle cx="236" cy="176" r="15" fill={RED} />
        <path d="M229 176 l5 5 l9 -10" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="176" y="196" width="88" height="20" rx="10" fill={RED} />
        <text x="220" y="210" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif">
          ¡CONECTADO!
        </text>
      </g>
    </g>
  );
}

function ModeScene() {
  const tap = { animation: `inf-tap ${MODE_DUR / 4}s ease-in-out infinite` };
  return (
    <g>
      <g transform="translate(34 32) scale(1.62)">
        <Inflator
          led
          press={{ animation: `inf-press ${MODE_DUR / 4}s ease-in-out infinite` }}
          screen={
            <>
              {MODES.map((m, i) => (
                <g key={m.kind} style={frame(`inf-m-${i}`, MODE_DUR, i === 0)}>
                  <Digits v={m.psi} />
                  <ScreenModes lit={i} />
                </g>
              ))}
            </>
          }
        />
      </g>
      {/* El dedo que aprieta el botón para pasar de modo */}
      <g transform="translate(-30 2)">
      <g style={tap}>
        <path d="M118 176 C 112 160, 112 150, 118 146 C 124 142, 132 146, 134 154 L 150 196 L 128 206 Z" fill="#C9CDD2" />
        <path d="M118 146 C 121 142, 128 142, 131 148" stroke="#AEB3B9" strokeWidth="2" fill="none" />
      </g>
      </g>

      {/* A la derecha, el modo elegido en grande */}
      {MODES.map((m, i) => (
        <g key={m.kind} style={frame(`inf-m-${i}`, MODE_DUR, i === 0)}>
          <circle cx="240" cy="92" r="52" fill="#1C1E22" stroke={RED} strokeWidth="2" />
          <g transform="translate(206 58) scale(2.85)">
            <ModeIcon kind={m.kind} width={1.6} />
          </g>
          <text x="240" y="174" textAnchor="middle" fill="#fff" fontSize="17" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif">
            {m.label}
          </text>
          <text x="240" y="194" textAnchor="middle" fill={RED} fontSize="13" fontWeight="900" fontFamily="system-ui, sans-serif">
            {m.psi} PSI
          </text>
        </g>
      ))}
      {/* Puntitos: en qué modo vamos */}
      {MODES.map((m, i) => (
        <g key={m.kind}>
          <circle cx={216 + i * 16} cy="210" r="3.5" fill="#3A3F46" />
          <circle cx={216 + i * 16} cy="210" r="3.5" fill={RED} style={frame(`inf-m-${i}`, MODE_DUR, i === 0)} />
        </g>
      ))}
    </g>
  );
}

function AutoScene() {
  return (
    <g>
      <Tire />
      {/* Aire que pasa por la manguera mientras infla */}
      <path d={HOSE} stroke="#2E3137" strokeWidth="7.5" fill="none" strokeLinecap="round" />
      <g style={frame('inf-a-run', AUTO_DUR)}>
        <path d={HOSE} stroke="#fff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 9" opacity="0.8" style={{ animation: 'inf-flow 0.5s linear infinite' }} />
      </g>
      <rect x="97" y="67" width="12" height="9" rx="2" fill={STEEL} />
      <g transform="translate(70 84) scale(1.1)">
        <g style={{ animation: `inf-buzz 0.12s linear infinite` }}>
          <Inflator
            screen={
              <>
                {AUTO_READINGS.map(([, , v], i) => (
                  <g key={v} style={frame(`inf-a-${i}`, AUTO_DUR, i === AUTO_READINGS.length - 1)}>
                    <Digits v={v} />
                  </g>
                ))}
                <ScreenModes lit={0} />
              </>
            }
          />
        </g>
      </g>
      {/* Vibración mientras infla */}
      <g style={frame('inf-a-run', AUTO_DUR)} stroke={INK} strokeWidth="2.5" strokeLinecap="round">
        <path d="M58 104 q-6 8 0 16 M50 100 q-8 12 0 24" fill="none" />
      </g>

      {/* Objetivo y barra de progreso */}
      <g>
        <text x="16" y="24" fill={INK} fontSize="10" fontWeight="700" fontFamily="system-ui, sans-serif">
          OBJETIVO: 32 PSI
        </text>
        <rect x="16" y="31" width="118" height="7" rx="3.5" fill="#24262A" />
        <rect x="16" y="31" width="118" height="7" rx="3.5" fill={RED} style={{ transformBox: 'fill-box', transformOrigin: 'left', animation: `inf-bar ${AUTO_DUR}s linear infinite` }} />
      </g>

      {/* Llegó: se corta solo */}
      <g style={frame('inf-a-done', AUTO_DUR, true)}>
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: `inf-pop ${AUTO_DUR}s ease-out infinite` }}>
          <rect x="150" y="12" width="132" height="26" rx="13" fill={RED} />
          <path d="M162 25 l4.5 4.5 l8 -9" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x="226" y="29.5" textAnchor="middle" fill="#fff" fontSize="11.5" fontWeight="900" fontStyle="italic" fontFamily="system-ui, sans-serif">
            SE CORTÓ SOLO
          </text>
        </g>
      </g>
    </g>
  );
}

const SCENES: Record<string, () => React.ReactNode> = {
  hose: HoseScene,
  mode: ModeScene,
  auto: AutoScene,
};

export function InflatorScene({ name, label }: { name: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.dataset.run = '1';
      return;
    }
    const obs = new IntersectionObserver(([e]) => (el.dataset.run = e.isIntersecting ? '1' : '0'), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Scene = SCENES[name];
  if (!Scene) return null;
  return (
    <div ref={ref} data-run="0" className="inf-scene absolute inset-0" role="img" aria-label={label}>
      {/* Por innerHTML: como texto hijo, el server escapa las comillas del
          selector (`&quot;`) y React marca un error de hidratación. */}
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <svg viewBox="0 0 320 220" preserveAspectRatio="xMidYMid meet" className="h-full w-full">
        <Scene />
      </svg>
    </div>
  );
}
