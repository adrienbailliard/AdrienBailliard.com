import { sql } from '@/lib/db/client';
import { NewsletterDraftPreviewDB, PublishedNewsletterPreviewDB, NewsletterSlug, DraftNewsletterDB, PublishedNewsletterDB } from '@/lib/types';


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


export async function getNewsletterDraftsSlugs(): Promise<NewsletterSlug[]>
{
    const result = await sql `
        SELECT slug
        FROM newsletters
        WHERE newsletters.published_at IS NULL
    ` as NewsletterSlug[];

    return result;
}


export async function getPublishedNewsletterBySlug(slug: string): Promise<PublishedNewsletterDB | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug} AND published_at IS NOT NULL
    ` as PublishedNewsletterDB[];

    return result[0] || null;
}


export async function getNewsletterDraftBySlug(slug: string): Promise<DraftNewsletterDB | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug} AND published_at IS NULL
    ` as DraftNewsletterDB[];

    return result[0] || null;
}