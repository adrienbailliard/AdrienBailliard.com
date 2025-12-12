import { getNewsletterDraftsPreview } from '@/lib/db/newsletters';

export async function GET()
{
    const drafts = await getNewsletterDraftsPreview();
    return Response.json(drafts);
}