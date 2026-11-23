'use client';

/**
 * Carrera de tiempos debajo de la comparativa de /trabavolante: el camino de
 * cada traba, paso a paso, con una escena dibujada por paso. Dos carriles a
 * lo ancho (uno abajo del otro en el celular, lado a lado en desktop): el
 * Titan termina enseguida ("Listo · 3 segundos") y se queda esperando
 * mientras la traba común sigue: te bajás, vas al baúl, lo armás un buen
 * rato, hacés fuerza, le marca el volante… Al terminar espera un momento y
 * arranca de nuevo (loop), así se queda mirándola el que pasa.
 *
 * Sólo corre mientras se ve (IntersectionObserver). Con "reducir movimiento",
 * o antes de hidratar, se muestra el final quieto. La traba común no lleva
 * tiempo: no lo medimos, así que no lo inventamos.
 *
 * Va como sección propia, con el fondo de la comparativa (`bg="ink"`) y
 * subida sobre su padding de abajo, para que se lea como parte de la tabla
 * sin tocar ComparisonTable (que comparten el llavero y el Tornado).
 */
import { useEffect, useRef, useState } from 'react';
import type { TimeRace as TimeRaceData, TimeRaceStep } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { CtaLink } from '@/components/advertorial/CtaLink';

/** Duración de un paso "normal" de cada carril, en ms. */
// El Titan dura sus "3 segundos" de verdad: 3 pasos de 1 s.
const OURS_STEP = 1000;
const OTHER_STEP = 1100;
const START = 400;
/** Cuánto queda quieto el final antes de volver a empezar. */
const HOLD = 2800;

/** Momento (ms) en que arranca cada paso y en que termina el carril. */
function schedule(steps: readonly TimeRaceStep[], unit: number) {
  let t = START;
  const at = steps.map((s) => {
    const a = t;
    t += unit * (s.weight ?? 1);
    return a;
  });
  return { at, end: t };
}

/** Índice del paso en curso (-1 antes de empezar, steps.length al terminar). */
function current(at: number[], end: number, now: number) {
  if (now >= end) return at.length;
  let i = -1;
  at.forEach((a, n) => {
    if (now >= a) i = n;
  });
  return i;
}

export function TimeRace({ data }: { data: TimeRaceData }) {
  const { ours, other } = data;
  const o = schedule(ours.steps, OURS_STEP);
  const x = schedule(other.steps, OTHER_STEP);
  const cycle = x.end + HOLD;

  const ref = useRef<HTMLElement>(null);
  // null = final quieto (server, reducir movimiento); número = ms del ciclo
  const [t, setT] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // 10 veces por segundo alcanza: cada paso dura medio segundo o más.
    let timer = 0;
    let t0 = 0;
    const start = () => {
      if (timer) return;
      t0 = performance.now();
      setT(0);
      timer = window.setInterval(() => setT((performance.now() - t0) % cycle), 100);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    if (!('IntersectionObserver' in window)) {
      start();
      return stop;
    }
    setT(0);
    const obs = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), {
      threshold: 0.25,
    });
    obs.observe(el);
    return () => {
      obs.disconnect();
      stop();
    };
  }, [cycle]);

  const now = t ?? Infinity;
  const i = data.title.indexOf(data.accent);

  return (
    <section
      ref={ref}
      className="-mt-4 bg-ink-900 px-4 pb-14 sm:-mt-6 sm:pb-20 md:-mt-10 md:px-6 md:pb-28"
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

        <div className="mt-6 grid items-start gap-3 sm:mt-8 md:grid-cols-2 md:gap-6">
          <Lane
            name={ours.name}
            steps={ours.steps}
            idx={current(o.at, o.end, now)}
            ours
            doneTitle={ours.time}
            doneSub={ours.doneLabel}
            doneScene="lock"
          />
          <Lane
            name={other.name}
            steps={other.steps}
            idx={current(x.at, x.end, now)}
            doneTitle={other.doneLabel}
            doneScene="done"
          />
        </div>

        <p className="mx-auto mt-7 max-w-md text-center text-sm leading-relaxed text-ink-300 sm:text-base">
          {data.note}
        </p>
        <div className="mt-6 flex justify-center">
          <CtaLink label={data.cta.label} href={data.cta.href} className="w-full sm:w-auto" />
        </div>
      </div>
    </section>
  );
}

