/**
 * Vitest existe por una sola razón: `lib/` importa TypeScript sin extensión
 * (`./landings/soporte`) y el resolver ESM de Node no lo traga, así que los
 * tests de config y de `lib/tiers.ts` no se pueden correr con `node --test`.
 *
 *   npm run test:unit      tests/unit      — puros, sin red
 *   npm run check:shopify  tests/contract  — contra la Storefront API real
 */
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('.', import.meta.url)) },
  },
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node',
  },
});
