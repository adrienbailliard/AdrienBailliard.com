import { z } from 'zod';
import { revalidateTag } from 'next/cache';

import CACHE_TAGS from '@/lib/db/cache-tags';
import { deleteMessages } from '@/lib/db/messages';



const IdsSchema = z.array(z.number().min(1)).min(1);


export async function DELETE(request: Request)
{
    const body = await request.json();
    const validIds = IdsSchema.parse(body.ids);

    await deleteMessages(validIds);
    revalidateTag(CACHE_TAGS.messagesStats, { expire: 0 });
    revalidateTag(CACHE_TAGS.messages, { expire: 0 });

    return Response.json({ success: true });
}