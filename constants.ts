import { Product } from './types';

export const WHATSAPP_NUMBER = '5491100000000'; // Reemplazar con el número real de WhatsApp Business

export const COUNTRY_CODES = [
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+55', name: 'Brasil', flag: '🇧🇷' },
  { code: '+51', name: 'Perú', flag: '🇵🇪' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+52', name: 'México', flag: '🇲🇽' },
  { code: '+34', name: 'España', flag: 'es' },
  { code: '+1', name: 'EE.UU.', flag: '🇺🇸' },
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mochila Cinnamoroll Pastel',
    category: 'Mochilas',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb94c6a62?q=80&w=800&auto=format&fit=crop',
    description: 'Mochila reforzada con diseño kawaii. Ideal para el colegio o paseos.'
  },
  {
    id: '2',
    name: 'Juguete Antiestrés Pop-It',
    category: 'Juguetes',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=800&auto=format&fit=crop',
    description: 'Silicona de alta calidad, lavable y ultra resistente.'
  },
  {
    id: '3',
    name: 'Mini Parlante Bluetooth RGB',
    category: 'Mini electrónicos',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1608156639585-342c718e37ca?q=80&w=800&auto=format&fit=crop',
    description: 'Sonido 360 con luces LED rítmicas. Batería de larga duración.'
  },
  {
    id: '4',
    name: 'Set de Scrunchies Terciopelo',
    category: 'Accesorios',
    price: 3200,
    image: 'https://images.unsplash.com/photo-1621235123901-b549079a8385?q=80&w=800&auto=format&fit=crop',
    description: 'Pack de 5 coleros de suave terciopelo en colores pastel.'
  },
  {
    id: '5',
    name: 'Lámpara de Escritorio Flex',
    category: 'Librería y Hogar',
    price: 12500,
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=800&auto=format&fit=crop',
    description: 'Luz LED regulable con brazo flexible. Conexión USB.'
  },
  {
    id: '6',
    name: 'Taza Gatito de Cerámica',
    category: 'Regalos',
    price: 8900,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
    description: 'Incluye cuchara y tapa. Perfecta para regalo.'
  },
  {
    id: '7',
    name: 'Humidificador Aroma Mist',
    category: 'Librería y Hogar',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=800&auto=format&fit=crop',
    description: 'Mejora el aire de tu habitación. Silencioso y elegante.'
  },
  {
    id: '8',
    name: 'Mochila Urban Explorer',
    category: 'Mochilas',
    price: 52000,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop',
    description: 'Compartimento para notebook y múltiples bolsillos.'
  },
  {
    id: '9',
    name: 'Smartwatch Kids Edition',
    category: 'Mini electrónicos',
    price: 29500,
    image: 'https://images.unsplash.com/photo-1544117518-30df57809b04?q=80&w=800&auto=format&fit=crop',
    description: 'Reloj inteligente con juegos y recordatorios.'
  },
  {
    id: '10',
    name: 'Set Dibujo Profesional',
    category: 'Librería y Hogar',
    price: 15600,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=800&auto=format&fit=crop',
    description: 'Lápices, gomas y sacapuntas de alta gama para artistas.'
  },
];
