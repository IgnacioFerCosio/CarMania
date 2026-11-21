/**
 * Set chico de íconos inline (SVG).
 * Mantenemos esto en código en vez de cargar lucide/heroicons enteros para
 * mantener el bundle bajo y la primera carga rápida.
 *
 * Para agregar un ícono nuevo: pegá el path acá y referencialo por nombre.
 */
import type { SVGProps } from 'react';

export type IconName =
  | 'shield'
  | 'vacuum'
  | 'leaf'
  | 'rotate'
  | 'sparkles'
  | 'bolt'
  | 'mp'
  | 'truck'
  | 'rotate-left'
  | 'check'
  | 'x'
  | 'star'
  | 'star-half'
  | 'chevron-down'
  | 'menu'
  | 'store'
  | 'whatsapp'
  | 'instagram'
  | 'mail'
  | 'cart'
  | 'lock'
  | 'fire'
  | 'arrow-right'
  | 'plus'
  | 'trash'
  | 'alert'
  | 'camera'
  | 'video'
  | 'play';

type Props = { name: IconName } & SVGProps<SVGSVGElement>;

const PATHS: Record<IconName, JSX.Element> = {
  shield: (
    <path
      d="M12 2 4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  vacuum: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <circle cx="12" cy="12" r="6" />
      <path d="M12 6v12M6 12h12" />
    </g>
  ),
  leaf: (
    <path
      d="M5 19c0-9 6-14 14-14 0 9-5 14-14 14Zm0 0 8-8"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  rotate: (
    <path
      d="M21 12a9 9 0 1 1-3-6.7M21 4v4h-4"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  sparkles: (
    <path
      d="m12 3 2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5Zm7 11 1 2.5 2.5 1-2.5 1L19 21l-1-2.5L15.5 17.5l2.5-1L19 14Z"
      stroke="currentColor"
      strokeWidth="1.4"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  bolt: (
    <path
      d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  mp: (
    <path
      d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm-1 11.5L7.5 12l1-1 2.5 2.5 4.5-4.5 1 1-5.5 5.5Z"
      fill="currentColor"
    />
  ),
  truck: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="17" cy="18" r="1.7" />
    </g>
  ),
  'rotate-left': (
    <path
      d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: (
    <path
      d="m4 12 5 5L20 6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  x: (
    <path
      d="M6 6l12 12M18 6 6 18"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
    />
  ),
  star: (
    <path
      d="m12 2 3 7 7 .6-5.3 4.7 1.7 7L12 17l-6.4 4.3 1.7-7L2 9.6 9 9l3-7Z"
      fill="currentColor"
    />
  ),
  'star-half': (
    <g>
      <defs>
        <linearGradient id="half" x1="0" x2="1" y1="0" y2="0">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <path
        d="m12 2 3 7 7 .6-5.3 4.7 1.7 7L12 17l-6.4 4.3 1.7-7L2 9.6 9 9l3-7Z"
        fill="url(#half)"
      />
    </g>
  ),
  'chevron-down': (
    <path
      d="m6 9 6 6 6-6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  whatsapp: (
    <path
      // Glifo oficial de WhatsApp (Simple Icons, CC0).
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
      fill="currentColor"
    />
  ),
  menu: (
    <g stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </g>
  ),
  store: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 9h16v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" />
      <path d="M3 9l1.6-4.4A1 1 0 0 1 5.5 4h13a1 1 0 0 1 .9.6L21 9" />
      <path d="M9.5 20v-5h5v5" />
    </g>
  ),
  instagram: (
    <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </g>
  ),
  mail: (
    <g stroke="currentColor" strokeWidth="1.7" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.5 8 6 8-6" />
    </g>
  ),
  cart: (
    <g stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 4h2l2.5 12.5a2 2 0 0 0 2 1.5h7a2 2 0 0 0 2-1.5L21 8H6" />
      <circle cx="9" cy="21" r="1" fill="currentColor" />
      <circle cx="18" cy="21" r="1" fill="currentColor" />
    </g>
  ),
  lock: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </g>
  ),
  fire: (
    <path
      d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3-1-3 0-6 1-9Z"
      stroke="currentColor"
      strokeWidth="1.6"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  'arrow-right': (
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  plus: (
    <path
      d="M12 5v14M5 12h14"
      stroke="currentColor"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
  ),
  trash: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7h16M10 11v6M14 11v6" />
      <path d="M6 7l1 13h10l1-13M9 7V4h6v3" />
    </g>
  ),
  alert: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 10v5M12 18h.01" />
    </g>
  ),
  camera: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round">
      <path d="M3 8h4l2-3h6l2 3h4v11H3V8Z" />
      <circle cx="12" cy="13" r="3.5" />
    </g>
  ),
  video: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round">
      <rect x="3" y="6" width="13" height="12" rx="2" />
      <path d="m16 10 5-3v10l-5-3" />
    </g>
  ),
  play: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l5.5-3.5L10 8.5Z" />
    </g>
  ),
};

export function Icon({ name, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={24}
      height={24}
      aria-hidden="true"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
