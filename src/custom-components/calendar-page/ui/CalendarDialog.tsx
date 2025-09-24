import {
  Dialog,
  // DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CalendarEvent } from '@/interface/CalendarEvent.interface';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { titleTransform } from '../../../utils/titleTransform';

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedDate: Date | undefined;
  eventosDelDia: CalendarEvent[]; // Replace with the actual type of your event data
}

export const CalendarDialog = ({
  isOpen,
  setIsOpen,
  selectedDate,
  eventosDelDia,
}: Props) => {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className='w-full flex flex-col p-4 bg-sky-50 min-h-[25%] rounded-lg '>
          <DialogHeader>
            <DialogTitle className='text-green-900 text-lg font-semibold'>
              {selectedDate
                ? format(selectedDate, 'PPPP', { locale: es })
                : 'Fecha seleccionada'}
            </DialogTitle>
          </DialogHeader>

          {eventosDelDia.length > 0 ? (
            <ul className='mt-2 space-y-2'>
              {eventosDelDia.map((ev, i) => {
                const eventSlug = titleTransform(ev.eventTitle);
                return (
                  <li
                    key={i}
                    className='p-2 bg-sky-100 hover:bg-slate-200 text-blue-900 rounded-md'
                  >
                    <Link
                      href={`/${eventSlug}`}
                      className='flex flex-col'
                    >
                      {ev.eventTitle} - {ev.eventLocationName},{' '}
                      {ev.startTime}
                      Hs.
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className='mt-4 text-gray-500'>
              No hay eventos en esta fecha.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
