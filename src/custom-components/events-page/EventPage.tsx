import { getDiasHoras } from '@/utils/getDiasHoras';
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

export const EventPage = ({
  title,
  description,
  initialDate,
  locationName,
  location,
  image,
}: Props) => {
  const { diaDeLaSemana, dia, hs, min } = getDiasHoras(initialDate);
  return (
    <>
      <div className='bg-black  h-auto md:h-[95vh] '>
        <div className='pt-6'>
          <div className='mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24'>
            <div className='lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-300 sm:text-5xl'>
                {title}
              </h1>
            </div>

            {/* Imagen  */}
            <div className='mt-4 lg:row-span-3 lg:mt-0'>
              <Image
                src={image || '/placeholder.jpg'}
                alt={description}
                height={500}
                width={500}
                quality={100}
              />
            </div>

            <div className='py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16'>
              {/* Description and details */}
              <div>
                <h3 className='sr-only'>Description</h3>

                <div className='space-y-6'>
                  <p className='text-base text-gray-400'>
                    {description}
                  </p>
                </div>
              </div>

              <div className='mt-10'>
                <h3 className='text-sm font-medium text-gray-400'>
                  {diaDeLaSemana} {dia} - {hs}:{min}Hs.
                </h3>

                <div className='mt-4'>
                  <div className='text-gray-400 flex '>
                    <IoLocationSharp size={20} className='me-2' />
                    <span className='text-gray-400'>
                      {location} - {locationName}
                    </span>
                  </div>
                </div>
              </div>

              <div className='mt-10'>
                <h2 className='text-sm font-medium text-gray-500'>
                  Entradas:
                </h2>

                <div className='mt-4 flex gap-4'>
                  <div className=''>
                    <p className='text-sm m-1 text-gray-500'>
                      {'$4000'}
                    </p>
                  </div>
                  <div className=''>
                    <Link
                      href={'/'}
                      className=' bg-slate-200 ms-4 rounded-2xl p-2 hover:bg-slate-300 hover:text-cyan-900 antialiased'
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex py-5 md:pt-28 justify-center items-center'>
          <Link
            href={'/'}
            className='text-slate-700 bg-slate-50 font-semibold hover:bg-slate-200 rounded-2xl p-2 antialiased'
          >
            Volver
          </Link>
        </div>
      </div>
    </>
  );
};

export default EventPage;
