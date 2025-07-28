// Empty middleware - all domain restrictions removed
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Simply continue with the request without any domain checks
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|css|js|woff|woff2|ttf|eot)$).*)',
  ],
};