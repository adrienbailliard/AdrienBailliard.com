import { revalidateTag, revalidatePath } from 'next/cache';

import { sendNewsletterEmails } from "@/lib/services/newsletter";
import { publishScheduledNewsletters } from '@/lib/db/newsletters';
import CACHE_TAGS from '@/lib/db/cache-tags';



export async function GET(request: Request)
{
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`)
        throw new Error("Not authorized");


    const response = await publishScheduledNewsletters();

    if (response.length > 0)
    {
        revalidateTag(CACHE_TAGS.newsletterPublishedPreviews, { expire: 0 });
        revalidateTag(CACHE_TAGS.newsletterScheduledPreviews, { expire: 0 });

        await Promise.all(response.map(newsletter => {
            revalidatePath(`/admin/newsletter/${newsletter.slug}`);
            revalidatePath(`/newsletter/${newsletter.slug}`);

            return sendNewsletterEmails(newsletter);
        }));
    }

    return Response.json({ success: true });
}