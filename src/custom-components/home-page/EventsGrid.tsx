import Link from 'next/link';
import { Evento } from '../events-page/Evento';

import { EventoDB } from '@/interface/EventoDB.interface';

export default async function EventsGrid({
  events,
}: {
  events: EventoDB[];
}) {
  if (events!.length === 0) {
    return (
      <div className='bg-gray-50 pb-16 xl:h-[57vh] xl:max-h-screen min-h-full overflow-y-auto xl:pb-80 py-6 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='flex flex-col mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-2xl mt-2 font-semibold tracking-tight text-pretty text-center  text-gray-900 lg:text-4xl'>
              No hay eventos culturales en la agenda.
            </h2>
            <Link
              href={'/user/crear'}
              className='m-8 text-center hover:text-pretty'
            >
              <span className='rounded-full p-2  bg-slate-200 text-blue-950 hover:bg-slate-300 '>
                ¿Querés crear uno?
              </span>
            </Link>
            <p className='text-center text-sm lg:m-8'>
              Puede ser un recital, una fiesta, una obra de teatro,
              una feria, o lo que quieras...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white h-auto overflow-y-auto py-6 scrollbar-thin scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-500 scrollbar-track-gray-200'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h2 className='text-3xl font-semibold tracking-tight text-pretty text-center md:text-start text-gray-900 md:text-5xl'>
            Próximos Eventos
          </h2>
        </div>
        <div className='mx-auto mt-2 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 border-t border-gray-200 pt-2 '>
          {events!.map((event) => (
            <Evento key={event.id} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
