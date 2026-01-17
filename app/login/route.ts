import { NextResponse, NextRequest } from 'next/server';
import { updateAdminCookie, isAdminLoginToken } from '@/lib/adminAuth';

import authConfig from "@/config/auth";



export async function GET(request: NextRequest)
{
    const token = request.nextUrl.searchParams.get(authConfig.cookie.name);
    const res = NextResponse.redirect(new URL('/', request.url));

    if (token && await isAdminLoginToken(token))
        await updateAdminCookie(res.cookies, token);

    return res;
}