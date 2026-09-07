/**
 * STORE TRUST STRIP — franja de 4 garantías, al pie del hero y ENCIMA del
 * video: la renderiza `StoreHero`, no la página. Por eso el fondo es
 * translúcido y los separadores son blancos al 10% en vez de `ink-800`.
 *
 * Equivalente al "FAST DELIVERY · EASY RETURNS · SECURE SHOPPING · 24/7
 * SUPPORT" de CARMOUNT: cada item es un ícono con dos líneas, la de arriba
 * grande en accent y la de abajo chica en blanco.
 *
 * 2 columnas en mobile, 4 desde `sm`. Los separadores son bordes del grid,
 * no elementos aparte, así no hay líneas colgando en los extremos.
 */
import { STORE_TRUST_STRIP } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

export function StoreTrustStrip() {
  return (
    <div className="relative border-t border-white/10 bg-black/35 backdrop-blur-md">
      <ul className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-4">
        {STORE_TRUST_STRIP.map((item, i) => (
          <li
            key={item.top}
            className={[
              'flex flex-col items-center gap-2 px-3 py-6 text-center sm:flex-row sm:justify-center sm:gap-3.5 sm:py-7 md:py-8',
              // Bordes internos: nunca en la primera columna de cada fila.
              i % 2 === 1 ? 'border-l border-white/10' : '',
              'sm:border-l sm:border-white/10 sm:first:border-l-0',
              // En mobile hay dos filas: la de abajo lleva borde superior.
              i > 1 ? 'border-t border-white/10 sm:border-t-0' : '',
            ].join(' ')}
          >
            <Icon
              name={item.icon}
              className="h-6 w-6 shrink-0 text-accent sm:h-7 sm:w-7"
            />
            <div className="leading-tight sm:text-left">
              <p className="font-display text-sm font-black uppercase italic tracking-wide text-accent sm:text-base">
                {item.top}
              </p>
              <p className="mt-0.5 text-[11px] font-bold uppercase tracking-wider text-ink-300 sm:text-xs">
                {item.bottom}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
