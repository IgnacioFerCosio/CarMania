"use client";

/**
 * Carrera de tiempos debajo de la comparativa de /trabavolante: dos barras
 * que se llenan cuando la sección entra en pantalla. La nuestra se completa
 * enseguida ("3 segundos"); la de la traba común avanza lenta, paso a paso,
 * y termina sin tiempo (no lo medimos, así que no lo inventamos).
 *
 * Va como sección propia, con el fondo de la comparativa (`bg="ink"`) y
 * subida sobre su padding de abajo, para que se lea como parte de la tabla
 * sin tocar ComparisonTable (que comparten el llavero y el Tornado).
 *
 * Arranca una sola vez, al verse a la mitad. Con "reducir movimiento" se
 * muestra directo el final. Sin JS (o antes de hidratar) también se ve el
 * final: el estado inicial vacío lo pone el efecto, no el HTML.
 */
import { useEffect, useRef, useState } from "react";
import type { TimeRace as TimeRaceData } from "@/lib/landings/types";
import { Icon } from "@/components/ui/Icon";

/** Cuánto tarda cada barra, en ms. La nuestra, rápido; la otra, a paso de bastón. */
const OURS_MS = 1200;
const OTHER_MS = 6000;

type Phase = "static" | "idle" | "run";

export function TimeRace({ data }: { data: TimeRaceData }) {
  const ref = useRef<HTMLDivElement>(null);
  // 'static' = final sin animar (HTML del server y reducir movimiento)
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    if (!("IntersectionObserver" in window)) return;
    setPhase("idle");
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setPhase("run");
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const full = phase !== "idle";
  const animate = phase === "run";
  const { ours, other } = data;
  const i = data.title.indexOf(data.accent);

  return (
    <section className="-mt-4 bg-ink-900 px-4 pb-14 sm:-mt-6 sm:pb-20 md:-mt-10 md:px-6 md:pb-28">
      <div ref={ref} className="mx-auto max-w-xl">
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

        <div className="mt-8 space-y-7 rounded-3xl bg-ink-950 p-5 ring-1 ring-inset ring-white/[0.07] sm:p-7">
          <Row
            name={ours.name}
            right={
              <span
                className="inline-flex items-center gap-1.5 font-display text-sm font-black uppercase italic text-white transition-opacity duration-300 sm:text-base"
                style={{
                  opacity: full ? 1 : 0,
                  transitionDelay: animate ? `${OURS_MS}ms` : "0ms",
                }}
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {ours.time}
              </span>
            }
            fill="bg-accent"
            ms={OURS_MS}
            full={full}
            animate={animate}
            steps={ours.steps}
            ours
          />
          <Row
            name={other.name}
            right={
              <span
                className="text-xs italic text-ink-400 transition-opacity duration-500 sm:text-sm"
                style={{
                  opacity: full ? 1 : 0,
                  transitionDelay: animate ? `${OTHER_MS}ms` : "0ms",
                }}
              >
                {other.endLabel}
              </span>
            }
            fill="bg-ink-500"
            ms={OTHER_MS}
            full={full}
            animate={animate}
            steps={other.steps}
          />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-ink-300 sm:text-base">
          {data.note}
        </p>
      </div>
    </section>
  );
}

function Row({
  name,
  right,
  fill,
  ms,
  full,
  animate,
  steps,
  ours = false,
}: {
  name: string;
  right: React.ReactNode;
  fill: string;
  ms: number;
  full: boolean;
  animate: boolean;
  steps: readonly string[];
  ours?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={`font-display text-sm font-black uppercase italic sm:text-base ${
            ours ? "text-white" : "text-ink-300"
          }`}
        >
          {name}
        </span>
        {right}
      </div>

      {/* Barra */}
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className={`h-full rounded-full ${fill}`}
          style={{
            width: full ? "100%" : "0%",
            transition: animate
              ? `width ${ms}ms ${ours ? "cubic-bezier(.2,.8,.2,1)" : "linear"}`
              : "none",
          }}
        />
      </div>

      {/* Pasos: aparecen a medida que avanza la barra */}
      <ol className="mt-3 flex flex-wrap gap-1.5">
        {steps.map((s, n) => (
          <li
            key={s}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold sm:text-xs ${
              ours ? "bg-accent/15 text-white" : "bg-white/[0.06] text-ink-300"
            }`}
            style={{
              opacity: full ? 1 : 0,
              transform: full ? "none" : "translateY(4px)",
              transition: animate ? "opacity 300ms, transform 300ms" : "none",
              transitionDelay: animate
                ? `${Math.round(((n + 0.6) / steps.length) * ms)}ms`
                : "0ms",
            }}
          >
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
