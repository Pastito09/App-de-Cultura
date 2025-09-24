import NextAuth from 'next-auth';

// Extendemos los tipos de NextAuth para incluir `user.id` y `provider`
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    provider?: string;
  }

  interface User {
    id: string;
  }

  interface JWT {
    id?: string;
    provider?: string;
  }
}
