import { auth } from '@/auth.config';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
// import Link from 'next/link';

export const NavbarProfile = async () => {
  const session = await auth();
  const { user } = session!;

  return (
    // <Link
    //   href={'/user/perfil'}
    //   className='sm:pointer-events-none pointer-events-auto'
    // >
    <Avatar>
      <AvatarImage
        src={user?.image || undefined}
        alt='Avatar de usuario'
      />
      <AvatarFallback className='bg-slate-500'>
        {user?.name?.trim().charAt(0)}
      </AvatarFallback>
    </Avatar>
    // </Link>
  );
};
