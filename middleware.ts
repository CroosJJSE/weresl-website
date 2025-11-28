import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin routes protection will be handled client-side with Firebase Auth
  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};

