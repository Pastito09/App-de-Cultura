'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function deleteEvent(eventId: string) {
  const image = await prisma.eventImage.findFirst({
    where: { eventId },
  });

  if (image?.publicId) {
    try {
      await cloudinary.uploader.destroy(image.publicId);
    } catch (error) {
      console.log('Error deleting image from Cloudinary:', error);
    }
  }
  await prisma.$transaction([
    prisma.eventImage.deleteMany({
      where: { eventId },
    }),
    prisma.event.delete({
      where: { id: eventId },
    }),
  ]);

  revalidatePath('/user/mis-eventos');
  revalidatePath('/');
  revalidatePath('/calendar');
  revalidatePath('/buscar-eventos');
}
