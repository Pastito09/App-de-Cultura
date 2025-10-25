'use server';

import { prisma } from '@/lib/prisma';

import { z } from 'zod';

import { EventType } from '../../../generated/prisma';
import { revalidatePath } from 'next/cache';

const formSchema = z.object({
  id: z
    .string()
    .uuid()
    .optional()
    .nullable(),
  userId: z
    .string()
    .uuid()
    .optional()
    .nullable(),
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
  eventSlug: z.string(),
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
  eventLocationMap: z
    .string()
    .optional()
    .nullable(),
  eventImage: z.string().optional(),
  ticketPrice: z.string().optional(),
  ticketLink: z.string().optional(),
  eventType: z.string({
    required_error: 'El tipo de evento es requerido',
  }),
});

export const updateEvent = async (formData: FormData) => {
  const eventDataParsed = formSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!eventDataParsed.success) {
    console.log(eventDataParsed.error);
    return { ok: false };
  }

  const eventData = eventDataParsed.data;
  const { id, ...event } = eventData;

  const prismaTx = await prisma.$transaction(async () => {
    const eventUpdated = await prisma.event.update({
      where: { id: id! },
      data: {
        ...event,
        userId: event.userId!,
        eventType: event.eventType as EventType,
        eventLocationMap: event.eventLocationMap || null,
      },
    });

    return {
      eventUpdated,
    };
  });

  revalidatePath('/');
  revalidatePath(`${event.eventSlug}`);
  revalidatePath('/buscar-eventos');
  revalidatePath('/mis-eventos');
  revalidatePath('/calendar');

  return {
    prismaTx,
    ok: true,
  };
};
