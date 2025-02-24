'use client';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

import { es } from 'date-fns/locale';

export const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className='flex flex-col items-center justify-center m-4'>
      <div>Calendario</div>
      <div className='flex justify-center'>
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
