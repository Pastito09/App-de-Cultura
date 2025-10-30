import { toZonedTime } from 'date-fns-tz';
export default function todayAt8UTC(): Date {
  const timeZone = 'America/Argentina/Buenos_Aires';

  const date = toZonedTime(new Date(), timeZone);
  date.setHours(8, 0, 0, 0);

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error(
      'No se pudo convertir la fecha a UTC correctamente'
    );
  }
  return date;
}
