import { revalidateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { unsubscribe, addSubscriber } from "@/lib/db/subscribers";
import { verifyJWT } from '@/lib/security';



export async function updateSubscription(jwt: string, subscribe: boolean): Promise<void>
{
    const payload = await verifyJWT(jwt);

    if (!payload)
        throw Error("JWT not valid");

    subscribe
        ? await addSubscriber(payload.email)
        : await unsubscribe([ payload.email ]);

    revalidateTag(CACHE_TAGS.subscribersStats, { expire: 0 });
    revalidateTag(`${CACHE_TAGS.isSubscribed}-${payload.email}`, { expire: 0 });
}