/**
 * PAIN POINT — comparación "antes vs después".
 * Tipografía grande para empatía + dos columnas de bullets contrastadas.
 */
import { HEADLINES, PAIN_POINTS } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function PainPoint() {
  return (
    <section className="bg-ink-950 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
            <Icon name="alert" className="h-4 w-4" />
            El problema
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
            {HEADLINES.pain}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink-300 md:text-lg">
            {HEADLINES.painSub}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-8">
          {/* Antes */}
          <div className="rounded-2xl border border-ink-800 bg-ink-900/40 p-6 md:p-8">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink-800 text-ink-300">
                <Icon name="x" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-bold text-ink-200">Sin CARMANIA</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {PAIN_POINTS.before.map((item) => (
                <li key={item} className="flex gap-3 text-ink-300">
                  <Icon name="x" className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Después */}
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/10 via-ink-900 to-ink-900 p-6 md:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"
            />
            <div className="relative flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-bold text-white">Con CARMANIA</h3>
            </div>
            <ul className="relative mt-5 space-y-4">
              {PAIN_POINTS.after.map((item) => (
                <li key={item} className="flex gap-3 text-ink-100">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
