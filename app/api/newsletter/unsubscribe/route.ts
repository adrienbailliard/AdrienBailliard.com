import { z } from 'zod';
import { revalidateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { unsubscribe } from "@/lib/db/subscribers";
import { verifyJWT } from '@/lib/security';

import authConfig from "@/config/auth";



const PayloadSchema = z.object({
    email: z.string()
});


export async function POST(request: Request)
{
    const { searchParams } = new URL(request.url);
    const jwt = searchParams.get(authConfig.cookie.name);

    if (!jwt)
        throw Error("JWT not found");

    const payload = await verifyJWT(jwt);

    if (!payload)
        throw Error("JWT is not valid");

    const { email } = PayloadSchema.parse(payload);
    await unsubscribe([ email ]);

    revalidateTag(CACHE_TAGS.subscribersStats, { expire: 0 });
    return Response.json({ success: true });
}