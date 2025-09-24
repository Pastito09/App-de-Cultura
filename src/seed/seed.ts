import bcryptjs from 'bcryptjs';

type EventType =
  | 'concierto'
  | 'teatro'
  | 'fiesta'
  | 'feria'
  | 'otros';

interface SeedEvent {
  DevId: string;

  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string; // Formato "HH:mm"

  eventLocationName: string;
  eventLocation: string; // Array de strings para la dirección
  image: string;
  tags: string[]; // Array de strings para las etiquetas
  createdAt: Date;
  ticketPrice: string;
  eventType: EventType;
}

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user'; // Rol del usuario
}

interface SeedData {
  events: SeedEvent[];
  users: SeedUser[];
}

const hoy = new Date();

function agregarDias(fecha: Date, dias: number): Date {
  const nuevaFecha = new Date(fecha);
  nuevaFecha.setDate(fecha.getDate() + dias);
  return nuevaFecha;
}

export const initialData: SeedData = {
  users: [
    {
      email: 'patriciozhogan@gmail.com',
      password: bcryptjs.hashSync('123456'),
      name: 'Patricio',
      role: 'admin',
    },
    {
      email: 'amadeo@gmail.com',
      password: bcryptjs.hashSync('123456'),
      name: 'Amadeo',
      role: 'user',
    },
  ],
  events: [
    {
      DevId: '1',
      eventTitle: 'Duhalde en vivo',
      eventDescription:
        'Duchalde hace temas de su primer disco en bolas',
      eventDate: agregarDias(hoy, 2),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Casa Abierta',
      eventLocation: 'Calle falsa 123, Lomas de Zamora',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '5500',
      eventType: 'concierto',
    },
    {
      DevId: '2',
      eventTitle: 'Ambito Fumanchero + Brea',
      eventDescription:
        'Ambito presenta su disco en compania de sus amigos de brea',
      eventDate: agregarDias(hoy, 2),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Cultura del sur',
      eventLocation: 'Meeks 1066, Temperley',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '0',
      eventType: 'concierto',
    },
    {
      DevId: '3',
      eventTitle: 'Unión + Basura post-punk',
      eventDescription: 'Vuelve la U a Strummer gratis',
      eventDate: agregarDias(hoy, 6),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Strummer Bar',
      eventLocation: 'Godoy Cruz 1939, Palermo',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '3000',
      eventType: 'concierto',
    },
    {
      DevId: '4',
      eventTitle: 'Usted esta siendo interpretado!',
      eventDescription:
        'Por Luis Maria Carnicetti, vuelve el unipersonal a la feria sudaka',
      eventDate: agregarDias(hoy, 14),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Feria Sudaka',
      eventLocation: 'Portela 145, Lomas de Zamora',
      image: '/ambito.jpg',
      tags: ['humor', 'improvisación', 'teatro'],
      createdAt: new Date(),
      ticketPrice: '6000',
      eventType: 'teatro',
    },
    {
      DevId: '5',
      eventTitle: 'Ambito Fumanchero y Ortiba(La Plata)',
      eventDescription:
        'Viene de visita Ortiba y vamos a estar toda la noche meta humo',
      eventDate: agregarDias(hoy, 25),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'CC Morrison',
      eventLocation: 'Yapeyú 562, Boedo',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '10000',
      eventType: 'concierto',
    },
    {
      DevId: '6',
      eventTitle: 'Feliz Entierro 25 años',
      eventDescription:
        'Festejamos 25 años de historia y estas invitade',
      eventDate: agregarDias(hoy, 28),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Gringo Viejo',
      eventLocation: 'Calle falsa 123, Glew',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '4600',
      eventType: 'concierto',
    },
    {
      DevId: '7',
      eventTitle: 'Tres Bife, Semprini y La Tumba del Alca',
      eventDescription:
        'En el Tio Bizarro vamos a flashear toda la noche',
      eventDate: agregarDias(hoy, 55),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Tio Bizarro',
      eventLocation: 'Pellegrini 123, Burzaco',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '8000',
      eventType: 'concierto',
    },

    {
      DevId: '9',
      eventTitle: 'Festa Feria',
      eventDescription:
        'Se viene la fiesta del año! en la cultura del sur',
      eventDate: agregarDias(hoy, 4),
      startTime: '22:00', // Formato "HH:mm"

      eventLocationName: 'Cultura del Sur',
      eventLocation: 'Av. Meeks, Temperley',
      image: '/ambito.jpg',
      tags: ['rock', 'reggae', 'punk'],
      createdAt: new Date(),
      ticketPrice: '7000',
      eventType: 'fiesta',
    },
    // {
    //   DevId: '1',
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
    //   DevId: '2',
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
    //   DevId: '3',
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
    //   DevId: '4',
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
    //   DevId: '5',
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
    //   DevId: '6',
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
    //   DevId: '7',
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
