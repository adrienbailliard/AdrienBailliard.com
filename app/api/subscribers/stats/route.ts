import { getSubscribersStats } from '@/lib/db/subscribers';

export async function GET()
{
    const stats = await getSubscribersStats();
    return Response.json(stats);
}