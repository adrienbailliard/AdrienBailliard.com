import { revalidateTag, revalidatePath } from 'next/cache';

import { sendNewsletterEmails } from "@/lib/services/newsletter";
import { publishScheduledNewsletters } from '@/lib/db/newsletters';
import CACHE_TAGS from '@/lib/db/cache-tags';

import { NEWSLETTER_ROUTE, ADMIN_ROUTE } from "@/lib/constants";



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
            revalidatePath(`${ADMIN_ROUTE}${NEWSLETTER_ROUTE}/${newsletter.slug}`);
            revalidatePath(`${NEWSLETTER_ROUTE}/${newsletter.slug}`);

            return sendNewsletterEmails(newsletter);
        }));
    }

    return Response.json({ success: true });
}