function Lane({
  name,
  steps,
  idx,
  ours = false,
  doneTitle,
  doneSub,
  doneScene,
}: {
  name: string;
  steps: readonly TimeRaceStep[];
  idx: number;
  ours?: boolean;
  doneTitle: string;
  doneSub?: string;
  doneScene: string;
}) {
  const done = idx >= steps.length;
  const step = done ? null : steps[Math.max(0, idx)];
  const scene = done ? doneScene : step!.icon;
  return (
    <div
      className={`overflow-hidden rounded-3xl ring-1 ring-inset ${
        ours ? 'bg-ink-950 ring-accent/40' : 'bg-ink-950/70 ring-white/[0.07]'
      }`}
    >
      {/* Cabecera: nombre + estado */}
      <div className="flex items-center justify-between gap-3 px-4 pt-3 sm:px-5 sm:pt-4">
        <span
          className={`font-display text-sm font-black uppercase italic sm:text-base ${
            ours ? 'text-white' : 'text-ink-300'
          }`}
        >
          {name}
        </span>
        {done && ours ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5 py-1 font-display text-xs font-black uppercase italic text-white">
            <Icon name="check" className="h-3.5 w-3.5" />
            {doneTitle}
          </span>
        ) : (
          <Clock spinning={!done && idx >= 0} ours={ours} />
        )}
      </div>

      {/* Escena */}
      {/* 2:1 en el celular, para que entren los dos carriles a la vez */}
      <div className="relative mx-4 mt-2.5 aspect-[2/1] overflow-hidden rounded-2xl bg-ink-900 sm:mx-5 sm:mt-3 sm:aspect-[16/9]">
        <div key={scene} className="absolute inset-0" style={{ animation: 'tr-fade 350ms ease-out' }}>
          <Scene name={scene} />
        </div>
        {done && (
          <div
            className={`absolute inset-x-0 bottom-0 bg-gradient-to-t px-4 pb-3 pt-10 ${
              ours ? 'from-black/85' : 'from-black/90'
            }`}
            style={{ animation: 'tr-fade 400ms ease-out' }}
          >
            {ours ? (
              <p className="font-display text-base font-black uppercase italic text-white sm:text-xl">
                ¡Listo! <span className="text-accent">{doneSub}</span>
              </p>
            ) : (
              <p className="font-display text-base font-black uppercase italic leading-tight text-amber-300 sm:text-lg">
                {doneTitle}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Paso en curso */}
      <div className="flex min-h-[2.5rem] items-center gap-3 px-4 pt-2 sm:min-h-[3.25rem] sm:px-5 sm:pt-3">
        <span
          className={`font-display text-xs font-black italic ${ours ? 'text-accent' : 'text-ink-400'}`}
        >
          {done ? `${steps.length}/${steps.length}` : `${Math.max(1, idx + 1)}/${steps.length}`}
        </span>
        <span
          key={step?.label ?? 'fin'}
          className={`text-sm font-semibold leading-snug sm:text-base ${
            step?.bad ? 'text-amber-300' : 'text-white'
          }`}
          style={{ animation: 'tr-fade 300ms ease-out' }}
        >
          {step ? step.label : ours ? 'Ya está trabado' : steps[steps.length - 1].label}
        </span>
      </div>

      {/* Progreso por pasos */}
      <div className="flex gap-1 px-4 pb-3.5 pt-1.5 sm:px-5 sm:pb-5 sm:pt-2">
        {steps.map((s, n) => (
          <span
            key={s.label}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              n < idx || done
                ? ours
                  ? 'bg-accent'
                  : s.bad
                    ? 'bg-amber-400'
                    : 'bg-ink-400'
                : n === idx
                  ? ours
                    ? 'bg-accent/60'
                    : 'bg-ink-500'
                  : 'bg-white/[0.08]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Clock({ spinning, ours }: { spinning: boolean; ours: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-5 w-5 shrink-0 ${ours ? 'text-accent' : 'text-ink-400'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path
        d="M12 12V7"
        style={{
          transformBox: 'view-box',
          transformOrigin: '12px 12px',
          animation: spinning ? 'tr-spin 1s linear infinite' : 'none',
        }}
      />
    </svg>
  );
}

/* ── Escenas ───────────────────────────────────────────────────────────── */

const KEYFRAMES = `
@keyframes tr-fade { from { opacity: 0; transform: translateY(4px) } to { opacity: 1; transform: none } }
@keyframes tr-spin { to { transform: rotate(360deg) } }
@keyframes tr-draw { from { stroke-dashoffset: 1 } to { stroke-dashoffset: 0 } }
@keyframes tr-walk { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-3px) } }
@keyframes tr-shake { 0%,100% { transform: rotate(0) } 25% { transform: rotate(-4deg) } 75% { transform: rotate(4deg) } }
@keyframes tr-pop { 0% { transform: scale(0.4); opacity: 0 } 70% { transform: scale(1.12) } 100% { transform: scale(1); opacity: 1 } }
@keyframes tr-slide-r { from { transform: translateX(-40px) } to { transform: none } }
@keyframes tr-slide-l { from { transform: translateX(40px) } to { transform: none } }
@keyframes tr-click { 0% { transform: translateY(-26px) } 70% { transform: translateY(2px) } 100% { transform: none } }
@keyframes tr-dots { 0%,100% { opacity: .25 } 50% { opacity: 1 } }
@keyframes tr-turn { 0%,100% { transform: rotate(0) } 50% { transform: rotate(25deg) } }
`;

const RED = '#D70707';
const BAR = '#C2262C';
const STEEL = '#8A9099';
const BODY = '#4A5059';
const SKIN = '#C9CDD2';
const AMBER = '#FBBF24';

/** Auto de costado (trompa a la izquierda, baúl a la derecha). */
function Car({ door = false, trunk = false }: { door?: boolean; trunk?: boolean }) {
  return (
    <g transform="translate(18 52) scale(0.82)">
      <path
        d="M10 95 L10 72 Q12 60 30 57 L80 52 L115 24 Q122 18 135 18 L205 18 Q218 18 226 28 L250 54 L280 60 Q292 64 292 77 L292 95 Z"
        fill={BODY}
      />
      <path d="M90 52 L119 28 L160 28 L160 52 Z" fill="rgba(180,215,255,0.45)" />
      <path d="M168 28 L200 28 Q208 28 214 35 L232 52 L168 52 Z" fill="rgba(180,215,255,0.45)" />
      {[75, 232].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={98} r={21} fill="#0E0F11" />
          <circle cx={cx} cy={98} r={9} fill="#7A8089" />
        </g>
      ))}
      {/* Puerta del conductor abierta */}
      {door && <path d="M118 54 L92 30 L84 86 L112 92 Z" fill="#5B6169" stroke="#2B2F35" strokeWidth="2" />}
      {/* Baúl abierto */}
      {trunk && <path d="M250 54 L262 14 L296 22 L282 60 Z" fill="#5B6169" stroke="#2B2F35" strokeWidth="2" />}
    </g>
  );
}

/** Persona de palitos. `carry` = lleva el bastón. */
function Person({ x, carry = false, flip = false, walking = false }: { x: number; carry?: boolean; flip?: boolean; walking?: boolean }) {
  return (
    <g transform={`translate(${x} 70) scale(${flip ? -1 : 1} 1)`}>
      <g style={walking ? { animation: 'tr-walk 450ms ease-in-out infinite' } : undefined}>
        <circle cx="0" cy="0" r="9" fill={SKIN} />
        <path d="M0 9 V46 M0 46 L-10 74 M0 46 L10 74 M0 20 L-12 38 M0 20 L13 34" stroke={SKIN} strokeWidth="6" strokeLinecap="round" fill="none" />
        {carry && <path d="M-30 50 L44 12" stroke={BAR} strokeWidth="7" strokeLinecap="round" />}
      </g>
    </g>
  );
}

/** Volante de frente. */
function Wheel({ children, shake = false }: { children?: React.ReactNode; shake?: boolean }) {
  return (
    <g style={shake ? { transformBox: 'view-box', transformOrigin: '160px 92px', animation: 'tr-shake 220ms linear infinite' } : undefined}>
      <circle cx="160" cy="92" r="66" fill="none" stroke="#2B2F35" strokeWidth="16" />
      <circle cx="160" cy="92" r="66" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
      <path d="M160 92 L160 156 M160 92 L100 74 M160 92 L220 74" stroke="#2B2F35" strokeWidth="14" strokeLinecap="round" />
      <circle cx="160" cy="92" r="22" fill="#3A3F46" />
      {children}
    </g>
  );
}

/** El bastón cruzado en el volante, con sus dos ganchos. */
function BarOnWheel() {
  return (
    <g>
      <path d="M70 128 L262 48" stroke={BAR} strokeWidth="11" strokeLinecap="round" />
      <path d="M108 112 q-4 -22 14 -26 M212 69 q-4 -22 14 -26" stroke={STEEL} strokeWidth="6" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** El cable del Titan envuelto en el aro, bajando hacia el cinturón. */
function CableOnWheel({ draw = false }: { draw?: boolean }) {
  const anim = draw ? { strokeDasharray: 1, strokeDashoffset: 0, animation: 'tr-draw 600ms ease-out' } : undefined;
  return (
    <g>
      <ellipse cx="112" cy="140" rx="17" ry="27" transform="rotate(40 112 140)" fill="none" stroke="#141518" strokeWidth="11" pathLength={1} style={anim} />
      <path d="M118 158 C128 172, 150 176, 160 180" stroke="#6B717A" strokeWidth="5" fill="none" pathLength={1} style={anim} />
      <rect x="99" y="120" width="9" height="5" rx="2" fill="#F26A1B" transform="rotate(40 103 122)" />
    </g>
  );
}

function Scene({ name }: { name: string }) {
  const s: Record<string, React.ReactNode> = {
    // Titan
    wrap: (
      <Wheel>
        <CableOnWheel draw />
      </Wheel>
    ),
    buckle: (
      <g>
        {/* Anclaje del cinturón y la traba que entra */}
        <rect x="140" y="104" width="40" height="64" rx="8" fill="#3A3F46" />
        <rect x="149" y="104" width="22" height="6" rx="2" fill="#0E0F11" />
        <circle cx="170" cy="150" r="5" fill={RED} />
        <g style={{ animation: 'tr-click 500ms cubic-bezier(.3,1.4,.6,1)' }}>
          <path d="M152 40 C152 20, 168 20, 168 40" stroke="#6B717A" strokeWidth="6" fill="none" />
          <rect x="143" y="40" width="34" height="62" rx="7" fill="#1A1C1F" stroke="#4A5059" strokeWidth="2" />
        </g>
        <text x="214" y="96" fill="#fff" fontSize="20" fontWeight="900" fontStyle="italic" style={{ animation: 'tr-pop 400ms 350ms both' }}>
          ¡CLICK!
        </text>
      </g>
    ),
    lock: (
      <g>
        <Wheel>
          <CableOnWheel />
        </Wheel>
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'tr-pop 450ms ease-out' }}>
          <circle cx="232" cy="46" r="24" fill={RED} />
          <rect x="221" y="44" width="22" height="16" rx="3" fill="#fff" />
          <path d="M225 44 v-5 a7 7 0 0 1 14 0 v5" stroke="#fff" strokeWidth="3.5" fill="none" />
        </g>
      </g>
    ),
    // Traba común
    door: (
      <g>
        <Car door />
        <g style={{ animation: 'tr-slide-r 600ms ease-out' }}>
          <Person x={116} />
        </g>
      </g>
    ),
    walk: (
      <g>
        <Car />
        <g style={{ animation: 'tr-slide-r 900ms ease-out' }}>
          <Person x={262} walking />
        </g>
      </g>
    ),
    trunk: (
      <g>
        <Car trunk />
        <Person x={296} flip />
      </g>
    ),
    bar: (
      <g>
        <Car trunk />
        <g style={{ animation: 'tr-slide-l 500ms ease-out' }}>
          <Person x={292} flip carry />
        </g>
      </g>
    ),
    walkback: (
      <g>
        <Car trunk />
        <g style={{ animation: 'tr-slide-l 1000ms ease-out' }}>
          <Person x={120} flip carry walking />
        </g>
      </g>
    ),
    wrench: (
      <g>
        {/* El bastón en dos partes y la llave dando vueltas */}
        <path d="M60 120 L150 82" stroke={BAR} strokeWidth="11" strokeLinecap="round" />
        <path d="M172 74 L262 36" stroke={BAR} strokeWidth="11" strokeLinecap="round" opacity="0.85" />
        <g style={{ transformBox: 'fill-box', transformOrigin: '30% 70%', animation: 'tr-turn 600ms ease-in-out infinite' }}>
          <path d="M172 118 l26 -26 m4 -12 a12 12 0 1 0 -16 16" stroke={STEEL} strokeWidth="8" fill="none" strokeLinecap="round" />
        </g>
        {[0, 1, 2].map((n) => (
          <circle key={n} cx={226 + n * 16} cy="130" r="5" fill={SKIN} style={{ animation: `tr-dots 900ms ${n * 200}ms infinite` }} />
        ))}
      </g>
    ),
    wheel: (
      <Wheel>
        <g style={{ animation: 'tr-slide-l 500ms ease-out' }}>
          <BarOnWheel />
        </g>
      </Wheel>
    ),
    force: (
      <g>
        <Wheel shake>
          <BarOnWheel />
        </Wheel>
        <path d="M24 92 h26 m-9 -9 l9 9 -9 9 M296 92 h-26 m9 -9 l-9 9 9 9" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ),
    alert: (
      <g>
        <Wheel>
          <BarOnWheel />
          {/* Marcas en el cuero */}
          {[0, 1, 2].map((n) => (
            <path key={n} d={`M${98 + n * 7} ${98 + n * 6} l12 -6`} stroke={AMBER} strokeWidth="3" strokeLinecap="round" />
          ))}
        </Wheel>
        <g style={{ transformBox: 'fill-box', transformOrigin: 'center', animation: 'tr-pop 400ms ease-out' }}>
          <path d="M244 24 L270 70 H218 Z" fill={AMBER} />
          <path d="M244 40 v14 M244 61 v1" stroke="#1A1C1F" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>
    ),
    done: (
      <g opacity="0.55">
        <Wheel>
          <BarOnWheel />
        </Wheel>
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      {s[name] ?? null}
    </svg>
  );
}
