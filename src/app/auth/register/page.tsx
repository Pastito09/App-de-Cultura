import RegisterForm from './ui/RegisterForm';
import { VolverButton } from '@/custom-components';

export default function RegisterPage() {
  return (
    <div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
      <h1 className=' text-4xl mb-5'>Nueva cuenta</h1>
      <RegisterForm />
      <div className='my-5'>
        <VolverButton />
      </div>
    </div>
  );
}
