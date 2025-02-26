import { CalendarPage } from '../calendar-page/CalendarPage';
import { Footer } from '../ui/Footer';

export const CalendarGrid = () => {
  return (
    <>
      <div className='flex flex-col text-center items-center m-4'>
        <h1 className='text-lg sm:text-3xl mb-2'>
          Eventos Culturales
        </h1>
        <span className='text-xs sm:text-lg'>Buscá los eventos</span>
        <span className='text-xs sm:text-lg'>
          Pinchá en el calendario para ver detalles
        </span>
        <div className='h-1 bg-fuchsia-700 w-[75%] m-4' />
      </div>
      <CalendarPage />
      {/* <Footer /> */}
    </>
  );
};
