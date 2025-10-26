'use server';

import { prisma } from '@/lib/prisma';

import todayAt8UTC from '../../utils/todayAt8UTC';

export const getAllEventsWithImage = async () => {
  try {
    const today = todayAt8UTC();
    const events = await prisma.event.findMany({
      where: {
        eventDate: {
          gte: today,
        },
      },
      include: {
        image: true,
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
      take: 10,
    });

    return {
      ok: true,
      events,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Erros al buscar todos los eventos con imagenes',
    };
  }
};
