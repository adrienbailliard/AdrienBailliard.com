import { getNewsletterDraftsPreviews } from '@/lib/db/newsletters';


export async function GET()
{
  const drafts = await getNewsletterDraftsPreviews();
  return Response.json(drafts);
}