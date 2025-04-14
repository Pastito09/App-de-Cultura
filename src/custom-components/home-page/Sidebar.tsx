import Link from 'next/link';
import React from 'react';

export const Sidebar = () => {
  const dataSidebar = [
    {
      id: 1,
      name: 'Crear Evento',
      url: '/admin/crear',
    },
    {
      id: 2,
      name: 'Buscar Evento',
      url: '/admin/buscar',
    },
    {
      id: 3,
      name: 'Mis Eventos',
      url: '/admin/mis-eventos',
    },
    {
      id: 4,
      name: 'Borrar Evento',
      url: '/admin/borrar',
    },
    {
      id: 5,
      name: 'Crear Usuario',
      url: '/#',
    },
    {
      id: 6,
      name: 'Modificar Perfil',
      url: '/admin/perfil',
    },
  ];

  return (
    <div className='h-full'>
      <div className='flex flex-row justify-center items-center h-8 bg-gray-800 text-white mb-16'>
        <small>Manejá tus eventos</small>
      </div>
      <div className='flex flex-col  m-2 mb-80'>
        {dataSidebar.map((item) => (
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
          <Link href='/#'>
            <small>Cerrar Sesión</small>
          </Link>
        </div>
      </div>
    </div>
  );
};
