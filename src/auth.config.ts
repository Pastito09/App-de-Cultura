import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google'
import {z} from 'zod'


import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import { prisma } from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcryptjs from 'bcryptjs';

 
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register'
  },
  providers: [
         Credentials({
      async authorize(credentials) {

        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

          if (!parsedCredentials.success) return null;

          const { email, password } = parsedCredentials.data
          
          
          // buscar correo
          const user = await prisma.user.findUnique({where: {email: email.toLowerCase()}})

          if ( !user) return null

         // comparar contraseñas
          if (! bcryptjs.compareSync(password, user.password!)) return null

          // regresar usuario sin password
          const { password: _, ...restUser} = user

          return restUser;
      },
    }),
    
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",


    }),


  ],
  callbacks: {
   async signIn({ user, account }) {
    // Solo actuamos cuando es login con Google
    if (account?.provider === 'google' && user?.email) {
      // Buscamos si ya existe un usuario con ese email
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      })

      if (existingUser) {
        // Buscamos si ya está vinculado a Google
        const linkedAccount = await prisma.account.findFirst({
          where: {
            provider: 'google',
            userId: existingUser.id,
          },
        })

        // Si NO está vinculado todavía...
        if (!linkedAccount) {
          // Vinculamos la cuenta de Google al usuario existente
          await prisma.account.create({
            data: {
              userId: existingUser.id,
              type: account.type,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              access_token: account.access_token ?? null,
              token_type: account.token_type ?? null,
              id_token: account.id_token ?? null,
              scope: account.scope ?? null,
              expires_at: account.expires_at ?? null,
              refresh_token: account.refresh_token ?? null,
              session_state: account.session_state?.toString() ?? null,
            },
          })
        }

        // 👇 Este paso es CRUCIAL: le indicamos a NextAuth que use el user existente
        // porque si no, seguirá con el que viene por defecto (que es uno nuevo)
        user.id = existingUser.id
      }
    }

    return true
  },
    async jwt({ token, account, user}) {
    if (account) {
      token.provider = account.provider; // 👈 Guardamos el proveedor en el token
    }
    if (user) {
      token.id = user.id; // 👈 Guardamos el ID del usuario en el token
    }
    return token;
  },
  async session({ session, token }) {
  if (token) {
    if (token.provider) {
      // solo si existe
      (session as any).provider = token.provider;
    }

    if (token.id) {
      session.user.id = token.id as string;
    }
  }

  return session;
}
,
    async redirect({ url, baseUrl }) {
      // Permite URLs relativas
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Permite URLs del mismo dominio
      else if (new URL(url).origin === baseUrl) return url
      // Redirige a la página principal por defecto
      return baseUrl
    }
  },
  
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth, } = NextAuth(authConfig)