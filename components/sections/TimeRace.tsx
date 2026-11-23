'use client';

/**
 * Carrera de tiempos debajo de la comparativa de /trabavolante: el camino de
 * cada traba, paso a paso, en dos columnas que se encienden a la par. El Titan
 * termina enseguida ("Listo · 3 segundos") y se queda esperando mientras la
 * traba común sigue: se baja, va al baúl, lo arma un buen rato, hace fuerza…
 * Cuando termina, espera un momento y arranca de nuevo (loop), así se queda
 * mirándola el que pasa.
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

/** Duración de un paso "normal" de cada columna, en ms. */
const OURS_STEP = 550;
const OTHER_STEP = 850;
const START = 400;
/** Cuánto queda quieto el final antes de volver a empezar. */
const HOLD = 2600;

/** Momento (ms) en que arranca cada paso y en que termina la columna. */
function schedule(steps: readonly TimeRaceStep[], unit: number) {
  let t = START;
  const at = steps.map((s) => {
    const a = t;
    t += unit * (s.weight ?? 1);
    return a;
  });
  return { at, end: t };
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
    // 10 veces por segundo alcanza: los pasos duran medio segundo o más.
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
      threshold: 0.35,
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
      <div className="mx-auto max-w-3xl">
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

        <div className="mt-8 grid grid-cols-2 items-start gap-2.5 sm:gap-5">
          {/* Titan PRO */}
          <Lane
            name={ours.name}
            steps={ours.steps}
            at={o.at}
            end={o.end}
            now={now}
            ours
            footer={
              <Done show={now >= o.end} ours>
                <span className="block font-display text-base font-black uppercase italic leading-none text-white sm:text-xl">
                  {ours.time}
                </span>
                <span className="mt-1 block text-[11px] text-ink-300 sm:text-xs">{ours.doneLabel}</span>
              </Done>
            }
          />
          {/* Traba común */}
          <Lane
            name={other.name}
            steps={other.steps}
            at={x.at}
            end={x.end}
            now={now}
            footer={
              <Done show={now >= x.end}>
                <span className="block font-display text-sm font-black uppercase italic leading-none text-ink-200 sm:text-lg">
                  {other.doneLabel}
                </span>
              </Done>
            }
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
  at,
  end,
  now,
  ours = false,
  footer,
}: {
  name: string;
  steps: readonly TimeRaceStep[];
  at: number[];
  end: number;
  now: number;
  ours?: boolean;
  footer: React.ReactNode;
}) {
  const running = now < end && now >= START;
  return (
    <div
      className={`rounded-2xl p-3 ring-1 ring-inset sm:rounded-3xl sm:p-5 ${
        ours ? 'bg-ink-950 ring-accent/40' : 'bg-ink-950/70 ring-white/[0.07]'
      }`}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={`font-display text-[13px] font-black uppercase italic leading-tight sm:text-base ${
            ours ? 'text-white' : 'text-ink-300'
          }`}
        >
          {name}
        </span>
        {/* Reloj: gira mientras esa columna sigue */}
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
          {/* animate-spin (no un @keyframes propio: Tailwind poda los que no se usan) */}
          <path
            d="M12 12V7"
            className={running ? 'animate-spin' : ''}
            style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          />
        </svg>
      </div>

      <ol className="relative mt-3 space-y-1.5 sm:mt-4 sm:space-y-2">
        {steps.map((s, n) => {
          const state = now < at[n] ? 'todo' : n < steps.length - 1 && now >= at[n + 1] ? 'done' : now >= end ? 'done' : 'now';
          return <Step key={s.label} step={s} state={state} ours={ours} />;
        })}
      </ol>

      <div className="mt-3 sm:mt-4">{footer}</div>
    </div>
  );
}

function Step({
  step,
  state,
  ours,
}: {
  step: TimeRaceStep;
  state: 'todo' | 'now' | 'done';
  ours: boolean;
}) {
  const on = state !== 'todo';
  const tone = step.bad
    ? 'bg-amber-500/15 text-amber-400'
    : ours
      ? 'bg-accent text-white'
      : 'bg-ink-700 text-ink-100';
  return (
    <li
      className="flex items-center gap-2 transition-opacity duration-300"
      style={{ opacity: on ? 1 : 0.28 }}
    >
      <span
        className={`relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-8 sm:w-8 ${
          on ? tone : 'bg-white/[0.06] text-ink-400'
        }`}
      >
        {state === 'now' && (
          <span
            className={`absolute inset-0 animate-ping rounded-full ${ours ? 'bg-accent/50' : 'bg-white/20'}`}
            aria-hidden="true"
          />
        )}
        <Pictogram name={step.icon} />
      </span>
      <span
        className={`text-[11px] leading-tight sm:text-sm ${
          state === 'now' ? 'font-bold text-white' : step.bad && on ? 'text-amber-300' : 'text-ink-200'
        }`}
      >
        {step.label}
      </span>
    </li>
  );
}

function Done({ show, ours = false, children }: { show: boolean; ours?: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-xl p-2 transition-all duration-500 sm:p-3 ${
        ours ? 'bg-accent/15' : 'bg-white/[0.05]'
      }`}
      style={{ opacity: show ? 1 : 0, transform: show ? 'none' : 'translateY(6px) scale(0.97)' }}
    >
      <span
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
          ours ? 'bg-accent text-white' : 'bg-ink-700 text-ink-200'
        }`}
      >
        <Icon name="check" className="h-4 w-4" />
      </span>
      <div>{children}</div>
    </div>
  );
}

/** Dibujos de línea de cada paso (24×24, trazo). */
function Pictogram({ name }: { name: string }) {
  const d: Record<string, React.ReactNode> = {
    wrap: <path d="M19 12a7 7 0 1 1-2.1-5M19 4v4h-4" />,
    buckle: (
      <>
        <path d="M8 3h8v8a4 4 0 0 1-8 0z" />
        <path d="M10.5 7h3M12 15v6" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    door: (
      <>
        <path d="M3 15l2.5-5.5h10.5L20 15" />
        <path d="M3 15h18v3.5H3z" />
        <path d="M7 18.5V20M17 18.5V20" />
      </>
    ),
    walk: (
      <>
        <circle cx="13" cy="4.5" r="1.7" />
        <path d="M13 7.5l-1.5 5.5 3 3 1 5M11.5 13L9 21M10 9l3-1.5 3 2.5" />
      </>
    ),
    trunk: (
      <>
        <path d="M3 13h18v7H3z" />
        <path d="M5 13l3-8h11" />
      </>
    ),
    bar: (
      <>
        <path d="M5 19L19 5" />
        <path d="M15 5h4v4M5 15v4h4" />
      </>
    ),
    wrench: (
      <path d="M14.5 6a4 4 0 0 0-5 5L4 16.5 7.5 20l5.5-5.5a4 4 0 0 0 5-5l-2.5 2.5-2.5-.5-.5-2.5z" />
    ),
    wheel: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2.2" />
        <path d="M12 14.2V20.5M10 11.2L4 10M14 11.2l6-1.2" />
      </>
    ),
    force: <path d="M3 12h6M6 9l3 3-3 3M21 12h-6M18 9l-3 3 3 3" />,
    alert: (
      <>
        <path d="M12 4l9 16H3z" />
        <path d="M12 10v4M12 17v.5" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      className="relative h-4 w-4 sm:h-[18px] sm:w-[18px]"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {d[name]}
    </svg>
  );
}
