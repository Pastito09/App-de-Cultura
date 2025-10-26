import { Sidebar } from '@/custom-components';

export default function BuscarEventosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className='grid min-h-screen 
        grid-cols-1 lg:grid-cols-[1fr_12%] 
        grid-rows-[auto_1fr] lg:grid-rows-1 '
    >
      <div className='order-2 lg:order-1'>{children}</div>
      <div className='order-1 lg:order-2 border ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
}
