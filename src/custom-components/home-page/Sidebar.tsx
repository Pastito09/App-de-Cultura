import { auth } from '@/auth.config';
import Link from 'next/link';

import { SessionButton } from './SessionButton';
const dataSidebarUser = [
  {
    id: 1,
    name: 'Crear evento',
    url: '/user/crear',
  },
  {
    id: 2,
    name: 'Buscar eventos',
    url: '/buscar-eventos',
  },
  {
    id: 3,
    name: 'Mis eventos',
    url: '/user/mis-eventos',
  },
  {
    id: 4,
    name: 'Perfil',
    url: '/user/perfil',
  },
];

const dataSidebarNotUser = [
  {
    id: 1,
    name: 'Buscar eventos',
    url: '/buscar-eventos',
  },
  {
    id: 2,
    name: 'Crear evento',
    url: '/user/crear',
  },
  {
    id: 3,
    name: 'Crear usuario',
    url: '/auth/register',
  },
];

export const Sidebar = async () => {
  const session = await auth();
  const user = session;

  return (
    <div className='h-full'>
      <div className='flex flex-row justify-center items-center h-8 bg-gray-800 text-white mb-16'>
        <small>Manejá tus eventos</small>
      </div>
      <div className='flex flex-col  m-2 mb-80'>
        {!user
          ? dataSidebarNotUser.map((item) => (
              <div
                key={item.id}
                className='flex flex-row hover:bg-gray-200 p-1 ps-2 rounded-md m-1'
              >
                <Link href={item.url}>
                  <small>{item.name}</small>
                </Link>
              </div>
            ))
          : dataSidebarUser.map((item) => (
              <div
                key={item.id}
                className='flex flex-row hover:bg-gray-200 p-1 ps-2 rounded-md m-1'
              >
                <Link href={item.url}>
                  <small>{item.name}</small>
                </Link>
              </div>
            ))}
      </div>
      <div className='flex flex-col justify-center items-center '>
        <div className='h-1 border bg-slate-700  w-full' />
        <div className='mt-2 hover:bg-gray-200 w-3/4 text-center rounded-md'>
          <SessionButton user={user} />
        </div>
      </div>
    </div>
  );
};
