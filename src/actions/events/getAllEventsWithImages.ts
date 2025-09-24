'use server';

import { prisma } from '@/lib/prisma';

export const getAllEventsWithImage = async () => {
  try {
    const events = await prisma.event.findMany({
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
