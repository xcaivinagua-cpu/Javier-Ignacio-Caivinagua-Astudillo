/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Photograph, PrintOption } from './types';

// Let's export the exact collection metadata as stated in the PDF
export interface CollectionInfo {
  id: 'landscape' | 'urban' | 'abstract' | 'minimalist';
  name: string;
  tagline: string;
  environments: string;
  description: string;
}

export const COLLECTIONS: CollectionInfo[] = [
  {
    id: 'landscape',
    name: 'Paisaje (Nature & Horizons)',
    tagline: 'Capturas de horizontes andinos y luz natural.',
    environments: 'Salones Principales, Recepciones de Hoteles, Espacios Residenciales Rústicos o Contemporáneos.',
    description: 'Capturas de horizontes andinos, las texturas de la serranía ecuatoriana bajo la niebla y la majestuosidad de la luz natural. Esta sección destaca por composiciones orgánicas y colores profundos que aportan serenidad y amplitud a los espacios.'
  },
  {
    id: 'urban',
    name: 'Urbano (Cityscapes & Heritage)',
    tagline: 'Misticismo de Cuenca y la vibrante energía de Nueva York.',
    environments: 'Oficinas Ejecutivas, Lofts Urbanos, Pasillos y Estudios Modernos.',
    description: 'Una mirada contrastante entre el misticismo histórico de Cuenca y la vibrante energía de metrópolis internacionales como Nueva York. Se centra en la majestuosidad arquitectónica nocturna, las plazas iluminadas y los juegos de luces que definen la vida de las urbes.'
  },
  {
    id: 'abstract',
    name: 'Abstracto (Motion & Light)',
    tagline: 'Experimentación visual y estelas de larga exposición.',
    environments: 'Espacios de Diseño Vanguardista, Comedores Formales, Galerías Privadas.',
    description: 'Obras enfocadas en la experimentación visual, barridos de movimiento de larga exposición y estelas luminosas que rompen la realidad. Ideal para interiores que buscan un punto focal dinámico, enérgico y conversacional.'
  },
  {
    id: 'minimalist',
    name: 'Minimalista (Textures & Form)',
    tagline: 'Pureza geométrica, planos cerrados y espacio negativo.',
    environments: 'Dormitorios, Áreas de Meditación, Spas, Oficinas de Estilo Nórdico o Minimalista.',
    description: 'Planos cerrados, enfoque en el detalle artesanal, la geometría y la pureza de la materia prima. Composiciones limpias con amplios espacios negativos que invitan a la introspección y complementan decoraciones sutiles y elegantes.'
  }
];

export const PRINT_OPTIONS: PrintOption[] = [
  {
    id: 'digital',
    name: 'Licencia Digital Fina',
    description: 'Archivo de alta resolución + Certificado digital firmado por Xavier Caivinagua listo para descarga inmediata.',
    dimensions: 'Archivo Digital Alta Resolución (TIFF/JPEG)',
    costAuthor: 25.00,
    costPrint: 0.00,
    totalCost: 25.00,
    isDigital: true,
    material: 'Descarga instantánea (Adecuado para impresión autónoma)',
    certificateType: 'digital'
  },
  {
    id: 'standard_print',
    name: 'Impresión Estándar (30x45 cm)',
    description: 'Impresión profesional en papel mate de alta calidad + Certificado físico firmado y numerado.',
    dimensions: '30 x 45 cm',
    costAuthor: 25.00,
    costPrint: 15.00,
    totalCost: 40.00,
    isDigital: false,
    material: 'Papel Mate Profesional de Alta Calidad',
    certificateType: 'analog'
  },
  {
    id: 'gallery_print',
    name: 'Impresión Galería Grande (60x90 cm)',
    description: 'Papel Fine Art de conservación digno de museo + Certificado físico numerado y firmado.',
    dimensions: '60 x 90 cm',
    costAuthor: 25.00,
    costPrint: 35.00,
    totalCost: 60.00,
    isDigital: false,
    material: 'Papel Fine Art de Conservación Ph Neutro',
    certificateType: 'analog'
  },
  {
    id: 'premium_canvas',
    name: 'Formato Premium en Canvas (40x60 cm)',
    description: 'Lienzo de calidad artística montado sobre bastidor elegante + Certificado físico firmado y numerado.',
    dimensions: '40 x 60 cm',
    costAuthor: 25.00,
    costPrint: 45.00,
    totalCost: 70.00,
    isDigital: false,
    material: 'Lienzo Fine Art montado sobre bastidor de madera maciza',
    certificateType: 'analog'
  }
];

