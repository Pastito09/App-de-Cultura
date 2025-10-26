export const revalidate = 60; // seconds

import { Footer, VolverButton } from '@/custom-components';
import CalendarGrid from '@/custom-components/home-page/CalendarGrid';
import { getAllCalendarEvents } from '@/actions/events/getAllCalendarEvents';
import { CreaTuEvento } from '@/custom-components/ui/crea-tu-evento/CreaTuEvento';

export default async function CalendarPage() {
  const { events: calendarEvents } = await getAllCalendarEvents();
  return (
    <div className='min-h-screen'>
      <CreaTuEvento />
      <CalendarGrid calendarEvents={calendarEvents} />
      <VolverButton />
      <Footer />
    </div>
  );
}
