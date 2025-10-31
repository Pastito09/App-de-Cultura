'use client';
import { EventoDB } from '@/interface/EventoDB.interface';
import { getDiasHoras } from '@/utils/getDiasHoras';
import Image from 'next/image';
import Link from 'next/link';
import { IoLocationSharp, IoMusicalNotes } from 'react-icons/io5';
import { FaCalendar, FaMasksTheater } from 'react-icons/fa6';
import { BiParty } from 'react-icons/bi';
import { GiPartyFlags } from 'react-icons/gi';
import BotonCompartir from '../ui/boton-compartir/BotonCompartir';

export const Evento = ({
  eventTitle,
  eventDescription,
  eventDate,
  startTime,
  eventSlug,
  eventLocationName,
  eventLocation,
  eventType,
  image,
}: EventoDB) => {
  const { dia, diaDeLaSemana } =
    getDiasHoras(eventDate) || new Date();

  const tipoDeEvento = (evento: string) => {
    switch (evento) {
      case 'concierto':
        return <IoMusicalNotes className='mt-0.5' size={15} />;
      case 'teatro':
        return <FaMasksTheater className='mt-0.5' size={15} />;
      case 'fiesta':
        return <BiParty className='mt-0.5' size={15} />;
      case 'feria':
        return <GiPartyFlags className='mt-0.5' size={15} />;

      default:
        return <FaCalendar className='mt-0.5' size={15} />;
    }
  };

  return (
    <Link href={eventSlug}>
      <article className='flex flex-col items-start border bg-slate-50 rounded-xl px-2 pb-1'>
        <div className='flex flex-row w-full justify-between items-center me-2 text-xs'>
          <div>
            <span className='font-semibold tracking-wide text-blue-900'>
              {diaDeLaSemana || 'sin fecha'}
            </span>
          </div>

          <div>
            <time
              dateTime={eventDate.toString()}
              className='text-gray-500'
            >
              {dia || 'sin fecha'} - {startTime}Hs.
            </time>
          </div>

          <div className='flex flex-row gap-1 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
            <IoLocationSharp className='mt-0.5' />
            {eventLocationName}
          </div>
          <div>{tipoDeEvento(eventType)}</div>
        </div>
        <div className='group'>
          <h3 className='mt-2 mb-1 ms-3 sm:text-2xl font-semibold text-start  text-gray-900 group-hover:text-gray-600'>
            <span>
              <span className='inset-0' />
              {eventTitle}
            </span>
          </h3>
          <p className='line-clamp-2  text-sm/6 text-gray-600'>
            {eventDescription}
          </p>
        </div>
        <div className='flex items-center mt-2 gap-x-4 w-full'>
          <div className='flex items-center gap-x-4'>
            <Image
              width={400}
              height={400}
              quality={100}
              alt='imagen del evento'
              src={image?.url || '/placeholder.jpg'}
              className='w-20 h-20 rounded-sm'
            />
            <div className='text-xs flex gap-4 sm:gap-0 sm:flex-col sm:text-sm/6'>
              <p className='font-semibold text-gray-900'>
                {eventLocation}
              </p>
              <div className='block sm:hidden'>-</div>
              <p className='text-gray-600'>{eventLocationName}</p>
            </div>
          </div>

          <div
            className='ml-auto flex items-center'
            onClick={(e) => e.stopPropagation()}
          >
            <BotonCompartir />
          </div>
        </div>
      </article>
    </Link>
  );
};
{
  /* <div className='flex items-center mt-2 gap-x-4'>
          <Image
            width={400}
            height={400}
            quality={100}
            alt='imagen del evento'
            src={image?.url || '/placeholder.jpg'}
            className='w-20 h-20  rounded-sm'
          />
          <div className='text-xs flex gap-4 sm:gap-0 sm:flex-col sm:text-sm/6'>
            <div>
              <p className='font-semibold text-gray-900'>
                {eventLocation}
              </p>
            </div>
            <div className='block sm:hidden'>-</div>
            <div>
              <p className='text-gray-600'>{eventLocationName}</p>
            </div>
          </div>
          <div className='aling-center'>
            <BotonCompartir />
          </div>
        </div> */
}
