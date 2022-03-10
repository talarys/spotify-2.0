import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.includes('/api/auth')
   || pathname.includes('.svg')
   || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== '/login') {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }
  return null;
}
