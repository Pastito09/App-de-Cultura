'use server';

import { prisma } from '@/lib/prisma';
import { titleTransform } from '@/utils';
import { z } from 'zod';
import { EventType } from '../../../generated/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';
import { uploadImage } from './uploadImage';

const formSchema = z.object({
  eventTitle: z
    .string({ required_error: 'El título del evento es requerido' })
    .min(3)
    .max(60),
  eventDescription: z
    .string({
      required_error: 'La descripción del evento es requerida',
    })
    .min(5)
    .max(200),
  eventDate: z.coerce.date({
    required_error: 'La fecha del evento es requerida',
    invalid_type_error:
      'La fecha del evento debe ser una fecha válida',
  }),
  startTime: z
    .string({
      required_error: 'La hora de inicio del evento es requerida',
    })
    .min(5)
    .max(5),
  eventLocation: z
    .string({
      required_error: 'La ubicación del evento es requerida',
    })
    .min(3)
    .max(100),
  eventLocationName: z
    .string({
      required_error: 'El nombre de la ubicación es requerido',
    })
    .min(3)
    .max(100),
  eventlocationMap: z.string().optional(),
  tags: z.array(z.string()).optional(),

  ticketPrice: z.string().optional(),
  ticketLink: z.string().optional(),
  eventType: z.string({
    required_error: 'El tipo de evento es requerido',
  }),
});

export const createEvent = async (formData: FormData) => {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  if (!user) {
    return { ok: false, message: 'Usuario no encontrado' };
  }

  const eventDataParsed = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!eventDataParsed.success) {
    console.log(eventDataParsed.error);
    return { ok: false };
  }

  const evento = eventDataParsed.data;
  const { eventTitle, eventType, ...event } = evento;

  const eventSlugExists = await prisma.event.findFirst({
    where: {
      eventSlug: titleTransform(eventTitle),
      eventDate: new Date(event.eventDate),
      eventLocation: event.eventLocation,
      eventLocationName: event.eventLocationName,
    },
  });
  if (eventSlugExists) {
    return {
      ok: false,
      message:
        'Ya existe un evento con el mismo título, fecha y ubicación',
    };
  }

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const eventCreated = await tx.event.create({
        data: {
          ...event,
          eventSlug: titleTransform(eventTitle),
          eventTitle,
          user: {
            connect: { id: session!.user.id },
          },
          eventType: eventType as EventType,
        },
      });

      //cargar la imagen del evento

      const fileImage = formData.get('eventImage') as File;

      if (fileImage && fileImage.size > 0) {
        const image = await uploadImage(fileImage);
        if (!image) {
          throw new Error('Error al subir la imagen del evento');
        }
        await tx.eventImage.create({
          data: {
            url: image.url,
            publicId: image.publicId,
            eventId: eventCreated.id,
          },
        });
      }

      return {
        eventCreated,
      };
    });

    revalidatePath(`${prismaTx.eventCreated.eventSlug}`);
    revalidatePath('/buscar-eventos');
    revalidatePath('/calendar');
    revalidatePath('/');
    return {
      prismaTx,
      ok: true,
      message: 'Evento creado correctamente',
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error al crear el evento',
      error,
    };
  }
};
