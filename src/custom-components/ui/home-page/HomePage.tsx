import { CalendarGrid } from '@/custom-components/home-page/CalendarGrid';

import { Sidebar } from '@/custom-components/home-page/Sidebar';
import { Footer } from '../Footer';
import EventsGrid from '@/custom-components/home-page/EventsGrid';
import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { EventoDB } from '@/interface/EventoDB.interface';

interface Props {
  calendarEvents: CalendarEvent[];
  events: EventoDB[];
}

export const HomePage = ({ calendarEvents, events }: Props) => {
  return (
    <div className='flex h-full'>
      <div className='lg:w-1/3 order-1 lg:border-e-2 w-[80%]'>
        <EventsGrid events={events} />
      </div>
      <div className=' lg:flex-1 h-auto  w-auto order-3 lg-order-2 justify-center items-center'>
        <CalendarGrid calendarEvents={calendarEvents} />
        <Footer />
      </div>
      <div className='lg:w-[12%] h-screen border  sm:order-3 ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
};
