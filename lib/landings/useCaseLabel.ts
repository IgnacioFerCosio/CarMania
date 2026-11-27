/**
 * Largo máximo de un renglón del rótulo de las tarjetas de UseCases, en
 * caracteres. El componente dimensiona la letra para que entre un renglón
 * así en cualquier tarjeta, y cada rótulo puede ocupar hasta 2 renglones.
 */
export const USE_CASE_LINE = 10;

/**
 * Cómo se parte un rótulo en renglones de hasta `USE_CASE_LINE` caracteres
 * (palabra por palabra, como el navegador). Lo usa el test de config para
 * que ningún rótulo pase de 2 renglones ni tenga una palabra más larga.
 */
export function useCaseLines(label: string): string[] {
  const lines: string[] = [];
  for (const word of label.trim().split(/\s+/)) {
    const last = lines[lines.length - 1];
    if (last !== undefined && last.length + 1 + word.length <= USE_CASE_LINE) {
      lines[lines.length - 1] = `${last} ${word}`;
    } else {
      lines.push(word);
    }
  }
  return lines;
}
