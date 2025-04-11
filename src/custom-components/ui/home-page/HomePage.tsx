import { CalendarGrid } from '@/custom-components/home-page/CalendarGrid';

import { Sidebar } from '@/custom-components/home-page/Sidebar';
import { Footer } from '../Footer';
import EventsGrid from '@/custom-components/home-page/EventsGrid';

export const HomePage = () => {
  return (
    <div className='flex h-full'>
      <div className='sm:w-1/3 order-1 sm:border-e-2 w-[80%]'>
        <EventsGrid />
      </div>
      <div className=' sm:flex-1  w-auto order-3 sm-order-2 justify-center items-center'>
        <CalendarGrid />
        <Footer />
      </div>
      <div className='lg:w-[12%] h-screen border hidden lg:block sm:order-3 ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
};
