import Link from 'next/link';

import { EventoDB } from '@/interface/EventoDB.interface';

import { EventoCard2 } from './EventoCard2';
import { VolverButton } from '@/custom-components';

export default async function GridEventosPage({
  events,
}: {
  events: EventoDB[];
}) {
  if (events!.length === 0) {
    return (
      <div className='bg-white pb-16  min-h-screen py-6 '>
        <div className='mx-auto px-6'>
          <div className='flex flex-col'>
            <h2 className='text-3xl mt-2 font-semibold tracking-tight text-pretty text-center  text-gray-900 md:text-5xl'>
              No hay eventos
            </h2>
            <Link
              href={'/user/crear'}
              className='mt-16 text-center hover:text-pretty  xl:mt-24'
            >
              <span className='rounded-full p-2  bg-slate-200 text-blue-950 hover:bg-slate-300 '>
                ¿Querés crear uno?
              </span>
            </Link>
            <div className='mt-8 flex justify-center'>
              <VolverButton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white justify-center flex py-6'>
      <div className='m-2 grid grid-cols-1  md:mt-20 md:gap-x-8 gap-y-2 md:gap-y-4  p-2 '>
        {events!.map((event: EventoDB) => (
          <EventoCard2 key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
