import { deleteMessages } from '@/lib/db/messages';

export async function POST(request: Request)
{
    const { ids }: Record<string, unknown> = await request.json();

    if (ids && Array.isArray(ids) && ids.length > 0)
        await deleteMessages(ids);

    return Response.json({ success: true });
}