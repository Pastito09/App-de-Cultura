import Link from 'next/link';
import { LoginForm } from './ui/LoginForm';

export default function LoginPage() {
  return (
    <div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className='text-4xl mb-5'>Ingresar</h1>
      <LoginForm />
      <Link
        href={'/'}
        className='rounded-xl bg-gray-200 mt-auto mb-10 text-center hover:bg-gray-300'
      >
        <span className='text-center'>Volver</span>
      </Link>
    </div>
  );
}
