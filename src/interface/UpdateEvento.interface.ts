export interface UpdateEventoProps {
  id: string;
  eventTitle: string;
  eventSlug: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string;
  eventLocationName: string;
  eventLocation: string;
  eventLocationMap: string | null;
  ticketPrice?: string | null;
  ticketLink?: string | null;
  eventType: 'concierto' | 'teatro' | 'fiesta' | 'feria' | 'otros';
  userId: string;

  image?: {
    id: string;
    url: string;
    eventId: string;
  } | null;
}
