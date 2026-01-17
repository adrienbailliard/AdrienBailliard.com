import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie, isAdminLoginToken } from '@/lib/adminAuth';

import authConfig from "@/config/auth";



export default async function proxy(request: NextRequest)
{
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;


  const adminCookie = request.cookies.get(authConfig.cookie.name);

  if (adminCookie && await isAdminLoginToken(adminCookie.value))
    await updateAdminCookie(res.cookies);

  else if (pathname.startsWith('/api/') && pathname !== "/api/webhooks/resend"
    || pathname.startsWith('/admin'))
    return NextResponse.rewrite(new URL('/404', request.url), { status: 404 });


  return res;
}


export const config = {
  matcher: ['/((?!_next|assets|robots.txt|sitemap.xml|login).*)'],
};