import { ResponseCookies } from 'next/dist/server/web/spec-extension/cookies';
import { SignJWT, jwtVerify } from 'jose';

import authConfig from "@/config/auth";


const SECRET = Buffer.from(process.env.ADMIN_SECRET!);



export async function generateJWT(payload: Record<string, any>, expirationTimeSeconds?: number): Promise<string>
{
    const jwt = new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" });

    if (expirationTimeSeconds)
        jwt.setExpirationTime(`${expirationTimeSeconds}s`);

    return await jwt.sign(SECRET);
}



export async function verifyJWT(jwt: string): Promise<Record<string, any> | null>
{
    try {
        const verified = await jwtVerify(jwt, SECRET);
        return verified.payload;
    }
    catch {
        return null;
    }
}



export async function updateAdminCookie(cookies: ResponseCookies): Promise<void>
{
    const jwt = await generateJWT({}, authConfig.cookie.maxAge);

    cookies.set(authConfig.cookie.name, jwt, {
        secure: true,
        sameSite: 'lax',
        path: authConfig.cookie.path,
        maxAge: authConfig.cookie.maxAge
    });
}