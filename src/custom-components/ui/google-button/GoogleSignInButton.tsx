'use client';

import { singInWithGoogle } from '@/actions';

import { useTransition } from 'react';
import { IoLogoGoogle } from 'react-icons/io5';

export const GoogleSingInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(async () => {
      await singInWithGoogle();
    });
  };
  return (
    <div className='flex btn-secondary justify-center '>
      <button
        onClick={handleSignIn}
        className='me-1'
        disabled={isPending}
      >
        Loggeate con Google
      </button>
      <IoLogoGoogle className='justify-self-end m-1' />
    </div>
  );
};
