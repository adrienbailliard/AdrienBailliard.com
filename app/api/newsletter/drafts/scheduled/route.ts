import { getScheduledNewsletterPreviews } from '@/lib/db/newsletters';


export async function GET()
{
  const draftsScheduled = await getScheduledNewsletterPreviews();
  return Response.json(draftsScheduled);
}