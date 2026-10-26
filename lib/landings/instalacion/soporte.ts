/**
 * Guía de instalación del Soporte Magnético PRO™ — /soporte/instalacion.
 *
 * Es a donde lleva el QR de la caja: el cliente YA compró. El objetivo es que
 * lo instale bien en un minuto y no tenga que escribirnos, así que acá no va
 * nada de venta (salvo una card discreta del parasol al final).
 *
 * Todo el copy de la página sale de este objeto; `InstallGuide` no tiene
 * textos propios. Para otro producto: copiá este archivo como
 * `instalacion/<producto>.ts` y sumá su `app/<producto>/instalacion/page.tsx`.
 *
 * Assets en /public/instalacion/soporte/ (excluido en _routes.json).
 */
import { PARASOL } from '../parasol';
import type { InstallGuideConfig } from '../types';

export const SOPORTE_INSTALACION = {
  metadata: {
    title: 'Instalación — Soporte Magnético PRO™ | CARMANIA',
    description:
      'Cómo instalar tu Soporte Magnético PRO™ en 1 minuto: qué trae la caja, cuándo usar el aro y qué hacer si algo no funciona.',
  },

  eyebrow: 'Guía de instalación',
  title: 'Instalá tu Soporte Magnético PRO en 1 minuto',
  titleAccent: 'en 1 minuto',
  intro: 'Mirá el video o seguí los 4 pasos de abajo. Si algo no funciona, la respuesta está al final.',

  // PLACEHOLDER: los tres clips de /how-to-use encadenados y comprimidos.
  // El video real va en este mismo archivo (y su poster, el primer frame).
  // Cuadrado, H.264, sin audio y < 2 MB, como el resto.
  video: {
    src: '/instalacion/soporte/instalacion.mp4',
    poster: '/instalacion/soporte/instalacion-poster.webp',
  },

  // Lo que confirme el proveedor manda: si cambia el contenido de la caja,
  // se cambia acá y en ningún otro lado.
  box: {
    title: 'Qué trae tu caja',
    items: [
      { qty: '1', name: 'Soporte Magnético PRO™' },
      { qty: '2', name: 'Aros metálicos negros', note: 'Para celulares sin MagSafe' },
      { qty: '2', name: 'Toallitas de limpieza', note: '1 húmeda + 1 seca' },
    ],
  },

  ring: {
    title: '¿Necesitás el aro?',
    cases: [
      {
        who: 'iPhone con MagSafe',
        verdict: 'No hace falta',
        desc: 'Sin funda o con funda MagSafe, el imán agarra directo. Guardá los aros de repuesto.',
        tone: 'ok',
      },
      {
        who: 'Otro celular o funda común',
        verdict: 'Pegá el aro',
        desc: 'Limpiá la funda con las toallitas y pegá el aro centrado en la parte de afuera de la funda.',
        tone: 'action',
      },
    ],
  },

  steps: {
    title: 'Paso a paso',
    items: [
      {
        title: 'Limpiá la superficie',
        desc: 'Pasá primero la toallita 1 (húmeda) y después la 2 (seca). Esperá a que quede bien seca.',
        icon: 'sparkles',
      },
      {
        title: 'Apoyá la base',
        desc: 'Sacale el film al gel y apoyá la base firme en una zona plana del tablero o del vidrio.',
        video: '/instalacion/soporte/02-apoya-la-base.mp4',
      },
      {
        title: 'Trabá el anillo',
        desc: 'Presioná la base y girá el anillo hasta que trabe.',
        icon: 'rotate',
      },
      {
        title: 'Ajustá y acercá el celu',
        desc: 'Ajustá el brazo y el giro 360° a tu gusto y acercá el celular: queda pegado al instante.',
        video: '/instalacion/soporte/04-ajusta-y-acerca.mp4',
      },
    ],
  },

  tip: {
    title: 'Para sacarlo',
    desc: 'Girá el anillo a OPEN y tirá de la lengüeta.',
  },

  troubleshooting: {
    title: 'Si algo no funciona',
    items: [
      {
        q: 'Se despega',
        a: 'Lavá la base con agua, dejala secar al aire y volvé a instalarla: recupera la adherencia.',
      },
      {
        q: 'Mi tablero es texturado o de cuero',
        a: 'El gel necesita una superficie lisa. Probá en una zona más lisa del tablero o directamente en el vidrio.',
      },
      {
        q: 'El imán agarra poco',
        a: 'Casi siempre es una funda muy gruesa entre el imán y el celular. Pegá el aro en la parte de afuera de la funda y va a agarrar firme.',
      },
      {
        q: 'No pega en el tablero',
        a: 'Repetí la limpieza con las dos toallitas y esperá a que seque. Apoyá la base en una zona plana, presioná unos segundos y recién ahí trabá el anillo. Si el tablero es curvo, usá el vidrio.',
      },
    ],
  },

  help: {
    title: '¿Seguís con dudas?',
    whatsappLabel: 'Escribinos por WhatsApp',
    whatsappPrefilled:
      'Hola CARMANIA! Compré el Soporte Magnético PRO y tengo una duda con la instalación:',
    instagramLead: 'Tips y novedades en',
  },

  crossSell: {
    eyebrow: 'Completá tu auto',
    name: PARASOL.brand.tagline,
    pitch: 'Tu auto fresco aunque quede al sol.',
    image: PARASOL.bundles[0].image,
    href: '/parasol',
    cta: 'Conocelo',
  },
} satisfies InstallGuideConfig;
