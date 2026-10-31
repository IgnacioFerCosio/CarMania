/**
 * El Cyber es temporal pero toca lo que factura: si alguien mueve una fecha o
 * apaga mal una pieza, el banner puede quedar mintiendo. Esto lo vigila.
 */
import { describe, it, expect } from 'vitest';
import { CYBER, PROMO_BARS, STORE_PROMO_MESSAGES, STORE_PRODUCTS } from '@/lib/config';
import {
  CYBER_STARTS,
  CYBER_ENDS,
  CYBER_EXTENSION_ENDS,
  cyberPhaseAt,
  cyberTargetOf,
} from '@/lib/cyber';
import { SOPORTE } from '@/lib/landings/soporte';
import { PARASOL } from '@/lib/landings/parasol';

const ART = (iso: string) => Date.parse(`${iso}-03:00`);

describe('CYBER — fechas y fases', () => {
  it('las fechas son válidas y van en orden: empieza < termina < extensión', () => {
    for (const t of [CYBER_STARTS, CYBER_ENDS, CYBER_EXTENSION_ENDS]) {
      expect(Number.isNaN(t)).toBe(false);
    }
    expect(CYBER_STARTS).toBeLessThan(CYBER_ENDS);
    expect(CYBER_ENDS).toBeLessThan(CYBER_EXTENSION_ENDS);
  });

  it('todas las fechas llevan offset explícito (si no, dependen de la zona del visitante)', () => {
    for (const d of [CYBER.startsAt, CYBER.endsAt, CYBER.extensionEndsAt]) {
      expect(d).toMatch(/[+-]\d{2}:\d{2}$/);
    }
  });

  it('recorre las fases en orden y cada una cierra donde dice', () => {
    expect(cyberPhaseAt(ART('2026-11-01T23:59:59'))).toBe('pre');
    expect(cyberPhaseAt(ART('2026-11-02T00:00:00'))).toBe('live');
    expect(cyberPhaseAt(ART('2026-11-04T23:59:59'))).toBe('live');
    expect(cyberPhaseAt(ART('2026-11-05T00:00:00'))).toBe('extension');
    expect(cyberPhaseAt(ART('2026-11-08T23:59:59'))).toBe('extension');
    expect(cyberPhaseAt(ART('2026-11-09T00:00:00'))).toBe('ended');
  });

  it('la cuenta de cada fase apunta a su cierre', () => {
    expect(cyberTargetOf('pre')).toBe(CYBER_STARTS);
    expect(cyberTargetOf('live')).toBe(CYBER_ENDS);
    expect(cyberTargetOf('extension')).toBe(CYBER_EXTENSION_ENDS);
  });
});

describe('CYBER — contenido', () => {
  it('ningún texto lleva fecha (la extensión no debe obligar a reescribir nada)', () => {
    const textos = [
      PROMO_BARS.top.text,
      PROMO_BARS.sub.text,
      ...STORE_PROMO_MESSAGES,
      ...CYBER.benefits,
      CYBER.name,
      CYBER.extensionName,
    ];
    for (const t of textos) expect(t).not.toMatch(/\d{1,2}\s*\/\s*\d{1,2}|hasta el/i);
  });

  it('hay beneficios para el banner', () => {
    expect(CYBER.benefits.length).toBeGreaterThan(0);
  });

  it('el "Cyber −X%" de los packs sale de un tachado mayor que el precio', () => {
    for (const landing of [SOPORTE, PARASOL]) {
      for (const b of landing.bundles) {
        expect(b.fallbackCompare).toBeGreaterThan(b.fallbackPrice);
      }
    }
  });

  it('el pack x6 de la card propia existe en la escalera del soporte', () => {
    if (!CYBER.pack6Card) return;
    expect(SOPORTE.upsellChain.some((t) => t.id === 'x6')).toBe(true);
  });

  it('el soporte y el parasol se venden y no están marcados como próximamente', () => {
    const visibles = STORE_PRODUCTS.filter((p) => !p.comingSoon).map((p) => p.href);
    expect(visibles).toEqual(expect.arrayContaining(['/', '/parasol']));
  });
});
