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

const CTA_LABEL = 'Quiero el mío + vidrio de prueba';

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
  // El hero es el mismo componente `Hero` de las otras landings, así que su
  // copy vive acá. De lo demás hasta `whatsappPrefilled`, lo que la página no
  // renderiza (useCases, steps, benefits…) va vacío: lo pide `LandingConfig`.
  headlines: {
    heroLine1: 'Tu herramienta de escape definitiva',
    heroLine2: 'siempre en el bolsillo',
    heroSub:
      // Corta a propósito: en el celular entra en 3 renglones. El vidrio de
      // prueba lo cuentan el bloque del test y los packs.
      'Pequeño pero poderoso. Lo apoyás, apretás y el vidrio estalla. Cortás el cinturón de un tirón. Sin fuerza. Sin puntería.',
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
    badgeLine1: 'ESCAPE EN',
    badgeLine2: '3 SEGUNDOS',
  },
  heroSubHighlights: ['poderoso', 'el vidrio estalla', 'de un tirón'],
  sectionCopy: {
    pricingTitle: 'Elegí tu',
    pricingTitleAccent: 'pack',
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
    cta: { label: CTA_LABEL, href: '#pricing' },

    hero: {
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
      eyebrow: 'Imaginate',
      title: 'Es jueves, llueve fuerte y volvés por la General Paz.',
      accent: 'llueve fuerte',
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
      eyebrow: 'El mito',
      title: '"Yo rompo el vidrio con el apoyacabezas." ¿Seguro?',
      accent: '¿Seguro?',
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

    // Orden = el del visor. La primera pieza es la que se ve al cargar: el
    // video de la prueba, que es el centro del mensaje de la sección.
    // TODO confirmar con Spring qué trae la caja (soporte adhesivo y argolla).
    includes: {
      eyebrow: 'El test de 3 segundos',
      title: 'Sabés que funciona antes de necesitarlo.',
      accent: 'antes de necesitarlo.',
      body: 'Cada llavero viene con un vidrio de prueba: lo apoyás, apretás y se rompe. Lo ves con tus propios ojos, en tu casa, el día que llega.',
      listTitle: '¿Qué incluye?',
      items: [
        { label: 'Llavero Rescate PRO™ con punta de tungsteno', piece: 'punta' },
        { label: 'Cuchilla corta cinturón, protegida', piece: 'cuchilla' },
        { label: 'Vidrio de prueba (uno por llavero)', piece: 'vidrio' },
        { label: 'Soporte adhesivo para dejarlo colocado', piece: 'soporte' },
        { label: 'Argolla para la llave', piece: 'todo' },
      ],
      pieces: [
        {
          id: 'test',
          title: 'Probalo antes de necesitarlo',
          desc: 'Apoyás el llavero en el vidrio de prueba, apretás y estalla. Lo comprobás vos, en tu casa, el día que llega.',
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
        },
        {
          id: 'todo',
          title: 'Todo lo que trae',
          desc: 'Llavero, vidrio de prueba, soporte adhesivo y argolla. Lo sacás de la caja y lo dejás listo en tu auto.',
          media: {
            id: 'RV-12',
            kind: 'image',
            src: '/rompevidrios/caja/que-incluye.webp',
            aspect: '1:1',
            alt: 'Caja abierta con el llavero, el vidrio de prueba, el soporte adhesivo y la argolla',
            brief: 'Unboxing: todos los elementos juntos: llavero, vidrio de prueba, soporte adhesivo y argolla.',
            spec: 'WEBP 1600×1600',
            pending: true,
          },
        },
        {
          id: 'punta',
          title: 'Punta de tungsteno',
          desc: 'Es la que rompe el vidrio: el resorte la dispara y concentra todo el impacto en un punto. Sin fuerza y sin puntería.',
          media: {
            id: 'RV-17',
            kind: 'image',
            src: '/rompevidrios/incluye/punta-tungsteno.webp',
            aspect: '1:1',
            alt: 'Primer plano de la punta de tungsteno del llavero',
            brief: 'Macro de la punta de tungsteno, bien de cerca y con foco nítido.',
            spec: 'WEBP 1600×1600',
            pending: true,
          },
        },
        {
          id: 'cuchilla',
          title: 'Cuchilla corta cinturón',
          desc: 'Está escondida en una ranura: sólo entra un cinturón. Cortás de un tirón, aunque esté trabado.',
          media: {
            id: 'RV-18',
            kind: 'image',
            src: '/rompevidrios/incluye/cuchilla-cinturon.webp',
            aspect: '1:1',
            alt: 'Primer plano de la ranura con la cuchilla corta cinturón',
            brief: 'Macro de la ranura de la cuchilla, con un cinturón entrando.',
            spec: 'WEBP 1600×1600',
            pending: true,
          },
        },
        {
          id: 'vidrio',
          title: 'Vidrio de prueba',
          desc: 'Viene uno por llavero, para que lo pruebes vos mismo antes de necesitarlo.',
          media: {
            id: 'RV-05',
            kind: 'image',
            src: '/rompevidrios/test/vidrio-de-prueba.webp',
            aspect: '1:1',
            alt: 'El vidrio de prueba sano junto al llavero, como viene en la caja',
            brief: 'El vidrio de prueba sano junto al llavero, como viene en la caja.',
            spec: 'WEBP 1600×1600',
            pending: true,
          },
        },
        {
          id: 'soporte',
          title: 'Soporte adhesivo',
          desc: 'Lo pegás en el tablero o la consola y el llavero queda colocado, a mano y siempre en el mismo lugar.',
          media: {
            id: 'RV-19',
            kind: 'image',
            src: '/rompevidrios/incluye/soporte-adhesivo.webp',
            aspect: '1:1',
            alt: 'El soporte adhesivo pegado en el tablero con el llavero colocado',
            brief: 'El soporte adhesivo pegado en el tablero, con el llavero encastrado.',
            spec: 'WEBP 1600×1600',
            pending: true,
          },
        },
      ],
    },

    steps: {
      eyebrow: 'Listo en 3 pasos',
      title: '¿Cómo funciona?',
      accent: '',
      items: [
        {
          n: 1,
          title: 'Colocalo',
          desc: 'En su soporte del auto o colgado de la llave: siempre a mano para cuando lo necesites.',
          media: {
            id: 'RV-06',
            kind: 'gif',
            src: '/rompevidrios/pasos/01-colocalo.mp4',
            aspect: '1:1',
            alt: 'El llavero encastrado en su soporte del auto y colgado de la llave',
            brief: 'Montaje: el llavero entra y sale de su soporte en el tablero o la consola, y colgado de la llave.',
            spec: 'MP4 H.264 sin audio, loop 4–6 s, < 2 MB',
            pending: true,
          },
        },
        {
          n: 2,
          title: 'Apretá',
          desc: 'Apoyalo en una esquina de la ventanilla y apretá: el resorte dispara la punta de tungsteno y el vidrio estalla. Sin fuerza.',
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
      accent: 'qué te saca del auto.',
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
      accent: 'antes de salir a la ruta.',
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

    reviews: {
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
      accent: 'nada.',
      // TODO: confirmar plazo.
      body: 'Si el llavero no rompe el vidrio de prueba, te devolvemos la plata. Sin vueltas. [Confirmar plazo: 30 días].',
    },

    closing: {
      title: 'Dos mañanas posibles.',
      accent: 'posibles.',
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
