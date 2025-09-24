import { Calendar } from '@/components/ui/calendar';
import { addMonths } from 'date-fns';
import { es } from 'date-fns/locale';

import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { DayModifiers } from 'react-day-picker';

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

type CustomCalendarProps = {
  monthOffset: number;
  today: Date;
  selectedDate: Date | undefined;
  handleSelectDate: (date: Date | undefined) => void;
  eventos: CalendarEvent[];
  modifiersClassNames: Record<string, string>;
  disableNavigation?: boolean;
};

export const CustomCalendar = ({
  monthOffset,
  today,
  selectedDate,
  handleSelectDate,
  eventos,
  modifiersClassNames,
  disableNavigation = true,
}: CustomCalendarProps) => {
  const currentMonth = addMonths(today, monthOffset);

  const modifiers = {
    event: eventos.map((ev) => ev.eventDate),
    selectedEvent: selectedDate
      ? eventos
          .filter((ev) => sameDay(ev.eventDate, selectedDate))
          .map((ev) => ev.eventDate)
      : [],
  };

  return (
    <Calendar
      mode='single'
      fromDate={today}
      defaultMonth={currentMonth}
      locale={es}
      weekStartsOn={0}
      disableNavigation={disableNavigation}
      className='rounded-md border'
      classNames={{
        day:
          'h-8 w-8 flex items-center justify-center rounded-md transition-colors m-[1px]',
      }}
      selected={selectedDate}
      onSelect={handleSelectDate}
      onDayClick={handleSelectDate}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
    />
  );
};
