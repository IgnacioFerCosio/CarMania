/**
 * Comparativa ✓/✗ sin puntajes. En desktop es una tabla; en el celular cada
 * fila pasa a ser una card con las tres opciones apiladas, para que no haya
 * scroll horizontal.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';

function Valor({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex items-center text-[#16A34A]">
        <Icon name="check" className="h-5 w-5" />
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center text-ink-400">
        <Icon name="x" className="h-5 w-5" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className="text-sm text-ink-600">{v}</span>;
}

export function ComparisonTable({ comparison }: { comparison: AdvertorialData['comparison'] }) {
  const { title, columns, rows, media } = comparison;

  return (
    <section className="bg-white py-12 text-ink-900 sm:py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-ink-950 sm:text-3xl md:text-4xl">
          {title}
        </h2>

        <div className="mt-8">
          <MediaSlot slot={media} tone="light" sizes="(min-width: 768px) 768px, 100vw" />
        </div>

        {/* Desktop / tablet */}
        <table className="mt-8 hidden w-full border-collapse text-left sm:table">
          <thead>
            <tr className="border-b-2 border-ink-200">
              <th className="py-3 pr-4">
                <span className="sr-only">Característica</span>
              </th>
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`px-3 py-3 text-center text-sm font-bold ${
                    i === 0 ? 'rounded-t-xl bg-ink-950 text-white' : 'text-ink-700'
                  }`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-b border-ink-100">
                <th scope="row" className="py-3.5 pr-4 text-[15px] font-medium text-ink-800">
                  {r.label}
                </th>
                {r.values.map((v, i) => (
                  <td key={i} className={`px-3 py-3.5 text-center ${i === 0 ? 'bg-ink-50' : ''}`}>
                    <Valor v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Celular: una card por fila */}
        <ul className="mt-8 space-y-3 sm:hidden">
          {rows.map((r) => (
            <li key={r.label} className="rounded-xl border border-ink-200 p-4">
              <p className="font-semibold text-ink-950">{r.label}</p>
              <dl className="mt-2.5 space-y-1.5">
                {columns.map((c, i) => (
                  <div key={c} className="flex items-center justify-between gap-3">
                    <dt className={`text-sm ${i === 0 ? 'font-bold text-ink-950' : 'text-ink-600'}`}>
                      {c}
                    </dt>
                    <dd>
                      <Valor v={r.values[i]} />
                    </dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
