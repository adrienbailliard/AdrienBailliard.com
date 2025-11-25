import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie } from '@/lib/adminAuth';
import site from "@/config/site";


export async function GET(request: NextRequest)
{
    const token = request.nextUrl.searchParams.get(site.adminCookie.name);
    const res = NextResponse.redirect(new URL('/', request.url));

    await updateAdminCookie(res.cookies, token);
    return res;
}