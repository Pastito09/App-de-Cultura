import { fromZonedTime } from 'date-fns-tz';
export default function todayAt8UTC(): Date {
  const timeZone = 'America/Argentina/Buenos_Aires';

  const now = new Date();

  const todayAt8Local = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    8,
    0,
    0,
    0
  );

  const date = fromZonedTime(todayAt8Local, timeZone);

  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error(
      'No se pudo convertir la fecha a UTC correctamente'
    );
  }
  return date;
}
