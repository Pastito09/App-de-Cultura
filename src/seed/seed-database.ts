import { initialData } from './seed';
import { prisma } from '../lib/prisma';
import { titleTransform } from '../utils/titleTransform';

async function main() {
  // Eliminar todos los registros existentes en las tablas

  await prisma.eventImage.deleteMany();
  await prisma.event.deleteMany();

  await prisma.account.deleteMany();
  await prisma.session.deleteMany();

  await prisma.user.deleteMany();

  const { events, users } = initialData;

  await prisma.user.createMany({ data: users });
  const usuariosDB = await prisma.user.findMany();

  const usuariosMap = usuariosDB.reduce((map, user) => {
    map[user.email!] = user.id;
    return map;
  }, {} as Record<string, string>); // patriciozhogan@gmail.com : user.id

  for (const { DevId, eventTitle, image, ...event } of events) {
    const createdEvent = await prisma.event.create({
      data: {
        ...event,
        eventTitle,
        eventSlug: titleTransform(eventTitle),
        user: {
          connect: { id: usuariosMap['patriciozhogan@gmail.com'] },
        },
      },
    });

    await prisma.eventImage.create({
      data: {
        url: image || '/ambito.jpg',
        publicId: 'ambito', // Asignar un ID por defecto si no hay imagen
        eventId: createdEvent.id,
      },
    });
  }

  console.log('Seed ejecutado con éxito');
}
(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();

// await prisma.event.createMany({
//   data: events.map(({ DevId, eventTitle, ...event }) => ({
//     ...event,
//     eventTitle: eventTitle,
//     eventSlug: titleTransform(eventTitle),
//     image: {
//       url: img.url,
//       id: img.id,
//     },
//     userId: usuariosMap['patriciozhogan@gmail.com'],
//   })),
// });

// const eventsDB = await prisma.event.findFirst({
//   where: {
//     userId: usuariosMap['patriciozhogan@gmail.com'],
//   },
// });

// const { image } = events[0];

// console.log();

// events.forEach(async (event) => {
//   const {} = event;
// });
// //   // Eventos

//   // await prisma.event.create({
//   data: {
//     userId: usuariosDB[0].id,
//     ...events[0],
//   },
// });

// const createdUsers = await Promise.all(
//   users.map((user) =>
//     prisma.user.create({
//       data: {
//         email: user.email,
//         name: user.name,
//         password: user.password,
//         role: user.role.toUpperCase() as 'ADMIN' | 'USER', // casteo para que coincida con el enum
//       },
//     })
//   )
// );

// const adminUser = createdUsers.find((user) => user.role === 'USER');

// if (!adminUser) {
//   throw new Error('No se encontró un usuario con rol USER');
// }

// Crear eventos con relación al usuario admin y su imagen
// const createdBy = createdUsers.find(
//   (user) => user.role === Role.USER
// );
// if (!createdBy) {
//   throw new Error('No existe usuario creador');
// }

// const eventDB = events.map((event) => ({}));

// for (const event of events) {
//   await prisma.event.create({
//     data: {
//       eventTitle: event.eventTitle,
//       eventDescription: event.eventDescription,
//       eventDate: event.eventDate,
//       startTime: event.startTime,
//       endTime: event.endTime,
//       eventLocationName: event.eventLocationName,
//       eventLocation: event.eventLocation,
//       tags: event.tags,
//       createdAt: event.createdAt,
//       ticketPrice: event.ticketPrice,
//       eventType: event.eventType,
//       userId: adminUser.id,
//       image: event.image,
//     },
//   });
// }
