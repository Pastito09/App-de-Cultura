// app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth.config';

export const GET = handlers.GET;
export const POST = handlers.POST;

// Opcional: Manejar otros métodos si es necesario
export const dynamic = 'force-dynamic'; // Para evitar caching
