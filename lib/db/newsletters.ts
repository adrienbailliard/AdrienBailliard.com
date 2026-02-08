import { sql } from '@/lib/db/client';
import CACHE_TAGS from '@/lib/db/cache-tags';

import { unstable_cache } from 'next/cache';

import { generateSlug } from "@/lib/utils";
import { DRAFT_CREATION_SLUG, NewsletterStatus } from "@/lib/constants";

import { NewsletterPreview, Newsletter, InsertNewsletterParam, UpdateNewsletterParam, NewsletterSlug,
    SerializedNewsletterPreview, UpdateNewsletterResult, SerializedNewsletter } from '@/lib/types';



export async function publishNewsletterById(id: number): Promise<Newsletter | null>
{
    const [ newsletterSlug ] = await sql`
        UPDATE newsletters
        SET published_at = NOW()
        WHERE id = ${id}
        RETURNING *
    ` as Array<Newsletter>;

    return newsletterSlug || null;
}



export async function publishScheduledNewsletters(): Promise<Newsletter[]>
{
    const publishedNewsletters = await sql`
        UPDATE newsletters
        SET published_at = NOW()
        WHERE scheduled_for <= NOW() 
            AND published_at IS NULL
        RETURNING *
    ` as Array<Newsletter>;

    return publishedNewsletters;
}



export async function scheduleNewsletterById(id: number, date: Date | null): Promise<NewsletterSlug | null>
{
    const [ newsletterSlug ] = await sql`
        UPDATE newsletters
        SET scheduled_for = ${ date }
        WHERE id = ${id}
        RETURNING slug
    ` as Array<NewsletterSlug>;

    return newsletterSlug || null;
}



export async function deleteNewsletterById(id: number): Promise<NewsletterSlug | null>
{
    const [ newsletterSlug ] = await sql`
        DELETE FROM newsletters
        WHERE id = ${id}
        RETURNING slug
    ` as Array<NewsletterSlug>;

    return newsletterSlug || null;
}



async function getUniqueSlug(title: string, excludeId?: number): Promise<string>
{
    const baseSlug = generateSlug(title);

    const [ newsletterSlug ] = await sql`
        SELECT slug FROM newsletters 
        WHERE slug ~ ${ "^" + baseSlug + "(-[0-9]+)?$" }
            ${ excludeId ? sql`AND id != ${excludeId}` : sql`` }
        ORDER BY LENGTH(slug) DESC, slug DESC
        LIMIT 1
    ` as NewsletterSlug[];

    if (!newsletterSlug)
        return baseSlug === DRAFT_CREATION_SLUG ? `${baseSlug}-2` : baseSlug;

    const match = newsletterSlug.slug.match(/-(\d+)$/);
    const nextNumber = match ? parseInt(match[1]) + 1 : 2;

    return `${baseSlug}-${nextNumber}`;
}



export async function insertNewsletter(draft: InsertNewsletterParam): Promise<NewsletterSlug>
{
    const slug = await getUniqueSlug(draft.title);

    const [ newsletterSlug ] = await sql`
        INSERT INTO newsletters (slug, title, content, excerpt)
        VALUES (${slug}, ${draft.title}, ${draft.content}, ${draft.excerpt})
        RETURNING slug
    ` as NewsletterSlug[];

    return newsletterSlug;
}



export async function updateNewsletter(draft: UpdateNewsletterParam): Promise<UpdateNewsletterResult | null>
{
    const newSlug = draft.title ? await getUniqueSlug(draft.title, draft.id) : undefined;

    const [ newsletterSlugs ] = await sql`
        UPDATE newsletters
        SET
            slug = COALESCE(${newSlug}, newsletters.slug),
            title = COALESCE(${draft.title}, title),
            content = COALESCE(${draft.content}, content),
            excerpt = COALESCE(${draft.excerpt}, excerpt),
            updated_at = now()
        FROM (
            SELECT slug FROM newsletters WHERE id = ${draft.id}
        ) AS old_data
        WHERE newsletters.id = ${draft.id}
        RETURNING old_data.slug AS old_slug, newsletters.slug as new_slug
    ` as UpdateNewsletterResult[];

    return newsletterSlugs || null;
}



const getNewsletterPreviews = (status: NewsletterStatus, tag: string) => 
    unstable_cache(
        async () => {
            return await sql `
                SELECT slug, title, excerpt, updated_at, published_at, scheduled_for
                FROM newsletters
                WHERE ${
                    status === NewsletterStatus.Published 
                        ? sql`published_at IS NOT NULL` 
                        : sql`published_at IS NULL AND scheduled_for IS ${
                            status === NewsletterStatus.Scheduled ? sql`NOT NULL` : sql`NULL`
                        }`
                }
                ORDER BY ${
                    status === NewsletterStatus.Published 
                        ? sql`published_at DESC`
                        : status === NewsletterStatus.Scheduled 
                            ? sql`scheduled_for ASC`
                            : sql`updated_at DESC`
                }
            ` as Array<NewsletterPreview>;
        },
        [ tag ],
        { tags: [tag] }
    ) as () => Promise<Array<NewsletterPreview | SerializedNewsletterPreview>>;


export const getNewsletterDraftsPreviews = getNewsletterPreviews(NewsletterStatus.Draft, CACHE_TAGS.newsletterDraftsPreviews);
export const getPublishedNewsletterPreviews = getNewsletterPreviews(NewsletterStatus.Published, CACHE_TAGS.newsletterPublishedPreviews);
export const getScheduledNewsletterPreviews = getNewsletterPreviews(NewsletterStatus.Scheduled, CACHE_TAGS.newsletterScheduledPreviews);



export const getNewsletterBySlug = (slug: string, isPublished: boolean) =>
    unstable_cache(
        async (): Promise<Newsletter | null> => {
            const [ newsletter ] = await sql`
                SELECT *
                FROM newsletters
                WHERE slug = ${slug}
                    AND published_at IS ${isPublished ? sql`NOT NULL` : sql`NULL`}
            ` as Newsletter[];

            return newsletter || null;
        },
        [ CACHE_TAGS.newsletter, slug, isPublished.toString() ],
        { tags: [
            `${CACHE_TAGS.newsletter}-${slug}`,
            `${CACHE_TAGS.newsletter}-${slug}-${isPublished}`
        ] }
    )() as Promise<Newsletter | SerializedNewsletter | null>;


export const getNewsletterDraftBySlug =
    (slug: string) => getNewsletterBySlug(slug, false);


export const getPublishedNewsletterBySlug =
    (slug: string) => getNewsletterBySlug(slug, true);