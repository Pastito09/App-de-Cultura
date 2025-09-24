'use server';

import { prisma } from '@/lib/prisma';

export const getEventByIdWithImages = async (id: string) => {
  try {
    const evento = await prisma.event.findUnique({
      where: {
        id: id,
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
