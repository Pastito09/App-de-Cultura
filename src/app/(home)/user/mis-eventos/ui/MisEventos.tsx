import { getUserEvents } from '@/actions';
import { VolverButton } from '@/custom-components';
import { CustomTitle } from '@/custom-components/ui/custom-title/CustomTitle';
import { DeleteEventButton } from '@/custom-components/ui/delete-event-button/DeleteEventButton';
import { getDiasHoras } from '@/utils';

import Link from 'next/link';

interface Props {
  userId: string;
}

export const MisEventos = async ({ userId }: Props) => {
  const { eventosDelUsuario } = await getUserEvents(userId);

  if (eventosDelUsuario?.length === 0) {
    return (
      <>
        <CustomTitle>No tienes eventos registrados.</CustomTitle>
        <div
          className='flex flex-col gap-10
         items-center mt-28'
        >
          <div>
            <Link
              href='/user/crear'
              className='mt-16 text-center hover:text-pretty  xl:mt-24'
            >
              <span className='rounded-full p-2  bg-slate-200 text-blue-950 hover:bg-slate-300 '>
                ¿Querés crear uno?
              </span>
            </Link>
          </div>
          <VolverButton />
        </div>
      </>
    );
  }

  return (
    <div className='flex flex-col items-center rounded-md w-full min-w-full px-2 bg-emerald-50/50 min-h-screen'>
      <CustomTitle>Mis Eventos:</CustomTitle>
      <table className='table-auto w-full border rounded border-gray-300 text-sm m-8'>
        <thead className='bg-gray-100/55'>
          <tr>
            <th className='p-2 text-center w-[15%]'>Título</th>
            <th className='p-2 text-center w-auto max-w-[350px]'>
              Descripción
            </th>
            <th className='p-2 text-center w-[15%]'>Fecha</th>
            <th className='p-2 text-center w-[15%]'>Lugar</th>
            <th className='p-2 text-center w-[10%]'>Hora</th>
            <th className='p-2 text-center w-[20%]'>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventosDelUsuario!.map((event) => {
            const { diaDeLaSemana, dia } = getDiasHoras(
              event.eventDate
            );
            return (
              <tr key={event.id} className='border-t align-top'>
                <td className='p-2'>{event.eventTitle}</td>
                <td className='p-2 w-auto max-w-[350px]'>
                  <div className='line-clamp-3 break-words whitespace-pre-line'>
                    {event.eventDescription}
                  </div>
                </td>
                <td className='p-2 text-center'>
                  {diaDeLaSemana}, {dia}
                </td>
                <td className='p-2 text-center'>
                  {event.eventLocationName}
                </td>
                <td className='p-2 text-center'>{event.startTime}</td>
                <td className='p-2 align-middle'>
                  <div className='flex justify-evenly items-center'>
                    <Link
                      href={`/user/mis-eventos/editar/${event.id}`}
                      className='text-blue-600 hover:underline'
                    >
                      Editar
                    </Link>
                    <DeleteEventButton eventId={event.id} />{' '}
                    <Link
                      href={`/${event.eventSlug}`}
                      rel='noopener noreferrer'
                      className='text-green-600 hover:underline'
                    >
                      Ver
                    </Link>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <VolverButton />
    </div>
  );
};
