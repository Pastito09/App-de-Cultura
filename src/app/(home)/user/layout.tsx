import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

import { Sidebar } from '@/custom-components';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-[1fr_12%] min-h-screen '>
      <div className=''>{children}</div>
      <div className='hidden lg:block min-h-screen border ms-1 border-slate-300 rounded-lg'>
        <Sidebar />
      </div>
    </div>
  );
}
