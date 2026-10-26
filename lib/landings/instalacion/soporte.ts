/**
 * Guía de instalación del Soporte Magnético PRO™ — /soporte/instalacion.
 *
 * Es a donde lleva el QR de la caja: el cliente YA compró. El objetivo es que
 * lo instale bien en un minuto y no tenga que escribirnos, así que acá no va
 * nada de venta: el cierre lleva a /tienda y nada más.
 *
 * Todo el copy de la página sale de este objeto; `InstallGuide` no tiene
 * textos propios. Para otro producto: copiá este archivo como
 * `instalacion/<producto>.ts` y sumá su `app/<producto>/instalacion/page.tsx`.
 *
 * Assets propios en /public/instalacion/soporte/ (excluido en _routes.json).
 * Las imágenes son las del carrusel "Qué incluye" (/public/what-includes/).
 * QueIncluye.webp NO va: muestra el adhesivo que el kit nuevo ya no trae.
 */
import type { InstallGuideConfig } from '../types';

export const SOPORTE_INSTALACION = {
  metadata: {
    title: 'Instalación — Soporte Magnético PRO™ | CARMANIA',
    description:
      'Cómo instalar tu Soporte Magnético PRO™ en 1 minuto: el video completo, cuándo usar el aro y qué hacer si algo no funciona.',
  },

  eyebrow: 'Soporte Magnético PRO™',
  title: 'Instalalo en 1 minuto',
  titleAccent: '1 minuto',

  // PLACEHOLDER hasta que esté el video real: los tres clips de /how-to-use
  // unidos con ffmpeg. El definitivo reemplaza este mismo archivo, y el
  // poster es su primer frame. Cuadrado, H.264, sin audio y < 2 MB.
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
      { qty: '2', name: 'Aros metálicos adhesivos', note: 'Uno de repuesto' },
      { qty: '2', name: 'Toallitas de limpieza', note: '1 húmeda + 1 seca' },
    ],
  },

  steps: {
    title: 'Paso a paso',
    image: {
      src: '/what-includes/guia-instalacion.webp',
      alt: 'Guía de instalación en 4 pasos: 1, limpiá el tablero o el parabrisas. 2, apoyá firme el soporte sobre la superficie limpia. 3, mientras hacés presión, girá el seguro en la dirección de la flecha. 4, para sacarlo, girá hacia Open y levantá desde el costado.',
      width: 1600,
      height: 1600,
    },
    items: [
      'Limpiá con la toallita 1 y secá con la 2.',
      'Apoyá la base firme sobre la superficie limpia.',
      'Presioná y girá el seguro hasta que trabe.',
      'Para sacarlo: girá a OPEN y tirá de la lengüeta.',
    ],
  },

  ring: {
    title: '¿Necesitás el aro?',
    lead: 'Sólo si tu celular o tu funda no son MagSafe. Si ya lo son, no hace falta.',
    image: {
      src: '/what-includes/funciona-con-todos-los-celulares.webp',
      alt: 'Funciona con todos los celulares. Listo para MagSafe: iPhone 12 en adelante y celulares con funda MagSafe. Usá el aro metálico incluido para celulares sin MagSafe y fundas sin MagSafe.',
      width: 1600,
      height: 1600,
    },
    rule: {
      title: 'Del lado de afuera de la funda, centrado',
      desc: 'Nunca entre la funda y el celular.',
    },
    stepsImage: {
      src: '/what-includes/compatibilidad-universal.webp',
      alt: 'Si tu celular no tiene MagSafe: 1, limpiá la parte trasera de tu funda con las toallitas. 2, pegá el aro magnético en la parte externa de la funda y presioná 10 segundos. 3, dejalo reposar 60 minutos antes de usarlo. Si tu celular o funda ya son compatibles con MagSafe, no hace falta instalar el aro.',
      width: 1600,
      height: 1600,
    },
    steps: [
      'Limpiá atrás de la funda con la toallita 1 y secá con la 2.',
      'Pegá el aro centrado y presioná fuerte 10 segundos.',
      'Dejalo reposar 60 minutos antes de usarlo.',
    ],
    notes: [
      { icon: 'plus', text: 'La caja trae 2 aros: uno de repuesto, o para otro celular.' },
      {
        icon: 'alert',
        text: 'Para sacar el celu, deslizalo de costado. Si tirás hacia afuera, con el tiempo despegás el aro.',
      },
    ],
  },

  troubleshooting: {
    title: 'Si algo no funciona',
    items: [
      {
        q: 'El imán agarra poco',
        a: [
          'Si usás una funda que no es MagSafe, tenés que usar el aro en la parte de afuera de la funda.',
          'Fijate que no haya un aro pegado al imán del soporte. Los aros vienen sueltos en la caja y a veces llegan pegados al imán: como son redondos igual que él, parecen parte del soporte. Sacalo y va a agarrar firme.',
        ],
      },
      {
        q: 'Se me despega el aro adhesivo',
        a: [
          'Algunas fundas (silicona, cuero, con textura o con recubrimiento antiadherente) no dejan que el adhesivo pegue bien.',
          'Probá con otra funda o pasate a una funda MagSafe.',
          'Para sacar el celu, deslizalo de costado, sin tironear.',
        ],
      },
      {
        q: 'La base se despega',
        a: ['Lavala con agua, dejala secar al aire y vuelve a agarrar como nueva.'],
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

  outro: { label: 'Mirá todos nuestros productos', href: '/tienda' },
} satisfies InstallGuideConfig;
