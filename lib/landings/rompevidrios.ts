/**
 * Config del Llavero Rescate PRO™ (landing `/rompevidrios`): llavero de
 * rescate con rompevidrios a resorte (punta de tungsteno) y corta cinturón.
 *
 * Es una landing tipo advertorial (ver `AdvertorialData` en ./types): todo el
 * copy y todas las rutas de assets viven acá, nada en los componentes.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts).
 *
 * ⚠️ PENDIENTES antes de que /rompevidrios reciba tráfico:
 *   - Shopify: los 3 packs no existen; `productId`/`fallbackVariantId` en
 *     `''` → los botones de compra quedan deshabilitados.
 *   - Media: NINGÚN slot existe todavía (todos `pending: true`). Ver el
 *     checklist en docs/superpowers/specs/rompevidrios-assets.md.
 *   - Lo que está entre corchetes en el copy ([CIFRA REAL], [X] días…).
 *
 * COPY LEGAL — no negociable: nada de cifras, sellos ni respaldos inventados
 * (bomberos, ADAC, "N vendidos", "casi agotado"). Las reseñas van vacías
 * hasta que haya reales. Y siempre aclarar que no rompe el parabrisas ni los
 * vidrios laminados (FAQ).
 */
import type { AdvertorialConfig, Bundle, UpsellTier } from './types';

/**
 * No hay pack de 1: los ids `single`/`double`/`triple` son los de 2, 4 y 6
 * unidades (el tipo `Bundle` y `Pricing` trabajan con esos tres ids). La
 * escalera del carrito sube de a 2, así que nunca ofrece "llevá 1 más".
 *
 * El tachado es el precio de lista de 1 unidad ($19.990) × cantidad.
 * TODO: confirmar precio de lista real — el tachado tiene que haber existido
 * de verdad (ley de defensa del consumidor).
 */
const PRECIO_LISTA = 19990;

const ROMPEVIDRIOS_BUNDLES: readonly Bundle[] = [
  {
    id: 'single',
    productId: '', // TODO SHOPIFY — el pack x2 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 2',
    subtitle: 'Para vos y tu pareja',
    quantity: 2,
    unitsLabel: '2 llaveros',
    badge: null,
    bonus: 'Vidrio de prueba incluido',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 29990,
    fallbackCompare: PRECIO_LISTA * 2,
    image: '/rompevidrios/packs/pack-2x.webp',
  },
  {
    id: 'double',
    productId: '', // TODO SHOPIFY — el pack x4 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 4',
    subtitle: 'Uno para cada auto de la familia',
    quantity: 4,
    unitsLabel: '4 llaveros',
    badge: 'EL MÁS ELEGIDO',
    bonus: 'Vidrio de prueba incluido',
    freeShipping: true,
    recommended: true,
    fallbackPrice: 44990,
    fallbackCompare: PRECIO_LISTA * 4,
    image: '/rompevidrios/packs/pack-4x.webp',
  },
  {
    id: 'triple',
    productId: '', // TODO SHOPIFY — el pack x6 no existe todavía
    fallbackVariantId: '',
    label: 'LLEVÁ 6',
    subtitle: 'Para toda la familia',
    quantity: 6,
    unitsLabel: '6 llaveros',
    badge: 'MEJOR PRECIO',
    bonus: 'Vidrio de prueba incluido',
    freeShipping: true,
    recommended: false,
    fallbackPrice: 54990,
    fallbackCompare: PRECIO_LISTA * 6,
    image: '/rompevidrios/packs/pack-6x.webp',
  },
];

const ROMPEVIDRIOS_UPSELL_CHAIN: readonly UpsellTier[] = ROMPEVIDRIOS_BUNDLES.map(
  (b): UpsellTier => ({
    id: b.id,
    productId: b.productId,
    fallbackVariantId: b.fallbackVariantId,
    quantity: b.quantity,
    unitsLabel: b.unitsLabel,
    fallbackPrice: b.fallbackPrice,
  }),
);

const CTA_LABEL = 'Quiero el mío + vidrio de prueba →';

