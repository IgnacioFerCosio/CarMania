/**
 * El evento (bloque CYBER, hoy Black Friday) es temporal pero toca lo que factura: si alguien mueve una fecha o
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
  eventGateScript,
  eventOnAt,
  isEventPhase,
  nextMidnightART,
} from '@/lib/cyber';
import { SOPORTE } from '@/lib/landings/soporte';
import { PARASOL } from '@/lib/landings/parasol';

const ART = (iso: string) => Date.parse(`${iso}-03:00`);

describe('CYBER — fechas y fases', () => {
  it('las fechas son válidas y van en orden: empieza < termina ≤ cierre', () => {
    for (const t of [CYBER_STARTS, CYBER_ENDS, CYBER_EXTENSION_ENDS]) {
      expect(Number.isNaN(t)).toBe(false);
    }
    expect(CYBER_STARTS).toBeLessThan(CYBER_ENDS);
    expect(CYBER_ENDS).toBeLessThanOrEqual(CYBER_EXTENSION_ENDS);
  });

  it('todas las fechas llevan offset explícito (si no, dependen de la zona del visitante)', () => {
    for (const d of [CYBER.startsAt, CYBER.endsAt, CYBER.extensionEndsAt]) {
      if (d !== null) expect(d).toMatch(/[+-]\d{2}:\d{2}$/);
    }
  });

  it('Black Friday: del lunes 23/11 00:00 al domingo 29/11 23:59:59, sin extensión', () => {
    expect(cyberPhaseAt(ART('2026-11-22T23:59:59'))).toBe('pre');
    expect(cyberPhaseAt(ART('2026-11-23T00:00:00'))).toBe('live');
    expect(cyberPhaseAt(ART('2026-11-29T23:59:59'))).toBe('live');
    expect(cyberPhaseAt(ART('2026-11-30T00:00:00'))).toBe('ended');
  });

  it('el evento se ve sólo dentro de esas fechas (ni antes ni después)', () => {
    expect(eventOnAt(ART('2026-11-22T23:59:59'))).toBe(false);
    expect(eventOnAt(ART('2026-11-23T00:00:00'))).toBe(CYBER.enabled);
    expect(eventOnAt(ART('2026-11-27T12:00:00'))).toBe(CYBER.enabled);
    expect(eventOnAt(ART('2026-11-29T23:59:59'))).toBe(CYBER.enabled);
    expect(eventOnAt(ART('2026-11-30T00:00:00'))).toBe(false);
    expect(isEventPhase('pre')).toBe(false);
    expect(isEventPhase('ended')).toBe(false);
  });

  it('el script del <head> usa las mismas fechas y, fuera de dev, no trae el ?evento=', () => {
    const js = eventGateScript();
    if (!CYBER.enabled) return expect(js).toBeNull();
    expect(js).toContain(`n>=${CYBER_STARTS}&&n<=${CYBER_EXTENSION_ENDS}`);
    // vitest corre con NODE_ENV=test: es el caso "producción" de showsDrafts.
    expect(js).not.toContain('evento');
  });

  it('durante el evento la cuenta es de hasta 24 h: vence a la medianoche argentina', () => {
    const now = ART('2026-11-25T14:30:00');
    expect(cyberTargetOf('live', now)).toBe(ART('2026-11-26T00:00:00'));
    expect(cyberTargetOf('live', ART('2026-11-29T23:00:00'))).toBe(ART('2026-11-30T00:00:00'));
  });

  it('nextMidnightART: un segundo antes de las 00 vence en 1 s, y a las 00 en punto reinicia en 24 h', () => {
    expect(nextMidnightART(ART('2026-11-03T23:59:59'))).toBe(ART('2026-11-04T00:00:00'));
    expect(nextMidnightART(ART('2026-11-04T00:00:00'))).toBe(ART('2026-11-05T00:00:00'));
    expect(nextMidnightART(ART('2026-11-04T00:00:01'))).toBe(ART('2026-11-05T00:00:00'));
  });

  it('la cuenta nunca pasa de 24 h ni es negativa', () => {
    const DAY = 24 * 60 * 60 * 1000;
    for (const iso of ['2026-11-02T00:00:00', '2026-11-02T12:34:56', '2026-11-04T23:59:59', '2026-11-08T23:59:58']) {
      const now = ART(iso);
      const left = cyberTargetOf('live', now) - now;
      expect(left).toBeGreaterThan(0);
      expect(left).toBeLessThanOrEqual(DAY);
    }
  });
});

describe('CYBER — contenido', () => {
  it('ningún texto lleva fecha (la extensión no debe obligar a reescribir nada)', () => {
    const textos = [
      PROMO_BARS.top.text,
      PROMO_BARS.sub.text,
      ...STORE_PROMO_MESSAGES,
      ...CYBER.benefits,
      PROMO_BARS.sub.eventText,
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

  it('el "<shortName> −X%" no lleva fecha y el logo, si hay, vive en /cyber', () => {
    expect(CYBER.shortName).not.toMatch(/\d/);
    if (CYBER.logo) expect(CYBER.logo.src.startsWith('/cyber/')).toBe(true);
  });

  it('el soporte y el parasol se venden y no están marcados como próximamente', () => {
    const visibles = STORE_PRODUCTS.filter((p) => !p.comingSoon).map((p) => p.href);
    expect(visibles).toEqual(expect.arrayContaining(['/', '/parasol']));
  });
});
