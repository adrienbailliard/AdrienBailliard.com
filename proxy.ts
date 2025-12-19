import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie, isAdminLoginToken } from '@/lib/adminAuth';
import { getNewsletterDraftsSlugs, getPublishedNewsletterSlugs } from "@/lib/db/newsletters";
import { DRAFT_CREATION_SLUG } from "@/lib/constants";
import site from './config/site';


export default async function proxy(request: NextRequest)
{
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;


  const adminCookie = request.cookies.get(site.adminCookie.name);

  if (adminCookie && await isAdminLoginToken(adminCookie.value))
    await updateAdminCookie(res.cookies);

  else if (pathname.startsWith('/api/') || pathname.startsWith('/admin'))
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });


  const isPublicNewsletter = pathname.startsWith('/newsletter/');
  const isAdminNewsletter = pathname.startsWith('/admin/newsletter/');

  if (isPublicNewsletter || isAdminNewsletter)
  {
    const slugIndex = isAdminNewsletter ? 3 : 2;
    const slug = pathname.split('/')[slugIndex];

    if (slug && (slug !== DRAFT_CREATION_SLUG || isPublicNewsletter))
    {
      const slugs = isAdminNewsletter 
        ? await getNewsletterDraftsSlugs()
        : await getPublishedNewsletterSlugs();

      if (!slugs.includes(slug))
        return NextResponse.error();
    }
  }


  return res;
}


export const config = {
  matcher: ['/((?!_next|assets|robots.txt|sitemap.xml|login).*)'],
};