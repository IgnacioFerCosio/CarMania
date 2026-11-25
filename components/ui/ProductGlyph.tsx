/**
 * Íconos de lo que trae cada pack de /llavero-rescate, dibujados con la forma
 * real de cada pieza (los de la foto "todo lo que trae"):
 *  - `keychain`: el llavero, cilindro rojo con tapa moleteada y correa negra.
 *  - `glass`: el vidrio de prueba, un disco transparente.
 *  - `mount`: el soporte adhesivo, base redonda negra con la cuna en U.
 *
 * Y los de /trabavolante:
 *  - `titan`: el trabavolante, lazo acolchado negro con anillos naranjas y la traba.
 *  - `key`: una llave de seguridad, cabeza negra y paleta plateada.
 *
 * Son SVG planos de 32×32, sin imágenes. Los grises de la correa y la base
 * son claros a propósito: el negro real se perdería sobre el fondo oscuro.
 */
export type ProductGlyphName = 'keychain' | 'glass' | 'mount' | 'titan' | 'key';

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

function Titan() {
  return (
    <g>
      {/* lazo acolchado */}
      <path d="M11 20 C5 13, 9 4, 18 4 C27 4, 30 13, 23 18" fill="none" stroke="#52525b" strokeWidth="4.6" strokeLinecap="round" />
      <path d="M11 20 C5 13, 9 4, 18 4 C27 4, 30 13, 23 18" fill="none" stroke="#27272a" strokeWidth="2.6" strokeLinecap="round" strokeDasharray="2 1.4" />
      {/* anillos naranjas */}
      <path d="M8.2 13.6l3 -1.2M22.6 16.2l2.6 1.8" stroke="#F26A1B" strokeWidth="2.4" strokeLinecap="round" />
      {/* cables que bajan a la traba */}
      <path d="M12 19.5l3.5 4.5M22 18.5l-3.5 5.5" stroke="#a1a1aa" strokeWidth="1.3" />
      {/* traba (lengüeta del cinturón) */}
      <rect x="11.5" y="22.5" width="9" height="8" rx="1.8" fill="#18181b" stroke="#71717a" strokeWidth="1" />
      <rect x="14" y="29" width="4" height="2.4" rx="0.6" fill="#d4d4d8" />
    </g>
  );
}

function Key() {
  return (
    <g transform="rotate(-35 16 16)">
      {/* cabeza */}
      <rect x="4" y="10" width="11" height="12" rx="4" fill="#27272a" stroke="#71717a" strokeWidth="1.1" />
      <circle cx="7.5" cy="16" r="1.4" fill="#0c0c0d" stroke="#a1a1aa" strokeWidth="0.8" />
      {/* paleta */}
      <path d="M15 14h13v4H15z" fill="#d4d4d8" />
      <path d="M18 18v1.6M21 18v2.2M24 18v1.4" stroke="#d4d4d8" strokeWidth="1.4" />
      <path d="M16 15.4h11" stroke="#fff" strokeOpacity="0.6" strokeWidth="0.7" />
    </g>
  );
}

export function ProductGlyph({ name, className }: { name: ProductGlyphName; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      {name === 'keychain' ? (
        <Keychain />
      ) : name === 'glass' ? (
        <Glass />
      ) : name === 'titan' ? (
        <Titan />
      ) : name === 'key' ? (
        <Key />
      ) : (
        <Mount />
      )}
    </svg>
  );
}
