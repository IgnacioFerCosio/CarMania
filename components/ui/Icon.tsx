/**
 * Set chico de íconos inline (SVG).
 * Mantenemos esto en código en vez de cargar lucide/heroicons enteros para
 * mantener el bundle bajo y la primera carga rápida.
 *
 * Para agregar un ícono nuevo: pegá el path acá y referencialo por nombre.
 */
import type { SVGProps } from 'react';

type IconName =
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
  | 'whatsapp'
  | 'cart'
  | 'lock'
  | 'fire'
  | 'arrow-right'
  | 'alert';

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
      d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2Zm5.4 14.4c-.2.6-1.2 1.2-1.7 1.3-.4.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.4-3.7-4.5-3.9-.1-.2-1.1-1.4-1.1-2.7s.7-1.9 1-2.2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4l.8 2c.1.2 0 .4 0 .5l-.4.5-.3.4c-.1.1-.2.3 0 .5.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1l2 .9c.2.1.4.2.5.3 0 .2 0 .9-.2 1.6Z"
      fill="currentColor"
    />
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
  alert: (
    <g stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 2 21h20L12 3Z" />
      <path d="M12 10v5M12 18h.01" />
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
