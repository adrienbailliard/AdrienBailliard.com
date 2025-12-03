import { getMessages } from '@/lib/db/messages';

export async function GET()
{
    const messages = await getMessages();
    return Response.json(messages);
}