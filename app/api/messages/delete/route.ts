import { z } from 'zod';
import { deleteMessages } from '@/lib/db/messages';


const DeleteSchema = z.object({
  ids: z.array(z.number()).min(1)
});


export async function DELETE(request: Request)
{
    const body = await request.json();
    const result = DeleteSchema.safeParse(body);

    if (!result.success)
        return Response.json({ error: "Invalid data" }, { status: 400 });

    await deleteMessages(result.data.ids);
    return Response.json({ success: true });
}