export const PHOTOGRAPHS: Photograph[] = [
  {
    id: 'guardian_paramo',
    title: 'El guardián del páramo',
    englishTitle: 'Horses on the cordillera',
    artist: 'Xavier Caivinagua',
    year: '2025',
    collectionId: 'landscape',
    description: 'Un imponente retrato de la vida silvestre andina. Un caballo solitario parado en el páramo ecuatoriano, resistiendo el viento helado en medio de la misteriosa niebla de la cordillera.',
    specs: {
      camera: 'Fujifilm GFX 100S',
      lens: 'GF 32-64mm f/4 R LM WR',
      shutter: '1/250s',
      aperture: 'f/8.0',
      iso: '200'
    },
    imagePath: '/src/assets/images/guardian_paramo_1780436331803.png',
    limitedEditionCount: 50
  },
  {
    id: 'arcoiris_valle',
    title: 'Arcoíris sobre el valle',
    englishTitle: 'Rainbow over the valley',
    artist: 'Xavier Caivinagua',
    year: '2024',
    collectionId: 'landscape',
    description: 'Un asombroso arcoíris doble cruza e ilumina un valle fértil en las tierras altas ecuatorianas, justo en el momento exacto donde la tormenta cede ante el sol radiante.',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 24-70mm f/2.8 GM II',
      shutter: '1/160s',
      aperture: 'f/11',
      iso: '100'
    },
    imagePath: '/src/assets/images/arcoiris_valle_1780436343711.png',
    limitedEditionCount: 50
  },
  {
    id: 'catedral_inmaculada',
    title: 'Catedral de la Inmaculada',
    englishTitle: 'Immaculate Conception Cathedral at Night',
    artist: 'Xavier Caivinagua',
    year: '2025',
    collectionId: 'urban',
    description: 'Vista nocturna íntima desde el patio interior de la monumental catedral de Cuenca, Ecuador, capturando los ladrillos expuestos, detalles góticos y luces cálidas solemnes.',
    specs: {
      camera: 'Leica Q3',
      lens: 'Summilux 28mm f/1.7 ASPH',
      shutter: '1/15s (Soporte en mano)',
      aperture: 'f/1.7',
      iso: '1600'
    },
    imagePath: '/src/assets/images/catedral_inmaculada_1780436355768.png',
    limitedEditionCount: 30
  },
  {
    id: 'luces_callejon',
    title: 'Luces en el callejón',
    englishTitle: 'Alleyway Lights',
    artist: 'Xavier Caivinagua',
    year: '2025',
    collectionId: 'urban',
    description: 'Una composición urbana nocturna que explora el encanto medieval de Cuenca combinado con el espíritu poético de los rincones neoyorquinos. Faroles proyectan un juego misterioso en las veredas.',
    specs: {
      camera: 'Fujifilm X-T5',
      lens: 'XF 35mm f/1.4 R',
      shutter: '1/30s',
      aperture: 'f/1.4',
      iso: '800'
    },
    imagePath: '/src/assets/images/luces_callejon_1780436423524.png',
    limitedEditionCount: 30
  },
  {
    id: 'velocidad_luminica',
    title: 'Velocidad lumínica',
    englishTitle: 'Light Speed Trails',
    artist: 'Xavier Caivinagua',
    year: '2024',
    collectionId: 'abstract',
    description: 'Una estela dinámica de trazo de luces en fuga grabadas mediante exposición prolongada, simbolizando la aceleración constante del tiempo y el ritmo vibrante de la metrópolis de Nueva York.',
    specs: {
      camera: 'Canon EOS R5',
      lens: 'RF 15-35mm f/2.8L IS USM',
      shutter: '8s (Con trípode)',
      aperture: 'f/16',
      iso: '50'
    },
    imagePath: '/src/assets/images/velocidad_luminica_1780436366878.png',
    limitedEditionCount: 25
  },
  {
    id: 'manos_paja_toquilla',
    title: 'Manos de paja toquilla',
    englishTitle: 'Weaving Toquilla Hands',
    artist: 'Xavier Caivinagua',
    year: '2025',
    collectionId: 'minimalist',
    description: 'Retrato hiper-detallado de las manos expertas de un tejedor artesanal de paja toquilla en Ecuador. Una apología al detalle, la simetría y el valor atemporal de las técnicas ancestrales.',
    specs: {
      camera: 'Sony A7R V',
      lens: 'FE 90mm f/2.8 Macro G OSS',
      shutter: '1/125s',
      aperture: 'f/5.6',
      iso: '400'
    },
    imagePath: '/src/assets/images/manos_paja_toquilla_1780436378995.png',
    limitedEditionCount: 40
  }
];

// Modern mock rooms for beautiful in-living-room preview rendering for interior decoration
export interface DesignerRoom {
  id: string;
  name: string;
  imageAlt: string;
  bgClass: string; // Tailwind bg class simulating stylized modern room backgrounds
  canvasPlacementClass: string; // CSS styling class relative coordinates to position the photo mockup frame nicely
}

export const DESIGNER_ROOMS: DesignerRoom[] = [
  {
    id: 'living_grey',
    name: 'Salón Contemporáneo',
    imageAlt: 'Living room contemporary styled setup with gray walls',
    bgClass: 'bg-[#1e2022] border-t border-white/10 flex items-center justify-center p-12 min-h-[420px] relative overflow-hidden',
    canvasPlacementClass: 'w-48 h-64 md:w-56 md:h-76 absolute shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-8 border-neutral-900 bg-white shadow-2xl transition-all duration-300'
  },
  {
    id: 'office_modern',
    name: 'Oficina Ejecutiva',
    imageAlt: 'Elegant workspace or meeting room environment with rich wooden paneling',
    bgClass: 'bg-neutral-800 border-t border-white/10 flex items-center justify-center p-12 min-h-[420px] relative overflow-hidden',
    canvasPlacementClass: 'w-56 h-40 md:w-64 md:h-48 absolute shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] border-6 border-[#1a1510] bg-white transition-all duration-300'
  },
  {
    id: 'bedroom_scandi',
    name: 'Dormitorio Minimalista / Spa',
    imageAlt: 'Light wood panel, minimalist clean bed and natural lighting',
    bgClass: 'bg-[#ece9df] border-t border-neutral-200 flex items-center justify-center p-12 min-h-[420px] relative overflow-hidden text-neutral-800',
    canvasPlacementClass: 'w-44 h-56 md:w-52 md:h-64 absolute shadow-2xl border-4 border-[#eaeaea] bg-white transition-all duration-300'
  }
];
