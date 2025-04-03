import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    console.log('API Route - Received credentials:', { username });

    if (!username || !password) {
      return new NextResponse(JSON.stringify({ error: 'Missing username or password' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const backendResponse = await fetch('http://localhost:9090/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ username, password }).toString(),
    });

    const responseText = await backendResponse.text();
    console.log('Backend response:', responseText);

    return new NextResponse(responseText, {
      status: backendResponse.status,
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('API Route Error:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
