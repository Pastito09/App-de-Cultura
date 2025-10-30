'use server';

import todayAt8UTC from '@/utils/todayAt8UTC';
import { EventType } from '../../../generated/prisma/index';
import { prisma } from '@/lib/prisma';

interface PaginatedEventsProps {
  page?: number;
  take?: number;
  EventType?: EventType;
}

export const getPaginatedEvents = async ({
  page = 1,
  take = 8,
  EventType,
}: PaginatedEventsProps) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;
  const skip = (page - 1) * take;

  const now = new Date();
  try {
    const where: any = EventType ? { eventType: EventType } : {};

    const events = await prisma.event.findMany({
      where,
      include: {
        image: {
          select: {
            url: true,
            id: true,
            eventId: true,
            publicId: true,
          },
        },
        user: { select: { email: true, id: true } },
      },
      orderBy: { eventDate: 'asc' },
    });

    // 🔹 Filtramos en memoria: mostrar solo eventos que aún no terminaron (startTime + 8h)
    const filtered = events.filter((event) => {
      if (!event.eventDate || !event.startTime) return false;

      const [hours, minutes] = event.startTime.split(':').map(Number);
      if (isNaN(hours) || isNaN(minutes)) return false;

      const eventStart = new Date(event.eventDate);
      eventStart.setHours(hours, minutes, 0, 0);

      const eventEnd = new Date(eventStart);
      eventEnd.setHours(eventEnd.getHours() + 8); // Vigencia 8 horas desde el inicio

      return eventEnd >= now; // Mostrar si todavía no terminó
    });

    // 🔹 Paginación
    const totalEvents = filtered.length;
    const totalPages = Math.ceil(totalEvents / take);
    const paginated = filtered.slice(skip, skip + take);

    return {
      ok: true,
      currentPage: page,
      totalPages,
      events: paginated,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener los eventos páginados');
  }
};

// const dayFilter: Prisma.EventWhereInput = {
//   eventDate: {
//     gte: todayAt8,
//   },
// };

// const where: Prisma.EventWhereInput = EventType
//   ? { AND: [{ eventType: EventType }, dayFilter] }
//   : dayFilter;

// const events = await prisma.event.findMany({
//   take: take,
//   skip: skip,

//   where: where,
//   include: {
//     image: {
//       select: {
//         url: true,
//         id: true,
//         eventId: true,
//         publicId: true,
//       },
//     },
//     user: {
//       select: {
//         email: true,
//         id: true,
//       },
//     },
//   },
//   orderBy: {
//     eventDate: 'asc',
//   },
// });

// const totalEvents = await prisma.event.count({ where: where });

// const totalPages = Math.ceil(totalEvents / take);

// return {
//   ok: true,
//   currentPage: page,
//   totalPages: totalPages,
//   events: events.map((event) => ({
//     ...event,
//   })),
// };
