'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

import { es } from 'date-fns/locale';
import { initialData } from '@/seed/seed';

export const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const allEventDates = initialData.events.map((event) => {
    const initialDate = new Date(event.initialDate);
    return initialDate;
  });

  return (
    <div className='flex flex-col items-center m-4'>
      <div className='mb-2'>Calendario</div>
      {/* <div className='flex flex-row justify-center'> */}
      <div className='grid grid-cols-1 2xl:grid-cols-3 gap-3 2xl:gap-2 justify-center'>
        <Calendar
          locale={es}
          disableNavigation
          fromDate={new Date()}
          mode='single'
          selected={date}
          onSelect={(date) => {
            setDate(date);
            const isEvent = allEventDates.some(
              (eventDate) =>
                eventDate.toDateString() === date?.toDateString()
            );
            if (isEvent) {
              // Acción especial
              console.log('Fecha con evento:', date);
            } else {
              console.log('Fecha sin evento:', date);
            }
          }}
          className='rounded-md border'
          modifiers={{ event: allEventDates }}
          modifiersClassNames={{
            event: 'bg-red-500 text-white',
            selected:
              'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
            today: 'bg-blue-400 text-white ',
          }}
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
          selected={date}
          onSelect={(date) => {
            setDate(date);
            const isEvent = allEventDates.some(
              (eventDate) =>
                eventDate.toDateString() === date?.toDateString()
            );
            if (isEvent) {
              // Acción especial
              console.log('Fecha con evento:', date);
            } else {
              console.log('Fecha sin evento:', date);
            }
          }}
          className='rounded-md border'
          modifiers={{ event: allEventDates }}
          modifiersClassNames={{
            event: 'bg-red-500 text-white',
            selected:
              'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
            today: 'bg-blue-400 text-white ',
          }}
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
          selected={date}
          onSelect={(date) => {
            setDate(date);
            const isEvent = allEventDates.some(
              (eventDate) =>
                eventDate.toDateString() === date?.toDateString()
            );
            if (isEvent) {
              // Acción especial
              console.log('Fecha con evento:', date);
            } else {
              console.log('Fecha sin evento:', date);
            }
          }}
          className='rounded-md border'
          modifiers={{ event: allEventDates }}
          modifiersClassNames={{
            event: 'bg-red-500 text-white',
            selected:
              'bg-blue-600 text-white hover:bg-blue-500 hover:text-red-500',
            today: 'bg-blue-400 text-white ',
          }}
        />
      </div>
    </div>
  );
};
