/**
 * STORE STATS — banda de 3 números, debajo de las reseñas.
 *
 * Equivalente al "500000+ HAPPY CUSTOMERS / 1000000+ PCS SOLD / 50+ COUNTRIES"
 * de CARMOUNT.
 *
 * Los valores que todavía no tienen fuente vienen como '—' en config y se
 * renderizan como un slot apagado con borde punteado, para que se note que
 * falta el dato en vez de inventar una cifra. Ver el aviso sobre
 * `STORE_STATS` en lib/config.ts.
 */
import { STORE_STATS } from '@/lib/config';

const PENDING = '—';

export function StoreStats() {
  return (
    <section className="border-y border-ink-800 bg-ink-950 py-12 sm:py-16 md:py-20">
      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 sm:gap-6 md:px-6">
        {STORE_STATS.map((s) => {
          const pending = s.value === PENDING;
          // Widening explícito: sin esto, `!pending` narrowea el union de
          // STORE_STATS (todos literales por el `as const`) y TS pierde de
          // vista `suffix`.
          const suffix: string = s.suffix;
          return (
            <li
              key={s.label}
              className={
                pending
                  ? 'rounded-2xl border border-dashed border-ink-700 px-4 py-6 text-center'
                  : 'px-4 py-6 text-center'
              }
            >
              <p
                className={
                  pending
                    ? 'font-display text-3xl font-black italic leading-none text-ink-700 sm:text-4xl md:text-5xl'
                    : 'font-display text-3xl font-black italic leading-none text-white sm:text-4xl md:text-6xl'
                }
              >
                {s.value}
                {!pending && suffix && (
                  <span className="text-accent">{suffix}</span>
                )}
              </p>
              <p
                className={
                  pending
                    ? 'mt-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-600 sm:text-xs'
                    : 'mt-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink-300 sm:text-xs'
                }
              >
                {s.label}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