export const ROMPEVIDRIOS = {
  brand: {
    tagline: 'Llavero Rescate PRO™',
    productHandle: 'llavero-rescate-pro', // TODO SHOPIFY — confirmar al crear el producto
    // Vacío = la línea de prueba social del hero y del header de packs no se
    // muestra. TODO: cifra real cuando haya ventas.
    socialProofCount: '',
    socialProofLabel: 'conductores ya lo llevan',
    averageRating: 0, // TODO: con reseñas reales
    reviewsCount: 0,
  },
  // Espejo del pack 2x: es el precio de entrada (no hay pack de 1).
  fallbackPricing: {
    price: 29990,
    compareAtPrice: PRECIO_LISTA * 2,
    currency: 'ARS',
  },
  // Lo que sigue hasta `whatsappPrefilled` lo pide `LandingConfig` pero la
  // página advertorial no lo renderiza (el copy real está en `advertorial`).
  headlines: {
    heroLine1: 'Lo llevás colgado de la llave.',
    heroLine2: 'Lo usás en 3 segundos.',
    heroSub:
      'Lo apoyás, apretás y el vidrio estalla. Cortás el cinturón de un tirón. Y lo podés probar en casa antes de necesitarlo.',
    finalCta: 'Dos mañanas posibles.',
    howItWorksLabel: '',
    howItWorksTitle: '',
    benefitsEyebrow: '',
    benefitsTitle: '',
    benefitsSub: '',
  },
  heroMedia: {
    kind: 'video',
    src: '/rompevidrios/hero/hero.mp4',
    poster: '/rompevidrios/hero/hero-poster.webp',
    width: 1080,
    height: 1350,
    badgeLine1: '',
    badgeLine2: '',
  },
  heroSubHighlights: [],
  sectionCopy: {
    pricingTitle: 'Elegí tu pack',
    pricingTitleAccent: '',
    reviewsTitle: 'Lo que dicen los que',
    reviewsTitleAccent: 'ya lo tienen',
    reviewsFooter: 'conductores que ya lo llevan.',
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Lo que más nos preguntan',
    carBrandsTitle: '',
    carBrandsTitleAccent: '',
    useCasesTitle: '',
    useCasesPrefix: '',
  },
  useCases: [],
  carBrands: [],
  steps: [],
  benefits: [],
  pitchBlocks: [],
  // Vacías a propósito: nada de testimonios inventados.
  reviews: [],
  ratingBreakdown: {
    average: 0,
    total: 0,
    stars: [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ],
  },
  faq: [
    {
      q: '¿Rompe el parabrisas?',
      a: 'No. El parabrisas es de vidrio laminado (dos capas con una lámina en el medio) y ningún rompevidrios de este tipo lo rompe. Sirve para las ventanillas laterales y la luneta, que son de vidrio templado.',
    },
    {
      q: '¿Funciona con cualquier auto?',
      a: "Funciona con vidrio templado, que es el de la mayoría de las ventanillas laterales. Algunos autos nuevos traen laterales laminadas: si el vidrio de tu ventanilla tiene una marca que dice 'laminated' o 'laminado', usalo en la luneta.",
    },
    {
      q: '¿Y si estoy nervioso o no tengo fuerza?',
      a: 'Por eso tiene resorte: no hay que golpear ni apuntar. Lo apoyás y apretás.',
    },
    {
      q: '¿Es peligroso con chicos?',
      // TODO: confirmar con el proveedor si la cuchilla tiene traba.
      a: 'La cuchilla está escondida dentro de una ranura: solo entra un cinturón. [Confirmar si tiene traba].',
    },
    {
      q: '¿Es legal llevarlo?',
      a: 'Sí. Es un elemento de seguridad para el auto, como el matafuego.',
    },
    {
      q: '¿Y si nunca lo uso?',
      a: 'Ojalá. Es como el seguro del auto: lo tenés para el día que hace falta.',
    },
    {
      q: '¿Cuánto tarda en llegar?',
      // TODO: plazo real de Andreani.
      a: '[X] días hábiles por Andreani, con seguimiento por WhatsApp.',
    },
    {
      q: '¿Por qué no se vende de a uno?',
      a: 'Porque el envío es gratis, y porque casi todos terminan comprando uno para cada auto de la familia.',
    },
  ],
  qualityBadges: [],
  certifications: { enabled: false, title: '', desc: '', items: [] },
  trustPillars: [],
  bundles: ROMPEVIDRIOS_BUNDLES,
  upsellChain: ROMPEVIDRIOS_UPSELL_CHAIN,
  whatsappPrefilled: 'Hola CARMANIA! Quería consultar por el Llavero Rescate PRO...',
  metadata: {
    title: 'Llavero Rescate PRO™: rompevidrios y corta cinturón | CARMANIA',
    description:
      'Lo llevás en la llave y lo usás en 3 segundos. Rompe la ventanilla y corta el cinturón. Con vidrio de prueba incluido.',
    ogTitle: 'Llavero Rescate PRO™: rompevidrios y corta cinturón | CARMANIA',
    ogDescription:
      'Lo llevás en la llave y lo usás en 3 segundos. Rompe la ventanilla y corta el cinturón. Con vidrio de prueba incluido.',
    canonical: '/rompevidrios',
  },

  advertorial: {
    promoBar:
      'Envío gratis · 3 cuotas sin interés · Si no rompe el vidrio de prueba, te devolvemos la plata',
    cta: { label: CTA_LABEL, href: '#packs' },

    hero: {
      socialProofSuffix: 'conductores ya lo llevan',
      title: 'Lo llevás colgado de la llave. Lo usás en 3 segundos.',
      sub: 'Lo apoyás, apretás y el vidrio estalla. Cortás el cinturón de un tirón. Y lo podés probar en casa antes de necesitarlo.',
      bullets: [
        'Funciona con las manos temblando: el resorte hace la fuerza',
        'Corta el cinturón aunque esté trabado',
        'Viene con un vidrio para que lo pruebes vos mismo',
      ],
      note: 'Envío gratis · 3 cuotas · Garantía de devolución',
      media: {
        id: 'RV-01',
        kind: 'video',
        src: '/rompevidrios/hero/hero.mp4',
        poster: '/rompevidrios/hero/hero-poster.webp',
        aspect: '4:5',
        alt: 'Mano que apoya el llavero en la ventanilla, aprieta y el vidrio estalla',
        brief: 'Mano sacando la llave con el llavero; lo apoya en la ventanilla, aprieta y el vidrio estalla.',
        spec: 'MP4 H.264 sin audio, loop 6–8 s, 1080×1350, < 2 MB + poster webp',
        pending: true,
      },
    },

    story: {
      title: 'Imaginate. Es jueves, llueve fuerte y volvés por la General Paz.',
      paragraphs: [
        'Hacés el mismo camino de todos los días. En diez minutos, la calle se convierte en un río.',
        'El agua llega a las puertas. Intentás abrir: no se mueven. La presión del agua las traba.',
        'Apretás la ventanilla. Nada: el agua cortó la electricidad.',
        'Y tenés el cinturón puesto.',
      ],
      mediaAfter: 2,
      media: {
        id: 'RV-02',
        kind: 'image',
        src: '/rompevidrios/historia/inundacion.webp',
        aspect: '16:9',
        alt: 'Calle inundada con autos con el agua a la altura de las puertas',
        brief: 'Calle o autopista inundada, autos con el agua por las puertas. Propia o con licencia.',
        spec: 'WEBP 1600×900. Nunca un caso real sin permiso',
        pending: true,
      },
      closing:
        'En ese momento no importa lo que tengas en la guantera. Importa lo que tengas en la mano.',
    },

    myth: {
      title: '"Yo rompo el vidrio con el apoyacabezas." ¿Seguro?',
      paragraphs: [
        'En muchos autos nuevos el apoyacabezas no sale, o tiene varillas que no sirven para romper nada.',
        'El martillo de emergencia queda en la guantera o atrás del asiento: lejos, justo cuando estás atrapado.',
        'Y para usarlo hay que pegar fuerte y apuntar bien. Con el agua subiendo o después de un choque, nadie apunta bien.',
      ],
      media: {
        id: 'RV-03',
        kind: 'gif',
        src: '/rompevidrios/historia/apoyacabezas.mp4',
        aspect: '4:5',
        alt: 'Alguien intenta sacar el apoyacabezas de un auto nuevo y no sale',
        brief: 'Alguien intenta sacar el apoyacabezas de un auto nuevo y no sale.',
        spec: 'MP4 H.264 sin audio, loop 4–5 s, < 2 MB',
        pending: true,
      },
    },

    proof: {
      title: 'Sabés que funciona antes de necesitarlo.',
      body: 'Por eso cada llavero viene con un vidrio de prueba. Lo apoyás, apretás y se rompe. Lo ves con tus propios ojos, en tu casa, el día que llega.',
      media: {
        id: 'RV-04',
        kind: 'video',
        src: '/rompevidrios/test/test-vidrio-lento.mp4',
        poster: '/rompevidrios/test/test-vidrio-lento-poster.webp',
        aspect: '1:1',
        alt: 'El vidrio de prueba estalla en cámara lenta al apretar el llavero',
        brief: 'EL ACTIVO CENTRAL: el vidrio de prueba estallando en cámara lenta al apretar el llavero.',
        spec: 'MP4 H.264 sin audio, loop 5–6 s en cámara lenta, 1080×1080, < 2 MB + poster webp',
        pending: true,
      },
      secondary: {
        id: 'RV-05',
        kind: 'image',
        src: '/rompevidrios/test/vidrio-de-prueba.webp',
        aspect: '4:5',
        alt: 'El vidrio de prueba sano junto al llavero, como viene en la caja',
        brief: 'El vidrio de prueba sano junto al llavero, como viene en la caja.',
        spec: 'WEBP 1200×1500',
        pending: true,
      },
    },

    steps: {
      title: 'Cómo funciona',
      items: [
        {
          n: 1,
          title: 'Apoyalo',
          desc: 'Contra la ventanilla lateral, en una esquina.',
          media: {
            id: 'RV-06',
            kind: 'gif',
            src: '/rompevidrios/pasos/01-apoyalo.mp4',
            aspect: '1:1',
            alt: 'El llavero apoyado en la esquina de la ventanilla lateral',
            brief: 'Primer plano: el llavero apoyado en la esquina de la ventanilla lateral.',
            spec: 'MP4 H.264 sin audio, loop 3 s, < 2 MB',
            pending: true,
          },
        },
        {
          n: 2,
          title: 'Apretá',
          desc: 'El resorte dispara la punta de tungsteno. El vidrio estalla. Sin fuerza.',
          media: {
            id: 'RV-07',
            kind: 'gif',
            src: '/rompevidrios/pasos/02-apreta.mp4',
            aspect: '1:1',
            alt: 'Aprieta el llavero y el vidrio estalla',
            brief: 'Primer plano: aprieta y el vidrio estalla.',
            spec: 'MP4 H.264 sin audio, loop 3 s en cámara lenta, < 2 MB',
            pending: true,
          },
        },
        {
          n: 3,
          title: 'Cortá y salí',
          desc: 'La cuchilla escondida corta el cinturón de un tirón.',
          media: {
            id: 'RV-08',
            kind: 'gif',
            src: '/rompevidrios/pasos/03-corta.mp4',
            aspect: '1:1',
            alt: 'El llavero corta un cinturón de seguridad tenso de un tirón',
            brief: 'El llavero cortando un cinturón tenso de un tirón.',
            spec: 'MP4 H.264 sin audio, loop 3 s, < 2 MB',
            pending: true,
          },
        },
      ],
      exploded: {
        title: 'Por dentro: resorte, punta de tungsteno y cuchilla protegida',
        media: {
          id: 'RV-09',
          kind: 'image',
          src: '/rompevidrios/pasos/despiece.webp',
          aspect: '16:9',
          alt: 'Despiece del llavero: resorte, punta de tungsteno, cuchilla protegida y argolla',
          brief: 'Despiece con flechas: resorte, punta de tungsteno, cuchilla protegida, argolla.',
          spec: 'WEBP 1600×900, fondo negro',
          pending: true,
        },
      },
    },

    comparison: {
      title: 'Llavero, martillo o apoyacabezas: qué te saca del auto.',
      columns: ['Llavero Rescate PRO', 'Martillo de guantera', 'Apoyacabezas'],
      rows: [
        { label: 'Lo tenés a mano si estás atrapado', values: [true, false, 'depende del auto'] },
        { label: 'Funciona sin fuerza ni puntería', values: [true, false, false] },
        { label: 'Corta el cinturón', values: [true, 'algunos', false] },
        { label: 'Lo podés probar antes', values: [true, false, false] },
        { label: 'Entra en el bolsillo', values: [true, false, '—'] },
      ],
      media: {
        id: 'RV-10',
        kind: 'image',
        src: '/rompevidrios/comparativa/comparativa.webp',
        aspect: '3:2',
        alt: 'El llavero, un martillo de emergencia y un apoyacabezas sobre una mesa',
        brief: 'Los tres juntos sobre una mesa: llavero, martillo de emergencia y un apoyacabezas.',
        spec: 'WEBP 1500×1000',
        pending: true,
      },
    },

    expert: {
      title: 'Lo que un bombero quiere que sepas antes de salir a la ruta.',
      // TODO: nombre y cuartel reales. Sin video real, la sección no sale en producción.
      caption: '[Nombre], bombero voluntario de [cuartel]',
      media: {
        id: 'RV-11',
        kind: 'video',
        src: '/rompevidrios/experto/bombero.mp4',
        poster: '/rompevidrios/experto/bombero-poster.webp',
        aspect: '9:16',
        alt: 'Bombero voluntario explica cómo salir de un auto atrapado',
        brief: 'Bombero voluntario real, a cámara, 30–60 s: cómo salir de un auto atrapado y por qué llevar un rompevidrios en la llave.',
        spec: 'MP4 H.264 CON audio y subtítulos quemados, 30–60 s + poster webp',
        pending: true,
        withAudio: true,
      },
    },

    box: {
      title: 'Qué viene en la caja',
      // TODO: confirmar con Spring.
      items: [
        '1 llavero Rescate PRO por unidad',
        '1 vidrio de prueba por unidad',
        'Argolla para la llave',
      ],
      media: {
        id: 'RV-12',
        kind: 'image',
        src: '/rompevidrios/caja/que-incluye.webp',
        aspect: '1:1',
        alt: 'Caja abierta con el llavero, el vidrio de prueba y la argolla',
        brief: 'Unboxing: caja abierta con llavero, vidrio de prueba y argolla.',
        spec: 'WEBP 1600×1600',
        pending: true,
      },
    },

    reviews: {
      title: 'Lo que dicen los que ya lo tienen',
      placeholder: 'PENDIENTE · reseñas reales con foto, apenas haya ventas',
    },

    packs: {
      sub: 'Uno para tu auto y otro para el de tus viejos. Envío gratis en todos.',
      footnote: '3 cuotas sin interés · Descuento por transferencia · Envío gratis por Andreani',
      images: {
        single: {
          id: 'RV-13',
          kind: 'image',
          src: '/rompevidrios/packs/pack-2x.webp',
          aspect: '1:1',
          alt: 'Pack de 2 llaveros Rescate PRO con 2 vidrios de prueba',
          brief: '2 llaveros sobre fondo negro, con 2 vidrios de prueba. También va en la card de /tienda.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
        double: {
          id: 'RV-14',
          kind: 'image',
          src: '/rompevidrios/packs/pack-4x.webp',
          aspect: '1:1',
          alt: 'Pack de 4 llaveros Rescate PRO, cada uno en una llave de auto distinta',
          brief: '4 llaveros, cada uno en una llave de auto distinta.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
        triple: {
          id: 'RV-15',
          kind: 'image',
          src: '/rompevidrios/packs/pack-6x.webp',
          aspect: '1:1',
          alt: 'Pack de 6 llaveros Rescate PRO en abanico',
          brief: '6 llaveros en abanico.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
      },
    },

    guarantee: {
      title: 'Vos no arriesgás nada.',
      // TODO: confirmar plazo.
      body: 'Si el llavero no rompe el vidrio de prueba, te devolvemos la plata. Sin vueltas. [Confirmar plazo: 30 días].',
    },

    closing: {
      title: 'Dos mañanas posibles.',
      columns: [
        {
          tone: 'without',
          text: 'Seguís sin nada en la llave. Probablemente nunca pase nada. Y si pasa, vas a depender de la suerte.',
        },
        {
          tone: 'with',
          text: 'Lo tenés colgado de la llave. Probablemente nunca pase nada. Y si pasa, tenés 3 segundos y una salida.',
        },
      ],
      media: {
        id: 'RV-16',
        kind: 'image',
        src: '/rompevidrios/cierre/llave-en-mano.webp',
        aspect: '16:9',
        alt: 'Llaves con el llavero sobre el tablero, de noche, con luz de ciudad',
        brief: 'Plano tranquilo: llaves con el llavero sobre el tablero, de noche, con luz de ciudad.',
        spec: 'WEBP 1600×900',
        pending: true,
      },
    },
  },
} satisfies AdvertorialConfig;
