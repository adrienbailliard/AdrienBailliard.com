import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie, isAdminLoginToken } from '@/lib/adminAuth';
import site from './config/site';


export default async function proxy(request: NextRequest)
{
  const res = NextResponse.next();
  const adminCookie = request.cookies.get(site.adminCookie.name);

  if (adminCookie && await isAdminLoginToken(adminCookie.value))
    await updateAdminCookie(res.cookies);

  else if (request.nextUrl.pathname.startsWith('/api/'))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  return res;
}


export const config = {
  matcher: ['/((?!_next|assets|robots.txt|sitemap.xml|login).*)'],
};