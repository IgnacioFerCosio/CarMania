/**
 * Comparativa: el mapa del auto (dónde está cada herramienta cuando la
 * necesitás) y una tabla de TRES columnas: llavero, martillo de guantera y
 * apoyacabezas.
 *
 * La tabla es sólo lo que tiene cada ítem: la tarjeta oscura arranca debajo de
 * los productos. Cada producto es una figura recortada, independiente, que se
 * para encima del borde de la tarjeta y lo pisa un poco (`FIG_H` y `OVERLAP`),
 * así sobresale de la tabla en vez de quedar adentro.
 *
 * La columna nuestra va elevada con un panel más claro, borde fino con una
 * línea roja arriba y sombra negra; sin brillos de color. El panel y la
 * tarjeta son capas decorativas dentro de la misma grilla, así que todas las
 * celdas llevan fila y columna explícitas (si no, la grilla las acomoda mal) y
 * las filas siguen siendo una tabla normal para un lector de pantalla (ARIA).
 *
 * Entra en 375 px sin scroll horizontal: 1 columna de nombres + 3 de productos.
 */
import Image from 'next/image';
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { CarMap } from './CarMap';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

type Comparison = AdvertorialData['comparison'];

/** Alto de la fila de figuras, en px. */
const FIG_H = 140;
/** Cuánto pisa cada figura el borde de la tarjeta, en px. */
const OVERLAP = 36;
/** Cuánto sobresale el panel de la columna nuestra por arriba y por abajo, en px. */
const LIFT = 14;

/** ✓ / ✗ / texto suelto. `ours` pinta el tilde de la columna nuestra. */
function Valor({ v, ours }: { v: boolean | string; ours: boolean }) {
  if (v === true)
    return (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full sm:h-8 sm:w-8 ${
          ours ? 'bg-accent text-white ring-1 ring-inset ring-white/25' : 'bg-ink-700 text-ink-300'
        }`}
      >
        <Icon name="check" className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink-800 text-ink-500 sm:h-8 sm:w-8">
        <Icon name="x" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className="px-0.5 text-center text-[11px] italic leading-tight text-ink-400 sm:text-xs">{v}</span>;
}

export function ComparisonTable({
  comparison,
  bg = 'black',
}: {
  comparison: Comparison;
  bg?: Bg;
}) {
  const { columns, rows } = comparison;
  // fila 1: figuras · fila 2: nombres · filas 3…: ítems
  const lastRow = rows.length + 2;
  const cardTop = FIG_H - OVERLAP;

  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading heading={comparison} />

        <div className="mt-10 grid items-center gap-12 sm:mt-14 lg:grid-cols-2 lg:gap-14">
          <CarMap map={comparison.map} />

          <div className="mx-auto w-full max-w-xl">
            <div
              role="table"
              aria-label={columns.map((c) => c.name).join(', ')}
              className="relative grid"
              style={{
                gridTemplateColumns: 'minmax(0,1.5fr) repeat(3, minmax(0,1fr))',
                gridTemplateRows: `${FIG_H}px repeat(${lastRow - 1}, auto)`,
              }}
            >
              {/* Tarjeta de la tabla: arranca debajo de las figuras */}
              <div
                aria-hidden="true"
                className="rounded-3xl bg-ink-900 ring-1 ring-inset ring-white/[0.07]"
                style={{ gridColumn: '1 / -1', gridRow: `1 / ${lastRow + 1}`, marginTop: cardTop }}
              />

              {/* Panel elevado de la columna nuestra */}
              <div
                aria-hidden="true"
                className="rounded-2xl border border-t-2 border-white/15 border-t-accent bg-gradient-to-b from-white/[0.11] to-white/[0.04] shadow-[0_26px_40px_-20px_rgba(0,0,0,0.95)]"
                style={{
                  gridColumn: 2,
                  gridRow: `1 / ${lastRow + 1}`,
                  marginTop: cardTop - LIFT,
                  marginBottom: -LIFT,
                }}
              />

              {/* Figuras: independientes, pisan el borde de la tarjeta */}
              {columns.map((c, i) => (
                <div
                  key={c.name}
                  role="presentation"
                  className="relative z-20 flex items-end justify-center px-1"
                  style={{ gridColumn: i + 2, gridRow: 1 }}
                >
                  <Image
                    src={c.image}
                    alt=""
                    width={c.width}
                    height={c.height}
                    sizes="120px"
                    className="max-h-full w-auto max-w-[138%] object-contain drop-shadow-[0_12px_10px_rgba(0,0,0,0.55)]"
                  />
                </div>
              ))}

              {/* Encabezados */}
              <div role="row" className="contents">
                <div role="columnheader" style={{ gridColumn: 1, gridRow: 2 }} className="relative z-10">
                  <span className="sr-only">Característica</span>
                </div>
                {columns.map((c, i) => (
                  <div
                    key={c.name}
                    role="columnheader"
                    className={`relative z-10 flex items-start justify-center px-1 pb-3 pt-3 text-center font-display text-[10px] font-black italic uppercase leading-tight tracking-wide sm:text-xs ${
                      i === 0 ? 'text-white' : 'text-ink-400'
                    }`}
                    style={{ gridColumn: i + 2, gridRow: 2 }}
                  >
                    {c.name}
                  </div>
                ))}
              </div>

              {/* Filas */}
              {rows.map((r, n) => (
                <div key={r.label} role="row" className="contents">
                  <div
                    role="rowheader"
                    className="relative z-10 flex items-center border-t border-white/[0.07] py-3.5 pl-3 pr-1 text-[12.5px] font-medium leading-snug text-ink-100 sm:pl-5 sm:text-[15px]"
                    style={{ gridColumn: 1, gridRow: n + 3 }}
                  >
                    {r.label}
                  </div>
                  {r.values.map((v, i) => (
                    <div
                      key={i}
                      role="cell"
                      className={`relative z-10 flex items-center justify-center border-t py-3.5 ${
                        i === 0 ? 'border-white/10' : 'border-white/[0.07]'
                      }`}
                      style={{ gridColumn: i + 2, gridRow: n + 3 }}
                    >
                      <Valor v={v} ours={i === 0} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
