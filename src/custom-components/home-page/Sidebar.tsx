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
  // {
  //   id: 4,
  //   name: 'Perfil',
  //   url: '/user/perfil',
  // },
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
      <div className='flex flex-row justify-center items-center h-8 bg-gray-800 text-white lg:mb-16'>
        <small>Manejá tus eventos</small>
      </div>
      <div className='flex flex-row lg:flex-col justify-evenly m-2 lg:mb-80'>
        {!user
          ? dataSidebarNotUser.map((item) => (
              <Link href={item.url} key={item.id}>
                {' '}
                <div className='flex flex-row  hover:bg-gray-200 p-1 lg:ps-2 rounded-md m-1 bg-gray-200 lg:bg-inherit'>
                  <small>{item.name}</small>
                </div>
              </Link>
            ))
          : dataSidebarUser.map((item) => (
              <Link href={item.url} key={item.id}>
                <div className='flex flex-row hover:bg-gray-200 p-1 ps-2 rounded-md m-1  bg-gray-200 lg:bg-inherit'>
                  <small>{item.name}</small>
                </div>
              </Link>
            ))}
      </div>
      <div className='flex flex-col justify-center items-center '>
        <div className='h-1 border bg-slate-700 hidden lg:block w-auto' />
        <div className='my-2 hover:bg-gray-200 w-auto text-center rounded-md  bg-gray-200 lg:bg-inherit'>
          <SessionButton user={user} />
        </div>
      </div>
    </div>
  );
};
