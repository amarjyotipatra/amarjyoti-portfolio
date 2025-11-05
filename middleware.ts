import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware disabled - admin page uses client-side fingerprint authentication
export default function middleware(request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: []
};
