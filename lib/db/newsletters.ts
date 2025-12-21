import { sql } from '@/lib/db/client';
import { unstable_cache } from 'next/cache';

import { generateSlug } from "@/lib/utils";
import { NewsletterPreviewDB, PublishedNewsletterPreviewDB, NewsletterDB, InsertNewsletterParam, UpdateNewsletterParam } from '@/lib/types';



export async function publishNewsletterById(id: number)
{
    await sql`
        UPDATE newsletters
        SET published_at = NOW()
        WHERE id = ${id}
    `;
}


export async function deleteNewsletterById(id: number)
{
    await sql`
        DELETE FROM newsletters
        WHERE id = ${id}
    `;
}


async function getUniqueSlug(title: string): Promise<string>
{
    const baseSlug = generateSlug(title);

    const result = await sql`
        SELECT slug FROM newsletters 
        WHERE slug ~ ${ "^" + baseSlug + "(-[0-9]+)?$" }
        ORDER BY LENGTH(slug) DESC, slug DESC
        LIMIT 1
    `;

    if (result.length === 0)
        return baseSlug;

    const match = result[0].slug.match(/-(\d+)$/);
    const nextNumber = match ? parseInt(match[1]) + 1 : 2;

    return `${baseSlug}-${nextNumber}`;
}


export async function insertNewsletter(draft: InsertNewsletterParam): Promise<NewsletterDB>
{
    const slug = await getUniqueSlug(draft.title);

    const result = await sql`
        INSERT INTO newsletters (slug, title, content, excerpt)
        VALUES (${slug}, ${draft.title}, ${draft.content}, ${draft.excerpt})
        RETURNING *
    ` as NewsletterDB[];

    return result[0];
}


export async function updateNewsletter(draft: UpdateNewsletterParam): Promise<NewsletterDB>
{
    const newSlug = draft.title ? await getUniqueSlug(draft.title) : undefined;

    const result = await sql`
        UPDATE newsletters
        SET
            slug = COALESCE(${newSlug}, slug),
            title = COALESCE(${draft.title}, title),
            content = COALESCE(${draft.content}, content),
            excerpt = COALESCE(${draft.excerpt}, excerpt),
            updated_at = now()
        WHERE id = ${draft.id}
        RETURNING *
    ` as NewsletterDB[];

    return result[0];
}


export async function getNewsletterDraftsPreviews(): Promise<NewsletterPreviewDB[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at
        FROM newsletters
        WHERE newsletters.published_at IS NULL
        ORDER BY updated_at DESC
    ` as NewsletterPreviewDB[];

    return result;
}


export const getPublishedNewsletterPreviews = unstable_cache(
    async (limit?: number): Promise<PublishedNewsletterPreviewDB[]> => {
        const result = await sql `
            SELECT slug, title, excerpt, published_at
            FROM newsletters
            WHERE newsletters.published_at IS NOT NULL
            ORDER BY published_at DESC
            LIMIT ${limit}
        ` as PublishedNewsletterPreviewDB[];

        return result;
    },
    ['published-newsletter-previews'],
    { tags: ['published-newsletter-previews'] }
);


async function fetchSlugsByStatus(isPublished: boolean): Promise<string[]>
{
    const result = await sql`
        SELECT slug
        FROM newsletters
        WHERE published_at IS ${ isPublished ? sql`NOT NULL` : sql`NULL` }
    `;

    return result.map((row) => row.slug);
}


export const getPublishedNewsletterSlugs = unstable_cache(
    async () => fetchSlugsByStatus(true),
    ['published-newsletter-slugs'],
    { tags: ['published-newsletter-slugs'] }
);


export const getNewsletterDraftsSlugs = unstable_cache(
    async () => fetchSlugsByStatus(false),
    ['newsletter-drafts-slugs'],
    { tags: ['newsletter-drafts-slugs'] }
);


export async function getNewsletterBySlug(slug: string): Promise<NewsletterDB | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug}
    ` as NewsletterDB[];

    return result[0] || null;
}