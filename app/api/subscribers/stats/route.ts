import { getSubscribersStats } from '@/lib/db/subscribers';
import { DATA_REVALIDATE } from '@/lib/constants';


export async function GET()
{
    const stats = await getSubscribersStats();
    
    return Response.json(stats, {
        headers: {
            'Cache-Control': 'public, s-maxage=' + DATA_REVALIDATE
        }
    });
}