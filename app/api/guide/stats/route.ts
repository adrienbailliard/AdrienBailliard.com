import { getGuideStats } from '@/lib/db/guide';

export async function GET()
{
    const stats = await getGuideStats();
    return Response.json(stats);
}