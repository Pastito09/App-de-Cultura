'use server';

import todayAt8UTC from '@/utils/todayAt8UTC';
import { EventType, Prisma } from '../../../generated/prisma/index';
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
  const todayAt8 = todayAt8UTC();
  try {
    const todayAt8ISO = todayAt8.toISOString();

    const where: Prisma.EventWhereInput = {
      OR: [
        {
          eventDate: {
            gt: todayAt8,
          },
        },
        {
          eventDate: {
            equals: new Date(
              todayAt8.getFullYear(),
              todayAt8.getMonth(),
              todayAt8.getDate()
            ),
          },
          startTime: {
            gte: todayAt8ISO.slice(11, 16),
          },
        },
      ],
      ...(EventType ? { eventType: EventType } : {}),
    };

    const [events, totalEvents] = await Promise.all([
      prisma.event.findMany({
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
          user: {
            select: {
              email: true,
              id: true,
            },
          },
        },
        orderBy: {
          eventDate: 'asc',
        },
        take,
        skip,
      }),
      prisma.event.count({ where }),
    ]);

    const totalPages = Math.ceil(totalEvents / take);

    return {
      ok: true,
      currentPage: page,
      totalPages: totalPages,
      events: events.map((event) => ({
        ...event,
      })),
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
