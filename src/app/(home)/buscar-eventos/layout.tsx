import { Sidebar } from '@/custom-components';

export default function BuscarEventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1fr_12%] min-h-screen '>
      <div className=''>{children}</div>
      <div className='hidden lg:block h-screen border ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
}
