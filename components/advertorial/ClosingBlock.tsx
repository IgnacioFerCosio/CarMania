/**
 * Cierre "Dos mañanas posibles": dos columnas con un dato gigante cada una
 * ("?" contra "3 s"), su texto y una línea de tiempo de tres pasos (apagada
 * y sin llegar a ningún lado, contra una roja que se completa), y la foto
 * tranquila abajo. El botón final es el `BackToPricingCTA` del soporte, que
 * va justo debajo.
 */
import type { AdvertorialData } from '@/lib/landings/types';
import { Icon } from '@/components/ui/Icon';
import { MediaSlot } from './MediaSlot';
import { BG, SECTION_Y, SectionHeading } from './SectionHeading';

type Column = AdvertorialData['closing']['columns'][number];

/** Los tres pasos: círculos unidos por una línea (continua y roja, o punteada y gris). */
function Timeline({ steps, con }: { steps: Column['steps']; con: boolean }) {
  return (
    <ol className="relative mt-6 grid grid-cols-3 gap-2 sm:mt-8">
      {/* línea que une los círculos (del centro del primero al del último) */}
      <span
        aria-hidden="true"
        className={`absolute left-[16.66%] right-[16.66%] top-[18px] border-t-2 ${
          con ? 'border-accent shadow-[0_0_12px_rgba(215,7,7,0.6)]' : 'border-dashed border-ink-700'
        }`}
      />
      {steps.map((label, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={label} className="relative flex flex-col items-center text-center">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-black ${
                con
                  ? 'bg-accent text-white shadow-[0_0_18px_rgba(215,7,7,0.55)]'
                  : 'border-2 border-ink-700 bg-ink-900 text-ink-500'
              }`}
            >
              {con && last ? <Icon name="check" className="h-5 w-5" /> : con ? i + 1 : last ? '?' : i + 1}
            </span>
            <span
              className={`mt-2.5 text-[12px] font-semibold leading-tight sm:text-sm ${
                con ? 'text-white' : 'text-ink-400'
              }`}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function ClosingBlock({ closing }: { closing: AdvertorialData['closing'] }) {
  return (
    <section className={`relative overflow-hidden ${BG.black} ${SECTION_Y}`}>
      {/* El mismo glow rojo del hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6">
        <SectionHeading heading={closing} />

        <div className="mt-8 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-6">
          {closing.columns.map((c) => {
            const con = c.tone === 'with';
            return (
              <div
                key={c.text}
                className={`relative overflow-hidden rounded-2xl border p-5 text-center sm:p-8 ${
                  con
                    ? 'border-accent bg-ink-900 shadow-[0_30px_80px_-20px_rgba(215,7,7,0.45)] ring-2 ring-accent/30'
                    : 'border-ink-800 bg-ink-900/50'
                }`}
              >
                {con && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
                  />
                )}
                <p
                  className={`relative font-display text-7xl font-black italic leading-none sm:text-8xl ${
                    con ? 'text-accent' : 'text-ink-700'
                  }`}
                >
                  {c.big}
                </p>
                <p
                  className={`relative mx-auto mt-4 max-w-sm text-[15px] leading-relaxed sm:text-base ${
                    con ? 'text-white' : 'text-ink-400'
                  }`}
                >
                  {c.text}
                </p>
                <div className="relative">
                  <Timeline steps={c.steps} con={con} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12">
          <MediaSlot slot={closing.media} sizes="(min-width: 1024px) 1024px, 100vw" />
        </div>
      </div>
    </section>
  );
}
