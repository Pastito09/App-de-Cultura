export const revalidate = 60; // seconds

import { getAllCalendarEvents } from '@/actions';
import { getPaginatedEvents } from '@/actions/events/getPaginatedEvents';
import { HomeMovilePage } from '@/custom-components/ui/home-page/HomeMovilePage';
import { HomePage } from '@/custom-components/ui/home-page/HomePage';

export default async function Home() {
  const { events: calendarEvent } = await getAllCalendarEvents();
  const { events } = await getPaginatedEvents({ page: 1, take: 50 });
  return (
    <>
      <div className='hidden lg:block'>
        <HomePage
          calendarEvents={calendarEvent}
          events={events ?? []}
        />
      </div>
      <div className='block lg:hidden'>
        <HomeMovilePage
          calendarEvents={calendarEvent}
          events={events ?? []}
        />
      </div>
    </>
  );
}
