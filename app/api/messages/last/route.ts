import { getLastMessages } from '@/lib/db/messages';

export async function GET()
{
    const messages = await getLastMessages();
    return Response.json(messages);
}