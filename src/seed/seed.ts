interface Evento {
  id: string;
  title: string;
  description: string;
  initialDate: Date;
  finalDate: Date;
  locationName: string;
  location: string;
  image?: string;
  eventType: 'publico' | 'privado';
}

interface SeedData {
  events: Evento[];
}

export const initialData: SeedData = {
  events: [
    {
      id: '1',
      title: 'Duhalde en vivo',
      description: 'Duchalde hace temas de su primer disco en bolas',
      initialDate: new Date('2025-05-05T20:00:00'),
      finalDate: new Date('2025-05-05T22:00:00'),
      locationName: 'Casa Abierta',
      location: 'Calle falsa 123',
      image: '/ambito.jpg',
      eventType: 'privado',
    },
    {
      id: '2',
      title: 'Ambito Fumanchero + Brea',
      description:
        'Ambito presenta su disco en compania de sus amigos de brea',
      initialDate: new Date('2025-06-07T22:00:00'),
      finalDate: new Date('2025-06-07T23:00:00'),
      locationName: 'Cultura del sur',
      location: 'Meeks 1066',
      image: '/ambito.jpg',
      eventType: 'publico',
    },
    {
      id: '3',
      title: 'Festival por el monte',
      description:
        'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
      initialDate: new Date('2025-05-09T21:00:00'),
      finalDate: new Date('2025-05-09T22:00:00'),
      locationName: 'Salón Pueyrredón',
      location: 'Av. Santa Fe 2385',
      image: '/ambito.jpg',
      eventType: 'publico',
    },
    {
      id: '4',
      title: 'Festival por el monte',
      description:
        'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
      initialDate: new Date('2025-04-22T21:00:00'),
      finalDate: new Date('2025-04-22T22:00:00'),
      locationName: 'Salón Pueyrredón',
      location: 'Av. Santa Fe 2385',
      image: '/ambito.jpg',
      eventType: 'publico',
    },
    {
      id: '5',
      title: 'Festival por el monte',
      description:
        'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
      initialDate: new Date('2025-04-30T21:00:00'),
      finalDate: new Date('2025-04-30T22:00:00'),
      locationName: 'Salón Pueyrredón',
      location: 'Av. Santa Fe 2385',
      image: '',
      eventType: 'publico',
    },
    {
      id: '6',
      title: 'Festival por el monte',
      description:
        'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
      initialDate: new Date('2025-05-21T21:00:00'),
      finalDate: new Date('2025-05-21T22:00:00'),
      locationName: 'Salón Pueyrredón',
      location: 'Av. Santa Fe 2385',
      image: '',
      eventType: 'publico',
    },
    {
      id: '7',
      title: 'Festival por el monte',
      description:
        'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
      initialDate: new Date('2025-05-19T21:00:00'),
      finalDate: new Date('2025-05-19T22:00:00'),
      locationName: 'Salón Pueyrredón',
      location: 'Av. Santa Fe 2385',
      image: '',
      eventType: 'publico',
    },
  ],
};
