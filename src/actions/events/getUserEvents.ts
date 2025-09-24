'use server';

import { prisma } from '@/lib/prisma';

export const getUserEvents = async (userId: string) => {
  try {
    const eventosDelUsuario = await prisma.event.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image: true,
      },
    });
    return {
      ok: true,
      eventosDelUsuario,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al obtener los eventos del usuario',
    };
  }
};
