import { getMessagesStats } from '@/lib/db/messages';

export async function GET()
{
    const stats = await getMessagesStats();
    return Response.json(stats);
}