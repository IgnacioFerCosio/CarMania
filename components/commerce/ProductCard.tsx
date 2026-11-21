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
 * compra: la venta se argumenta en la landing, no acá. Si le llega un
 * producto sin publicar, la card se ve completa pero no es link (linkear a un
 * 404 es peor que no linkear). Hoy no pasa: `ProductGrid` no los muestra en
 * producción, y en dev todo cuenta como publicado.
 *
 * Server Components — no tienen estado ni handlers.
 */
import Image from 'next/image';
import Link from 'next/link';
import { CYBER, isPublished, type StoreProduct } from '@/lib/config';
import { Icon } from '@/components/ui/Icon';
import { CyberLogo } from '@/components/ui/CyberLogo';

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
          ? 'inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-accent px-2 py-1 sm:px-2.5 text-[9px] font-black uppercase italic tracking-wider text-white shadow-[0_2px_10px_rgba(215,7,7,0.5)] sm:text-[10px]'
          : 'whitespace-nowrap rounded-full border border-white/15 bg-black/50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-ink-200 backdrop-blur-sm sm:text-[10px]'
      }
    >
      {children}
    </span>
  );
}

export function ProductCard({
  product,
  cyberPct,
}: {
  product: StoreProduct;
  /** Descuento "Cyber −X%" del pack de entrada (ver /tienda). Sólo en el Cyber. */
  cyberPct?: number;
}) {
  const published = isPublished(product);
  const cyber = CYBER.enabled && published;
  const className = `group flex flex-col overflow-hidden rounded-2xl border bg-ink-950 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_44px_-18px_rgba(0,0,0,0.9)] ${
    // Con el evento armado, los colores del evento se aplican sólo en sus
    // fechas (variante `event:`, ver EventSwitch).
    cyber
      ? 'border-ink-800 hover:border-accent/60 event:border-cyber-500/50 event:hover:border-cyber-400'
      : 'border-ink-800 hover:border-accent/60'
  }`;

  const inner = (
    <>
      {/* El contenedor cuadrado reserva el espacio antes de que cargue la
          imagen, así la grilla no salta (mismo patrón que HowItWorks). */}
      {/* `m-2 mb-0` + radio propio: la foto queda despegada del borde de la
          card, así el redondeo se ve en las cuatro esquinas y no sólo en las
          de arriba, que son las que ya daba el `rounded-2xl` de la card.
          La foto va con `object-cover` y sin padding: llena la caja entera y
          el `overflow-hidden` la recorta contra el radio, así lo redondeado
          es la imagen y no un contenedor con la foto flotando adentro.
          El degradado quedó de fallback mientras carga. */}
      <div className="relative m-2 mb-0 aspect-square overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_38%,#31343A,#191B1F_78%)]">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover"
        />

        {/* p-2 y no p-3: el inset de la foto dejó los tags 4px cortos y
            partían en dos líneas. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-2">
          {/* Arriba a la izquierda: el chip del Cyber (el tag de spec bajó al
              texto, debajo del título). Sin Cyber queda el hueco, y el badge
              se mantiene a la derecha. */}
          {cyber && cyberPct ? (
            <span className="hidden items-center whitespace-nowrap event:inline-flex rounded-full bg-gradient-to-r from-cyber-700 to-cyber-500 px-2.5 py-1 font-display text-[9px] font-black italic uppercase tracking-wider text-cyber-on shadow-[0_0_14px_rgb(var(--cyber-glow)/0.5)] sm:text-[10px]">
              {/* En mobile la card es angosta: el nombre del evento ya lo dice
                  el logo de la foto, el chip queda en el descuento. */}
              <span className="hidden sm:inline">{CYBER.shortName}&nbsp;</span>−{cyberPct}%
            </span>
          ) : null}
          {/* Hueco a la izquierda para que el badge quede a la derecha. */}
          <span className={cyber && cyberPct ? 'event:hidden' : undefined} />
          {/* "Próximamente" pisa al badge de config: es el dato que importa
              mientras no se pueda abrir. */}
          <Tag tone="accent">
            {published && product.badgeHot && (
              // El fuego sólo desde sm: en mobile no entra junto al chip del evento.
              <Icon name="fire" className="hidden h-3 w-3 sm:block" />
            )}
            {published ? product.badge : 'Próximamente'}
          </Tag>
        </div>

        {/* Cyber: el logo del evento en la esquina de la foto (se esconde solo
            pasada la extensión). */}
        {cyber && (
          <div className="pointer-events-none absolute bottom-1.5 right-1.5 rotate-6">
            <CyberLogo className="h-12 sm:h-14" />
          </div>
        )}
      </div>

      {/* Sin descripción: la card sólo invita a entrar (título + chip + link);
          el `blurb` de config queda para otros usos. El `mt-auto` de abajo
          alinea los links si los títulos ocupan distinta cantidad de líneas. */}
      <div className="flex flex-1 flex-col border-t border-ink-800 p-3 sm:p-5">
        <h3 className="font-display text-sm font-black italic uppercase tracking-wide text-white sm:text-base">
          {product.title}
        </h3>
        <p className="mt-1.5 text-[10px] font-bold uppercase leading-snug tracking-wider text-ink-400 sm:text-[11px]">
          {product.specTag}
        </p>

        {published ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-accent">
            Ver producto
            <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
              →
            </span>
          </span>
        ) : (
          <span className="mt-auto pt-3 text-[11px] font-bold uppercase tracking-wider text-ink-500">
            Muy pronto en la tienda
          </span>
        )}
      </div>
    </>
  );

  return published ? (
    <Link href={product.href} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  );
}
