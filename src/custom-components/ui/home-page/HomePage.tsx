import { CalendarGrid } from '@/custom-components/home-page/CalendarGrid';
import { EventsGrid } from '@/custom-components/home-page/EventsGrid';
import { Sidebar } from '@/custom-components/home-page/Sidebar';

export const HomePage = () => {
  return (
    <>
      <div className='w-1/3  border-e-2'>
        <EventsGrid />
      </div>
      <div className='flex-1 justify-center items-center'>
        <CalendarGrid />
      </div>
      <div className='lg:w-[12%] h-screen border ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </>
  );
};
