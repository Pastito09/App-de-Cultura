import { Evento as Props } from '@/interface/Evento.interface';
import { getDiasHoras } from '@/utils/getDiasHoras';
import Image from 'next/image';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

export const Evento = ({
  id,
  eventTitle,
  eventDescription,
  eventDate,
  startTime,
  endTime,
  eventLocationName,
  eventLocation,
  image,
}: Props) => {
  const { dia, diaDeLaSemana, hs, min } = getDiasHoras(eventDate);
  // const hs = date.getHours();
  // const min = date
  //   .getMinutes()
  //   .toString()
  //   .padStart(2, '0');
  // const dia = date.toLocaleDateString();
  // const nombreDia = (date: Date) => {
  //   const elDiaEs = new Intl.DateTimeFormat('es-ES', {
  //     weekday: 'long',
  //   }).format(date);

  //   return elDiaEs.charAt(0).toUpperCase() + elDiaEs.slice(1);
  // };

  // const diaDeLaSemana = nombreDia(initialDate);

  return (
    <Link href={id}>
      <article className='flex flex-col items-start border bg-slate-50 rounded-xl px-2 pb-1'>
        <div className='flex items-center gap-x-4 text-xs'>
          <span className='font-semibold tracking-wide text-blue-900'>
            {diaDeLaSemana}
          </span>

          <time
            dateTime={eventDate.toString()}
            className='text-gray-500'
          >
            {dia} - {startTime}Hs.
          </time>
          <div className='flex flex-row gap-1 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
            <IoLocationSharp className='mt-0.5' />
            {eventLocationName}
          </div>
        </div>
        <div className='group'>
          <h3 className='mt-2 mb-1 ms-3 sm:text-2xl font-semibold text-start  text-gray-900 group-hover:text-gray-600'>
            <span>
              <span className='inset-0' />
              {eventTitle}
            </span>
          </h3>
          <p className='line-clamp-3 text-center text-sm/6 text-gray-600'>
            {eventDescription}
          </p>
        </div>
        <div className='flex items-center mt-2 gap-x-4'>
          <Image
            width={400}
            height={400}
            quality={100}
            alt=''
            src={image || '/placeholder.jpg'}
            className='w-20 h-20  rounded-sm hidden sm:block'
          />
          <div className='text-xs flex gap-4 sm:gap-0 sm:flex-col sm:text-sm/6'>
            <div>
              <p className='font-semibold text-gray-900'>
                {eventLocation.join(',  ')}
              </p>
            </div>
            <div className='block sm:hidden'>-</div>
            <div>
              <p className='text-gray-600'>{eventLocationName}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};
