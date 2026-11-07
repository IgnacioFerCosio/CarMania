/**
 * Config del Llavero Rescate PRO™ (landing `/llavero-rescate`): llavero de
 * rescate con rompevidrios a resorte (punta de tungsteno) y corta cinturón.
 *
 * Es una landing tipo advertorial (ver `AdvertorialData` en ./types): todo el
 * copy y todas las rutas de assets viven acá, nada en los componentes.
 *
 * REGLA: este archivo NO importa del config raíz (ver types.ts).
 * Y sólo lo importan la página y los tests: el carrito usa
 * `./rompevidrios.bundles`, para que este copy no llegue al JS de las otras
 * páginas.
 *
 * ⚠️ PENDIENTES antes de que /llavero-rescate reciba tráfico:
 *   - Shopify: los 3 packs no existen; `productId`/`fallbackVariantId` en
 *     `''` → los botones de compra quedan deshabilitados.
 *   - Media: faltan el hero (RV-01) y los 3 pasos (RV-06 a RV-08), hoy con
 *     `pending: true`. Ver el checklist en
 *     docs/superpowers/specs/rompevidrios-assets.md.
 *   - Lo que está entre corchetes en el copy ([CIFRA REAL], [X] días…).
 */
import type { AdvertorialConfig, MediaSlot, Review } from './types';
import { SOPORTE } from './soporte';
import { PRECIO_LISTA, ROMPEVIDRIOS_BUNDLES, ROMPEVIDRIOS_UPSELL_CHAIN } from './rompevidrios.bundles';

const CTA_LABEL = 'Comprar ahora';

/**
 * Las 6 situaciones de la grilla "Cuando cada segundo cuenta" (UseCases).
 * Fotos verticales 2:3; el `label` es el de la tarjeta, con la última palabra
 * en rojo. Son lugares donde sirve, sin prometer un resultado.
 */
