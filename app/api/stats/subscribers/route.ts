import { getSubscriberStats } from '@/lib/db/subscribers';
import { STATS_REVALIDATE } from '@/lib/constants';


export const revalidate = STATS_REVALIDATE;

export async function GET()
{
    const stats = await getSubscriberStats();
    return Response.json(stats);
}