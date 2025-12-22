import { z } from 'zod';
import { deleteMessages } from '@/lib/db/messages';


const IdsSchema = z.array(z.number().min(1)).min(1);

export async function DELETE(request: Request)
{
    const body = await request.json();
    const validIds = IdsSchema.parse(body.ids);

    await deleteMessages(validIds);
    return Response.json({ success: true });
}