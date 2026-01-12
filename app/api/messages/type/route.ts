import { z } from 'zod';
import { revalidateTag } from 'next/cache';

import { updateMessagesReadStatus } from '@/lib/db/messages';



const UpdateStatusSchema = z.object({
  ids: z.array(z.number().min(1)).min(1),
  areRead: z.boolean()
});


export async function PATCH(request: Request)
{
    const body = await request.json();
    const { ids, areRead } = UpdateStatusSchema.parse(body);

    await updateMessagesReadStatus(ids, areRead);
    revalidateTag("messages", { expire: 0 });

    return Response.json({ success: true });
}