import { NextRequest } from 'next/server';
import { serialize } from 'cookie'; // Pastikan untuk mengimpor serialize dari cookie

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // const response = await fetch('https//:rwu.my/id/api/v2/auth/login', {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (data.access_token) {
    // Set cookie with token
    const headers = new Headers();
    headers.append('Set-Cookie', serialize('accessToken', data.access_token, { // Gunakan access_token dari data
      httpOnly: true, // Prevents client-side access
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    }));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers,
    });
  }

  return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
    status: 401,
  });
}
