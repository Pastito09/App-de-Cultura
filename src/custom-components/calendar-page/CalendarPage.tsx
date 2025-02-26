'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

import { es } from 'date-fns/locale';
import { Footer } from '../ui/Footer';

export const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className='flex flex-col items-center m-4'>
      <div className='mb-2'>Calendario</div>
      {/* <div className='flex flex-row justify-center'> */}
      <div className='grid grid-cols-1 2xl:grid-cols-3 gap-3 2xl:gap-2 justify-center'>
        <Calendar
          locale={es}
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
        <Calendar
          locale={es}
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
        <Calendar
          locale={es}
          mode='single'
          selected={date}
          onSelect={setDate}
          className='rounded-md border'
        />
      </div>
    </div>
  );
};
