type EventType =
  | 'concierto'
  | 'teatro'
  | 'fiesta'
  | 'feria'
  | 'otros';

export interface Evento {
  id: string;
  userId: string;
  eventSlug: string;
  DevId?: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string; // Formato "HH:mm"
  endTime?: string;
  eventLocationName: string;
  eventLocation: string;
  image?: {
    url: string;
    id: string;
    eventId: string;
  } | null;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  ticketPrice?: string | null;
  eventType: EventType;
}
