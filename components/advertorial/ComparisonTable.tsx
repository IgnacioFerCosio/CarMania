/**
 * Comparativa ✓/✗ sin puntajes. En desktop es una tabla; en el celular cada
 * fila pasa a ser una card con las tres opciones apiladas, para que no haya
 * scroll horizontal. Cards y bordes como TrustBlock / FAQ.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading, type Bg } from './SectionHeading';

function Valor({ v }: { v: boolean | string }) {
  if (v === true)
    return (
      <span className="inline-flex items-center text-accent">
        <Icon name="check" className="h-5 w-5" />
        <span className="sr-only">Sí</span>
      </span>
    );
  if (v === false)
    return (
      <span className="inline-flex items-center text-ink-500">
        <Icon name="x" className="h-5 w-5" />
        <span className="sr-only">No</span>
      </span>
    );
  return <span className="text-xs text-ink-400 sm:text-sm">{v}</span>;
}

export function ComparisonTable({
  comparison,
  bg = 'gray',
}: {
  comparison: AdvertorialData['comparison'];
  bg?: Bg;
}) {
  const { columns, rows, media } = comparison;

  return (
    <section className={`${BG[bg]} ${SECTION_Y}`}>
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionHeading heading={comparison} />

        <div className="mt-8 sm:mt-12">
          <MediaSlot slot={media} sizes="(min-width: 896px) 896px, 100vw" />
        </div>

        {/* Desktop / tablet */}
        <div className="mt-8 hidden overflow-hidden rounded-2xl border border-ink-800 bg-ink-900/50 sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-ink-800">
                <th className="px-5 py-4">
                  <span className="sr-only">Característica</span>
                </th>
                {columns.map((c, i) => (
                  <th
                    key={c}
                    scope="col"
                    className={`px-3 py-4 text-center font-display text-xs font-black uppercase italic tracking-wider ${
                      i === 0 ? 'bg-accent text-white' : 'text-ink-300'
                    }`}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="px-5 py-4 text-[15px] font-semibold text-white">
                    {r.label}
                  </th>
                  {r.values.map((v, i) => (
                    <td key={i} className={`px-3 py-4 text-center ${i === 0 ? 'bg-accent/10' : ''}`}>
                      <Valor v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Celular: una card por fila */}
        <ul className="mt-8 space-y-3 sm:hidden">
          {rows.map((r) => (
            <li key={r.label} className="rounded-2xl border border-ink-800 bg-ink-900/50 p-4">
              <p className="font-display text-sm font-black uppercase italic tracking-wide text-white">
                {r.label}
              </p>
              <dl className="mt-3 space-y-2">
                {columns.map((c, i) => (
                  <div key={c} className="flex items-center justify-between gap-3">
                    <dt className={`text-sm ${i === 0 ? 'font-bold text-accent' : 'text-ink-300'}`}>
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
