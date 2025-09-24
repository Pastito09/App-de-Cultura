'use client';

import { logout } from '@/actions';
import { Session } from 'next-auth';
import Link from 'next/link';

interface Props {
  user: Session | null;
}

export const SessionButton = ({ user }: Props) => {
  if (!user) {
    return (
      <Link href={'/auth/login'} type='button'>
        <small>Iniciar Sesión</small>
      </Link>
    );
  }
  return (
    <button type='button' onClick={() => logout()}>
      <small>Cerrar Sesión</small>
    </button>
  );
};

export default SessionButton;
