import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { CalendarPage } from '../calendar-page/CalendarPage';

export const CalendarGrid = async ({
  calendarEvents,
}: {
  calendarEvents: CalendarEvent[];
}) => {
  return (
    <>
      <div className='flex flex-col text-center items-center m-2'>
        <span className='text-lg sm:text-xl sm:font-semibold'>
          Buscá los eventos
        </span>
        <span className='text-xs sm:text-lg'>
          Pinchá en el calendario para ver más detalles
        </span>
        <div className='h-0.5 bg-fuchsia-700 w-[75%] m-1 sm:m-4' />
      </div>
      <CalendarPage calendarEvents={calendarEvents} />
    </>
  );
};
export default CalendarGrid;
