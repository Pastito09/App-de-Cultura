import { Footer, Navbar } from '@/custom-components';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header>
        {/* <nav className=' flex flex-row items-center flex-wrap gap-3 justify-around h-10'>
          <div>hola</div>
          <div>hola</div>
          <div>hola</div>
          <div>hola</div>
          <div>hola</div>
          <div>hola</div>
        </nav> */}
        <Navbar />
      </header>

      <main className='bg-gray-100 w-screen items-center justify-center h-screen'>
        {children}
      </main>
      <Footer />
    </>
  );
}
