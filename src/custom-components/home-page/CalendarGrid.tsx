import { CalendarPage } from '../calendar-page/CalendarPage';

export const CalendarGrid = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center m-4'>
        <h1 className='text-3xl mb-2'>Eventos Culturales</h1>
        <span>Buscá los eventos</span>
        <span>Pinchá en el calendario para ver detalles</span>
        <div className='h-1 bg-fuchsia-700 w-[75%] m-4' />
      </div>
      <CalendarPage />
    </>
  );
};
