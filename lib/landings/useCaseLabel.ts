/**
 * Largo máximo de un renglón del rótulo de las tarjetas de UseCases, en
 * caracteres. El componente dimensiona la letra para que entre un renglón
 * así en cualquier tarjeta.
 */
export const USE_CASE_LINE = 10;

/**
 * Los dos renglones de un rótulo, como los dibuja UseCases: con prefijo
 * ("Para"), el prefijo arriba y el rótulo abajo; sin prefijo, todo menos la
 * última palabra arriba y la última abajo (en accent). Lo usa el test de
 * config para que todos los rótulos tengan dos renglones que entren.
 */
export function useCaseLines(label: string, prefix = ''): [string, string] {
  if (prefix.trim()) return [prefix.trim(), label.trim()];
  const w = label.trim().split(/\s+/);
  return [w.slice(0, -1).join(' '), w[w.length - 1]];
}
