'use client';

import { useEffect, useState } from 'react';

import Referencias from './ui/Referencias';
import { CalendarDialog } from './ui/CalendarDialog';
import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { CustomCalendar } from '../calendar/CustomCalendar';

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const modifiersClassNames = {
  event:
    'bg-emerald-800 hover:bg-emerald-900 text-white hover:text-slate-100 rounded',
  selected:
    '!bg-blue-500 text-white hover:bg-blue-600 hover:text-slate-100 rounded',
  today:
    'bg-blue-300 text-gray-100 hover:bg-blue-400 hover:text-slate-100 rounded ',
  selectedEvent: '!bg-blue-500 !text-white ',
};
export const CalendarPage = ({
  calendarEvents,
}: {
  calendarEvents: CalendarEvent[];
}) => {
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dataEventos] = useState<CalendarEvent[]>(calendarEvents);
  const [today, setToday] = useState<Date | null>(null);

  useEffect(() => {
    setToday(new Date());
  }, []);

  const handleSelectDate = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    if (dataEventos.some((ev) => sameDay(ev.eventDate, date))) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const eventosDelDia = selectedDate
    ? dataEventos.filter((ev) => sameDay(ev.eventDate, selectedDate))
    : [];

  if (!today) return null;

  return (
    <div className='flex flex-col items-center m-4'>
      <Referencias />

      <div className='grid grid-cols-1 2xl:grid-cols-3 gap-3 2xl:gap-2 justify-center'>
        <CustomCalendar
          monthOffset={0}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />
        <CustomCalendar
          monthOffset={1}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />{' '}
        <CustomCalendar
          monthOffset={2}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />{' '}
        <CustomCalendar
          monthOffset={3}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />{' '}
        <CustomCalendar
          monthOffset={4}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />{' '}
        <CustomCalendar
          disableNavigation={false}
          monthOffset={5}
          today={today}
          selectedDate={selectedDate}
          handleSelectDate={handleSelectDate}
          eventos={calendarEvents}
          modifiersClassNames={modifiersClassNames}
        />
      </div>
      <CalendarDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedDate={selectedDate}
        eventosDelDia={eventosDelDia}
      />
    </div>
  );
};

export default CalendarPage;
