import { CustomTitle } from '@/custom-components/ui/custom-title/CustomTitle';
import EventContainer from '@/custom-components/ui/event-container/EventContainer';
import GridEventosPage from './ui/GridEventosPage';
import Link from 'next/link';
import { getPaginatedEvents } from '@/actions/events/getPaginatedEvents';
import { PaginationEvent } from '@/custom-components/ui/pagination/PaginationEvent';
import { EventType } from '../../../../generated/prisma';
import { EventTypeFilter } from '@/custom-components/ui/event-type-filter/EventTypeFilter';
import { VolverButton } from '@/custom-components';

interface Props {
  searchParams: Promise<{
    page?: string;
    type?: EventType;
  }>;
}

export default async function BuscarEventosPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const page = params.page ? parseInt(params.page) : 1;
  const type = params.type ?? undefined;

  const { events, totalPages } = await getPaginatedEvents({
    page,
    take: 8,
    EventType: type,
  });

  return (
    <EventContainer>
      <CustomTitle>Buscar Eventos</CustomTitle>

      <div className='flex flex-col  md:flex-row ms-2 md:ms-4 m-2 gap-1 justify-between w-full'>
        <div className='ms-8'>
          <span className='text-xs md:text-sm font-bold text-gray-700'>
            (Están ordenados cronológicamente)
          </span>
        </div>
        <div className='flex flex-col gap-2 text-center text-sm mt-6 md:mt-0'>
          <span>Filtrá por tipo de evento:</span>
          <EventTypeFilter />
        </div>
        <div className='me-8 my-3 text-center'>
          <span className='text-xs md:text-sm  text-gray-700 pointer hover:underline'>
            <Link
              href={'/calendar'}
              className='border rounded-lg border-gray-300 p-1'
            >
              O buscá por fecha en el calendario
            </Link>
          </span>
        </div>
      </div>

      <div className='flex flex-col w-full'>
        <GridEventosPage events={events!} />
        <div className='flex justify-center p-4 mt-4 mb-20'>
          <PaginationEvent totalPages={totalPages} />
        </div>
      </div>
      <div className='flex justify-center my-10'>
        <VolverButton />
      </div>
    </EventContainer>
  );
}
