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

  try {
    const todayAt8 = todayAt8UTC();
    const dayFilter: Prisma.EventWhereInput = {
      eventDate: {
        gte: todayAt8,
      },
    };

    const where: Prisma.EventWhereInput = EventType
      ? { AND: [{ eventType: EventType }, dayFilter] }
      : dayFilter;

    const events = await prisma.event.findMany({
      take: take,
      skip: skip,

      where: where,
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
    });

    const totalEvents = await prisma.event.count({ where: where });

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
