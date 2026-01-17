import { revalidateTag, revalidatePath } from 'next/cache';

import { publishScheduledNewsletters } from '@/lib/db/newsletters';
import CACHE_TAGS from '@/lib/db/cache-tags';



export async function GET(request: Request)
{
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
        throw new Error("Not authorized");


    const response = await publishScheduledNewsletters();

    for (const { slug } of response)
    {
        revalidatePath(`/newsletter/${slug}`);
        revalidatePath(`/admin/newsletter/${slug}`);
    }

    revalidateTag(CACHE_TAGS.newsletterPublished, { expire: 0 });
    revalidateTag(CACHE_TAGS.newsletterScheduled, { expire: 0 });

    return Response.json({ success: true });
}