import { sql } from '@/lib/db/client';
import { NewsletterDraftPreview, PublishedNewsletterPreview } from '@/lib/types';


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


export async function getPublishedNewsletterPreview(limit?: number): Promise<PublishedNewsletterPreview[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, published_at
        FROM newsletters
        WHERE newsletters.published_at IS NOT NULL
        ORDER BY published_at DESC
        LIMIT ${limit}
    ` as PublishedNewsletterPreview[];

    return result;
}