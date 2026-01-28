import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie, verifyJWT } from '@/lib/security';

import authConfig from "@/config/auth";



export default async function proxy(request: NextRequest)
{
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();

  const jwt = pathname === "/login"
    ? request.nextUrl.searchParams.get(authConfig.cookie.name)
    : request.cookies.get(authConfig.cookie.name)?.value;


  if (jwt && await verifyJWT(jwt))
  {
    if (pathname === "/login")
      response = NextResponse.redirect(new URL('/', request.url))

    await updateAdminCookie(response.cookies);
  }

  else if ((pathname.startsWith('/api/') || pathname.startsWith('/admin'))
    && pathname !== "/api/webhooks/resend"
    && pathname !== "/api/newsletter/publish-scheduled"
    && pathname !== "/api/newsletter/unsubscribe")
    return NextResponse.rewrite(new URL('/404', request.url), { status: 404 });


  return response;
}


export const config = {
  matcher: ['/((?!_next|assets|robots.txt|sitemap.xml).*)'],
};