'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

import { es } from 'date-fns/locale';
import { initialData } from '@/seed/seed';
import Referencias from './ui/Referencias';
import { CalendarDialog } from './ui/CalendarDialog';
import { CalendarEvent } from '@/interface/CalendarEvent.interface';

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

const dataEventos: CalendarEvent[] = initialData.events.map(
  (event) => {
    const eventDate = new Date(event.eventDate);
    const eventTitle = event.eventTitle;
    const locationName = event.eventLocationName;
    const eventTime = event.startTime;
    const eventId = event.id;
    return {
      eventDate,
      eventTitle,
      locationName,
      eventTime,
      eventId,
    };
  }
);
const modifiersClassNames = {
  event:
    'bg-emerald-800 hover:bg-emerald-900 text-white hover:text-slate-100',
  selected:
    '!bg-blue-500 text-white hover:bg-blue-600 hover:text-slate-100',
  today:
    'bg-blue-300 text-gray-100 hover:bg-blue-400 hover:text-slate-100 ',
  selectedEvent: '!bg-blue-500 !text-white ',
};
export const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<
    Date | undefined
  >();
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div className='flex flex-col items-center m-4'>
      <Referencias />

      <div className='grid grid-cols-1 2xl:grid-cols-3 gap-3 2xl:gap-2 justify-center'>
        <Calendar
          mode='single'
          fromDate={new Date()}
          locale={es}
          disableNavigation
          className='rounded-md border'
          selected={selectedDate}
          onSelect={handleSelectDate}
          onDayClick={(date) => handleSelectDate(date)}
          modifiers={{
            event: dataEventos.map((ev) => ev.eventDate),
            selectedEvent: selectedDate
              ? dataEventos
                  .filter((ev) => sameDay(ev.eventDate, selectedDate))
                  .map((ev) => ev.eventDate)
              : [],
          }}
          modifiersClassNames={modifiersClassNames}
        />
        <Calendar
          locale={es}
          defaultMonth={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 1
            )
          }
          disableNavigation
          mode='single'
          selected={selectedDate}
          onSelect={(date) => {
            handleSelectDate(date);
          }}
          onDayClick={(date) => handleSelectDate(date)}
          className='rounded-md border'
          modifiers={{
            event: dataEventos.map((ev) => ev.eventDate),
            selectedEvent: selectedDate
              ? dataEventos
                  .filter((ev) => sameDay(ev.eventDate, selectedDate))
                  .map((ev) => ev.eventDate)
              : [],
          }}
          modifiersClassNames={modifiersClassNames}
        />
        <Calendar
          locale={es}
          fromMonth={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 2
            )
          }
          defaultMonth={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() + 2
            )
          }
          mode='single'
          selected={selectedDate}
          onSelect={(date) => {
            handleSelectDate(date);
          }}
          onDayClick={(date) => handleSelectDate(date)}
          className='rounded-md border'
          modifiers={{
            event: dataEventos.map((ev) => ev.eventDate),
            selectedEvent: selectedDate
              ? dataEventos
                  .filter((ev) => sameDay(ev.eventDate, selectedDate))
                  .map((ev) => ev.eventDate)
              : [],
          }}
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
