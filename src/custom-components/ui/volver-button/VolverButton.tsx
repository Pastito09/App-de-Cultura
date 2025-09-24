import Link from 'next/link';

export const VolverButton = () => {
  return (
    <div className='flex justify-center'>
      <Link
        href={'/'}
        className='text-sm p-2 rounded-xl bg-slate-200 text-blue-950 hover:bg-slate-400 hover:font-semibold'
      >
        Volver al menu principal
      </Link>
    </div>
  );
};
