import { z } from 'zod';
import { updateMessagesReadStatus } from '@/lib/db/messages';


const UpdateStatusSchema = z.object({
  ids: z.array(z.number()).min(1),
  areRead: z.boolean()
});


export async function PATCH(request: Request)
{
    const body = await request.json();
    const result = UpdateStatusSchema.safeParse(body);

    if (!result.success)
        return Response.json({ error: "Invalid data" }, { status: 400 });

    await updateMessagesReadStatus(result.data.ids, result.data.areRead);
    return Response.json({ success: true });
}