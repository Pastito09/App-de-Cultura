import { getEventByIdWithImages } from '@/actions/events/getEventByIdWithImages';
import { redirect } from 'next/navigation';

import { UpdateEventoForm } from './ui/UpdateEventoForm';
import EventContainer from '@/custom-components/ui/event-container/EventContainer';
import { CustomTitle } from '@/custom-components/ui/custom-title/CustomTitle';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditarEventoPage({ params }: Props) {
  const { id } = await params;
  const { ok, evento } = await getEventByIdWithImages(id);
  if (!ok) {
    redirect('/user/mis-eventos');
  }
  if (!evento) {
    redirect('/user/crear/nuevo');
  }
  const { user, ...rest } = evento;

  if (!user) {
    redirect('/');
  }

  return (
    <EventContainer>
      <CustomTitle>Editá tu evento</CustomTitle>
      <UpdateEventoForm evento={{ ...rest }} />
    </EventContainer>
  );
}
