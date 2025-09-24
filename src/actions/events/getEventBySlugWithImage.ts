'use server';

import { prisma } from '@/lib/prisma';

export const getEventBySlugWithImage = async (slug: string) => {
  try {
    const evento = await prisma.event.findFirst({
      where: {
        eventSlug: slug,
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
    });

    return {
      ok: true,
      evento,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al obtener el evento',
    };
  }
};
