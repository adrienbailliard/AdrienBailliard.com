import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import { SignJWT, jwtVerify } from 'jose';

import authConfig from "@/config/auth";


const SECRET = new TextEncoder().encode(process.env.ADMIN_SECRET!);



export async function generateAdminLoginToken(expirationTime: number)
{
    return await new SignJWT()
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime(`${expirationTime}s`)
        .sign(SECRET);
}



export async function isAdminLoginToken(token: string)
{
    try {
        await jwtVerify(token, SECRET);
        return true;
    }
    catch {
        return false;
    }
}



export async function updateAdminCookie(cookies: ResponseCookies, token?: string | null)
{
    cookies.set(authConfig.cookie.name, await generateAdminLoginToken(authConfig.cookie.maxAge), {
        secure: true,
        sameSite: 'lax',
        path: authConfig.cookie.path,
        maxAge: authConfig.cookie.maxAge
    });
}