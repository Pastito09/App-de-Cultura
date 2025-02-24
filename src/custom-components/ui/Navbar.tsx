import Link from 'next/link';
import {
  IoCalendarOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';

export const Navbar = () => {
  return (
    <>
      <nav className='flex flew-row  w-screen justify-between items-center px-0 md:px-5 bg-gray-800 text-white'>
        <div className='m-2'>
          <Link href='/calendar'>
            <IoCalendarOutline size={30} />
          </Link>
        </div>
        <div className='flex gap-2 items-center'>
          <Link href='/'>
            <span className='text-pretty m-auto font-semibold'>
              Calendario Cultural
            </span>
          </Link>
        </div>
        <div className='m-2 flex gap-2 items-center'>
          <span>Login</span>
          <span> | </span>
          <span>Register</span>
          <IoPersonCircleOutline size={30} />
        </div>
      </nav>
    </>
  );
};
