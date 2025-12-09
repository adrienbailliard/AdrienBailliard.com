import { getNewsletterDrafts } from '@/lib/db/newsletters';

export async function GET()
{
    const drafts = await getNewsletterDrafts();
    return Response.json(drafts);
}