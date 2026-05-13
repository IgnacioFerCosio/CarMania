/**
 * BENEFITS GRID — 6 cards (3x2 desktop / 1 col mobile).
 * Las 2 primeras (con flag highlight=true) tienen acento rojo y borde
 * destacado para atraer la mirada antes que las otras.
 */
import { BENEFITS } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function Benefits() {
  return (
    <section id="benefits" className="bg-ink-950 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-accent">
            Por qué CARMANIA
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-white md:text-5xl">
            Pensado para autos argentinos
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-300">
            Probado en pozos, ripio, autopista y calor. Cada detalle está calibrado para que
            no te falle nunca.
          </p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b) => (
            <li
              key={b.title}
              className={`group relative overflow-hidden rounded-2xl border p-6 transition md:p-7 ${
                b.highlight
                  ? 'border-accent/40 bg-gradient-to-br from-accent/10 via-ink-900 to-ink-900 hover:border-accent/60'
                  : 'border-ink-800 bg-ink-900/60 hover:border-ink-700'
              }`}
            >
              {b.highlight && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/20 blur-2xl"
                />
              )}
              <div className="relative">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                    b.highlight
                      ? 'bg-accent text-white shadow-[0_8px_18px_rgba(215,7,7,0.35)]'
                      : 'bg-ink-800 text-accent'
                  }`}
                >
                  <Icon name={b.icon as any} className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{b.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
