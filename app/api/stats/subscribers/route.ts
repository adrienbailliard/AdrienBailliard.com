import { getSubscriberStats } from '@/lib/db/subscribers';
import { STATS_REVALIDATE } from '@/lib/constants';


export async function GET()
{
    const stats = await getSubscriberStats();
    
    return Response.json(stats, {
        headers: {
            'Cache-Control': 'public, s-maxage=' + STATS_REVALIDATE
        }
    });
}