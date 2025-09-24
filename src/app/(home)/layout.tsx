import { Navbar } from '@/custom-components';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='bg-gray-100  justify-center '>{children}</main>
    </div>
  );
}
