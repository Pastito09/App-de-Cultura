import Link from 'next/link';

import { IoLocationSharp } from 'react-icons/io5';

export function EventLocation({
  eventLocation, // string con la URL de Google Maps
  eventLocationName, // string con el nombre del lugar
  eventLocationMap, // no se usa en este componente, pero podría ser útil para otros casos
}: {
  className?: string; // opcional, no se usa aquí
  eventLocation?: string | null;
  eventLocationName?: string | null;
  eventLocationMap?: string | null; // opcional, no se usa aquí
}) {
  const hasMapLink = !!eventLocationMap; // true si hay link

  return (
    <div className='text-gray-600 flex items-center'>
      <IoLocationSharp size={20} className='me-2' />

      {hasMapLink ? (
        <Link
          href={eventLocationMap!}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500/65 hover:underline'
        >
          {eventLocation} -{' '}
          {eventLocationName || 'Ver en Google Maps'}
        </Link>
      ) : (
        <span className='text-gray-600'>
          {eventLocation || 'No hay locación'} - {eventLocationName!}
        </span>
      )}
    </div>
  );
}
