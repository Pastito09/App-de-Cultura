'use client';

import { authenticate } from '@/actions';

import clsx from 'clsx';
import Link from 'next/link';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
// import { useFormStatus } from 'react-dom';
import { IoInformationOutline } from 'react-icons/io5';
import { GoogleSingInButton } from '@/custom-components/ui/google-button/GoogleSignInButton';
// import { IoInformationOutline } from 'react-icons/io5';

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  const router = useRouter();

  useEffect(() => {
    if (state === 'Éxito') {
      router.replace('/');
      window.location.replace('/');
    }
  }, [state, router]);
  return (
    <form
      action={formAction}
      className='flex flex-col'
      name='formulario-login'
    >
      <label htmlFor='email'>Correo electrónico</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='email'
        name='email'
        autoFocus
      />

      <label htmlFor='password'>Contraseña</label>
      <input
        className='px-5 py-2 border bg-gray-200 rounded mb-5'
        type='password'
        name='password'
      />
      <div
        className='flex h-8 items-end space-x-1'
        aria-live='polite'
        aria-atomic='true'
      >
        {state === 'CredentialsSignin' && (
          <div className='mb-2 flex flex-row'>
            <IoInformationOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>
              Credenciales invalidas
            </p>
          </div>
        )}
      </div>
      <button
        type='submit'
        className={clsx({
          'btn-primary': !isPending,
          'btn-disabled': isPending,
        })}
        disabled={isPending}
      >
        Ingresar
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link
        href='/auth/register'
        className='mb-4 btn-secondary text-center'
      >
        Crear una nueva cuenta
      </Link>
      <GoogleSingInButton />
    </form>
  );
};
