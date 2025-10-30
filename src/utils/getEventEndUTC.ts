export default function getEventEndUTC(
  eventDate: Date,
  startTime: string,
  hoursToAdd = 8
): Date | null {
  const [hours, minutes] = startTime.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  // Ajustamos la hora correctamente en UTC
  const eventStart = new Date(eventDate);
  eventStart.setUTCHours(hours, minutes, 0, 0);

  const eventEnd = new Date(eventStart);
  eventEnd.setUTCHours(eventEnd.getUTCHours() + hoursToAdd);

  return eventEnd;
}
