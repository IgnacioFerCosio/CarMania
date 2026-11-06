/**
 * Íconos de lo que trae cada pack de /rompevidrios, dibujados con la forma
 * real de cada pieza (los de la foto "todo lo que trae"):
 *  - `keychain`: el llavero, cilindro rojo con tapa moleteada y correa negra.
 *  - `glass`: el vidrio de prueba, un disco transparente.
 *  - `mount`: el soporte adhesivo, base redonda negra con la cuna en U.
 *
 * Son SVG planos de 32×32, sin imágenes. Los grises de la correa y la base
 * son claros a propósito: el negro real se perdería sobre el fondo oscuro.
 */
export type ProductGlyphName = 'keychain' | 'glass' | 'mount';

const RED = '#D70707';

function Keychain() {
  return (
    <g transform="rotate(32 16 16)">
      {/* correa */}
      <ellipse cx="16" cy="28" rx="2.6" ry="3.2" fill="none" stroke="#71717a" strokeWidth="1.8" />
      {/* cuerpo */}
      <rect x="10.5" y="2" width="11" height="25" rx="3" fill={RED} />
      <rect x="12" y="3" width="2.2" height="23" rx="1.1" fill="#fff" opacity="0.28" />
      {/* tapa moleteada */}
      <rect x="10.5" y="2" width="11" height="7" rx="3" fill="#a30505" />
      <path
        d="M12.5 3.2v4.6M15 3.2v4.6M17.5 3.2v4.6M20 3.2v4.6"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="0.8"
      />
      {/* uniones */}
      <path d="M10.5 9.6h11M10.5 21h11M10.5 23.2h11" stroke="#7a0303" strokeWidth="0.9" />
      {/* marca */}
      <path d="M13 15.5c1.6-1.4 4.4-1.4 6 0" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Glass() {
  return (
    <g>
      <circle cx="16" cy="16" r="12.5" fill="#bfe6ff" fillOpacity="0.3" stroke="#d8eefc" strokeOpacity="1" strokeWidth="1.6" />
      <circle cx="16" cy="16" r="9.2" fill="none" stroke="#d8eefc" strokeOpacity="0.3" strokeWidth="0.8" />
      <path d="M8.5 12.5a8.8 8.8 0 0 1 6-4.6" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    </g>
  );
}

function Mount() {
  return (
    <g>
      {/* base redonda */}
      <circle cx="16" cy="16" r="13" fill="#27272a" stroke="#71717a" strokeWidth="1.2" />
      {/* cuna en U */}
      <path d="M8.5 7.5h15v9a7.5 7.5 0 0 1-15 0z" fill="#0c0c0d" stroke="#a1a1aa" strokeWidth="1" strokeLinejoin="round" />
      <path d="M11.5 10.5v6.2a4.5 4.5 0 0 0 9 0V10.5" fill="none" stroke="#52525b" strokeWidth="1" />
      {/* punto rojo */}
      <circle cx="16" cy="28" r="1.3" fill={RED} />
    </g>
  );
}

export function ProductGlyph({ name, className }: { name: ProductGlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      {name === 'keychain' ? <Keychain /> : name === 'glass' ? <Glass /> : <Mount />}
    </svg>
  );
}
