import { sql } from '@/lib/db/client';
import { NewsletterDraftPreview, PublishedNewsletterPreview, NewsletterSlug, Newsletter } from '@/lib/types';


export async function getNewsletterDraftsPreviews(): Promise<NewsletterDraftPreview[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at
        FROM newsletters
        WHERE newsletters.published_at IS NULL
        ORDER BY updated_at DESC
    ` as NewsletterDraftPreview[];

    return result;
}


export async function getPublishedNewsletterPreviews(limit?: number): Promise<PublishedNewsletterPreview[]>
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


export async function getPublishedNewsletterSlugs(): Promise<NewsletterSlug[]>
{
    const result = await sql `
        SELECT slug
        FROM newsletters
        WHERE newsletters.published_at IS NOT NULL
    ` as NewsletterSlug[];

    return result;
}


export async function getNewsletterBySlug(slug: string): Promise<Newsletter | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug}
    ` as Newsletter[];

    return result[0] || null;
}