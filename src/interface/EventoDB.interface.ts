import { EventType } from '../../generated/prisma';

interface EventImage {
  id: string;
  url: string;
  eventId: string;
}

interface User {
  id: string;
  email: string | null;
}

// export interface EventoDB {
//   id: string;
//   eventTitle: string;
//   eventSlug: string;
//   eventDescription: string;
//   eventDate: Date;
//   startTime: string;

//   eventLocationName: string;
//   eventLocation: string;
//   eventLocationMap?: string | null;
//   tags?: string[];
//   createdAt: Date;
//   ticketPrice: string | null;
//   ticketLink?: string | null;
//   eventType: string;
//   userId: string;
//   image?: EventImage | null;
//   user: User;
// }

export interface EventoDB {
  image: string | undefined;
  user: {
    id: string;
    email: string | null;
  };
  id: string;
  createdAt: Date;
  userId: string;
  eventTitle: string;
  eventSlug: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string;
  eventLocationName: string;
  eventLocation: string;
  eventLocationMap: string | null;
  tags: string[];
  ticketPrice: string | null;
  ticketLink: string | null;
  eventType: EventType;
}
