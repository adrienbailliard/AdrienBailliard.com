import { sql } from '@/lib/db/client';
import { generateSlug } from "@/lib/utils";

import { NewsletterDraftPreviewDB, PublishedNewsletterPreviewDB, NewsletterSlug, NewsletterDB, UpsertNewsletterParam } from '@/lib/types';



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


export async function upsertNewsletter(draft: UpsertNewsletterParam): Promise<NewsletterDB>
{
    if (!draft.slug)
        draft.slug = generateSlug(draft.title);

    let result, slug = draft.slug, i = 2;


    do {
        result = await sql`
            INSERT INTO newsletters (slug, title, content, excerpt)
            VALUES (${slug}, ${draft.title}, ${draft.content}, ${draft.excerpt})
            ON CONFLICT (slug)
            DO UPDATE SET
                title = EXCLUDED.title,
                content = EXCLUDED.content,
                excerpt = EXCLUDED.excerpt,
                updated_at = now()
            WHERE newsletters.id = ${draft.id}
            RETURNING *
        ` as NewsletterDB[];

        slug = `${draft.slug}-${i++}`;
    }
    while (result.length === 0);

    return result[0];
}


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


export async function getNewsletterBySlug(slug: string): Promise<NewsletterDB | null>
{
    const result = await sql `
        SELECT *
        FROM newsletters
        WHERE slug = ${slug}
    ` as NewsletterDB[];

    return result[0] || null;
}