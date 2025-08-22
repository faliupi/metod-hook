/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/logout/route.js
import { NextRequest } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const headers = new Headers();
  headers.append('Set-Cookie', serialize('accessToken', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: -1, // Menghapus cookie dengan mengatur maxAge ke -1
    path: '/',
  }));

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers,
  });
}
