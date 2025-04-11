export interface Evento {
  id: string;
  eventTitle: string;
  eventDescription: string;
  eventDate: Date;
  startTime: string; // Formato "HH:mm"
  endTime?: string;
  eventLocationName: string;
  eventLocation: string[];
  image?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
