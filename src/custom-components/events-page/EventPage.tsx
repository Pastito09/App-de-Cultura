'use client';
import { EventoDB } from '@/interface/EventoDB.interface';
import { getDiasHoras } from '@/utils/getDiasHoras';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { EventLocation } from '../ui/event-location/EventLocation';
import { CustomTitle } from '../ui/custom-title/CustomTitle';
import BotonCompartir from '../ui/boton-compartir/BotonCompartir';

interface EventPageProps {
  event: EventoDB;
}
export const EventPage = ({ event }: EventPageProps) => {
  const {
    eventTitle,
    eventDescription,
    eventDate = new Date(),
    eventLocationName,
    eventLocation,
    eventLocationMap,
    image,
    ticketLink,
    ticketPrice,
    eventSlug,
  } = event;
  const router = useRouter();

  const eventUrl = `https://agendadecultura.vercel.app/${eventSlug}`;

  const { diaDeLaSemana, dia, hs, min } =
    getDiasHoras(eventDate) || new Date();

  if (!event) {
    return (
      <div className='bg-black min-h-screen flex items-center justify-center'>
        <CustomTitle>No se encontró lo que buscabas</CustomTitle>{' '}
      </div>
    );
  }

  return (
    <>
      <div className='bg-black min-h-screen '>
        <div className='pt-6'>
          <div className='mx-auto max-w-2xl px-4 pt-10  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-300 sm:text-5xl'>
                {eventTitle}
              </h1>
            </div>

            {/* Imagen  */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <Image
                src={image?.url || '/placeholder.jpg'}
                alt={eventDescription || 'No hay imagen'}
                height={500}
                width={500}
                className=''
                quality={100}
              />
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-400'>
                    {eventDescription}
                  </p>
                </div>
              </div>

              <div className='mt-10'>
                <h3 className='text-sm font-medium text-gray-400'>
                  {diaDeLaSemana} {dia} - {hs}:{min}Hs.
                </h3>
                <div className='mt-6'>
                  <EventLocation
                    eventLocation={eventLocation}
                    eventLocationMap={eventLocationMap}
                    eventLocationName={eventLocationName}
                  />

                  {/* <div className='text-gray-400 flex '>
                      <IoLocationSharp size={20} className='me-2' />
                      <span className='text-gray-400'>
                        {eventLocation || 'No hay locación'} -{' '}
                        {eventLocationName!}
                      </span>
                    </div> */}
                </div>
              </div>

              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-500'>
                  Entradas:
                </h2>

                <div className='mt-4 flex gap-4 justify-evenly items-center'>
                  <p className='text-sm m-1 text-gray-500 place-self-center'>
                    {ticketPrice !== '0'
                      ? `${ticketPrice}`
                      : '$ 0.00'}
                  </p>
                  {ticketLink ? (
                    <Link
                      href={ticketLink!}
                      target='_blank'
                      className='bg-slate-200 ms-4 rounded-2xl p-2 hover:bg-slate-300 hover:text-cyan-900 antialiased'
                    >
                      {ticketPrice === '0' ? (
                        <span className='align-bottom'>
                          'Conseguí tus entradas'
                        </span>
                      ) : (
                        <span className='align-bottom'>
                          'Comprar'
                        </span>
                      )}
                    </Link>
                  ) : (
                    ticketPrice !== '0' && (
                      <span className='text-gray-500 align-bottom'>
                        Se consiguen en puerta
                      </span>
                    )
                  )}
                  <BotonCompartir title={eventTitle} url={eventUrl} />

                  {/* {ticketLink && ticketPrice !== '0' ? (
                    <Link
                      href={'/'}
                      className=' bg-slate-200 ms-4 rounded-2xl p-2 hover:bg-slate-300 hover:text-cyan-900 antialiased'
                    >
                      Comprar
                    </Link>
                  ) : (
                    <span className='text-gray-500'>
                      Se venden en puerta
                    </span>
                  )} */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <button
            onClick={() => router.back()}
            type='button'
            aria-label='Volver'
            className='text-slate-700 bg-slate-50 font-semibold hover:bg-slate-200 rounded-2xl p-2 antialiased'
          >
            Volver
          </button>
        </div>
      </div>
    </>
  );
};

export default EventPage;
