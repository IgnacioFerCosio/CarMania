/**
 * Cards de la grilla de /tienda.
 *
 * Formato tomado de CARMOUNT: foto grande del producto sobre un fondo suave,
 * un tag de spec arriba a la izquierda, un badge destacado arriba a la
 * derecha, y el título debajo de la foto.
 *
 * La card no muestra precio: el precio de entrada depende del pack y se
 * argumenta en la landing. Acá sólo se invita a entrar.
 *
 * `ProductCard` es un link entero a la landing del producto, no un botón de
 * compra: la venta se argumenta en la landing, no acá.
 * `ComingSoonCard` rellena la grilla mientras el catálogo no llegue a 4 — no
 * es link porque todavía no hay a dónde ir.
 *
 * Server Components — no tienen estado ni handlers.
 */
import Image from 'next/image';
import Link from 'next/link';
import type { StoreProduct } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';

/** Píldora chica de tag. Compartida por las dos cards. */
function Tag({
  children,
  tone = 'muted',
}: {
  children: React.ReactNode;
  tone?: 'muted' | 'accent';
}) {
  return (
    <span
      className={
        tone === 'accent'
          ? 'inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[9px] font-black uppercase italic tracking-wider text-white shadow-[0_2px_10px_rgba(215,7,7,0.5)] sm:text-[10px]'
          : 'rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-ink-200 backdrop-blur-sm sm:text-[10px]'
      }
    >
      {children}
    </span>
  );
}

export function ProductCard({ product }: { product: StoreProduct }) {
  return (
    <Link
      href={product.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ink-800 bg-ink-950 transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_22px_44px_-18px_rgba(0,0,0,0.9)]"
    >
      {/* El contenedor cuadrado reserva el espacio antes de que cargue la
          imagen, así la grilla no salta (mismo patrón que HowItWorks). */}
      <div className="relative aspect-square w-full overflow-hidden bg-[radial-gradient(circle_at_50%_38%,#26282C,#0F0F10_72%)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-5 transition duration-500 group-hover:scale-105 sm:p-6"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          {/* El tag de spec es largo y en la card de 2 columnas de mobile se
              parte en tres líneas. Ahí queda sólo el de variante. */}
          <span className="hidden sm:block">
            <Tag>{product.specTag}</Tag>
          </span>
          <Tag tone="accent">
            {product.badgeHot && (
              <Icon name="fire" className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            )}
            {product.badge}
          </Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-ink-800 p-4 sm:p-5">
        <h3 className="font-display text-sm font-black italic uppercase tracking-wide text-white sm:text-base">
          {product.title}
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-400">
          {product.blurb}
        </p>

        <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-accent">
          Ver producto
          <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}

/**
 * Slot vacío de la grilla. Mismo alto y mismos tags que una card real para
 * que la fila no se desarme, pero apagada y sin link.
 */
export function ComingSoonCard({
  specTag,
  badge,
}: {
  specTag: string;
  badge: string;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-dashed border-ink-700 bg-ink-950/60">
      <div className="relative aspect-square w-full overflow-hidden bg-[radial-gradient(circle_at_50%_38%,#1B1C1F,#0C0C0D_72%)]">
        {/* Silueta: el mismo cuadrado de una foto, pero vacío */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-6xl font-black italic text-white/[0.05] sm:text-7xl">
            ?
          </span>
        </div>
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <span className="hidden sm:block">
            <Tag>{specTag}</Tag>
          </span>
          <Tag>{badge}</Tag>
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t border-ink-800 p-4 sm:p-5">
        <h3 className="font-display text-sm font-black italic uppercase tracking-wide text-ink-500 sm:text-base">
          Próximamente
        </h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-600">
          Estamos probando el próximo producto. Si querés enterarte primero,
          escribinos por WhatsApp.
        </p>
      </div>
    </div>
  );
}
