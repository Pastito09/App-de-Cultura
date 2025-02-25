import Link from 'next/link';
import {
  IoCalendarOutline,
  IoPersonCircleOutline,
} from 'react-icons/io5';

export const Navbar = () => {
  return (
    <header>
      <nav className='flex flew-row  w-full justify-between items-center px-0 md:px-5 bg-gray-800 text-white'>
        <div className='m-2'>
          <Link href='/calendar'>
            <IoCalendarOutline size={30} />
          </Link>
        </div>
        <div className='gap-2 items-center hidden sm:flex'>
          <Link href='/'>
            <span className='text-pretty m-auto font-semibold'>
              Calendario Cultural
            </span>
          </Link>
        </div>
        <div className='m-2 flex gap-2 items-center'>
          <Link href='/auth/login'>
            <span>Login</span>
          </Link>
          <span> | </span>
          <Link href='/auth/register'>
            <span>Register</span>
          </Link>
          <IoPersonCircleOutline size={30} />
        </div>
      </nav>
    </header>
  );
};
