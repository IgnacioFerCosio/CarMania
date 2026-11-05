/**
 * Comparativa: el mapa del auto (dónde está cada herramienta cuando la
 * necesitás) y una tabla compacta de DOS columnas, llavero vs. martillo de
 * guantera, con el botón de compra abajo.
 *
 * La tabla entra en 375 px sin scroll horizontal: una sola grilla de 3
 * columnas (nombre de la fila + las dos opciones). La columna nuestra va
 * "elevada": un panel con degradado rojo, borde, brillo superior y sombra
 * que sobresale por arriba y por abajo, con una chapita encima. Es una capa
 * decorativa dentro de la misma grilla, así las filas siguen siendo una
 * tabla normal para quien lee con un lector de pantalla (roles ARIA).
 * Todas las celdas llevan fila y columna explícitas: sin eso, el panel
 * (que ocupa la columna 2) hace que la grilla acomode mal al resto.
 *
 * Incluye a propósito una fila donde el martillo gana (el precio): una
 * comparación donde ganás en todo parece armada.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { CarMap } from './CarMap';
import { CtaLink } from './CtaLink';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

type Comparison = AdvertorialData['comparison'];

/** El llavero: cápsula roja con su correa. */
function KeyToolIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <defs>
        <linearGradient id="cmp-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F03939" />
          <stop offset="1" stopColor="#B00606" />
        </linearGradient>
      </defs>
      <g transform="rotate(-35 24 24)">
        <rect x="6" y="17" width="32" height="14" rx="7" fill="url(#cmp-red)" />
        <rect x="27" y="17" width="3" height="14" fill="#000" fillOpacity="0.25" />
        <rect x="9" y="20" width="12" height="3" rx="1.5" fill="#fff" fillOpacity="0.35" />
      </g>
      <circle cx="12" cy="37" r="5.5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  );
}

/** El martillo de emergencia de la guantera: mango gris y cabeza. */
function HammerIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden="true">
      <g transform="rotate(35 24 24)">
        <rect x="21" y="14" width="6" height="30" rx="2.5" fill="#6B6D74" />
        <rect x="11" y="6" width="26" height="11" rx="3" fill="#9A9CA3" />
        <rect x="11" y="6" width="26" height="3" rx="1.5" fill="#fff" fillOpacity="0.3" />
      </g>
    </svg>
  );
}

/** ✓ / ✗ / texto suelto. `ours` pinta el tilde de la columna nuestra. */
function Valor({ v, ours }: { v: boolean | string; ours: boolean }) {
  if (v === true)
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
          ours
            ? 'bg-accent text-white shadow-[0_4px_14px_rgba(215,7,7,0.55)] ring-1 ring-inset ring-white/30'
            : 'bg-ink-700 text-ink-300'
        }`}
      >
        <Icon name="check" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-800/80 text-ink-500 sm:h-8 sm:w-8">
        <Icon name="x" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className="text-xs italic text-ink-400 sm:text-sm">{v}</span>;
}

export function ComparisonTable({
  comparison,
  cta,
  bg = 'black',
}: {
  comparison: Comparison;
  cta: AdvertorialData['cta'];
  bg?: Bg;
}) {
  const { columns, rows } = comparison;
  const lastRow = rows.length + 1;

  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading heading={comparison} />

        <div className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-14">
          <CarMap map={comparison.map} />

          {/* Tabla: 3 columnas, filas = nombre + llavero + martillo */}
          <div className="mx-auto w-full max-w-xl">
            <div
              role="table"
              aria-label={`${columns[0]} contra ${columns[1]}`}
              className="relative grid rounded-3xl bg-ink-900/70 px-3 py-6 ring-1 ring-inset ring-white/5 sm:px-5"
              style={{
                gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr) minmax(0,1fr)',
                gridTemplateRows: `repeat(${lastRow}, auto)`,
              }}
            >
              {/* Panel elevado de la columna nuestra (decorativo) */}
              <div
                aria-hidden="true"
                className="pointer-events-none -my-3 rounded-2xl border border-accent/70 bg-gradient-to-b from-accent/35 via-accent/[0.12] to-accent/[0.05] shadow-[0_30px_70px_-18px_rgba(215,7,7,0.6),inset_0_1px_0_rgba(255,255,255,0.18)]"
                style={{ gridColumn: 2, gridRow: `1 / ${lastRow + 1}` }}
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-3 py-1 font-display text-[10px] font-black italic uppercase tracking-wider text-white shadow-lg ring-1 ring-white/30">
                  Carmania
                </span>
              </div>

              {/* Encabezados */}
              <div role="row" className="contents">
                <div role="columnheader" className="relative z-10 py-3" style={{ gridColumn: 1, gridRow: 1 }}>
                  <span className="sr-only">Característica</span>
                </div>
                <div
                  role="columnheader"
                  className="relative z-10 flex flex-col items-center gap-1.5 px-1 pb-3 pt-4 text-center"
                  style={{ gridColumn: 2, gridRow: 1 }}
                >
                  <KeyToolIcon />
                  <span className="font-display text-[11px] font-black italic uppercase leading-tight tracking-wide text-white sm:text-xs">
                    {columns[0]}
                  </span>
                </div>
                <div
                  role="columnheader"
                  className="relative z-10 flex flex-col items-center gap-1.5 px-1 pb-3 pt-4 text-center"
                  style={{ gridColumn: 3, gridRow: 1 }}
                >
                  <HammerIcon />
                  <span className="font-display text-[11px] font-black italic uppercase leading-tight tracking-wide text-ink-400 sm:text-xs">
                    {columns[1]}
                  </span>
                </div>
              </div>

              {/* Filas */}
              {rows.map((r, i) => (
                <div key={r.label} role="row" className="contents">
                  <div
                    role="rowheader"
                    className="relative z-10 flex items-center border-t border-white/[0.06] py-3.5 pr-2 text-[13px] font-medium leading-snug text-ink-100 sm:text-[15px]"
                    style={{ gridColumn: 1, gridRow: i + 2 }}
                  >
                    {r.label}
                  </div>
                  <div
                    role="cell"
                    className="relative z-10 flex items-center justify-center border-t border-white/10 py-3.5"
                    style={{ gridColumn: 2, gridRow: i + 2 }}
                  >
                    <Valor v={r.values[0]} ours />
                  </div>
                  <div
                    role="cell"
                    className="relative z-10 flex items-center justify-center border-t border-white/[0.06] py-3.5"
                    style={{ gridColumn: 3, gridRow: i + 2 }}
                  >
                    <Valor v={r.values[1]} ours={false} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <CtaLink label={cta.label} href={cta.href} className="w-full sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
