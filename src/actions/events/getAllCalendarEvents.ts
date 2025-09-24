'use server';

import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { prisma } from '@/lib/prisma';

export const getAllCalendarEvents = async (): Promise<{
  events: CalendarEvent[];
}> => {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        eventDate: true,
        eventTitle: true,
        eventLocationName: true,
        startTime: true,
      },
      orderBy: {
        eventDate: 'asc',
      },
    });

    const calendarEvents: CalendarEvent[] = events.map((event) => ({
      eventId: event.id,
      eventDate: event.eventDate,
      eventTitle: event.eventTitle,
      eventLocationName: event.eventLocationName,
      startTime: event.startTime,
    }));

    return { events: calendarEvents };
  } catch (error) {
    console.log(error);
    return { events: [] };
  }
};
