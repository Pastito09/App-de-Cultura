import Link from 'next/link';

export const CreaTuEvento = () => {
  return (
    <>
      <div className='flex justify-center'>
        <div>
          <Link
            href='/crear-evento'
            className='border rounded-lg border-blue-500 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-6 mb-4 inline-block'
          >
            Creá tu evento
          </Link>
        </div>
      </div>
    </>
  );
};
