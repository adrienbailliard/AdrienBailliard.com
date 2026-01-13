import { sql } from '@/lib/db/client';
import CACHE_TAGS from '@/lib/db/cache-tags';

import { cache } from 'react';
import { unstable_cache } from 'next/cache';

import { generateSlug } from "@/lib/utils";
import { DRAFT_CREATION_SLUG } from "@/lib/constants";

import { NewsletterPreview, Newsletter, InsertNewsletterParam, UpdateNewsletterParam, NewsletterSlug,
    SerializedNewsletterPreview } from '@/lib/types';



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



async function getUniqueSlug(title: string, excludeId?: number): Promise<string>
{
    const baseSlug = generateSlug(title);

    const result = await sql`
        SELECT slug FROM newsletters 
        WHERE slug ~ ${ "^" + baseSlug + "(-[0-9]+)?$" }
        ${ excludeId ? sql`AND id != ${excludeId}` : sql`` }
        ORDER BY LENGTH(slug) DESC, slug DESC
        LIMIT 1
    `;

    if (result.length === 0)
        return baseSlug === DRAFT_CREATION_SLUG ? `${baseSlug}-2` : baseSlug;

    const match = result[0].slug.match(/-(\d+)$/);
    const nextNumber = match ? parseInt(match[1]) + 1 : 2;

    return `${baseSlug}-${nextNumber}`;
}



export async function insertNewsletter(draft: InsertNewsletterParam): Promise<NewsletterSlug>
{
    const slug = await getUniqueSlug(draft.title);

    const result = await sql`
        INSERT INTO newsletters (slug, title, content, excerpt)
        VALUES (${slug}, ${draft.title}, ${draft.content}, ${draft.excerpt})
        RETURNING slug
    ` as NewsletterSlug[];

    return result[0];
}



export async function updateNewsletter(draft: UpdateNewsletterParam): Promise<NewsletterSlug | null>
{
    const newSlug = draft.title ? await getUniqueSlug(draft.title, draft.id) : undefined;

    const result = await sql`
        UPDATE newsletters
        SET
            slug = COALESCE(${newSlug}, slug),
            title = COALESCE(${draft.title}, title),
            content = COALESCE(${draft.content}, content),
            excerpt = COALESCE(${draft.excerpt}, excerpt),
            updated_at = now()
        WHERE id = ${draft.id}
        RETURNING slug
    ` as NewsletterSlug[];

    return result[0] || null;
}



async function getNewsletterPreviews(isPublished: boolean): Promise<NewsletterPreview[]>
{
    const result = await sql `
        SELECT slug, title, excerpt, updated_at, published_at
        FROM newsletters
        WHERE published_at IS ${isPublished ? sql`NOT NULL` : sql`NULL`}
        ORDER BY updated_at DESC
    ` as NewsletterPreview[];

    return result;
}



export const getNewsletterDraftsPreviews = unstable_cache(
    async () => getNewsletterPreviews(false),
    [ CACHE_TAGS.newsletterDrafts ],
    { tags: [ CACHE_TAGS.newsletterDrafts ] }
) as unknown as () => Promise<SerializedNewsletterPreview[]>;



export const getPublishedNewsletterPreviews = unstable_cache(
    async () => getNewsletterPreviews(true),
    [ CACHE_TAGS.newsletterPublished ],
    { tags: [ CACHE_TAGS.newsletterPublished ] }
) as unknown as () => Promise<SerializedNewsletterPreview[]>;



export const getNewsletterBySlug = cache(
    async (slug: string, isPublished: boolean): Promise<Newsletter | null> => {
        const result = await sql`
            SELECT *
            FROM newsletters
            WHERE slug = ${slug}
            AND published_at IS ${isPublished ? sql`NOT NULL` : sql`NULL`}
        ` as Newsletter[];

        return result[0] || null;
    }
);



export const getNewsletterDraftBySlug =
    async (slug: string) => getNewsletterBySlug(slug, false);



export const getPublishedNewsletterBySlug =
    async (slug: string) => getNewsletterBySlug(slug, true);