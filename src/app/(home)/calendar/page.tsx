import { CalendarGrid, Footer } from '@/custom-components';
import Link from 'next/link';

export default function CalendarPage() {
  return (
    <div className='min-h-screen'>
      <CalendarGrid />
      <div className='flex justify-center'>
        <Link
          href={'/'}
          className='text-sm p-2 rounded-xl bg-slate-200 text-blue-950 hover:bg-slate-400 hover:font-semibold'
        >
          Volver al menu principal
        </Link>
      </div>
      <Footer />
    </div>
  );
}
