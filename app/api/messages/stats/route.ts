import { getMessagesStats } from '@/lib/db/messages';
import { DATA_REVALIDATE } from '@/lib/constants';


export async function GET()
{
    const stats = await getMessagesStats();

    return Response.json(stats, {
        headers: {
            'Cache-Control': 'public, s-maxage=' + DATA_REVALIDATE
        }
    });
}