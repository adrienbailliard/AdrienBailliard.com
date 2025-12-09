import { sql } from '@/lib/db/client';
import { NewsletterDraft } from '@/lib/types';


export async function getNewsletterDrafts(): Promise<NewsletterDraft[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at
        FROM newsletters
        WHERE newsletters.published_at IS NULL
        ORDER BY updated_at DESC
    ` as NewsletterDraft[];

    return result;
}