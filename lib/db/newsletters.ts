import { sql } from '@/lib/db/client';
import { NewsletterDraftPreview } from '@/lib/types';


export async function getNewsletterDraftsPreview(): Promise<NewsletterDraftPreview[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at
        FROM newsletters
        WHERE newsletters.published_at IS NULL
        ORDER BY updated_at DESC
    ` as NewsletterDraftPreview[];

    return result;
}