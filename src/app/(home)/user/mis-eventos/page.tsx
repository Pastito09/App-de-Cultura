import EventContainer from '@/custom-components/ui/event-container/EventContainer';
import { MisEventos } from './ui/MisEventos';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

import { getUserEvents } from '@/actions';

export default async function MisEventosPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }
  const userId = session.user.id;
  return (
    <EventContainer>
      <MisEventos userId={userId} />
    </EventContainer>
  );
}
