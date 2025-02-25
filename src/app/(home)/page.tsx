import { HomeMovilePage } from '@/custom-components/ui/home-page/HomeMovilePage';
import { HomePage } from '@/custom-components/ui/home-page/HomePage';

export default function Home() {
  return (
    <>
      <div className='hidden sm:block'>
        <HomePage />
      </div>
      <div className='block sm:hidden'>
        <HomeMovilePage />
      </div>
    </>
  );
}
