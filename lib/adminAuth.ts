import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import { SignJWT, jwtVerify } from 'jose';
import site from "@/config/site";

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
    if (token && await isAdminLoginToken(token))
    {
        cookies.set(site.adminCookie.name, await generateAdminLoginToken(site.adminCookie.maxAge), {
            secure: true,
            sameSite: 'strict',
            path: site.adminCookie.path,
            maxAge: site.adminCookie.maxAge
        });
    }
}