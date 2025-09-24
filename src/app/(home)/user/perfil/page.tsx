import { getUserInfo } from '@/actions/user/getUserInfo';
import { auth } from '@/auth.config';
import { CustomTitle } from '@/custom-components/ui/custom-title/CustomTitle';
import EventContainer from '@/custom-components/ui/event-container/EventContainer';

export default async function PerfilPage() {
  const session = await auth();
  const id = session?.user?.id;

  if (!id) {
    return <div>Usuario no autenticado</div>;
  }

  const userInfo = await getUserInfo(id);

  return (
    <EventContainer>
      <CustomTitle>Perfil</CustomTitle>
      <div>{JSON.stringify(userInfo)}</div>
    </EventContainer>
  );
}
