import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const isAuthenticated = (req: NextRequest): boolean => {
  const token = req.cookies.get('next-auth.session-token') || req.cookies.get('__Secure-next-auth.session-token');
  return Boolean(token); 
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const userIsAuthenticated = isAuthenticated(req);

  if (pathname === '/') {
    return userIsAuthenticated
      ? NextResponse.redirect(new URL('/dashboard', req.url)) 
      : NextResponse.redirect(new URL('/login', req.url)); 
  }

  if (pathname === '/login') {
    return userIsAuthenticated
      ? NextResponse.redirect(new URL('/dashboard', req.url)) 
      : NextResponse.next(); 
  }

  if (pathname.startsWith('/dashboard')) {
    if (!userIsAuthenticated) {
      return NextResponse.redirect(new URL('/login', req.url)); 
    }
    return NextResponse.next(); 
  }

  if (pathname.startsWith('/api')) {
    if (!userIsAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); 
    }
    return NextResponse.next(); 
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/', 
    '/login', 
    '/dashboard/:path*',
    '/api/movies/:path*', 
    '/api/discover/:path*', 
    '/api/shows/:path*'
  ], 
};
