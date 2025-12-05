import { setMessagesType } from '@/lib/db/messages';

export async function POST(request: Request)
{
    const { ids, areRead }: Record<string, unknown> = await request.json();

    if (typeof areRead === "boolean" && ids && Array.isArray(ids) && ids.length > 0)
        await setMessagesType(ids, areRead);

    return Response.json({ success: true });
}