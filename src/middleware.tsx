import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('request-geo', JSON.stringify(request.geo));
  requestHeaders.set('request-ip', JSON.stringify(request.headers.get('X-Forwarded-For')));

  return NextResponse.next({
    request:{
      headers: requestHeaders
    }
  });
}
