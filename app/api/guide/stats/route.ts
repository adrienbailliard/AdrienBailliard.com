import { getGuideStats } from '@/lib/db/guide';
import { DATA_REVALIDATE } from '@/lib/constants';


export async function GET()
{
    const stats = await getGuideStats();

    return Response.json(stats, {
        headers: {
            'Cache-Control': 'public, s-maxage=' + DATA_REVALIDATE
        }
    });
}