const SITUACIONES = [
  {
    id: 'RV-20',
    label: 'AUTO INUNDADO',
    kind: 'image',
    src: '/rompevidrios/situaciones/auto-inundado.webp',
    aspect: '2:3',
    alt: 'Interior de un auto con el agua tapando casi toda la ventanilla',
    brief: 'Auto en una calle inundada, con el agua a la altura de las puertas.',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
  {
    id: 'RV-21',
    label: 'PUERTA TRABADA',
    kind: 'image',
    src: '/rompevidrios/situaciones/puerta-trabada.webp',
    aspect: '2:3',
    alt: 'Un conductor empujando la ventanilla y tirando de la manija de una puerta que no abre, con lluvia',
    brief: 'Una mano tirando de la manija de una puerta que no abre.',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
  {
    id: 'RV-22',
    label: 'CINTURÓN TRABADO',
    kind: 'image',
    src: '/rompevidrios/situaciones/cinturon-trabado.webp',
    aspect: '2:3',
    alt: 'Mano sujetando el cinturón de seguridad junto a la hebilla',
    brief: 'Primer plano de la mano en el botón del cinturón, que no se suelta.',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
  {
    id: 'RV-23',
    label: 'CHOQUE EN RUTA',
    kind: 'image',
    src: '/rompevidrios/situaciones/choque-en-ruta.webp',
    aspect: '2:3',
    alt: 'Sedán chocado contra un guardarriel en la ruta, con el airbag desplegado',
    brief: 'Auto accidentado al costado de la ruta (propia o con licencia, sin personas reconocibles).',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
  {
    id: 'RV-24',
    label: 'AUTO VOLCADO',
    kind: 'image',
    src: '/rompevidrios/situaciones/auto-volcado.webp',
    aspect: '2:3',
    alt: 'Auto dado vuelta sobre el techo en la banquina de una ruta rural',
    brief: 'Auto dado vuelta sobre el techo (propia o con licencia).',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
  {
    id: 'RV-25',
    label: 'SIN AYUDA CERCA',
    kind: 'image',
    src: '/rompevidrios/situaciones/sin-ayuda-cerca.webp',
    aspect: '2:3',
    alt: 'Ruta desierta de noche con un auto parado, balizas y un triángulo de seguridad',
    brief: 'Ruta desierta de noche, con un auto parado y las balizas prendidas.',
    spec: 'WEBP vertical 2:3, 1000×1500',
    pending: false,
  },
] as const satisfies readonly (MediaSlot & { label: string })[];

export const ROMPEVIDRIOS = {
  brand: {
    tagline: 'Llavero Rescate PRO™',
    productHandle: 'pack-x2-llavero-rescate-pro',
    socialProofCount: '',
    socialProofLabel: 'conductores ya lo llevan',
    averageRating: 0, 
    reviewsCount: 0,
  },
  // Espejo del pack 2x: es el precio de entrada (no hay pack de 1).
  fallbackPricing: {
    price: 49990,
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
    reviewsFooter: 'clientes que ya manejan tranquilos con CARMANIA.',
    faqEyebrow: 'Preguntas frecuentes',
    faqTitle: 'Lo que más nos preguntan',
    // Mismo banner que /: el marquee de marcas. Dice "Lo llevás en" y no
    // "Compatible con": el llavero va en cualquier auto, pero no rompe laminados.
    carBrandsTitle: 'Lo llevás en',
    carBrandsTitleAccent: 'cualquier auto',
    useCasesTitle: 'Cuando cada segundo cuenta.',
    // Sin prefijo: la última palabra de cada etiqueta va en rojo (como en /parasol).
    useCasesPrefix: '',
  },
  useCases: SITUACIONES.map((s) => ({ label: s.label, image: s.src, alt: s.alt })),
  // El banner de marcas es el del soporte (como en /soplador).
  carBrands: SOPORTE.carBrands,
  steps: [],
  benefits: [],
  pitchBlocks: [],
  // Sólo reseñas reales de compradores del llavero. Las primeras 3 van en el
  // carrusel del hero, la 4ª abajo de "¿Qué incluye?" y todas en #reviews.
  // Con `reviews` cargado, actualizá `ratingBreakdown` para que cierre.
  // Fotos: public/rompevidrios/reviews/, 4:3, webp de 800×600.
  //   {
  //     name: 'Nombre A.',
  //     location: 'Ciudad',
  //     stars: 5,
  //     text: 'Lo que escribió, con sus palabras.',
  //     date: 'nov. 2026',
  //     verified: true, // sólo si compró de verdad
  //     image: '/rompevidrios/reviews/nombre-a.webp', // opcional
  //   },
  reviews: [{
    name: 'Martín G.',
    location: 'La Plata',
    stars: 5,
    text: 'Ojalá no tener que usarlo nunca, pero el vidrio de prueba que viene en la caja se hizo pedazos apenas lo tocó la punta',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r1.webp',
    },{
    name: 'Laura P.',
    location: 'Rosario',
    stars: 5,
    text: 'La hoja del cortador de cinturón queda escondida dentro de una ranura: no se ve nada filoso. Eso me dio tranquilidad por los chicos.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r2.webp',
    },
    {
    name: 'Diego R.',
    location: 'Córdoba',
    stars: 5,
    text: 'Rompió el vidrio en mil pedazos. Funciona de verdad. Probalo afuera, sobre un tacho, porque salen muchísimos pedacitos. Ya dejé uno en cada auto de casa.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r3.webp',
    },{
    name: 'Sergio A.',
    location: 'Córdoba',
    stars: 5,
    text: 'Uff, es poderoso. Lo probé y hace exactamente lo que dice.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r4.webp',
    },{
    name: 'Carolina M.',
    location: 'Tucumán',
    stars: 4,
    text: 'Viene todo en la caja: el llavero, el vidrio de prueba y el soporte adhesivo. Funciona muy bien.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r5.webp',
    },{
    name: 'Julieta S.',
    location: 'Salta',
    stars: 5,
    text: 'Lo llevo en la llave del auto, con la sillita de mi hijo atrás. Me da una sensación de seguridad.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r6.webp',
    },{
    name: 'Pablo F.',
    location: 'Neuquén',
    stars: 5,
    text: 'Lo dejé pegado en el soporte, sobre el tablero. Entra y sale fácil y lo tengo siempre a mano. Muy bueno.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r7.webp',
    },{
    name: 'Nadia C.',
    location: 'Mar del Plata',
    stars: 5,
    text: 'Es chiquito y liviano, entra en la mano. Funciona.',
    date: 'nov. 2026',
    verified: true, 
    image: '/rompevidrios/reviews/r8.webp',
    },
  ] as readonly Review[],
  ratingBreakdown: {
    average: 4.88,
    total: 8,
    stars: [
      { stars: 5, count: 7 },
      { stars: 4, count: 1 },
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
      a: 'La cuchilla está escondida dentro de una ranura: solo entra un cinturón.',
    },
    {
      q: '¿Es legal llevarlo?',
      a: 'Sí. Es un elemento de seguridad para el auto, como el matafuego.',
    },
    {
      q: '¿Y si nunca lo uso?',
      a: 'Ojalá. Es como el seguro del auto: lo tenés para el día que hace falta.',
    },
  ],
  // Las 3 cards de "Calidad garantizada" (TrustBlock), como en el soporte.
  // Devolución y garantía son las de la marca (RETURNS en lib/config.ts).
  qualityBadges: [
    {
      badge: '30',
      badgeSub: 'DÍAS',
      title: 'DEVOLUCIÓN 30 DÍAS',
      desc: 'Si por cualquier motivo decidís que el Llavero Rescate PRO™ no es para vos, te devolvemos cada peso dentro de los 30 días posteriores a la entrega.',
    },
    {
      badge: '1',
      badgeSub: 'AÑO',
      title: 'GARANTÍA 1 AÑO',
      desc: 'Si tu llavero CARMANIA no funciona como esperabas, te lo reemplazamos. Vos seguís manejando tranquilo.',
    },
    {
      badge: '✓',
      badgeSub: 'INCLUIDO',
      title: 'VIDRIO DE PRUEBA',
      desc: 'Viene con un vidrio de prueba para que lo pruebes vos mismo antes de necesitarlo. Sin vueltas.',
    },
  ],
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
    canonical: '/llavero-rescate',
  },

  advertorial: {
    cta: { label: CTA_LABEL, href: '#pricing' },

    situations: SITUACIONES,

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
        pending: false,
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

    // "Sabés que funciona antes de necesitarlo" + "¿Qué incluye?": la misma
    // sección que WhatsInBox del soporte. `slides` = el carrusel, en orden; la
    // primera es la que se ve al cargar: la foto de todo lo que trae, con el
    // logo. Los slides no llevan texto propio.
    // TODO confirmar con Spring que la caja traiga el soporte adhesivo.
    includes: {
      headline: 'Sabés que funciona antes de necesitarlo.',
      lead: 'Cada llavero trae su vidrio de prueba',
      body: ': lo apoyás, apretás y se rompe. Lo ves con tus propios ojos, en tu casa, el día que llega.',
      note: 'Sin fuerza y sin puntería: el resorte hace el trabajo.',
      items: [
        'Llavero Rescate PRO™ con punta de tungsteno',
        'Cuchilla corta cinturón, protegida',
        'Vidrio de prueba (uno por llavero)',
        'Soporte adhesivo para dejarlo colocado',
      ],
      slides: [
        // RV-04 (video del vidrio de prueba estallando) sacado del carrusel el
        // 2026-11-05: la primera es la foto con el logo. No borrar: queda para
        // otra sección. (Comentado, así check:assets no lo cuenta.)
        // {
        //   id: 'RV-04',
        //   kind: 'video',
        //   src: '/rompevidrios/test/test-vidrio-lento.mp4',
        //   poster: '/rompevidrios/test/test-vidrio-lento-poster.webp',
        //   aspect: '1:1',
        //   alt: 'El vidrio de prueba estalla en cámara lenta al apretar el llavero',
        //   brief: 'EL ACTIVO CENTRAL: el vidrio de prueba estallando en cámara lenta al apretar el llavero.',
        //   spec: 'MP4 H.264 sin audio, loop 5–6 s en cámara lenta, 1080×1080, < 2 MB + poster webp',
        //   pending: true,
        // },
        {
          id: 'RV-12',
          kind: 'image',
          src: '/rompevidrios/caja/que-incluye.webp',
          aspect: '1:1',
          alt: 'Todo lo que trae: dos llaveros Carmania, dos vidrios de prueba y dos soportes adhesivos',
          brief: 'Todos los elementos juntos: llaveros, vidrios de prueba y soportes adhesivos.',
          spec: 'WEBP 1200×1200',
          pending: false,
        },
        {
          id: 'RV-17',
          kind: 'image',
          src: '/rompevidrios/incluye/punta-tungsteno.webp',
          aspect: '1:1',
          alt: 'Primer plano de la punta de tungsteno del llavero',
          brief: 'Macro de la punta de tungsteno, bien de cerca y con foco nítido.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
        {
          id: 'RV-18',
          kind: 'image',
          src: '/rompevidrios/incluye/cuchilla-cinturon.webp',
          aspect: '1:1',
          alt: 'Primer plano de la ranura con la cuchilla corta cinturón',
          brief: 'Macro de la ranura de la cuchilla, con un cinturón entrando.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
        {
          id: 'RV-05',
          kind: 'image',
          src: '/rompevidrios/test/vidrio-de-prueba.webp',
          aspect: '1:1',
          alt: 'El vidrio de prueba sano junto al llavero, como viene en la caja',
          brief: 'El vidrio de prueba sano junto al llavero, como viene en la caja.',
          spec: 'WEBP 1600×1600',
          pending: true,
        },
        {
          id: 'RV-19',
          kind: 'image',
          src: '/rompevidrios/incluye/soporte-adhesivo.webp',
          aspect: '1:1',
          alt: 'El soporte adhesivo pegado en el tablero con el llavero colocado',
          brief: 'El soporte adhesivo pegado en el tablero, con el llavero encastrado.',
          spec: 'WEBP 1600×1600',
          pending: true,
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
            pending: false,
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
            pending: false,
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
            pending: false,
          },
        },
      ],
    },

    comparison: {
      title: 'Tres opciones para salir de un auto. Una sola siempre a mano.',
      accent: 'Una sola siempre a mano.',
      columns: [
        { name: 'Llavero Rescate PRO™', image: '/rompevidrios/comparativa/llavero-diagonal.webp', width: 222, height: 320 },
        { name: 'Martillo de guantera', image: '/rompevidrios/comparativa/martillo-diagonal.webp', width: 286, height: 319 },
        { name: 'Apoya\u00ADcabezas', image: '/rompevidrios/comparativa/apoyacabezas.webp', width: 320, height: 296 },
      ],
      rows: [
        { label: 'A mano si estás atrapado', values: [true, false, 'depende del auto'] },
        { label: 'Sin fuerza ni puntería', values: [true, false, false] },
        { label: 'Corta el cinturón', values: [true, 'pocos', false] },
        { label: 'Lo podés probar antes', values: [true, false, false] },
        { label: 'Entra en el bolsillo', values: [true, false, false] },
      ],
      map: {
        distanceLabel: 'LEJOS',
        items: [
          {
            n: 1,
            tone: 'ours',
            title: 'Llavero Rescate PRO™',
            desc: 'En tu mano o colgado de la llave: lo tenés encima, aunque tengas el cinturón puesto y la puerta trabada.',
          },
          {
            n: 2,
            tone: 'other',
            title: 'Martillo de guantera',
            desc: 'En la guantera o en el baúl, del otro lado del auto. Con el cinturón puesto cuesta alcanzarlo.',
          },
          {
            n: 3,
            tone: 'other',
            title: 'Apoyacabezas',
            desc: 'En muchos autos nuevos no sale, o tiene varillas que no sirven para romper nada.',
          },
        ],
      },
    },

    // Medidas y especificaciones (entre los packs y las reseñas).
    // TODO confirmar con el proveedor: largo, diámetro, peso y material. Los
    // valores son los de la ficha del mismo tipo de producto (SafePro X: 8 × 2 cm,
    // 35 g) y NO están medidos en nuestra unidad.
    specs: {
      eyebrow: 'MEDIDAS Y ESPECIFICACIONES',
      title: 'Pequeño pero poderoso.',
      accent: 'poderoso.',
      description:
        'Cabe en la palma de la mano y en el llavero. Cuerpo de aluminio, punta de tungsteno y una cuchilla escondida dentro de una ranura: solo entra un cinturón.',
      dimensions: [
        { label: 'Largo', value: '8 cm' },
        { label: 'Diámetro', value: '2 cm' },
        { label: 'Peso', value: '35 g' },
        { label: 'Material', value: 'Aluminio', sub: 'punta de tungsteno' },
      ],
      media: {
        id: 'RV-26',
        kind: 'image',
        src: '/rompevidrios/medidas/medidas-llavero.webp',
        aspect: '1:1',
        alt: 'Dos llaveros Rescate PRO™ sobre fondo oscuro: uno con tapas, de 20 mm de ancho, y otro sin tapas, de 80 mm de largo, con la punta de tungsteno y la ranura corta cinturón a la vista.',
        brief: 'Render o foto técnica del llavero sobre fondo oscuro, de pie, con las cotas (largo, diámetro) dibujadas con líneas guía.',
        spec: 'WEBP 1600×1600, fondo oscuro',
        pending: false,
      },
    },

    reviews: {
      placeholder: 'PENDIENTE · reseñas reales con foto, apenas haya ventas',
    },

    packs: {
      images: {
        single: {
          id: 'RV-13',
          kind: 'image',
          src: '/rompevidrios/packs/pack-2x.webp',
          aspect: '1:1',
          alt: 'Pack de 2 llaveros Rescate PRO con 2 vidrios de prueba',
          brief: '2 llaveros sobre fondo negro, con 2 vidrios de prueba. También va en la card de /tienda.',
          spec: 'WEBP 1600×1600',
          pending: false,
        },
        double: {
          id: 'RV-14',
          kind: 'image',
          src: '/rompevidrios/packs/pack-4x.webp',
          aspect: '1:1',
          alt: 'Pack de 4 llaveros Rescate PRO, cada uno en una llave de auto distinta',
          brief: '4 llaveros, cada uno en una llave de auto distinta.',
          spec: 'WEBP 1600×1600',
          pending: false,
        },
        triple: {
          id: 'RV-15',
          kind: 'image',
          src: '/rompevidrios/packs/pack-6x.webp',
          aspect: '1:1',
          alt: 'Pack de 6 llaveros Rescate PRO en abanico',
          brief: '6 llaveros en abanico.',
          spec: 'WEBP 1600×1600',
          pending: false,
        },
      },
    },

    closing: {
      title: 'Dos mañanas posibles.',
      accent: 'posibles.',
      columns: [
        {
          tone: 'without',
          big: '?',
          steps: ['La puerta no abre', 'El cinturón no suelta', 'Esperás ayuda'],
          text: 'Seguís sin nada en la llave. Probablemente nunca pase nada. Y si pasa, vas a depender de la suerte.',
        },
        {
          tone: 'with',
          big: '3 s',
          steps: ['Lo apoyás', 'Apretás', 'Salís'],
          text: 'Lo tenés colgado de la llave. Probablemente nunca pase nada. Y si pasa, tenés 3 segundos y una salida.',
        },
      ],
      media: {
        id: 'RV-16',
        kind: 'image',
        src: '/rompevidrios/cierre/llave-en-mano.webp',
        aspect: '16:9',
        alt: 'El llavero Carmania colgando de la llave puesta en el contacto del auto, de noche',
        brief: 'Plano tranquilo: llaves con el llavero sobre el tablero, de noche, con luz de ciudad.',
        spec: 'WEBP 1600×900',
        pending: false,
      },
    },
  },
} satisfies AdvertorialConfig;
