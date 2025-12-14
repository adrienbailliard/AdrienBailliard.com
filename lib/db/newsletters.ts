import { sql } from '@/lib/db/client';
import { NewsletterDraftPreviewDB, PublishedNewsletterPreviewDB, NewsletterSlug, NewsletterDB } from '@/lib/types';


export async function getNewsletterDraftsPreviews(): Promise<NewsletterDraftPreviewDB[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at
        FROM newsletters
        WHERE newsletters.published_at IS NULL
        ORDER BY updated_at DESC
    ` as NewsletterDraftPreviewDB[];

    return result;
}


export async function getPublishedNewsletterPreviews(limit?: number): Promise<PublishedNewsletterPreviewDB[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, published_at
        FROM newsletters
        WHERE newsletters.published_at IS NOT NULL
        ORDER BY published_at DESC
        LIMIT ${limit}
    ` as PublishedNewsletterPreviewDB[];

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


export async function getNewsletterBySlug(slug: string): Promise<NewsletterDB | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug}
    ` as NewsletterDB[];

    return result[0] || null;
}