import { InsertNewsletterParam, EditorNewsletterParam } from "@/lib/types";



export async function postDraft(newsletter: InsertNewsletterParam, field: keyof InsertNewsletterParam, value: string): Promise<Response>
{
    return fetch('/api/newsletter/drafts', {
        method: 'POST',
        body: JSON.stringify({ draft: { ...newsletter, [field]: value } })
    });
}


export async function updateDraft(newsletter: EditorNewsletterParam, field: keyof InsertNewsletterParam, value: string): Promise<Response>
{
    return fetch('/api/newsletter/drafts', {
        method: 'PATCH',
        body: JSON.stringify({ draft: {
            id: newsletter.id,
            slug: newsletter.slug,
            [field]: value
        }})
    });
}