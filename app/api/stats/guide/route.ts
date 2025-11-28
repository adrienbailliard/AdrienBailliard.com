import { getGuideStats } from '@/lib/db/guide';
import { STATS_REVALIDATE } from '@/lib/constants';


export const revalidate = STATS_REVALIDATE;

export async function GET()
{
    const stats = await getGuideStats();
    return Response.json(stats);
}