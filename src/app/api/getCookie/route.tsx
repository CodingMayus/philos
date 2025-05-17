'use server';

import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib/session';

export async function GET(request: Request) {
  const sessionToken = cookies().get("session")?.value;

  if (!sessionToken) {
    return new Response(JSON.stringify({ userId: null }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const session = await decrypt(sessionToken);
  const userId = typeof session?.userId === 'string' ? session.userId : null;

  return new Response(JSON.stringify({ userId }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
