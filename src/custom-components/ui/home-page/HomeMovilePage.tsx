import { CalendarGrid } from '@/custom-components/home-page/CalendarGrid';

import { Footer } from '../Footer';
import EventsGrid from '@/custom-components/home-page/EventsGrid';
// import { Sidebar } from '@/custom-components/home-page/Sidebar';

export const HomeMovilePage = () => {
  return (
    <div className='flex flex-col min-w-screen'>
      <div className=''>
        <EventsGrid />
      </div>
      <div className='border-t m-2 bg-slate-500 h-0.5' />
      <div className=''>
        <CalendarGrid />
      </div>
      {/* <div className='lg:w-[12%] h-screen border hidden lg:block sm:order-3 ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div> */}
      <div>
        <Footer />
      </div>
    </div>
  );
};
