import Image from 'next/image';
import Link from 'next/link';
import { IoLocationSharp } from 'react-icons/io5';

interface Props {
  title: string;
  description: string;
  initialDate: Date;
  locationName: string;
  location: string;
  image?: string;
}

export const Evento = ({
  title,
  description,
  initialDate,
  locationName,
  location,
  image = '',
}: Props) => {
  const date = initialDate;
  const hs = date.getHours();
  const min = date
    .getMinutes()
    .toString()
    .padStart(2, '0');
  const dia = date.toLocaleDateString();
  const nombreDia = (date: Date) => {
    const elDiaEs = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
    }).format(date);

    return elDiaEs.charAt(0).toUpperCase() + elDiaEs.slice(1);
  };

  const diaDeLaSemana = nombreDia(initialDate);

  return (
    <Link
      href={title
        .trim()
        .replace(/\s/g, '-')
        .toLowerCase()}
    >
      <article className='flex flex-col items-start border bg-slate-50 rounded-xl px-2 pb-1'>
        <div className='flex items-center gap-x-4 text-xs'>
          <span className='font-semibold tracking-wide text-blue-900'>
            {diaDeLaSemana}
          </span>

          <time
            dateTime={initialDate.toString()}
            className='text-gray-500'
          >
            {dia} - {hs}:{min}
          </time>
          <div className='flex flex-row gap-1 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'>
            <IoLocationSharp className='mt-0.5' />
            {locationName}
          </div>
        </div>
        <div className='group'>
          <h3 className='mt-2 mb-1 ms-3 sm:text-2xl font-semibold text-start  text-gray-900 group-hover:text-gray-600'>
            <span>
              <span className='inset-0' />
              {title}
            </span>
          </h3>
          <p className='line-clamp-3 text-sm/6 text-gray-600'>
            {description}
          </p>
        </div>
        <div className='flex items-center mt-2 gap-x-4'>
          <Image
            width={400}
            height={400}
            quality={100}
            alt=''
            src={image === '' ? './globe.svg' : image}
            className='w-20 h-20  rounded-sm'
          />
          <div className='text-xs  sm:text-sm/6'>
            <p className='font-semibold text-gray-900'>
              <span>
                <span className=' inset-0' />
                {location}
              </span>
            </p>
            <p className='text-gray-600'>{locationName}</p>
          </div>
        </div>
      </article>
    </Link>
  );
};
