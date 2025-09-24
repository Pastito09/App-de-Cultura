'use server';

import { prisma } from '@/lib/prisma';

export const getUserInfo = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: 'Error al obtener la información del usuario',
    };
  }
};
