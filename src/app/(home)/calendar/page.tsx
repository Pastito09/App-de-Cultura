export const revalidate = 60; // seconds

import { Footer, VolverButton } from '@/custom-components';
import CalendarGrid from '@/custom-components/home-page/CalendarGrid';
import { getAllCalendarEvents } from '@/actions/events/getAllCalendarEvents';

export default async function CalendarPage() {
  const { events: calendarEvents } = await getAllCalendarEvents();
  return (
    <div className='min-h-screen'>
      <CalendarGrid calendarEvents={calendarEvents} />
      <VolverButton />
      <Footer />
    </div>
  );
}
