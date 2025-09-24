import { CustomTitle } from '@/custom-components/ui/custom-title/CustomTitle';
import EventContainer from '@/custom-components/ui/event-container/EventContainer';
import { CrearEventoForm } from './ui/CrearEventoForm';
import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import { VolverButton } from '@/custom-components';

export default async function CrearEventoPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <EventContainer>
      <CustomTitle>Crear evento</CustomTitle>
      <CrearEventoForm />
      <div className='mt-8'>
        <VolverButton />
      </div>
    </EventContainer>
  );
}
