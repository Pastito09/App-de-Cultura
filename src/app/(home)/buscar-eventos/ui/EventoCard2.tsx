import { EventoDB } from '@/interface/EventoDB.interface';
import { getDiasHoras } from '@/utils/getDiasHoras';
import Image from 'next/image';
import Link from 'next/link';
import { IoMusicalNotes } from 'react-icons/io5';
import { FaCalendar, FaMasksTheater } from 'react-icons/fa6';
import { BiParty } from 'react-icons/bi';
import { GiPartyFlags } from 'react-icons/gi';
import { EventLocation } from '@/custom-components/ui/event-location/EventLocation';

export const EventoCard2 = ({
  eventTitle,
  eventDescription,
  eventDate,
  startTime,
  eventSlug,
  eventLocationMap,
  eventLocationName,
  eventLocation,
  eventType,
  ticketLink,
  image,
  ticketPrice,
}: EventoDB) => {
  const { dia, diaDeLaSemana } =
    getDiasHoras(eventDate) || new Date();

  const tipoDeEvento = (evento: string) => {
    switch (evento) {
      case 'concierto':
        return <IoMusicalNotes className='mt-0.5' size={20} />;
      case 'teatro':
        return <FaMasksTheater className='mt-0.5' size={20} />;
      case 'fiesta':
        return <BiParty className='mt-0.5' size={20} />;
      case 'feria':
        return <GiPartyFlags className='mt-0.5' size={20} />;

      default:
        return <FaCalendar className='mt-0.5' size={20} />;
    }
  };

  return (
    <Link href={eventSlug} className='block'>
      <article className='flex flex-col border h-full w-full  bg-slate-50 rounded-xl px-2 pb-1'>
        <div className='flex flex-row '>
          <Image
            width={150}
            height={500}
            quality={100}
            priority
            alt='imagen del evento'
            src={image?.url || '/placeholder.jpg'}
            className='rounded-sm pt-1 hidden sm:block w-full'
          />

          <div className='flex flex-col w-full'>
            <div className='flex md:flex-row ms-6 mb-1 items-center justify-between gap-x-4 text-xs'>
              <span className='font-semibold tracking-wide text-blue-900'>
                {diaDeLaSemana || 'sin fecha'}
              </span>

              <time
                dateTime={eventDate.toString()}
                className='text-gray-500 text-center'
              >
                {dia || 'sin fecha'} - {startTime}Hs.
              </time>
              {/* <Link href={eventGoogleMaps || eventSlug}>
              <div className='flex flex-row gap-1 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
                <IoLocationSharp className='mt-0.5 hidden md:block' />

                <p className='md:font-semibold text-center font-normal text-gray-900'>
                  {eventLocation}
                </p>
                <div className='place-self-center'> - </div>
                <p className='text-gray-600 text-center'>
                  {eventLocationName}
                </p>
              </div>
            </Link> */}
              <EventLocation
                eventLocation={eventLocation}
                eventLocationMap={eventLocationMap}
                eventLocationName={eventLocationName}
              />

              {tipoDeEvento(eventType)}
            </div>

            <div>
              <Link href={eventSlug}>
                <h3 className=' md:ms-3 sm:text-2xl font-semibold text-center md:text-start  text-gray-900 group-hover:text-gray-600'>
                  <span>
                    <span className='inset-0' />
                    {eventTitle}
                  </span>
                </h3>
                <div className='ms-5'>
                  <p className='line-clamp-2  text-sm/6 text-gray-600'>
                    {eventDescription}
                  </p>
                </div>
              </Link>
              <div className='flex gap-8 ms-5 items-center mt-2'>
                <h2 className='text-sm font-medium text-gray-500'>
                  Entradas:
                </h2>

                <p className='text-sm m-1 text-gray-500 place-self-center'>
                  {ticketPrice !== '0' ? ` ${ticketPrice}` : '$ 0.00'}
                </p>

                {ticketLink ? (
                  <Link
                    href={ticketLink!}
                    target='_blank'
                    className='bg-slate-200 ms-4 rounded-2xl p-2 hover:bg-slate-300 hover:text-cyan-900 antialiased'
                  >
                    {ticketPrice === '0'
                      ? 'Conseguí tus entradas'
                      : 'Comprar'}
                  </Link>
                ) : (
                  ticketPrice !== '0' && (
                    <span className='text-gray-500'>
                      Se consiguen en puerta
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

//         <div className='group flex gap-5 items-center w-full'>
//           <div className='grid grid-cols-12 items-center  w-full '>
//             <div className='col-span-1 p-1'>
//
//             </div>
//             <div className='flex items-center flex-row col-span-11'>
//               <div className='w-1/4'>

//               </div>
//               <div className='w-3/4 flex flex-row items-center'>

//                 <div className='justify-self-end ms-auto me-5'>
//                   <span className='text-xs font-semibold text-gray-500'>
//                     hola
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//           <div className='flex items-center mt-2 gap-x-4'>

//         </div>
