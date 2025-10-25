import { EventoDB } from '@/interface/EventoDB.interface';
import { getDiasHoras } from '@/utils/getDiasHoras';
import Image from 'next/image';
import Link from 'next/link';
import { IoLocationSharp, IoMusicalNotes } from 'react-icons/io5';
import { FaCalendar, FaMasksTheater } from 'react-icons/fa6';
import { BiParty } from 'react-icons/bi';
import { GiPartyFlags } from 'react-icons/gi';

export const EventoCard = ({
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
      <article className='flex flex-col border h-full w-full bg-slate-50 rounded-xl px-2 pb-1'>
        <div className='flex flex-row justify-between mb-1 items-center gap-x-4 text-xs'>
          <span className='font-semibold tracking-wide text-blue-900'>
            {diaDeLaSemana || 'sin fecha'}
          </span>

          <time
            dateTime={eventDate.toString()}
            className='text-gray-500'
          >
            {dia || 'sin fecha'} - {startTime}Hs.
          </time>
          <div className='flex flex-row gap-1 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
            <IoLocationSharp className='mt-0.5' />

            <p className='font-semibold text-gray-900'>
              {eventLocation}
            </p>
            <div className=''> - </div>
            <p className='text-gray-600'>{eventLocationName}</p>
          </div>

          {tipoDeEvento(eventType)}
        </div>

        <div className='group flex gap-5 items-center w-full'>
          <div className='grid grid-cols-12 items-center  w-full '>
            <div className='col-span-1 p-1'>
              <Image
                width={150}
                height={500}
                quality={100}
                alt='imagen del evento'
                src={image?.url || '/placeholder.jpg'}
                className='rounded-sm'
              />
            </div>
            <div className='flex items-center flex-row col-span-11'>
              <div className='w-1/4'>
                <h3 className=' ms-3 sm:text-2xl font-semibold text-start  text-gray-900 group-hover:text-gray-600'>
                  <span>
                    <span className='inset-0' />
                    {eventTitle}
                  </span>
                </h3>
              </div>
              <div className='w-3/4 flex flex-row items-center'>
                <div className='ms-5'>
                  <p className='line-clamp-2  text-sm/6 text-gray-600'>
                    {eventDescription}
                  </p>
                </div>
                <div className='justify-self-end ms-auto me-5'>
                  <span className='text-xs font-semibold text-gray-500'>
                    hola
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

//           <div className='flex items-center mt-2 gap-x-4'>

//         </div>
