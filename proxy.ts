import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie } from '@/lib/adminAuth';
import site from './config/site';


export default async function proxy(req: NextRequest)
{
  const res = NextResponse.next();
  const token = req.cookies.get(site.adminCookie.name)?.value;

  await updateAdminCookie(res.cookies, token);
  return res;
}


export const config = {
  matcher: ['/((?!_next|assets|robots.txt|sitemap.xml).*)'],
};