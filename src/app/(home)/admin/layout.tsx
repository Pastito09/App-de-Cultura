// import { auth } from '@/auth.config';
// import { redirect } from 'next/navigation';

import { Footer, Sidebar } from '@/custom-components';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const session = await auth();

  //   if (session?.user.role !== 'admin') {
  // redirect('/login');
  //   }

  return (
    <div className='flex h-full'>
      <div className=' sm:flex-1  w-auto order-3 sm-order-2 justify-center items-center'>
        {children}
        <Footer />
      </div>
      <div className='lg:w-[12%] h-screen border hidden lg:block sm:order-3 ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
}
