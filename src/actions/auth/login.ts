'use server';

import { signIn } from '@/auth.config';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return 'Éxito';
  } catch (error) {
    if (error === 'CredentialsSignin') {
      return 'CredentialsSignin';
    }
    return 'Error desconocido';
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false });
    return { ok: true };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    };
  }
};

export async function singInWithGoogle() {
  await signIn('google', { redirectTo: '/', redirect: true });
}
