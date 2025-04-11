import { Evento } from '@/interface/Evento.interface';

interface SeedData {
  events: Evento[];
}

const hoy = new Date();

function agregarDias(fecha: Date, dias: number): Date {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setDate(fecha.getDate() + dias);
  return nuevaFecha;
}

export const initialData: SeedData = {
  events: [
    {
      id: '1',
      eventTitle: 'Duhalde en vivo',
      eventDescription:
        'Duchalde hace temas de su primer disco en bolas',
      eventDate: agregarDias(hoy, 2),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'Casa Abierta',
      eventLocation: ['Calle falsa 123', 'Lomas de Zamora'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '2',
      eventTitle: 'Ambito Fumanchero + Brea',
      eventDescription:
        'Ambito presenta su disco en compania de sus amigos de brea',
      eventDate: agregarDias(hoy, 2),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'Cultura del sur',
      eventLocation: ['Meeks 1066', 'Temperley'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '3',
      eventTitle: 'Unión + Basura post-punk',
      eventDescription: 'Vuelve la U a Strummer gratis',
      eventDate: agregarDias(hoy, 6),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'Strummer Bar',
      eventLocation: ['Godoy Cruz 1939', 'Palermo'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '4',
      eventTitle: 'Payasos de Nadie vuelve al ruedo!',
      eventDescription:
        'Vamos a tocar clasicos acompañados de nuestros amigos de siempre',
      eventDate: agregarDias(hoy, 21),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'CC El Gaucho',
      eventLocation: ['Alsina 1465', 'Burzaco'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '5',
      eventTitle: 'Ambito Fumanchero y Ortiba(La Plata)',
      eventDescription:
        'Viene de visita Ortiba y vamos a estar toda la noche meta humo',
      eventDate: agregarDias(hoy, 25),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'CC Morrison',
      eventLocation: ['Yapeyú 562', 'Boedo'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '6',
      eventTitle: 'Feliz Entierro 25 años',
      eventDescription:
        'Festejamos 25 años de historia y estas invitade',
      eventDate: agregarDias(hoy, 28),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'Gringo Viejo',
      eventLocation: ['Calle falsa 123', 'Glew'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    {
      id: '7',
      eventTitle: 'Tres Bife, Semprini y La Tumba del Alca',
      eventDescription:
        'En el Tio Bizarro vamos a flashear toda la noche',
      eventDate: agregarDias(hoy, 35),
      startTime: '22:00', // Formato "HH:mm"
      endTime: '23:00',
      eventLocationName: 'Tio Bizarro',
      eventLocation: ['Pellegrini 123', 'Burzaco'],
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
    },
    // {
    //   id: '1',
    //   title: 'Duhalde en vivo',
    //   description: 'Duchalde hace temas de su primer disco en bolas',
    //   initialDate: new Date('2025-05-05T20:00:00'),
    //   finalDate: new Date('2025-05-05T22:00:00'),
    //   locationName: 'Casa Abierta',
    //   location: 'Calle falsa 123',
    //   image: '/ambito.jpg',
    //   eventType: 'privado',
    // },
    // {
    //   id: '2',
    //   title: 'Ambito Fumanchero + Brea',
    //   description:
    //     'Ambito presenta su disco en compania de ssus amigos de brea',
    //   initialDate: new Date('2025-06-07T22:00:00'),
    //   finalDate: new Date('2025-06-07T23:00:00'),
    //   locationName: 'Cultura del sur',
    //   location: 'Meeks 1066',
    //   image: '/ambito.jpg',
    //   eventType: 'publico',
    // },
    // {
    //   id: '3',
    //   title: 'Festival por el monte',
    //   description:
    //     'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
    //   initialDate: new Date('2025-05-09T21:00:00'),
    //   finalDate: new Date('2025-05-09T22:00:00'),
    //   locationName: 'Salón Pueyrredón',
    //   location: 'Av. Santa Fe 2385',
    //   image: '/ambito.jpg',
    //   eventType: 'publico',
    // },
    // {
    //   id: '4',
    //   title: 'Festival por el monte',
    //   description:
    //     'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
    //   initialDate: new Date('2025-04-22T21:00:00'),
    //   finalDate: new Date('2025-04-22T22:00:00'),
    //   locationName: 'Salón Pueyrredón',
    //   location: 'Av. Santa Fe 2385',
    //   image: '/ambito.jpg',
    //   eventType: 'publico',
    // },
    // {
    //   id: '5',
    //   title: 'Festival por el monte',
    //   description:
    //     'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
    //   initialDate: new Date('2025-04-30T21:00:00'),
    //   finalDate: new Date('2025-04-30T22:00:00'),
    //   locationName: 'Salón Pueyrredón',
    //   location: 'Av. Santa Fe 2385',
    //   image: '',
    //   eventType: 'publico',
    // },
    // {
    //   id: '6',
    //   title: 'Festival por el monte',
    //   description:
    //     'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
    //   initialDate: new Date('2025-05-21T21:00:00'),
    //   finalDate: new Date('2025-05-21T22:00:00'),
    //   locationName: 'Salón Pueyrredón',
    //   location: 'Av. Santa Fe 2385',
    //   image: '',
    //   eventType: 'publico',
    // },
    // {
    //   id: '7',
    //   title: 'Festival por el monte',
    //   description:
    //     'Tronor, Compañero Asma y Pez a beneficio por los incendios en el sur',
    //   initialDate: new Date('2025-05-19T21:00:00'),
    //   finalDate: new Date('2025-05-19T22:00:00'),
    //   locationName: 'Salón Pueyrredón',
    //   location: 'Av. Santa Fe 2385',
    //   image: '',
    //   eventType: 'publico',
    // },
  ],
};
